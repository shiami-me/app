"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Loader2, RefreshCw, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarketData } from "@/components/silo/types";
import { SiloPairCard } from "@/components/silo/silo-pair-card";
import { motion } from "framer-motion";
import { useChat } from "@/providers/ChatProvider";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const MarketTable = () => {
  const [data, setData] = useState<MarketData[][]>([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const { addToContext } = useChat();

  // Animation configurations
  const fadeIn = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 }
  };
  
  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/silo/markets");
      if (!response.ok) {
        throw new Error(`API returned status: ${response.status}`);
      }
      
      const result = await response.json();
      setLastUpdated(result.timestamp);
      
      const formattedData: MarketData[][] = result.markets.map((item: any) => [
        {
          id: item.id,
          reviewed: item.isVerified,
          market: item.silo0.symbol,
          deposit_apr:
            (
              (parseFloat(item.silo0.collateralBaseApr) / 10 ** 18) *
              100
            ),
          borrow_apr:
            ((parseFloat(item.silo0.debtBaseApr) / 10 ** 18) * 100),
          collateral_programs: item.silo0.collateralPrograms,
          debt_programs: item.silo0.debtPrograms,
          collateral_points: item.silo0.collateralPoints,
          debt_points: item.silo0.debtPoints,
          isBorrowable: !item.silo0.isNonBorrowable,
          logo:
            item.silo0.logos.coinGecko?.large ||
            item.silo0.logos.coinMarketCap?.large ||
            "https://coin-images.coingecko.com/coins/images/52857/large/wrapped_sonic.png?1734536585",
          token0: item.silo0.symbol,
          token1: item.silo1.symbol,
        },
        {
          id: item.id,
          reviewed: item.isVerified,
          market: item.silo1.symbol,
          deposit_apr:
            (
              (parseFloat(item.silo1.collateralBaseApr) / 10 ** 18) *
              100
            ),
          borrow_apr:
            ((parseFloat(item.silo1.debtBaseApr) / 10 ** 18) * 100),
          collateral_programs: item.silo1.collateralPrograms,
          debt_programs: item.silo1.debtPrograms,
          collateral_points: item.silo1.collateralPoints,
          debt_points: item.silo1.debtPoints,
          isBorrowable: !item.silo1.isNonBorrowable,
          logo:
            item.silo1.logos.coinGecko?.large ||
            item.silo1.logos.coinMarketCap?.large ||
            "https://coin-images.coingecko.com/coins/images/52857/large/wrapped_sonic.png?1734536585",
          token0: item.silo1.symbol,
          token1: item.silo0.symbol,
        },
      ]);
      setData(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchData();
  };

  const handleAddAllToContext = () => {
    // Add a summary of all markets to context
    addToContext({
      id: "silo-all-markets",
      type: "silo-summary",
      title: "Silo Finance Markets",
      data: {
        marketCount: data.length,
        timestamp: lastUpdated,
        markets: data.map(pair => ({
          id: pair[0].id,
          pair: `${pair[0].market}/${pair[1].market}`,
        }))
      }
    });
  };

  const formatDateTime = (dateString: string | null) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  if (loading && data.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <motion.div 
      className="p-4 sm:p-6 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header with background gradient - exactly like Beets page */}
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-gradient-to-r from-green-100 to-blue-50 dark:from-green-900/30 dark:to-blue-900/30 rounded-xl opacity-70"></div>
        <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-700/20 [mask-image:linear-gradient(0deg,transparent,white)] rounded-xl"></div>
        
        <Card className="border-0 shadow-lg rounded-xl overflow-hidden bg-transparent">
          <div className="p-4 sm:p-6 relative z-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl font-extrabold bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400 bg-clip-text text-transparent font-[family-name:var(--font-roboto-mono)]">
                  Silo Finance Board
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Explore lending and borrowing markets on Silo Finance.
                  {lastUpdated && (
                    <span className="ml-1 text-xs">
                      Last updated: {formatDateTime(lastUpdated)}
                    </span>
                  )}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleAddAllToContext}
                        className="border-gray-200 dark:border-gray-800 shadow-sm"
                      >
                        <PlusCircle className="h-4 w-4 mr-1" />
                        Add to Context
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Add Silo markets overview to chat context</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleRefresh} 
                  disabled={isRefreshing}
                  className="border-gray-200 dark:border-gray-800 shadow-sm"
                >
                  {isRefreshing ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4 mr-1" />} 
                  Refresh
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Pair Cards with stagger animation */}
      <motion.div 
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mx-auto"
      >
        {data.map((marketPair, index) => (
          <motion.div 
            key={`pair-${marketPair[0].id}-${index}`}
            variants={fadeIn}
            transition={{ delay: index * 0.05 }}
          >
            <SiloPairCard 
              markets={marketPair} 
            />
          </motion.div>
        ))}

        {data.length === 0 && !loading && (
          <motion.div 
            variants={fadeIn}
            className="col-span-full flex flex-col items-center justify-center p-12 bg-card rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm"
          >
            <div className="text-center space-y-3">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-secondary mb-2">
                <RefreshCw className="h-6 w-6 text-gray-500 dark:text-gray-400" />
              </div>
              <h3 className="text-lg font-medium">No markets found</h3>
              <p className="text-muted-foreground">Unable to load Silo Finance markets.</p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleRefresh} 
                className="mt-2"
              >
                <RefreshCw className="mr-2 h-4 w-4" /> Try Again
              </Button>
            </div>
          </motion.div>
        )}
      </motion.div>

      {loading && data.length > 0 && (
        <div className="flex justify-center items-center h-40 mt-4">
          <Loader2 className="animate-spin text-primary" size={32} />
        </div>
      )}
    </motion.div>
  );
};

export default MarketTable;
