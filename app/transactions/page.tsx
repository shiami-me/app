"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Loader2, RefreshCw, History, ArrowUpDown, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAccount } from "wagmi";
import { motion } from "framer-motion";
import { useChat } from "@/providers/ChatProvider";
import {
  TransactionCard,
  Transaction,
} from "@/components/transactions/transaction-card";
import { TransactionFilter } from "@/components/transactions/transaction-filter";
import { Pagination } from "@/components/beets/pagination";
import { useRouter } from "next/navigation";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    first: 10,
    skip: 0,
    sort: "desc",
  });

  const account = useAccount();
  const { client, addToContext } = useChat();
  const router = useRouter();

  // Animation configurations
  const fadeIn = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const fetchTransactions = useCallback(async () => {
    if (!account.address || !client) return;

    const isInitialFetch = transactions.length === 0 && !isRefreshing;
    if (isInitialFetch) setLoading(true);
    if (isRefreshing) setLoading(true);

    try {
      setError(null);

      // Calculate page from skip
      const page = Math.floor(filters.skip / filters.first) + 1;

      // Call the client to get transactions
      const result = await client.performAction("tx", "get_tx_list", [
        "0xE65fEE2099934CdCFD451D303f9eF928315FA1A8", // Fallback address for development
        "0",
        "99999999",
        page.toString(),
        filters.first.toString(),
        filters.sort,
      ]);

      if (result.status === "success") {
        const txData = result.result.result || [];
        setTransactions(txData);

        if (txData.length === filters.first) {
          setTotalPages(
            Math.ceil((filters.skip + txData.length + 1) / filters.first)
          );
        } else if (txData.length === 0 && filters.skip > 0) {
          setTotalPages(Math.ceil(filters.skip / filters.first));
        } else {
          setTotalPages(
            Math.ceil((filters.skip + txData.length) / filters.first)
          );
        }

        setCurrentPage(page);
      } else {
        setError("Failed to fetch transactions");
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setError("Failed to load transactions. Please try again later.");
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, [account.address, client, filters, isRefreshing, transactions.length]);

  useEffect(() => {
    if (!account.isConnected) {
      router.push('/chat');
    }
  }, [account.isConnected, router]);
  
  useEffect(() => {
    if (account.isConnected) {
      fetchTransactions();
    }
  }, [fetchTransactions, account.isConnected]);

  const handleSortChange = (newSort: string) => {
    setFilters((prev) => ({ ...prev, sort: newSort, skip: 0 }));
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchTransactions();
  };

  const handleAddToContext = () => {
    addToContext({
      id: `tx-history-${account.address?.substring(0, 8)}`,
      type: "transactions",
      title: "Transaction History",
      data: {
        address: account.address,
        transactionCount: transactions.length,
        transactions: transactions.slice(0, 5).map(tx => ({
          hash: tx.hash,
          timestamp: tx.timeStamp,
          from: tx.from,
          to: tx.to,
          value: tx.value,
          isError: tx.isError === "0" ? false : true,
          functionName: tx.functionName || "",
          tokenSymbol: tx.tokenSymbol || "ETH"
        }))
      }
    });
  };

  // Use the same pagination handler as Beets page
  const goToPage = (page: number) => {
    const newSkip = (page - 1) * filters.first;
    setFilters((prev) => ({ ...prev, skip: newSkip }));
  };

  if (!account.isConnected) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  if (loading && transactions.length === 0) {
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
      {/* Header with gradient background */}
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-gradient-to-r from-green-100 to-blue-50 dark:from-green-900/30 dark:to-blue-900/30 rounded-xl opacity-70"></div>
        <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-700/20 [mask-image:linear-gradient(0deg,transparent,white)] rounded-xl"></div>

        <Card className="border-0 shadow-lg rounded-xl overflow-hidden bg-transparent">
          <div className="p-4 sm:p-6 relative z-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <div>
                <h1 className="text-3xl font-extrabold bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400 bg-clip-text text-transparent font-[family-name:var(--font-roboto-mono)]">
                  Transaction History
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  View and manage your transaction history.
                </p>
              </div>

              <div className="flex items-center bg-white/60 dark:bg-gray-800/60 rounded-full px-3 py-1 text-sm text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
                <History className="h-4 w-4 mr-2" />
                {transactions.length} Transaction
                {transactions.length !== 1 ? "s" : ""}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleAddToContext}
                      className="border-gray-200 dark:border-gray-800 shadow-sm"
                      disabled={transactions.length === 0}
                    >
                      <PlusCircle className="h-4 w-4 mr-1" />
                      Add to Context
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Add transaction history to chat context</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <TransactionFilter
              onSortChange={handleSortChange}
              onRefresh={handleRefresh}
              currentSort={filters.sort}
              isRefreshing={isRefreshing}
            />
          </div>
        </Card>
      </div>

      {/* Transaction List */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid gap-4"
      >
        {transactions.length > 0 ? (
          transactions.map((tx, index) => (
            <motion.div
              key={tx.hash}
              variants={fadeIn}
              transition={{ delay: index * 0.05 }}
            >
              <TransactionCard
                transaction={tx}
                userAddress={account.address || ""}
              />
            </motion.div>
          ))
        ) : (
          <motion.div
            variants={fadeIn}
            className="flex flex-col items-center justify-center p-12 bg-card rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm"
          >
            <div className="text-center space-y-3">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-secondary mb-2">
                <ArrowUpDown className="h-6 w-6 text-gray-500 dark:text-gray-400" />
              </div>
              {error ? (
                <>
                  <h3 className="text-lg font-medium text-red-500">{error}</h3>
                  <p className="text-muted-foreground">
                    Please try again later.
                  </p>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-medium">No transactions found</h3>
                  <p className="text-muted-foreground">
                    You haven&apos;t made any transactions yet.
                  </p>
                </>
              )}
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

        {loading && transactions.length > 0 && (
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

export default TransactionsPage;
