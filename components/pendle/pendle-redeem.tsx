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
import { Loader2, AlertCircle, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useTokenBalance } from "@/hooks/use-token-balance";
import { useAccount } from "wagmi";
import {
  usePendleTransaction,
  PendleTransactionStatus,
} from "@/hooks/usePendleTransaction";
import { extractPendleErrorMessage } from "@/lib/pendle/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface RedeemResult {
  amountOut?: string;
  priceImpact: number;
  error?: string;
}

interface PendleRedeemProps {
  market: PendleMarket;
}

export function PendleRedeem({ market }: PendleRedeemProps) {
  // Component state
  const [redeemMode, setRedeemMode] = useState<"redeemSy" | "redeemPy">("redeemSy");
  const [tokenOut, setTokenOut] = useState("");
  const [amountIn, setAmountIn] = useState("");
  const [slippage, setSlippage] = useState(0.01); // Default 1%
  const [customSlippage, setCustomSlippage] = useState(""); // State for custom input
  const [loading, setLoading] = useState(false);
  const [loadingAssets, setLoadingAssets] = useState(true);
  const [result, setResult] = useState<RedeemResult | null>(null);
  const [assets, setAssets] = useState<PendleAsset[]>([]);
  const [transactionStatus, setTransactionStatus] =
    useState<PendleTransactionStatus>({
      state: "idle",
    });

  // Get wallet connection status
  const { address, isConnected } = useAccount();

  // Set the appropriate input token based on mode
  const inputToken = redeemMode === "redeemSy" ? market.sy : market.pt;

  // Get token balances
  const inputTokenBalance = useTokenBalance(inputToken, assets);
  const ytTokenBalance = useTokenBalance(market.yt, assets);

  // Get transaction hook
  const { sendTransaction } = usePendleTransaction({
    onStatusChange: setTransactionStatus,
  });

  // Fetch assets on component mount
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        setLoadingAssets(true);
        const pendleClient = new PendleConnection();
        const assetsData = await pendleClient.getAssets();
        setAssets(assetsData);
        
        // Set default token out once assets are loaded
        if (assetsData.length > 0) {
          setTokenOut(`${assetsData[0].chainId}-${assetsData[0].address}`);
        } else {
          setTokenOut(market.underlyingAsset);
        }
      } catch (error) {
        console.error("Error fetching assets:", error);
      } finally {
        setLoadingAssets(false);
      }
    };

    fetchAssets();
  }, [market.underlyingAsset]);

  // Reset result when redeem mode changes
  useEffect(() => {
    setResult(null);
  }, [redeemMode]);

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
  const handleTokenOutChange = (value: string) => {
    setTokenOut(value);
    // Reset result when changing tokens
    setResult(null);
  };

  // Handle amount change
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^[0-9]*\.?[0-9]*$/.test(value)) {
      setAmountIn(value);
      // Reset result when changing amount
      setResult(null);
    }
  };

  // Handle max button click
  const handleMaxClick = () => {
    if (isConnected && !inputTokenBalance.loading && inputTokenBalance.formatted) {
      setAmountIn(inputTokenBalance.formatted);
      // Reset result when clicking max
      setResult(null);
    } else {
      // Fallback for when not connected or balance not loaded
      setAmountIn("1.0");
    }
  };

  // Format token amounts with appropriate decimals
  const formatTokenAmount = (
    amount: string | undefined,
    asset?: PendleAsset
  ): string => {
    if (!amount) return "0";

    try {
      // Parse the amount to a number
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
        maximumFractionDigits: decimals,
      });

      return formattedAmount;
    } catch (e) {
      console.error("Error formatting token amount:", e);
      return amount; // Return original amount if parsing fails
    }
  };

  // Add handler for custom slippage input
  const handleCustomSlippageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
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

  // Get available token outputs
  const getAvailableOutputTokens = () => {
    // All assets can be output
    return market.outputTokens;
  };

  // Handle redeem operation
  const handleRedeem = async () => {
    if (!amountIn || !address || !tokenOut) return;

    setLoading(true);
    setResult(null);

    try {
      const pendleClient = new PendleConnection();
      const tokenOutAddress = pendleClient.parseTokenId(tokenOut)?.address || "";
      
      // Determine if we need to use aggregator based on token
      const enableAggregator = ![...market.tokensRedeemSy, market.sy]
        .map((token) => pendleClient.parseTokenId(token)?.address)
        .includes(tokenOutAddress);

      // Based on redeem mode, call appropriate function
      if (redeemMode === "redeemSy") {
        const response = await pendleClient.redeemSy(
          market.chainId,
          pendleClient.parseTokenId(market.sy)?.address || "",
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

        // Need approval for SY token
        const tokenApprovals = [
          {
            tokenAddress: pendleClient.parseTokenId(market.sy)?.address || "",
            spender: response.tx.to,
            amount: pendleClient.formatToWei(amountIn),
          },
        ];

        // Execute the transaction with approval
        const txResult = await sendTransaction(
          {
            ...response.tx,
            chainId: market.chainId,
          },
          tokenApprovals
        );

        if (txResult?.error) {
          setResult({
            amountOut: response.data.amountOut,
            priceImpact: response.data.priceImpact,
            error: txResult.error,
          });
        }
      } else {
        // For redeemPy, we need equal amounts of PT and YT
        const response = await pendleClient.redeemPy(
          market.chainId,
          pendleClient.parseTokenId(market.yt)?.address || "",
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

        // Need approval for both PT and YT tokens
        const tokenApprovals = [
          {
            tokenAddress: pendleClient.parseTokenId(market.pt)?.address || "",
            spender: response.tx.to,
            amount: pendleClient.formatToWei(amountIn),
          },
          {
            tokenAddress: pendleClient.parseTokenId(market.yt)?.address || "",
            spender: response.tx.to,
            amount: pendleClient.formatToWei(amountIn),
          }
        ];

        // Execute the transaction with approval
        const txResult = await sendTransaction(
          {
            ...response.tx,
            chainId: market.chainId,
          },
          tokenApprovals
        );

        if (txResult?.error) {
          setResult({
            amountOut: response.data.amountOut,
            priceImpact: response.data.priceImpact,
            error: txResult.error,
          });
        }
      }
    } catch (error) {
      console.error("Error redeeming tokens:", error);
      setResult({
        error: extractPendleErrorMessage(error),
        priceImpact: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  // Get available tokens
  const availableOutputTokens = getAvailableOutputTokens();

  const getInputTokenInfo = () => {
    if (redeemMode === "redeemSy") {
      return {
        token: market.sy,
        name: "SY Token"
      }
    } else {
      return {
        token: market.pt,
        name: "PT"
      }
    }
  };

  const inputTokenInfo = getInputTokenInfo();

  return (
    <div className="space-y-6 p-4">
      {/* Header section */}
      <div className="border-b border-gray-100 dark:border-gray-800 pb-4 mb-4">
        <h3 className="font-medium text-base">
          Redeem Tokens for {market.symbol}
        </h3>
      </div>

      {/* Redeem mode tabs */}
      <Tabs
        value={redeemMode}
        onValueChange={(value) => setRedeemMode(value as "redeemSy" | "redeemPy")}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="redeemSy">Redeem SY</TabsTrigger>
          <TabsTrigger value="redeemPy">Redeem PT+YT</TabsTrigger>
        </TabsList>

        <TabsContent value={redeemMode}>
          <div className="space-y-4">
            {/* Input token display */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label className="text-sm">
                  Input {redeemMode === "redeemSy" ? "Token (SY)" : "Tokens (PT+YT)"}
                </Label>
                <span className="text-xs text-muted-foreground">
                  Balance:{" "}
                  {inputTokenBalance.loading ? (
                    <Loader2 className="inline h-3 w-3 animate-spin" />
                  ) : isConnected ? (
                    `${inputTokenBalance.formatted || "0"} ${inputTokenBalance.symbol || ""}`
                  ) : (
                    "Connect wallet"
                  )}
                </span>
              </div>
              <div className="w-full p-3 border rounded-md bg-muted/50">
                <div className="flex items-center">
                  {!loadingAssets && findAssetInfo(inputTokenInfo.token)?.icon && (
                    <div className="mr-2 flex-shrink-0">
                      <Image
                        src={findAssetInfo(inputTokenInfo.token)!.icon}
                        alt={findAssetInfo(inputTokenInfo.token)?.symbol || ''}
                        width={20}
                        height={20}
                        className="rounded-full"
                      />
                    </div>
                  )}
                  {findAssetInfo(inputTokenInfo.token)?.symbol || inputTokenInfo.name}
                  
                  {/* For PT+YT mode, also show YT */}
                  {redeemMode === "redeemPy" && findAssetInfo(market.yt) && (
                    <div className="ml-2 flex items-center">
                      <span className="text-muted-foreground mr-2">+</span>
                      {!loadingAssets && findAssetInfo(market.yt)?.icon && (
                        <div className="mr-1 flex-shrink-0">
                          <Image
                            src={findAssetInfo(market.yt)!.icon}
                            alt={findAssetInfo(market.yt)?.symbol || ''}
                            width={20}
                            height={20}
                            className="rounded-full"
                          />
                        </div>
                      )}
                      <span className="text-muted-foreground">
                        {findAssetInfo(market.yt)?.symbol || "YT"}
                      </span>
                      <span className="ml-2 text-xs text-muted-foreground">
                        (Balance: {ytTokenBalance.loading ? 
                          <Loader2 className="inline h-3 w-3 animate-spin" /> : 
                          isConnected ? ytTokenBalance.formatted || "0" : "Connect wallet"})
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Input amount field */}
            <div className="space-y-2">
              <Label htmlFor="amount-in" className="text-sm">
                Amount
              </Label>
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
                  disabled={!isConnected || inputTokenBalance.loading}
                >
                  MAX
                </Button>
              </div>
              {redeemMode === "redeemPy" && (
                <p className="text-xs text-muted-foreground mt-1">
                  Note: Redeeming requires equal amounts of PT and YT tokens
                </p>
              )}
            </div>

            {/* Output token selection */}
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
              <Select value={tokenOut} onValueChange={handleTokenOutChange}>
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

            {/* Slippage settings */}
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
        </TabsContent>
      </Tabs>

      {/* Redeem button */}
      <Button
        className="w-full"
        onClick={handleRedeem}
        disabled={
          loading ||
          !amountIn ||
          !tokenOut ||
          !isConnected ||
          transactionStatus.state === "simulating" ||
          transactionStatus.state === "approving" ||
          transactionStatus.state === "executing"
        }
      >
        {loading ||
        transactionStatus.state === "simulating" ||
        transactionStatus.state === "approving" ||
        transactionStatus.state === "executing" ? (
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
            {redeemMode === "redeemSy" ? "Redeem SY" : "Redeem PT & YT"}
            <ArrowRight className="ml-1 h-4 w-4" />
          </>
        )}
      </Button>

      {/* Results and status displays */}
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
                      {findAssetInfo(tokenOut)?.symbol || "Token"} Amount Out
                    </span>
                    <span className="text-sm font-medium text-green-800 dark:text-green-200">
                      {formatTokenAmount(
                        result.amountOut,
                        findAssetInfo(tokenOut)
                      )}{" "}
                      {findAssetInfo(tokenOut)?.symbol || ""}
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
          transactionStatus.state === "confirmed") &&
          !result?.error && (
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
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-blue-500"
                      />
                      <path
                        d="M8 12L11 15L16 9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-blue-500"
                      />
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
                        ? "Transaction confirmed! Tokens have been redeemed to your wallet."
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
