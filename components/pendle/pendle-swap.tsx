import React, { useState, useEffect } from "react";
import { PendleMarket, PendleAsset } from "@/lib/pendle/types";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { PendleConnection } from "@/lib/pendle/connection";
import {
  Loader2,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useTokenBalance } from "@/hooks/use-token-balance";
import { useAccount } from "wagmi";
import { usePendleTransaction, PendleTransactionStatus } from "@/hooks/usePendleTransaction";
import { extractPendleErrorMessage } from "@/lib/pendle/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Define proper result types based on the API response
interface SwapResult {
  amountOut?: string;
  priceImpact: number;
  error?: string;
}

interface PendleSwapProps {
  market: PendleMarket;
}

export function PendleSwap({ market }: PendleSwapProps) {
  // Component state
  const [swapMode, setSwapMode] = useState<"buyPT" | "sellPT">("buyPT");
  const [tokenIn, setTokenIn] = useState(market.underlyingAsset);
  const [tokenOut, setTokenOut] = useState(market.pt);
  const [amountIn, setAmountIn] = useState("");
  const [slippage, setSlippage] = useState(0.01); // Default 1%
  const [customSlippage, setCustomSlippage] = useState(""); // New state for custom input
  const [loading, setLoading] = useState(false);
  const [loadingAssets, setLoadingAssets] = useState(true);
  const [result, setResult] = useState<SwapResult | null>(null);
  const [assets, setAssets] = useState<PendleAsset[]>([]);
  const [transactionStatus, setTransactionStatus] = useState<PendleTransactionStatus>({
    state: "idle"
  });

  // Get wallet connection status
  const { address, isConnected } = useAccount();

  // Get token balances using our new hook
  const tokenBalance = useTokenBalance(tokenIn, assets);

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

  // Update tokens when swap mode changes
  useEffect(() => {
    if (swapMode === "buyPT") {
      setTokenIn(assets.length > 0 ? assets[0].chainId + "-" + assets[0].address : market.underlyingAsset);
      setTokenOut(market.pt);
    } else {
      setTokenIn(market.pt);
      setTokenOut(assets.length > 0 ? assets[0].chainId + "-" + assets[0].address : market.underlyingAsset);
    }
    // Reset result when changing modes
    setResult(null);
  }, [swapMode, market.pt, assets]);

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
  const handleTokenChange = (value: string, isTokenIn: boolean) => {
    if (isTokenIn) {
      setTokenIn(value);
    } else {
      setTokenOut(value);
    }
    // Reset result when changing tokens
    setResult(null);
  };

  // Handle amount change
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^[0-9]*\.?[0-9]*$/.test(value)) {
      setAmountIn(value);
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

  // Get available tokens based on swap mode
  const getAvailableInputTokens = () => {
    if (swapMode === "sellPT") {
      // When selling PT, only PT is available as input
      return [market.pt];
    } else {
      // When buying PT, all assets can be input
      return assets.map(asset => `${asset.chainId}-${asset.address}`);
    }
  };

  const getAvailableOutputTokens = () => {
    if (swapMode === "buyPT") {
      // When buying PT, only PT is available as output
      return [market.pt];
    } else {
      // When selling PT, all assets can be output
      return assets.map(asset => `${asset.chainId}-${asset.address}`);
    }
  };

  // Handle swap
  const handleSwap = async () => {
    if (!amountIn || !address) return;

    setLoading(true);
    setResult(null);

    try {
      const pendleClient = new PendleConnection();
      const tokenInAddress = pendleClient.parseTokenId(tokenIn)?.address || "";
      const tokenOutAddress = pendleClient.parseTokenId(tokenOut)?.address || "";

      // Determine if we need to use aggregator based on swap mode and tokens
      let enableAggregator = false;
      
      if (swapMode === "buyPT") {
        enableAggregator = !market.inputTokens.map(token => pendleClient.parseTokenId(token)?.address).includes(tokenIn);
      } else {
        enableAggregator = !market.inputTokens.map(token => pendleClient.parseTokenId(token)?.address).includes(tokenOut);
      }
      
      // Call swap function with aggregator flag
      const response = await pendleClient.swap(
        market.chainId,
        market.address,
        tokenInAddress,
        tokenOutAddress,
        amountIn,
        slippage,
        address,
        enableAggregator
      );

      setResult({
        amountOut: response.data.amountOut,
        priceImpact: response.data.priceImpact,
      });

      // Need approval for input token
      const tokenApprovals = [
        {
          tokenAddress: tokenInAddress,
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
          amountOut: response.data.amountOut,
          priceImpact: response.data.priceImpact,
          error: txResult.error
        });
      }
    } catch (error) {
      console.error("Error swapping tokens:", error);
      setResult({
        error: extractPendleErrorMessage(error),
        priceImpact: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  // Get available tokens based on mode
  const availableInputTokens = getAvailableInputTokens();
  const availableOutputTokens = getAvailableOutputTokens();

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="border-b border-gray-100 dark:border-gray-800 pb-4 mb-4">
        <h3 className="font-medium text-base">
          Swap Tokens in {market.symbol}
        </h3>
      </div>

      {/* Buy/Sell PT Tabs */}
      <Tabs value={swapMode} onValueChange={(value) => setSwapMode(value as "buyPT" | "sellPT")} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="buyPT">Buy PT</TabsTrigger>
          <TabsTrigger value="sellPT">Sell PT</TabsTrigger>
        </TabsList>

        <TabsContent value="buyPT">
          {/* Input fields for Buy PT */}
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="token-in-select" className="text-sm">
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
              <Select value={tokenIn} onValueChange={(value) => handleTokenChange(value, true)}>
                <SelectTrigger id="token-in-select" className="w-full">
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
                  {availableInputTokens.map((token) => {
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
                          {asset ? `${asset.symbol} - ${asset.type}` : token}
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
                  <ArrowRight className="h-4 w-4" />
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

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="token-out-select" className="text-sm">
                  Output Token (PT)
                </Label>
                {loadingAssets ? (
                  <Badge variant="outline" className="text-xs font-normal">
                    <Loader2 className="h-3 w-3 mr-1 animate-spin" /> Loading...
                  </Badge>
                ) : tokenOut && findAssetInfo(tokenOut) ? (
                  <Badge variant="outline" className="text-xs font-normal">
                    {findAssetInfo(tokenOut)?.symbol}
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-xs font-normal">
                    {tokenOut}
                  </Badge>
                )}
              </div>
              {/* For Buy PT, output is fixed to market.pt */}
              <div className="w-full p-3 border rounded-md bg-muted/50">
                <div className="flex items-center">
                  {!loadingAssets && findAssetInfo(market.pt)?.icon && (
                    <div className="mr-2 flex-shrink-0">
                      <Image
                        src={findAssetInfo(market.pt)!.icon}
                        alt={findAssetInfo(market.pt)?.symbol || ''}
                        width={20}
                        height={20}
                        className="rounded-full"
                      />
                    </div>
                  )}
                  {findAssetInfo(market.pt)?.symbol || 'PT Token'}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="sellPT">
          {/* Input fields for Sell PT */}
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="token-in-select" className="text-sm">
                  Input Token (PT)
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
              {/* For Sell PT, input is fixed to market.pt */}
              <div className="w-full p-3 border rounded-md bg-muted/50">
                <div className="flex items-center">
                  {!loadingAssets && findAssetInfo(market.pt)?.icon && (
                    <div className="mr-2 flex-shrink-0">
                      <Image
                        src={findAssetInfo(market.pt)!.icon}
                        alt={findAssetInfo(market.pt)?.symbol || ''}
                        width={20}
                        height={20}
                        className="rounded-full"
                      />
                    </div>
                  )}
                  {findAssetInfo(market.pt)?.symbol || 'PT Token'}
                </div>
              </div>
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
                  <ArrowRight className="h-4 w-4" />
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

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="token-out-select" className="text-sm">
                  Output Token
                </Label>
                {loadingAssets ? (
                  <Badge variant="outline" className="text-xs font-normal">
                    <Loader2 className="h-3 w-3 mr-1 animate-spin" /> Loading...
                  </Badge>
                ) : tokenOut && findAssetInfo(tokenOut) ? (
                  <Badge variant="outline" className="text-xs font-normal">
                    {findAssetInfo(tokenOut)?.symbol}
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-xs font-normal">
                    {tokenOut}
                  </Badge>
                )}
              </div>
              <Select value={tokenOut} onValueChange={(value) => handleTokenChange(value, false)}>
                <SelectTrigger id="token-out-select" className="w-full">
                  <SelectValue placeholder="Select token">
                    {loadingAssets ? (
                      <div className="flex items-center">
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Loading tokens...
                      </div>
                    ) : tokenOut && findAssetInfo(tokenOut) ? (
                      <div className="flex items-center">
                        {findAssetInfo(tokenOut)?.icon && (
                          <div className="mr-2 flex-shrink-0">
                            <Image
                              src={findAssetInfo(tokenOut)!.icon}
                              alt={findAssetInfo(tokenOut)!.symbol}
                              width={20}
                              height={20}
                              className="rounded-full"
                            />
                          </div>
                        )}
                        {findAssetInfo(tokenOut)?.symbol}
                      </div>
                    ) : (
                      tokenOut
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {availableOutputTokens.map((token) => {
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
                          {asset ? `${asset.symbol} - ${asset.type}` : token}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>
      </Tabs>

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

      <Button
        className="w-full"
        onClick={handleSwap}
        disabled={loading || !amountIn || !isConnected || 
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
            {swapMode === "buyPT" ? "Buy PT" : "Sell PT"}
            <ArrowRight className="ml-1 h-4 w-4" />
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
                      Amount Out
                    </span>
                    <span className="text-sm font-medium text-green-800 dark:text-green-200">
                      {formatTokenAmount(result.amountOut, findAssetInfo(tokenOut))} {findAssetInfo(tokenOut)?.symbol || ""}
                    </span>
                  </div>

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
                          ? "Transaction confirmed! Tokens have been swapped."
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
          </div>
        </div>
      )}
    </div>
  );
}