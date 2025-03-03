"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import {
  Loader2,
  RefreshCw,
  Wallet,
  ExternalLink,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAccount } from "wagmi";
import { motion } from "framer-motion";
import { useChat } from "@/providers/ChatProvider";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface TokenBalance {
  token: string;
  symbol: string;
  name: string;
  balance: string;
  decimals: number;
  explorer_url: string;
}

const PortfolioPage = () => {
  const [tokens, setTokens] = useState<TokenBalance[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const account = useAccount();
  const { client } = useChat();
  const router = useRouter();

  // Redirect if wallet is not connected
  useEffect(() => {
    if (!account.isConnected) {
      router.push('/chat');
    }
  }, [account.isConnected, router]);

  // If wallet is not connected, show nothing while redirecting
  if (!account.isConnected) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

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

  const fetchTokenBalances = useCallback(async () => {
    if (!account.address || !client) return;

    const isInitialFetch = tokens.length === 0 && !isRefreshing;
    if (isInitialFetch) setLoading(true);
    if (isRefreshing) setLoading(true);

    try {
      setError(null);

      // Call the client to get token balances
      const result = await client.performAction("tx", "get_token_balances", [
        account.address,
        "1"
      ]);

      if (result.status === "success" && result.result) {
        setTokens(result.result.result || []);
      } else {
        setError("Failed to fetch token balances");
      }
    } catch (error) {
      console.error("Error fetching token balances:", error);
      setError("Failed to load token balances. Please try again later.");
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, [
    account.address,
    client,
    isRefreshing,
    tokens.length,
  ]);

  useEffect(() => {
    fetchTokenBalances();
  }, [fetchTokenBalances]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchTokenBalances();
  };

  const getTotalValue = () => {
    // This is a placeholder - in a real app you'd calculate total portfolio value
    // by multiplying each token balance by its current price
    return tokens.length > 0 ? `${tokens.length} tokens` : "No tokens";
  };

  if (loading && tokens.length === 0) {
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
                  Portfolio
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  View and manage your token balances.
                </p>
              </div>

              <div className="flex items-center bg-white/60 dark:bg-gray-800/60 rounded-full px-3 py-1 text-sm text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
                <BarChart3 className="h-4 w-4 mr-2" />
                {getTotalValue()}
              </div>
            </div>

            <div className="flex flex-wrap justify-between items-center gap-2">

              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="ml-auto"
              >
                <RefreshCw
                  className={cn("h-4 w-4 mr-2", isRefreshing && "animate-spin")}
                />
                Refresh
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Token List */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid gap-4"
      >
        {tokens.length > 0 ? (
          tokens.map((token, index) => (
            <motion.div
              key={`${token.token}-${index}`}
              variants={fadeIn}
              transition={{ delay: index * 0.05 }}
            >
              <TokenCard token={token} />
            </motion.div>
          ))
        ) : (
          <motion.div
            variants={fadeIn}
            className="flex flex-col items-center justify-center p-12 bg-card rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm"
          >
            <div className="text-center space-y-3">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-secondary mb-2">
                <Wallet className="h-6 w-6 text-gray-500 dark:text-gray-400" />
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
                  <h3 className="text-lg font-medium">No tokens found</h3>
                  <p className="text-muted-foreground">
                    No token balances were found for this address.
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

        {loading && tokens.length > 0 && (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="animate-spin text-primary" size={32} />
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

const TokenCard = ({ token }: { token: TokenBalance }) => {
  // Format balance to a readable number with commas and max 6 decimal places
  const formatBalance = (balance: string) => {
    const num = parseFloat(balance);
    if (num === 0) return "0";

    if (num < 0.000001) {
      return "< 0.000001";
    }

    return new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 6,
      minimumFractionDigits: num < 0.01 ? 6 : 2,
    }).format(num);
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row justify-between">
          <div className="flex items-center">
            {/* Token icon placeholder - in a real app you'd fetch token icons */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-white flex items-center justify-center font-bold">
              {token.symbol.charAt(0)}
            </div>

            <div className="ml-3">
              <div className="flex items-center">
                <h3 className="font-semibold text-lg">{token.symbol}</h3>
                <span className="ml-2 text-xs px-2 py-0.5 bg-secondary rounded-full">
                  {token.name}
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-[180px] sm:max-w-[300px]">
                {token.token.substring(0, 8)}...
                {token.token.substring(token.token.length - 6)}
              </p>
            </div>
          </div>

          <div className="mt-3 sm:mt-0 text-right">
            <div className="text-lg font-semibold">
              {formatBalance(token.balance)}
            </div>
            <a
              href={token.explorer_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-500 hover:text-blue-700 flex items-center justify-end mt-1"
            >
              View on Explorer
              <ExternalLink className="ml-1 h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PortfolioPage;
