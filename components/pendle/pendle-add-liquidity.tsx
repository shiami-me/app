import React, { useState, useEffect } from "react";
import { PendleMarket, PendleAsset } from "@/lib/pendle/types";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { PendleConnection } from "@/lib/pendle/connection";
import {
  Info,
  ChevronRight,
  Loader2,
  AlertCircle,
  DollarSign,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useTokenBalance } from "@/hooks/use-token-balance";
import { useAccount } from "wagmi";
import { usePendleTransaction, PendleTransactionStatus } from "@/hooks/usePendleTransaction";
import { extractPendleErrorMessage } from "@/lib/pendle/utils";

// Define proper result types based on the API response
interface AddLiquidityResult {
  amountLpOut?: string;
  amountOut?: string;
  amountYtOut?: string;
  priceImpact: number;
  error?: string;
}

interface PendleAddLiquidityProps {
  market: PendleMarket;
}

export function PendleAddLiquidity({ market }: PendleAddLiquidityProps) {
  // Component state
  const [isDualMode, setIsDualMode] = useState(false);
  const [tokenIn, setTokenIn] = useState(market.underlyingAsset);
  const [amountIn, setAmountIn] = useState("");
  const [amountPtIn, setAmountPtIn] = useState("");
  const [slippage, setSlippage] = useState(0.01); // Default 1%
  const [customSlippage, setCustomSlippage] = useState(""); // New state for custom input
  const [keepYt, setKeepYt] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingAssets, setLoadingAssets] = useState(true);
  const [result, setResult] = useState<AddLiquidityResult | null>(null);
  const [assets, setAssets] = useState<PendleAsset[]>([]);
  const [transactionStatus, setTransactionStatus] = useState<PendleTransactionStatus>({
    state: "idle"
  });

  // Get wallet connection status
  const { address, isConnected } = useAccount();

  // Get token balances using our new hook
  const tokenBalance = useTokenBalance(tokenIn, assets);
  const ptBalance = useTokenBalance(market.pt, assets);

  // Get our custom transaction hook
  const { sendTransaction } = usePendleTransaction({
    onStatusChange: setTransactionStatus
  });

  // Fetch assets on component mount
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        setLoadingAssets(true);
        const pendleClient = new PendleConnection();
        const assetsData = await pendleClient.getAssets();
        setAssets(assetsData);
      } catch (error) {
        console.error("Error fetching assets:", error);
      } finally {
        setLoadingAssets(false);
      }
    };

    fetchAssets();
  }, []);

  // Helper function to parse token IDs and find asset information
  const findAssetInfo = (tokenId: string): PendleAsset | undefined => {
    if (!tokenId || assets.length === 0) return undefined;

    const pendleClient = new PendleConnection();
    const parsedToken = pendleClient.parseTokenId(tokenId);

    if (!parsedToken) return undefined;

    return assets.find(
      (asset) =>
        asset.address.toLowerCase() === parsedToken.address.toLowerCase()
    );
  };

  // Handle token change
  const handleTokenChange = (value: string) => {
    setTokenIn(value);
  };

  // Handle amount change
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^[0-9]*\.?[0-9]*$/.test(value)) {
      setAmountIn(value);
    }
  };

  // Handle PT amount change
  const handleAmountPtChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^[0-9]*\.?[0-9]*$/.test(value)) {
      setAmountPtIn(value);
    }
  };

  // Handle max button click
  const handleMaxClick = () => {
    if (isConnected && !tokenBalance.loading && tokenBalance.formatted) {
      setAmountIn(tokenBalance.formatted);
    } else {
      // Fallback for when not connected or balance not loaded
      setAmountIn("1.0");
    }
  };

  // Handle max PT button click
  const handleMaxPtClick = () => {
    if (isConnected && !ptBalance.loading && ptBalance.formatted) {
      setAmountPtIn(ptBalance.formatted);
    } else {
      // Fallback for when not connected or balance not loaded
      setAmountPtIn("1.0");
    }
  };

  // Format token amounts with appropriate decimals
  const formatTokenAmount = (amount: string | undefined, asset?: PendleAsset): string => {
    if (!amount) return "0";
    
    try {
      // Parse the amount to a number (if it's scientific notation, this will convert properly)
      const numericAmount = parseFloat(amount);
      
      // Default to 6 decimals if we don't have asset info
      const decimals = asset?.decimals || 6;
      
      // For very small numbers use scientific notation
      if (numericAmount < 0.000001 && numericAmount > 0) {
        return numericAmount.toExponential(4);
      }
      
      // Format the number with appropriate decimals
      const formattedAmount = numericAmount.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: decimals
      });
      
      return formattedAmount;
    } catch (e) {
      console.error("Error formatting token amount:", e);
      return amount; // Return original amount if parsing fails
    }
  };

  // Add handler for custom slippage input
  const handleCustomSlippageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Allow only numbers and decimals
    if (value === "" || /^[0-9]*\.?[0-9]*$/.test(value)) {
      setCustomSlippage(value);
      
      // Only update the actual slippage if the value is valid
      if (value !== "") {
        const numValue = parseFloat(value);
        // Convert from percentage to decimal (e.g., 1.5% -> 0.015)
        if (!isNaN(numValue) && numValue >= 0 && numValue <= 100) {
          setSlippage(numValue / 100);
        }
      }
    }
  };

  // Handle add liquidity
  const handleAddLiquidity = async () => {
    if (!amountIn || !address) return;

    setLoading(true);
    setResult(null);

    try {
      const pendleClient = new PendleConnection();
      const tokenAddress = pendleClient.parseTokenId(tokenIn)?.address || "";
      
      if (isDualMode) {
        // Call dual liquidity function
        const response = await pendleClient.addLiquidityDual(
          market.chainId,
          market.address,
          tokenAddress,
          amountIn,
          amountPtIn,
          slippage,
          address
        );

        setResult({
          amountOut: response.data.amountOut,
          priceImpact: response.data.priceImpact,
        });
        
        // We need approvals for both token and PT
        const tokenApprovals = [
          {
            tokenAddress,
            spender: response.tx.to,
            amount: pendleClient.formatToWei(amountIn)
          },
          {
            tokenAddress: pendleClient.parseTokenId(market.pt)?.address || "",
            spender: response.tx.to,
            amount: pendleClient.formatToWei(amountPtIn)
          }
        ];
        
        // Execute the transaction with approvals
        const txResult = await sendTransaction({
          ...response.tx,
          chainId: market.chainId
        }, tokenApprovals);
        
        if (txResult?.error) {
          setResult({
            amountOut: response.data.amountOut,
            priceImpact: response.data.priceImpact,
            error: txResult.error
          });
        }
      } else {
        // Call single liquidity function
        const response = await pendleClient.addLiquidity(
          market.chainId,
          market.address,
          tokenAddress,
          amountIn,
          slippage,
          keepYt,
          address
        );

        setResult({
          amountLpOut: response.data.amountLpOut,
          amountYtOut: response.data.amountYtOut,
          priceImpact: response.data.priceImpact,
        });
        
        // For single token mode, we only need one approval
        const tokenApprovals = [
          {
            tokenAddress,
            spender: response.tx.to,
            amount: pendleClient.formatToWei(amountIn)
          }
        ];
        
        // Execute the transaction with approval
        const txResult = await sendTransaction({
          ...response.tx,
          chainId: market.chainId
        }, tokenApprovals);
        
        if (txResult?.error) {
          setResult({
            amountLpOut: response.data.amountLpOut,
            amountYtOut: response.data.amountYtOut,
            priceImpact: response.data.priceImpact,
            error: txResult.error
          });
        }
      }
    } catch (error) {
      console.error("Error adding liquidity:", error);
      setResult({
        error: extractPendleErrorMessage(error),
        priceImpact: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  // Prepare available input tokens with asset info
  const availableTokens = [...market.inputTokens].filter(Boolean);

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="border-b border-gray-100 dark:border-gray-800 pb-4 mb-4">
        <h3 className="font-medium text-base">
          Add Liquidity to {market.symbol}
        </h3>
      </div>

      {/* Mode selection */}
      <div className="rounded-lg border border-gray-100 dark:border-gray-800 p-4 bg-gray-50 dark:bg-gray-900/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="rounded-md border border-gray-200 dark:border-gray-700 p-1.5 bg-white dark:bg-gray-800">
              <div className="w-8 h-8 flex items-center justify-center">
                {isDualMode ? (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 8H8V2M16 2V8H22M2 16H8V22M16 22V16H22"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 3L6 21M18 3V21"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
            </div>
            <div>
              <Label htmlFor="dual-mode" className="text-sm font-medium">
                {isDualMode ? "Dual Token Input" : "Single Token Input"}
              </Label>
              <p className="text-xs text-muted-foreground mt-0.5">
                {isDualMode
                  ? "Provide liquidity using both token and PT"
                  : "Provide liquidity using a single token"}
              </p>
            </div>
          </div>

          <Switch
            id="dual-mode"
            checked={isDualMode}
            onCheckedChange={setIsDualMode}
          />
        </div>

        {!isDualMode && (
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div>
              <Label htmlFor="keep-yt" className="text-sm font-medium">
                Keep YT Tokens
              </Label>
              <p className="text-xs text-muted-foreground mt-0.5">
                Zero Price Impact (ZPI) operation that keeps the YT tokens
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="keep-yt"
                checked={keepYt}
                onCheckedChange={setKeepYt}
              />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-xs">
                    <p className="text-xs">
                      When enabled, this performs a Zero Price Impact (ZPI)
                      operation where you keep the YT tokens and only provide PT
                      to the pool.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        )}
      </div>

      {/* Input fields */}
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="token-select" className="text-sm">
              Input Token
            </Label>
            {loadingAssets ? (
              <Badge variant="outline" className="text-xs font-normal">
                <Loader2 className="h-3 w-3 mr-1 animate-spin" /> Loading...
              </Badge>
            ) : tokenIn && findAssetInfo(tokenIn) ? (
              <Badge variant="outline" className="text-xs font-normal">
                {findAssetInfo(tokenIn)?.symbol}
              </Badge>
            ) : (
              <Badge variant="outline" className="text-xs font-normal">
                {tokenIn}
              </Badge>
            )}
          </div>
          <Select value={tokenIn} onValueChange={handleTokenChange}>
            <SelectTrigger id="token-select" className="w-full">
              <SelectValue placeholder="Select token">
                {loadingAssets ? (
                  <div className="flex items-center">
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Loading tokens...
                  </div>
                ) : tokenIn && findAssetInfo(tokenIn) ? (
                  <div className="flex items-center">
                    {findAssetInfo(tokenIn)?.icon && (
                      <div className="mr-2 flex-shrink-0">
                        <Image
                          src={findAssetInfo(tokenIn)!.icon}
                          alt={findAssetInfo(tokenIn)!.symbol}
                          width={20}
                          height={20}
                          className="rounded-full"
                        />
                      </div>
                    )}
                    {findAssetInfo(tokenIn)?.symbol}
                  </div>
                ) : (
                  tokenIn
                )}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {availableTokens.map((token) => {
                const asset = findAssetInfo(token);
                return (
                  <SelectItem key={token} value={token}>
                    <div className="flex items-center">
                      {!loadingAssets && asset?.icon && (
                        <div className="mr-2 flex-shrink-0">
                          <Image
                            src={asset.icon}
                            alt={asset.symbol}
                            width={20}
                            height={20}
                            className="rounded-full"
                          />
                        </div>
                      )}
                      {asset ? asset.symbol : token}
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="amount-in" className="text-sm">
              Amount
            </Label>
            <span className="text-xs text-muted-foreground">
              Balance:{" "}
              {tokenBalance.loading ? (
                <Loader2 className="inline h-3 w-3 animate-spin" />
              ) : isConnected ? (
                `${tokenBalance.formatted} ${tokenBalance.symbol || ""}`
              ) : (
                "Connect wallet"
              )}
            </span>
          </div>
          <div className="flex items-center rounded-md border border-input focus-within:ring-1 focus-within:ring-primary">
            <div className="flex items-center pl-3 text-muted-foreground">
              <DollarSign className="h-4 w-4" />
            </div>
            <Input
              id="amount-in"
              value={amountIn}
              onChange={handleAmountChange}
              placeholder="0.0"
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button
              variant="ghost"
              size="sm"
              className="mr-2 h-7 text-xs px-2"
              onClick={handleMaxClick}
              disabled={!isConnected || tokenBalance.loading}
            >
              MAX
            </Button>
          </div>
        </div>

        {isDualMode && (
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="amount-pt" className="text-sm">
                PT Amount
              </Label>
              <span className="text-xs text-muted-foreground">
                PT Balance:{" "}
                {ptBalance.loading ? (
                  <Loader2 className="inline h-3 w-3 animate-spin" />
                ) : isConnected ? (
                  `${ptBalance.formatted} ${ptBalance.symbol || "PT"}`
                ) : (
                  "Connect wallet"
                )}
              </span>
            </div>
            <div className="flex items-center rounded-md border border-input focus-within:ring-1 focus-within:ring-primary">
              <div className="flex items-center pl-3 text-muted-foreground">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="opacity-70"
                >
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" />
                  <path
                    d="M2 17L12 22L22 17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 12L12 17L22 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <Input
                id="amount-pt"
                value={amountPtIn}
                onChange={handleAmountPtChange}
                placeholder="0.0"
                className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <Button
                variant="ghost"
                size="sm"
                className="mr-2 h-7 text-xs px-2"
                onClick={handleMaxPtClick}
                disabled={!isConnected || ptBalance.loading}
              >
                MAX
              </Button>
            </div>
          </div>
        )}

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="slippage" className="text-sm">
              Slippage Tolerance
            </Label>
            <div className="flex items-center gap-1">
              <Input
                id="custom-slippage"
                value={customSlippage}
                onChange={handleCustomSlippageChange}
                placeholder={(slippage * 100).toString()}
                className="w-16 h-7 text-xs text-right p-1"
              />
              <span className="text-sm">%</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant={slippage === 0.005 ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setSlippage(0.005);
                setCustomSlippage("0.5");
              }}
              className="flex-1 h-8"
            >
              0.5%
            </Button>
            <Button
              variant={slippage === 0.01 ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setSlippage(0.01);
                setCustomSlippage("1");
              }}
              className="flex-1 h-8"
            >
              1%
            </Button>
            <Button
              variant={slippage === 0.02 ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setSlippage(0.02);
                setCustomSlippage("2");
              }}
              className="flex-1 h-8"
            >
              2%
            </Button>
          </div>
        </div>
      </div>

      <Button
        className="w-full"
        onClick={handleAddLiquidity}
        disabled={loading || !amountIn || (isDualMode && !amountPtIn) || !isConnected || 
                 transactionStatus.state === "simulating" || 
                 transactionStatus.state === "approving" || 
                 transactionStatus.state === "executing"}
      >
        {loading || transactionStatus.state === "simulating" || transactionStatus.state === "approving" || transactionStatus.state === "executing" ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {transactionStatus.state === "simulating"
              ? "Simulating Transaction..."
              : transactionStatus.state === "approving" 
                ? "Approving Token..." 
                : transactionStatus.state === "executing" 
                  ? "Confirming Transaction..." 
                  : "Processing..."}
          </>
        ) : (
          <>
            Add Liquidity
            <ChevronRight className="ml-1 h-4 w-4" />
          </>
        )}
      </Button>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <Separator className="my-4" />
            <Card
              className={`p-4 ${
                result.error
                  ? "bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-900/30"
                  : "bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-900/30"
              }`}
            >
              <h4
                className={`font-medium mb-3 ${
                  result.error
                    ? "text-red-700 dark:text-red-300"
                    : "text-green-700 dark:text-green-300"
                }`}
              >
                {result.error ? "Transaction Failed" : "Transaction Preview"}
              </h4>

              {result.error ? (
                <div className="flex items-start gap-2 text-sm">
                  <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                  <p className="text-red-600 dark:text-red-400">
                    {result.error}
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex justify-between items-center py-1.5 border-b border-green-200 dark:border-green-900/50">
                    <span className="text-sm text-green-700 dark:text-green-300">
                      LP Amount Out
                    </span>
                    <span className="text-sm font-medium text-green-800 dark:text-green-200">
                      {formatTokenAmount(result.amountLpOut || result.amountOut, market.address ? findAssetInfo(market.address) : undefined)} {market.address ? findAssetInfo(market.address)?.symbol || "LP" : "LP"}
                    </span>
                  </div>

                  {result.amountYtOut && (
                    <div className="flex justify-between items-center py-1.5 border-b border-green-200 dark:border-green-900/50">
                      <span className="text-sm text-green-700 dark:text-green-300">
                        YT Amount Out
                      </span>
                      <span className="text-sm font-medium text-green-800 dark:text-green-200">
                        {formatTokenAmount(result.amountYtOut, market.yt ? findAssetInfo(market.yt) : undefined)} {market.yt ? findAssetInfo(market.yt)?.symbol || "YT" : "YT"}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between items-center py-1.5">
                    <span className="text-sm text-green-700 dark:text-green-300">
                      Price Impact
                    </span>
                    <span
                      className={`text-sm font-medium ${
                        Math.abs(result.priceImpact * 100) > 1
                          ? "text-amber-600 dark:text-amber-400"
                          : "text-green-800 dark:text-green-200"
                      }`}
                    >
                      {(result.priceImpact * 100).toFixed(4)}%
                    </span>
                  </div>
                </div>
              )}
            </Card>
          </motion.div>
        )}

        {/* Transaction status */}
        {(transactionStatus.state === "simulating" || 
          transactionStatus.state === "approving" || 
          transactionStatus.state === "executing" || 
          transactionStatus.state === "confirmed") && !result?.error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mt-4"
          >
            <Card className="p-4 bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-900/30">
              <h4 className="font-medium mb-3 text-blue-700 dark:text-blue-300">
                Transaction Status
              </h4>
              <div className="flex items-center gap-2">
                {transactionStatus.state === "simulating" || 
                 transactionStatus.state === "approving" || 
                 transactionStatus.state === "executing" ? (
                  <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />
                ) : transactionStatus.state === "confirmed" ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" className="text-blue-500" />
                    <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500" />
                  </svg>
                ) : null}
                <span className="text-sm text-blue-600 dark:text-blue-400">
                  {transactionStatus.message || 
                   (transactionStatus.state === "simulating"
                    ? "Simulating transaction to check for potential issues..."
                    : transactionStatus.state === "approving" 
                      ? "Approving token access..." 
                      : transactionStatus.state === "executing" 
                        ? "Executing transaction..." 
                        : transactionStatus.state === "confirmed"
                          ? "Transaction confirmed! LP tokens added to your wallet."
                          : "")}
                </span>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Connection status message */}
      {!isConnected && (
        <div className="text-sm text-amber-600 dark:text-amber-400 flex items-start gap-2 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg">
          <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
          <div>
            <p className="font-medium">Connect your wallet</p>
            <p>To use the MAX button and see your token balances</p>
          </div>
        </div>
      )}
    </div>
  );
}