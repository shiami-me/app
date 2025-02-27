"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAccount } from "wagmi";

import { FilterOptions, PoolData } from "@/components/beets/types";
import { PoolCard } from "@/components/beets/pool-card";
import { SearchBar } from "@/components/beets/search-bar";
import { SortDropdown } from "@/components/beets/sort-dropdown";
import { Pagination } from "@/components/beets/pagination";

const BeetsPoolsTable = () => {
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

  useEffect(() => {
    fetchPools();
  }, [filters, fetchPools]);


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

  if (loading && pools.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 min-h-screen">
      <Card className="border-0 shadow-lg rounded-xl overflow-hidden mb-6">
        <div className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-2xl font-bold">Beets on Sonic Pools</h1>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <SearchBar onSearch={handleSearch} isSearching={isSearching} />

              <div className="flex gap-2">
                <SortDropdown 
                  currentOrderBy={filters.orderBy} 
                  currentDirection={filters.orderDirection}
                  onSortChange={handleSortChange}
                  isSorting={isSorting}
                />

                <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
                  {isRefreshing ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>

          {filters.orderBy && (
            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              Sorted by: <span className="font-medium">{filters.orderBy}</span> ({filters.orderDirection === "desc" ? "descending" : "ascending"})
              {filters.textSearch && <> • Search: <span className="font-medium">{filters.textSearch}</span></>}
            </div>
          )}
        </div>
      </Card>

      <div className="grid gap-4">
        {pools.map((pool) => (
          <PoolCard key={pool.id} pool={pool} />
        ))}

        {pools.length === 0 && !loading && (
          <div className="text-center p-8 bg-gray-50 dark:bg-gray-900 rounded-xl">
            <p>No pools found. Try adjusting your search criteria.</p>
          </div>
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
      </div>
    </div>
  );
};

export default BeetsPoolsTable;
