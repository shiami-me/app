"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { PendleConnection } from "@/lib/pendle/connection";
import { PendleMarket } from "@/lib/pendle/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, ArrowLeft, CreditCard, Calendar, BarChart2, ArrowDown, ChevronRight, FileText, Info as InfoIcon, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { formatDate, formatPercent, formatNumber } from "@/lib/utils";
import { PendleMarketLiquidity } from "@/components/pendle/pendle-market-liquidity";
import { useChat } from "@/providers/ChatProvider";
import { Badge } from "@/components/ui/badge";

export default function PendleMarketDetailPage() {
  const { address } = useParams();
  const [market, setMarket] = useState<PendleMarket | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToContext } = useChat();

  useEffect(() => {
    const fetchMarketDetails = async () => {
      try {
        const pendleClient = new PendleConnection();
        const allMarkets = await pendleClient.getMarkets();
        const marketDetail = allMarkets.find(
          (m) => m.address.toLowerCase() === (address as string).toLowerCase()
        );
        
        if (marketDetail) {
          setMarket(marketDetail);
        }
      } catch (error) {
        console.error("Error fetching market details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (address) {
      fetchMarketDetails();
    }
  }, [address]);

  const handleAddToContext = () => {
    if (!market) return;
    
    addToContext({
      id: `pendle-market-${market.address}`,
      type: "pendle-market",
      title: `Pendle Market: ${market.symbol}`,
      data: {
        symbol: market.symbol,
        address: market.address,
        protocol: market.protocol,
        underlyingApy: market.underlyingApy,
        impliedApy: market.impliedApy,
        maxBoostedApy: market.maxBoostedApy,
        liquidity: market.liquidity,
        tradingVolume: market.tradingVolume,
        expiry: market.expiry,
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-120px)]">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
          <p className="text-sm text-muted-foreground animate-pulse">Loading market details...</p>
        </div>
      </div>
    );
  }

  if (!market) {
    return (
      <div className="flex flex-col justify-center items-center h-[calc(100vh-120px)]">
        <h2 className="text-2xl font-bold mb-4">Market Not Found</h2>
        <p className="text-muted-foreground mb-6">
          The Pendle market you&apos;re looking for could not be found.
        </p>
        <Button asChild>
          <Link href="/dashboard/pendle">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to All Markets
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <motion.div 
      className="container px-4 py-8 max-w-7xl mx-auto"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Top header with navigation and actions */}
      <div className="flex flex-col p-4 sm:p-6 sm:flex-row justify-between items-start sm:items-center mb-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-green-100 to-blue-50 dark:from-green-900/30 dark:to-blue-900/30 rounded-xl opacity-70"></div>
        <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-700/20 [mask-image:linear-gradient(0deg,transparent,white)] rounded-xl"></div>
        
        <div className="flex items-center space-x-2 mb-4 sm:mb-0 z-10 relative">
          <Button 
            variant="outline" 
            size="sm" 
            asChild
            className="mr-4"
          >
            <Link href="/dashboard/pendle">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Link>
          </Button>
          
          <div className="h-12 w-12 relative">
            {market.icon ? (
              <Image
                src={market.icon}
                alt={market.symbol}
                width={48}
                height={48}
                className="rounded-full border-2 border-white dark:border-gray-800 shadow-md"
              />
            ) : (
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center border-2 border-white dark:border-gray-800 shadow-md">
                <span className="text-base font-semibold text-white">
                  {market.symbol.substring(0, 2)}
                </span>
              </div>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{market.symbol}</h1>
              {market.isFeatured && (
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  Featured
                </Badge>
              )}
              {market.isNew && (
                <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  New
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{market.protocol} · Expiry: {formatDate(market.expiry)}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 z-10 relative">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1.5"
            onClick={() => handleAddToContext()}
          >
            <CreditCard className="h-4 w-4" />
            Add to Context
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            asChild
          >
            <a 
              href={`https://app.pendle.finance/trade/markets/${market.address}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5"
            >
              <ExternalLink className="h-4 w-4" />
              View on Pendle Finance
            </a>
          </Button>
        </div>
      </div>

      {/* Market overview stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* APY Section - First Card */}
        <div className="rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="bg-green-50 dark:bg-green-900/20 p-4">
            <h3 className="text-sm font-medium text-green-700 dark:text-green-300 mb-1">Implied APY</h3>
            <p className="text-2xl font-bold text-green-800 dark:text-green-200">{formatPercent(market.impliedApy)}</p>
          </div>
          
          <div className="p-4 bg-white dark:bg-gray-950">
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Underlying APY</span>
              <span className="font-medium text-green-600 dark:text-green-400">{formatPercent(market.underlyingApy)}</span>
            </div>
            
            <div className="flex justify-between items-center text-sm mb-1.5">
              <div className="flex items-center gap-1.5">
                <ChevronRight className="h-3 w-3 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-400">24h Change</span>
              </div>
              <span className={`font-medium ${market.impliedApyChange24h >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {market.impliedApyChange24h >= 0 ? '+' : ''}{formatPercent(market.impliedApyChange24h)}
              </span>
            </div>
            
            {market.maxBoostedApy > 0 && (
              <div className="my-2 h-px bg-gray-100 dark:bg-gray-800"></div>
            )}
            
            {market.maxBoostedApy > 0 && (
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-1.5">
                  <Badge className="h-1.5 w-1.5 bg-blue-500 rounded-full" />
                  <span className="text-gray-600 dark:text-gray-400">Max Boosted APY</span>
                </div>
                <span className="font-medium text-blue-600 dark:text-blue-400">{formatPercent(market.maxBoostedApy)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Liquidity & Volume Section */}
        <div className="rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4">
            <h3 className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-1">Market Liquidity</h3>
            <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">${formatNumber(market.liquidity)}</p>
          </div>
          
          <div className="p-4 bg-white dark:bg-gray-950">
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Trading Volume (24h)</span>
              <span className="font-medium text-blue-600 dark:text-blue-400">${formatNumber(market.tradingVolume)}</span>
            </div>
            
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">PT Discount</span>
              <span className="font-medium">{formatPercent(market.ptDiscount)}</span>
            </div>
            
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Swap Fee APY</span>
              <span className="font-medium text-green-600 dark:text-green-400">{formatPercent(market.swapFeeApy)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Details and Actions Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Market details */}
        <div className="col-span-1 lg:col-span-2">
          <div className="bg-card rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm mb-6">
            <div className="p-5 border-b border-gray-200 dark:border-gray-800">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <BarChart2 className="h-5 w-5 text-primary/90" />
                Market Information
              </h2>
            </div>
            
            <div className="p-5">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Protocol</h3>
                  <p className="font-medium">{market.protocol}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Expiry Date</h3>
                  <p className="font-medium">{formatDate(market.expiry)}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">YT Floating APY</h3>
                  <p className="font-medium text-green-600 dark:text-green-400">{formatPercent(market.ytFloatingApy)}</p>
                </div>
                
                {market.categoryIds.length > 0 && (
                  <div className="col-span-2 md:col-span-3">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Categories</h3>
                    <div className="flex flex-wrap gap-2">
                      {market.categoryIds.map((category, index) => (
                        <Badge 
                          key={index} 
                          className="bg-secondary/80 text-secondary-foreground hover:bg-secondary/90 transition-colors px-3 py-1"
                        >
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Description Section */}
          <div className="bg-card rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="p-5 border-b border-gray-200 dark:border-gray-800">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary/90" />
                About This Market
              </h2>
            </div>
            
            <div className="p-5">
              <p className="text-gray-600 dark:text-gray-300">
                {`${market.symbol} is a Pendle yield market that allows users to trade and provide liquidity for fixed and variable yield positions. This market is based on ${market.protocol} protocol and expires on ${formatDate(market.expiry)}.`}
              </p>
              
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h3 className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-1 flex items-center">
                  <InfoIcon className="h-4 w-4 mr-1" />
                  What are Pendle Markets?
                </h3>
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  Pendle markets split yield-bearing tokens into Principal Tokens (PT) and Yield Tokens (YT). 
                  PTs represent the underlying asset value, while YTs represent the yield generated.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right column - Interaction card */}
        <div className="col-span-1">
          <div className="bg-card rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm sticky top-6">
            <Tabs defaultValue="lp" className="w-full">
              <TabsList className="w-full rounded-none h-12 grid grid-cols-2 p-0 bg-transparent">
                <TabsTrigger 
                  value="lp" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Liquidity
                </TabsTrigger>
                <TabsTrigger 
                  value="swap" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                >
                  <ArrowDown className="h-4 w-4 mr-1" />
                  Swap
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="lp" className="pt-4 pb-6 px-4 focus:outline-none">
                <PendleMarketLiquidity market={market} />
              </TabsContent>
              
              <TabsContent value="swap" className="focus:outline-none">
                <div className="flex flex-col items-center justify-center p-12 text-center">
                  <div className="rounded-full bg-muted/80 p-3 mb-4">
                    <Calendar className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Coming Soon</h3>
                  <p className="text-sm text-muted-foreground max-w-xs">
                    Swap functionality for Pendle markets will be available soon. Check back later for updates.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
