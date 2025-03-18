"use client";
import React, { useEffect, useState, useCallback } from "react";
import { PendleDashboard } from "@/components/pendle/pendle-dashboard";
import { PendleConnection } from "@/lib/pendle/connection";
import { PendleMarket } from "@/lib/pendle/types";
import { useChat } from "@/providers/ChatProvider";
import { motion, AnimatePresence } from "framer-motion";

export default function PendlePage() {
  const [markets, setMarkets] = useState<PendleMarket[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const { addToContext } = useChat();

  const fetchMarkets = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const pendleClient = new PendleConnection();
      const marketData = await pendleClient.getMarkets();
      
      // Sort markets by liquidity (descending)
      const sortedMarkets = marketData.sort((a, b) => b.liquidity - a.liquidity);
      
      setMarkets(sortedMarkets);
      setLastUpdated(new Date().toISOString());
    } catch (error) {
      console.error("Error fetching Pendle markets:", error);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchMarkets();
  }, [fetchMarkets]);

  const handleAddAllToContext = () => {
    // Add a summary of all markets to context
    addToContext({
      id: "pendle-all-markets",
      type: "pendle-summary",
      title: "Pendle Finance Markets",
      data: {
        marketCount: markets.length,
        timestamp: lastUpdated,
        markets: markets.map(market => ({
          id: market.address,
          symbol: market.symbol,
          protocol: market.protocol,
          liquidity: market.liquidity,
          expiry: market.expiry,
          underlyingApy: market.underlyingApy,
          impliedApy: market.impliedApy,
          maxBoostedAPY: market.maxBoostedApy
        }))
      }
    });
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="pendle-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <PendleDashboard
          markets={markets}
          loading={loading}
          isRefreshing={isRefreshing}
          lastUpdated={lastUpdated}
          onRefresh={fetchMarkets}
          onAddToContext={handleAddAllToContext}
        />
      </motion.div>
    </AnimatePresence>
  );
}
