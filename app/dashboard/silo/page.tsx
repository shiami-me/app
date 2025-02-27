"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import SiloInteractionModal from "@/components/SiloInteractionModal";
import { MarketData } from "@/components/silo/types";
import { SiloPairCard } from "@/components/silo/silo-pair-card";
import { motion } from "framer-motion";

const MarketTable = () => {
  const [data, setData] = useState<MarketData[][]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMarket, setSelectedMarket] = useState<MarketData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

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
      const response = await fetch(
        "https://v2.silo.finance/api/display-markets",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            isApeMode: false,
            isCurated: true,
            protocolKey: "sonic",
            search: null,
            sort: null,
          }),
        }
      );
      const result = await response.json();
      const formattedData: MarketData[][] = result.map((item: any) => [
        {
          id: item.id,
          reviewed: item.isVerified,
          market: item.silo0.symbol,
          deposit_apr:
            (
              (parseFloat(item.silo0.collateralBaseApr) / 10 ** 18) *
              100
            ).toFixed(2) + "%",
          borrow_apr:
            ((parseFloat(item.silo0.debtBaseApr) / 10 ** 18) * 100).toFixed(
              2
            ) + "%",
          isBorrowable: !item.silo0.isNonBorrowable,
          logo:
            item.silo0.logos.coinMarketCap?.large ||
            item.silo0.logos.coinGecko?.large ||
            "https://s2.coinmarketcap.com/static/img/coins/128x128/34753.png",
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
            ).toFixed(2) + "%",
          borrow_apr:
            ((parseFloat(item.silo1.debtBaseApr) / 10 ** 18) * 100).toFixed(
              2
            ) + "%",
          isBorrowable: !item.silo1.isNonBorrowable,
          logo:
            item.silo1.logos.coinMarketCap?.large ||
            item.silo1.logos.coinGecko?.large ||
            "https://s2.coinmarketcap.com/static/img/coins/128x128/34753.png",
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

  const handleInteract = (market: MarketData) => {
    setSelectedMarket(market);
    setIsModalOpen(true);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchData();
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
                </p>
              </div>

              <div className="flex items-center gap-2">
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
              onInteract={handleInteract} 
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

      {selectedMarket && (
        <SiloInteractionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          market={selectedMarket.market}
          token0={selectedMarket.token0}
          token1={selectedMarket.token1}
        />
      )}
    </motion.div>
  );
};

export default MarketTable;
