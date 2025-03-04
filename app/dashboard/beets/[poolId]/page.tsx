"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import Image from "next/image";
import {
  ArrowLeft,
  ExternalLink,
  Loader2,
  Clock,
  DollarSign,
  BarChart3,
  PieChart,
  Droplet,
  Copy,
  TrendingUp,
  Percent,
  Layers,
  ChevronLeft,
  PlusCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatNumber, truncateAddress } from "@/lib/utils";
import { PoolTokenChart } from "@/components/beets/pool-token-chart";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { useChat } from "@/providers/ChatProvider";

interface PoolDetailProps {
  id: string;
  address: string;
  name: string;
  protocolVersion: string;
  type: string;
  categories: string[];
  userBalance?: {
    totalBalanceUsd: number;
    walletBalanceUsd: number;
    stakedBalances: {
      stakingType: string;
      balanceUsd: number;
    }[];
  };
  dynamicData: {
    aprItems: {
      apr: number;
      rewardTokenSymbol: string;
      type: string;
    }[];
    totalLiquidity: number;
    totalShares: number;
    totalSupply: number;
    volume24h: number;
    yieldCapture24h: number;
    fees24h: number;
  };
  poolTokens: {
    address: string;
    symbol: string;
    weight: number;
    decimals: number;
    logoURI: string;
    balanceUSD: string;
    underlyingToken?: {
      address: string;
      symbol: string;
      decimals: number;
    };
  }[];
}

export default function PoolDetailPage() {
  const { poolId } = useParams();
  const router = useRouter();
  const { address } = useAccount();
  const [pool, setPool] = useState<PoolDetailProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToContext } = useChat();

  const fetchPoolData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:3000/api/queries/pool/${poolId}?userAddress=${
          address || ""
        }`
      );

      if (!response.ok) {
        throw new Error(`Error fetching pool: ${response.statusText}`);
      }

      const data = await response.json();
      setPool(data);
    } catch (err) {
      console.error("Failed to fetch pool data:", err);
      setError("Failed to load pool details. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [poolId, address]);

  useEffect(() => {
    fetchPoolData();
  }, [fetchPoolData]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  // Calculate total APR
  const totalApr =
    pool?.dynamicData.aprItems.reduce((sum, item) => sum + item.apr * 100, 0) ||
    0;

  // Calculate weights for token chart
  const tokenWeights = React.useMemo(() => {
    if (!pool || !pool.poolTokens.length) return [];

    // Check if we need to calculate weights from balanceUSD
    const hasExplicitWeights = pool.poolTokens.some(
      (token) => token.weight !== null && token.weight !== undefined
    );

    if (hasExplicitWeights) {
      // Use the provided weights
      return pool.poolTokens.map((token) => ({
        symbol: token.symbol,
        weight: token.weight || 0,
        color: getRandomColor(),
        logoURI: token.logoURI,
      }));
    } else {
      // Calculate weights from balanceUSD
      const totalBalance = pool.poolTokens.reduce(
        (sum, token) => sum + parseFloat(token.balanceUSD || "0"),
        0
      );

      return pool.poolTokens.map((token) => {
        const balance = parseFloat(token.balanceUSD || "0");
        const calculatedWeight = totalBalance > 0 ? balance / totalBalance : 0;

        return {
          symbol: token.symbol,
          weight: calculatedWeight,
          color: getRandomColor(),
          logoURI: token.logoURI,
          balanceUSD: token.balanceUSD,
        };
      });
    }
  }, [pool]);

  const handleAddToContext = () => {
    if (!pool) return;
    
    addToContext({
      id: `beets-pool-detail-${pool.id}`,
      type: "beets-pool-detail",
      title: `${pool.name} Pool`,
      data: {
        id: pool.id,
        name: pool.name,
        address: pool.address,
        type: pool.type,
        protocolVersion: pool.protocolVersion,
        metrics: {
          totalLiquidity: pool.dynamicData.totalLiquidity,
          volume24h: pool.dynamicData.volume24h,
          totalApr: totalApr,
          yieldCapture24h: pool.dynamicData.yieldCapture24h,
          fees24h: pool.dynamicData.fees24h
        },
        tokens: pool.poolTokens.map(token => ({
          symbol: token.symbol,
          weight: tokenWeights.find(t => t.symbol === token.symbol)?.weight || 0,
          balanceUSD: token.balanceUSD,
          boosted: !!token.underlyingToken
        })),
        userPosition: pool.userBalance ? {
          totalBalance: pool.userBalance.totalBalanceUsd,
          walletBalance: pool.userBalance.walletBalanceUsd,
          stakedBalance: pool.userBalance.stakedBalances.reduce(
            (sum, item) => sum + item.balanceUsd, 0
          )
        } : null
      }
    });
  };

  // Visual animations config
  const fadeIn = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  if (error || !pool) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <p className="text-destructive mb-4">{error || "Pool not found"}</p>
            <Button onClick={() => router.back()} variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <motion.div
      className="container mx-auto py-8 px-4 max-w-6xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header with background gradient and pattern */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-green-100 to-blue-50 dark:from-green-900/30 dark:to-blue-900/30 rounded-2xl opacity-70"></div>
        <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-700/20 [mask-image:linear-gradient(0deg,transparent,white)] rounded-2xl"></div>

        <div className="relative p-6 sm:p-8 rounded-2xl">
          {/* Back button and header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 rounded-full shadow-sm hover:shadow border-gray-200 dark:border-gray-800"
                onClick={() => router.back()}
              >
                <ChevronLeft className="h-5 w-5" />
                <span className="sr-only">Back</span>
              </Button>

              <div>
                <h1 className="text-3xl font-extrabold bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400 bg-clip-text text-transparent font-[family-name:var(--font-roboto-mono)]">
                  {pool.name}
                </h1>
                <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap mt-1">
                  <span className="capitalize font-medium">{pool.type}</span>
                  <span>•</span>
                  <span>v{pool.protocolVersion}</span>
                  <span>•</span>
                  <div className="flex items-center">
                    <span className="truncate">
                      {truncateAddress(pool.address)}
                    </span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => copyToClipboard(pool.address)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Copy address</TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleAddToContext}
                      className="border-gray-200 dark:border-gray-800 shadow-sm"
                    >
                      <PlusCircle className="h-4 w-4 mr-1" />
                      Add to Context
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Add this pool to chat context</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={fetchPoolData}
                className="border border-gray-200 dark:border-gray-800 shadow-sm"
              >
                Refresh
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20"
                asChild
              >
                <a
                  href={`https://sonicscan.org/address/${pool.address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" /> Explorer
                </a>
              </Button>
            </div>
          </div>

          {/* Pool token icons row */}
          <div className="mt-6 flex -space-x-2 overflow-hidden justify-center sm:justify-start">
            {pool.poolTokens.map((token, i) => (
              <div
                key={token.address}
                className="inline-block h-12 w-12 rounded-full ring-2 ring-white dark:ring-gray-900"
                style={{ zIndex: 10 - i }}
              >
                {token.logoURI ? (
                  <Image
                    src={token.logoURI}
                    alt={token.symbol}
                    width={48}
                    height={48}
                    className="rounded-full bg-white dark:bg-gray-900"
                  />
                ) : (
                  <div className="h-full w-full rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
                    <span className="text-lg font-bold">
                      {token.symbol.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pool Categories */}
      {pool.categories && pool.categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {pool.categories.map((category) => {
            if (category) {
              return (
                <Badge
                  key={category}
                  variant="outline"
                  className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-300 px-3 py-1 rounded-full font-medium"
                >
                  {category}
                </Badge>
              );
            }
          })}
        </div>
      )}

      {/* Stats cards row */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.div
          variants={fadeIn}
          className="bg-card rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 flex items-center"
        >
          <div className="rounded-full bg-green-50 dark:bg-green-900/20 p-3 mr-4">
            <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total Liquidity
            </p>
            <p className="text-2xl font-bold">
              ${formatNumber(pool.dynamicData.totalLiquidity)}
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={fadeIn}
          className="bg-card rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 flex items-center"
        >
          <div className="rounded-full bg-blue-50 dark:bg-blue-900/20 p-3 mr-4">
            <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              24h Volume
            </p>
            <p className="text-2xl font-bold">
              ${formatNumber(pool.dynamicData.volume24h)}
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={fadeIn}
          className="bg-card rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 flex items-center"
        >
          <div className="rounded-full bg-purple-50 dark:bg-purple-900/20 p-3 mr-4">
            <Percent className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total APR
            </p>
            <p className="text-2xl font-bold">{formatNumber(totalApr)}%</p>
          </div>
        </motion.div>
      </motion.div>

      {/* User Position */}
      {pool.userBalance && pool.userBalance.totalBalanceUsd > 0 && (
        <motion.div
          variants={fadeIn}
          initial="initial"
          animate="animate"
          className="mb-6"
        >
          <Card className="border-green-200 dark:border-green-800 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-emerald-500"></div>
            <div className="absolute inset-0 bg-green-50/50 dark:bg-green-900/10"></div>
            <CardContent className="pt-6 relative">
              <h2 className="text-xl font-bold mb-4 flex items-center text-green-700 dark:text-green-400">
                <Layers className="h-5 w-5 mr-2" />
                Your Position
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/60 dark:bg-black/10 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-1">
                    Total Balance
                  </p>
                  <p className="text-2xl font-bold text-green-700 dark:text-green-400">
                    ${formatNumber(pool.userBalance.totalBalanceUsd)}
                  </p>
                </div>
                <div className="bg-white/60 dark:bg-black/10 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-1">
                    Wallet Balance
                  </p>
                  <p className="text-lg font-semibold">
                    ${formatNumber(pool.userBalance.walletBalanceUsd)}
                  </p>
                </div>
                <div className="bg-white/60 dark:bg-black/10 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-1">
                    Staked Balance
                  </p>
                  <p className="text-lg font-semibold">
                    $
                    {formatNumber(
                      pool.userBalance.stakedBalances.reduce(
                        (sum, item) => sum + item.balanceUsd,
                        0
                      )
                    )}
                  </p>
                  {pool.userBalance.stakedBalances.length > 0 && (
                    <div className="flex flex-col gap-1 mt-2">
                      {pool.userBalance.stakedBalances.map((staked) => (
                        <div
                          key={staked.stakingType}
                          className="flex justify-between text-sm"
                        >
                          <span className="text-muted-foreground capitalize">
                            {staked.stakingType}
                          </span>
                          <span>${formatNumber(staked.balanceUsd)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: Pool Overview */}
        <motion.div
          className="lg:col-span-2"
          variants={fadeIn}
          initial="initial"
          animate="animate"
        >
          <Card className="border-gray-200 dark:border-gray-800 shadow-md overflow-hidden">
            <Tabs defaultValue="overview" className="w-full">
              <div className="px-6 pt-6 border-b border-gray-100 dark:border-gray-800">
                <TabsList className="w-full md:w-auto grid grid-cols-3">
                  <TabsTrigger
                    value="overview"
                    className="rounded-lg font-medium"
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger
                    value="composition"
                    className="rounded-lg font-medium"
                  >
                    Composition
                  </TabsTrigger>
                  <TabsTrigger
                    value="analytics"
                    className="rounded-lg font-medium"
                  >
                    Analytics
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="overview" className="space-y-6 p-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="rounded-lg p-4">
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <DollarSign className="h-4 w-4" />
                      <span>Total Liquidity</span>
                    </div>
                    <p className="text-2xl font-bold">
                      ${formatNumber(pool.dynamicData.totalLiquidity)}
                    </p>
                  </div>

                  <div className="rounded-lg p-4">
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <Clock className="h-4 w-4" />
                      <span>24h Volume</span>
                    </div>
                    <p className="text-2xl font-bold">
                      ${formatNumber(pool.dynamicData.volume24h)}
                    </p>
                  </div>

                  <div className="rounded-lg p-4">
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <BarChart3 className="h-4 w-4" />
                      <span>24h Fees</span>
                    </div>
                    <p className="text-2xl font-bold">
                      ${formatNumber(pool.dynamicData.fees24h)}
                    </p>
                  </div>
                </div>

                <div className="p-6 rounded-xl border border-gray-100 dark:border-gray-800">
                  <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">
                    APR Breakdown
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                      <span className="font-medium">Total APR</span>
                      <span className="text-lg font-bold text-green-600 dark:text-green-400">
                        {formatNumber(totalApr)}%
                      </span>
                    </div>
                    <Separator className="my-4" />
                    {pool.dynamicData.aprItems.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800 last:border-none"
                      >
                        <span className="text-muted-foreground capitalize flex items-center gap-1">
                          {item.type}{" "}
                          {item.rewardTokenSymbol &&
                            `(${item.rewardTokenSymbol})`}
                        </span>
                        <span className="font-medium">
                          {formatNumber(item.apr * 100)}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="composition" className="p-6 space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/2 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
                    <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">
                      Token Weights
                    </h3>
                    <div className="h-[300px] flex items-center justify-center">
                      <PoolTokenChart tokens={tokenWeights} />
                    </div>
                  </div>
                  <div className="md:w-1/2">
                    <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">
                      Token List
                    </h3>
                    <div className="space-y-3">
                      {pool.poolTokens.map((token) => (
                        <div
                          key={token.address}
                          className="flex items-center justify-between p-4 rounded-lg border border-gray-100 dark:border-gray-800 hover:border-green-200 dark:hover:border-green-800 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            {token.logoURI ? (
                              <Image
                                src={token.logoURI}
                                alt={token.symbol}
                                width={32}
                                height={32}
                                className="rounded-full border border-gray-100 dark:border-gray-700"
                              />
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
                                <span className="text-sm font-bold">
                                  {token.symbol.charAt(0)}
                                </span>
                              </div>
                            )}
                            <div>
                              <p className="font-bold text-gray-900 dark:text-gray-100">
                                {token.symbol}
                              </p>
                              {token.underlyingToken && (
                                <p className="text-xs text-purple-500 font-medium">
                                  Boosted ({token.underlyingToken.symbol})
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="text-right flex flex-col gap-1">
                            <p className="font-bold text-gray-900 dark:text-gray-100">
                              {(
                                (tokenWeights.find(
                                  (t) => t.symbol === token.symbol
                                )?.weight || 1) * 100
                              ).toFixed(2)}
                              %
                            </p>
                            {token.balanceUSD && (
                              <p className="text-xs text-muted-foreground">
                                ${formatNumber(parseFloat(token.balanceUSD))}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Droplet className="h-5 w-5" />
                        Liquidity Metrics
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Total Shares
                          </span>
                          <span>
                            {formatNumber(pool.dynamicData.totalShares)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Total Supply
                          </span>
                          <span>
                            {formatNumber(pool.dynamicData.totalSupply)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            24h Volume / TVL
                          </span>
                          <span>
                            {formatNumber(
                              (pool.dynamicData.volume24h /
                                pool.dynamicData.totalLiquidity) *
                                100
                            )}
                            %
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <PieChart className="h-5 w-5" />
                        Yield Metrics
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            24h Yield Capture
                          </span>
                          <span>
                            ${formatNumber(pool.dynamicData.yieldCapture24h)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            24h Fees
                          </span>
                          <span>${formatNumber(pool.dynamicData.fees24h)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            APR Range
                          </span>
                          <span>
                            {formatNumber(
                              Math.min(
                                ...pool.dynamicData.aprItems.map(
                                  (i) => i.apr * 100
                                )
                              )
                            )}
                            % -
                            {formatNumber(
                              Math.max(
                                ...pool.dynamicData.aprItems.map(
                                  (i) => i.apr * 100
                                )
                              )
                            )}
                            %
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </motion.div>

        {/* Right Column: Pool Tokens */}
        <motion.div variants={fadeIn} initial="initial" animate="animate">
          <Card className="border-gray-200 dark:border-gray-800 shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 px-6 py-4 border-b border-gray-100 dark:border-gray-800">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                Pool Tokens
              </h3>
            </div>
            <CardContent className="p-4">
              <div className="space-y-3">
                {pool.poolTokens.map((token) => (
                  <div
                    key={token.address}
                    className="flex items-start gap-3 p-4 border-b transition-colors"
                  >
                    <div className="mt-0.5 relative">
                      {token.logoURI ? (
                        <Image
                          src={token.logoURI}
                          alt={token.symbol}
                          width={40}
                          height={40}
                          className="rounded-full border-2 border-white dark:border-gray-900 shadow-sm"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center border-2 border-white dark:border-gray-900">
                          <span className="text-base font-bold">
                            {token.symbol.charAt(0)}
                          </span>
                        </div>
                      )}
                      {token.underlyingToken && (
                        <div className="absolute -top-1 -right-1 bg-purple-500 w-4 h-4 rounded-full border border-white dark:border-gray-900 flex items-center justify-center">
                          <span className="text-[8px] text-white font-bold">
                            B
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="font-bold text-gray-900 dark:text-gray-100">
                          {token.symbol}
                        </span>
                        <span className="font-medium text-green-600 dark:text-green-400">
                          {(
                            (tokenWeights.find((t) => t.symbol === token.symbol)
                              ?.weight || 1) * 100
                          ).toFixed(2)}
                          %
                        </span>
                      </div>

                      {token.balanceUSD && (
                        <div className="text-sm text-muted-foreground mt-1">
                          Balance: ${formatNumber(parseFloat(token.balanceUSD))}
                        </div>
                      )}

                      {token.underlyingToken && (
                        <div className="text-xs mt-1 flex items-center">
                          <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 px-2 py-0.5 rounded-full font-medium">
                            Boosted
                          </span>
                          <span className="text-muted-foreground mx-1">•</span>
                          <span>{token.underlyingToken.symbol}</span>
                        </div>
                      )}

                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-xs text-muted-foreground">
                          {truncateAddress(token.address)}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-5 w-5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
                          onClick={() => copyToClipboard(token.address)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Helper function to generate random colors for the chart
function getRandomColor(): string {
  const colors = [
    "#0ea5e9",
    "#6366f1",
    "#8b5cf6",
    "#ec4899",
    "#f43f5e",
    "#f97316",
    "#eab308",
    "#84cc16",
    "#22c55e",
    "#14b8a6",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}
