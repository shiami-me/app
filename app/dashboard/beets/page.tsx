"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAccount } from "wagmi";
import { motion } from "framer-motion";

import { FilterOptions, PoolData } from "@/components/beets/types";
import { PoolCard } from "@/components/beets/pool-card";
import { SearchBar } from "@/components/beets/search-bar";
import { SortDropdown } from "@/components/beets/sort-dropdown";
import { Pagination } from "@/components/beets/pagination";

const BeetsPoolsTable = () => {
  // Keep existing state variables
  const [pools, setPools] = useState<PoolData[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterOptions>({
    first: 10,
    orderBy: "totalLiquidity",
    orderDirection: "desc",
    skip: 0,
    textSearch: "",
  });
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const [isSorting, setIsSorting] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const account = useAccount();

  // Add animation configurations
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

  // Keep the existing fetchPools function with useCallback
  const fetchPools = useCallback(async () => {
    const isInitialFetch = pools.length === 0;
    if (isInitialFetch) setLoading(true);

    try {
      const params = new URLSearchParams({
        userAddress: account.address || "",
        first: filters.first.toString(),
        orderBy: filters.orderBy,
        orderDirection: filters.orderDirection,
        skip: filters.skip.toString(),
        textSearch: filters.textSearch,
      });

      const response = await fetch(`http://localhost:3000/api/queries/pools?${params}`);
      if (!response.ok) throw new Error('Failed to fetch pools');

      const data = await response.json();

      // Calculate pagination
      if (data.length === filters.first) {
        setTotalPages(Math.ceil((filters.skip + data.length + 1) / filters.first));
      } else if (data.length === 0 && filters.skip > 0) {
        setTotalPages(Math.ceil(filters.skip / filters.first));
      } else {
        setTotalPages(Math.ceil((filters.skip + data.length) / filters.first));
      }

      setCurrentPage(Math.floor(filters.skip / filters.first) + 1);
      setPools(data);
    } catch (error) {
      console.error("Error fetching Beets pools:", error);
    } finally {
      setLoading(false);
      setIsSearching(false);
      setIsSorting(false);
      setIsRefreshing(false);
    }
  }, [filters, account.address, pools.length]);

  // Keep existing useEffect and handlers
  useEffect(() => {
    fetchPools();
  }, [fetchPools]);

  const handleSearch = (query: string) => {
    setIsSearching(true);
    setFilters(prev => ({ ...prev, textSearch: query, skip: 0 }));
  };

  const handleSortChange = (orderBy: string) => {
    setIsSorting(true);
    setFilters(prev => ({
      ...prev,
      orderBy,
      skip: 0,
      orderDirection: prev.orderBy === orderBy && prev.orderDirection === "desc" ? "asc" : "desc"
    }));
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchPools();
  };

  const goToPage = (page: number) => {
    const newSkip = (page - 1) * filters.first;
    setFilters(prev => ({ ...prev, skip: newSkip }));
  };

  // Enhanced loading state
  if (loading && pools.length === 0) {
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
      {/* Header with background gradient */}
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-gradient-to-r from-green-100 to-blue-50 dark:from-green-900/30 dark:to-blue-900/30 rounded-xl opacity-70"></div>
        <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-700/20 [mask-image:linear-gradient(0deg,transparent,white)] rounded-xl"></div>
        
        <Card className="border-0 shadow-lg rounded-xl overflow-hidden bg-transparent">
          <div className="p-4 sm:p-6 relative z-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h1 className="text-3xl font-extrabold bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400 bg-clip-text text-transparent font-[family-name:var(--font-roboto-mono)]">
                Beets on Sonic Pools
              </h1>

              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <SearchBar onSearch={handleSearch} isSearching={isSearching} />

                <div className="flex gap-2">
                  <SortDropdown 
                    currentOrderBy={filters.orderBy} 
                    currentDirection={filters.orderDirection}
                    onSortChange={handleSortChange}
                    isSorting={isSorting}
                  />

                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleRefresh} 
                    disabled={isRefreshing}
                    className="border-gray-200 dark:border-gray-800"
                  >
                    {isRefreshing ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>

            {filters.orderBy && (
              <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 bg-white/40 dark:bg-gray-800/30 p-2 px-3 rounded-lg inline-block">
                Sorted by: <span className="font-medium">{filters.orderBy}</span> ({filters.orderDirection === "desc" ? "descending" : "ascending"})
                {filters.textSearch && <> • Search: <span className="font-medium">{filters.textSearch}</span></>}
              </div>
            )}
          </div>
        </Card>
      </div>

      <motion.div 
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid gap-4"
      >
        {pools.map((pool, index) => (
          <motion.div 
            key={pool.id} 
            variants={fadeIn} 
            transition={{ delay: index * 0.05 }}
          >
            <PoolCard pool={pool} />
          </motion.div>
        ))}

        {pools.length === 0 && !loading && (
          <motion.div 
            variants={fadeIn}
            className="flex flex-col items-center justify-center p-12 bg-card rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm"
          >
            <div className="text-center space-y-3">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-secondary mb-2">
                <RefreshCw className="h-6 w-6 text-gray-500 dark:text-gray-400" />
              </div>
              <h3 className="text-lg font-medium">No pools found</h3>
              <p className="text-muted-foreground">Try adjusting your search criteria or refresh the page.</p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleRefresh} 
                className="mt-2"
              >
                <RefreshCw className="mr-2 h-4 w-4" /> Refresh
              </Button>
            </div>
          </motion.div>
        )}

        {loading && pools.length > 0 && (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="animate-spin text-primary" size={32} />
          </div>
        )}

        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
          isLoading={loading}
        />
      </motion.div>
    </motion.div>
  );
};

export default BeetsPoolsTable;
