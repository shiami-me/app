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

interface MintResult {
  amountOut?: string;
  priceImpact: number;
  error?: string;
}

interface PendleMintProps {
  market: PendleMarket;
}

export function PendleMint({ market }: PendleMintProps) {
  // Component state
  const [mintMode, setMintMode] = useState<"mintSy" | "mintPyFromToken">(
    "mintSy"
  );
  const [tokenIn, setTokenIn] = useState(market.underlyingAsset);
  const [amountIn, setAmountIn] = useState("");
  const [slippage, setSlippage] = useState(0.01); // Default 1%
  const [customSlippage, setCustomSlippage] = useState(""); // State for custom input
  const [loading, setLoading] = useState(false);
  const [loadingAssets, setLoadingAssets] = useState(true);
  const [result, setResult] = useState<MintResult | null>(null);
  const [assets, setAssets] = useState<PendleAsset[]>([]);
  const [transactionStatus, setTransactionStatus] =
    useState<PendleTransactionStatus>({
      state: "idle",
    });

  // Get wallet connection status
  const { address, isConnected } = useAccount();

  // Get token balances
  const tokenBalance = useTokenBalance(tokenIn, assets);

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
      } catch (error) {
        console.error("Error fetching assets:", error);
      } finally {
        setLoadingAssets(false);
      }
    };

    fetchAssets();
  }, []);

  // Update tokenIn when mint mode changes
  useEffect(() => {
    setTokenIn(
      assets.length > 0
        ? `${assets[0].chainId}-${assets[0].address}`
        : market.underlyingAsset
    );
    // Reset result when changing modes
    setResult(null);
  }, [mintMode, market.sy, market.underlyingAsset, assets]);

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
    if (isConnected && !tokenBalance.loading && tokenBalance.formatted) {
      setAmountIn(tokenBalance.formatted);
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

  // Get available token inputs based on mint mode
  const getAvailableInputTokens = () => {
    // For other modes, all assets can be input
    return assets.map((asset) => `${asset.chainId}-${asset.address}`);
  };

  // Handle mint operation
  const handleMint = async () => {
    if (!amountIn || !address) return;

    setLoading(true);
    setResult(null);

    try {
      const pendleClient = new PendleConnection();
      const tokenInAddress = pendleClient.parseTokenId(tokenIn)?.address || "";

      // Determine if we need to use aggregator based on token
      const enableAggregator = !market.inputTokens
        .map((token) => pendleClient.parseTokenId(token)?.address)
        .includes(tokenInAddress);

      // Based on mint mode, call appropriate function
      if (mintMode === "mintSy") {
        const response = await pendleClient.mintSy(
          market.chainId,
          pendleClient.parseTokenId(market.sy)?.address || "",
          tokenInAddress,
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
        const response = await pendleClient.mintPy(
          market.chainId,
          pendleClient.parseTokenId(market.yt)?.address || "",
          tokenInAddress,
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
      }
    } catch (error) {
      console.error("Error minting tokens:", error);
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

  // Get output token info based on mode
  const getOutputTokenInfo = () => {
    if (mintMode === "mintSy") {
      return {
        token: market.sy,
        name: "SY Token",
      };
    } else {
      return {
        token: market.pt, // Show PT as representative for PT+YT pair
        name: "PT+YT Pair",
      };
    }
  };

  const outputTokenInfo = getOutputTokenInfo();

  return (
    <div className="space-y-6 p-4">
      {/* Header section */}
      <div className="border-b border-gray-100 dark:border-gray-800 pb-4 mb-4">
        <h3 className="font-medium text-base">
          Mint Tokens for {market.symbol}
        </h3>
      </div>

      {/* Mint mode tabs */}
      <Tabs
        value={mintMode}
        onValueChange={(value) =>
          setMintMode(value as "mintSy" | "mintPyFromToken")
        }
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="mintSy">Mint SY</TabsTrigger>
          <TabsTrigger value="mintPyFromToken">Mint PT+YT</TabsTrigger>
        </TabsList>

        <TabsContent value={mintMode}>
          <div className="space-y-4">
            {/* Input token selection */}
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

              <Select value={tokenIn} onValueChange={handleTokenChange}>
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

            {/* Input amount field */}
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

            {/* Output token display */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label className="text-sm">
                  Output{" "}
                  {mintMode === "mintSy" ? "Token (SY)" : "Tokens (PT+YT)"}
                </Label>
              </div>
              <div className="w-full p-3 border rounded-md bg-muted/50">
                <div className="flex items-center">
                  {!loadingAssets &&
                    findAssetInfo(outputTokenInfo.token)?.icon && (
                      <div className="mr-2 flex-shrink-0">
                        <Image
                          src={findAssetInfo(outputTokenInfo.token)!.icon}
                          alt={
                            findAssetInfo(outputTokenInfo.token)?.symbol || ""
                          }
                          width={20}
                          height={20}
                          className="rounded-full"
                        />
                      </div>
                    )}
                  {findAssetInfo(outputTokenInfo.token)?.symbol ||
                    outputTokenInfo.name}

                  {/* For PT+YT modes, also show YT if we have its info */}
                  {mintMode !== "mintSy" && findAssetInfo(market.yt) && (
                    <span className="ml-2 text-muted-foreground">
                      + {findAssetInfo(market.yt)?.symbol || "YT"}
                    </span>
                  )}
                </div>
              </div>
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

      {/* Mint button */}
      <Button
        className="w-full"
        onClick={handleMint}
        disabled={
          loading ||
          !amountIn ||
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
            {mintMode === "mintSy" ? "Mint SY" : "Mint PT & YT"}
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
                      {mintMode === "mintSy"
                        ? "SY Amount Out"
                        : "PT & YT Amount Out"}
                    </span>
                    <span className="text-sm font-medium text-green-800 dark:text-green-200">
                      {formatTokenAmount(
                        result.amountOut,
                        findAssetInfo(outputTokenInfo.token)
                      )}{" "}
                      {findAssetInfo(outputTokenInfo.token)?.symbol || ""}
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
                        ? "Transaction confirmed! Tokens have been minted to your wallet."
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
