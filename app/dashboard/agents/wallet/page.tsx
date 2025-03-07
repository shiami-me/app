"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import {
  Loader2,
  RefreshCw,
  CreditCard,
  ExternalLink,
  BarChart3,
  PlusCircle,
  Copy,
  KeyRound,
  ShieldAlert,
  ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAccount } from "wagmi";
import { motion } from "framer-motion";
import { useChat } from "@/providers/ChatProvider";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  useWallets, 
  usePrivy, 
  useDelegatedActions, 
  type WalletWithMetadata 
} from "@privy-io/react-auth";

interface TokenBalance {
  token: string;
  symbol: string;
  name: string;
  balance: string;
  decimals: number;
  explorer_url: string;
}

const WalletPage = () => {
  const [tokens, setTokens] = useState<TokenBalance[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const account = useAccount();
  const { client, addToContext } = useChat();
  const router = useRouter();
  const { wallets, ready: walletsReady } = useWallets();
  const { user } = usePrivy();
  const { delegateWallet, revokeWallets } = useDelegatedActions();
  const [isDelegating, setIsDelegating] = useState(false);
  const [isRevoking, setIsRevoking] = useState(false);
  
  // Find the embedded wallet
  const embeddedWallet = walletsReady ? wallets.find((wallet) => wallet.walletClientType === 'privy') : null;
  const walletAddress = embeddedWallet?.address || '';

  // Check if the wallet has already been delegated
  const isDelegated = !!user?.linkedAccounts?.find(
    (account): account is WalletWithMetadata => 
      account.type === 'wallet' && 
      account.delegated && 
      account.address === embeddedWallet?.address
  );

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
    if (!embeddedWallet || !client) return;

    const isInitialFetch = tokens.length === 0 && !isRefreshing;
    if (isInitialFetch) setLoading(true);
    if (isRefreshing) setLoading(true);

    try {
      setError(null);

      // Call the client to get token balances for the embedded wallet
      const result = await client.performAction("tx", "get_token_balances", [
        embeddedWallet.address,
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
    embeddedWallet,
    client,
    isRefreshing,
    tokens.length,
  ]);

  useEffect(() => {
    if (!walletsReady || !embeddedWallet) {
      router.push('/chat');
    }
  }, [walletsReady, embeddedWallet, router]);

  useEffect(() => {
    if (walletsReady && embeddedWallet) {
      fetchTokenBalances();
    }
  }, [fetchTokenBalances, walletsReady, embeddedWallet]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchTokenBalances();
  };

  const handleAddToContext = () => {
    addToContext({
      id: `embedded-wallet-${embeddedWallet?.address?.substring(0, 8)}`,
      type: "wallet",
      title: "Embedded Wallet",
      data: {
        address: embeddedWallet?.address,
        tokenCount: tokens.length,
        tokens: tokens.map(token => ({
          symbol: token.symbol,
          name: token.name,
          balance: token.balance,
          address: token.token
        }))
      }
    });
  };

  const copyToClipboard = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatAddress = (addr: string) => {
    if (!addr) return "";
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const getTotalValue = () => {
    return tokens.length > 0 ? `${tokens.length} tokens` : "No tokens";
  };

  const handleDelegateAccess = async () => {
    if (!embeddedWallet || !walletsReady) return;
    setIsDelegating(true);
    try {
      await delegateWallet({
        address: embeddedWallet.address, 
        chainType: 'ethereum'
      });
      // Success notification could be added here
    } catch (error) {
      console.error("Error delegating wallet:", error);
      // Error handling could be added here
    } finally {
      setIsDelegating(false);
    }
  };

  const handleRevokeAccess = async () => {
    setIsRevoking(true);
    try {
      await revokeWallets();
      // Success notification could be added here
    } catch (error) {
      console.error("Error revoking delegation:", error);
      // Error handling could be added here
    } finally {
      setIsRevoking(false);
    }
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
        <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30 rounded-xl opacity-70"></div>
        <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-700/20 [mask-image:linear-gradient(0deg,transparent,white)] rounded-xl"></div>

        <Card className="border-0 shadow-lg rounded-xl overflow-hidden bg-transparent">
          <div className="p-4 sm:p-6 relative z-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <div>
                <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent font-[family-name:var(--font-roboto-mono)]">
                  Embedded Wallet
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Your agent's wallet for autonomous transactions
                </p>
              </div>

              <div className="flex items-center bg-white/60 dark:bg-gray-800/60 rounded-full px-3 py-1 text-sm text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
                <BarChart3 className="h-4 w-4 mr-2" />
                {getTotalValue()}
              </div>
            </div>

            {embeddedWallet && (
              <div className="bg-white/80 dark:bg-gray-800/60 rounded-lg p-3 mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center border border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2 text-purple-500" />
                  <div>
                    <p className="text-sm font-medium">Wallet Address</p>
                    <p className="text-xs text-gray-500">{formatAddress(walletAddress)}</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2 sm:mt-0"
                  onClick={copyToClipboard}
                >
                  <Copy className="h-3 w-3 mr-1" />
                  {copied ? "Copied!" : "Copy Address"}
                </Button>
              </div>
            )}

            {/* Delegation status and action button */}
            {embeddedWallet && (
              <div className="bg-white/80 dark:bg-gray-800/60 rounded-lg p-3 mb-4 border border-gray-200 dark:border-gray-700">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                  <div className="flex items-center mb-3 sm:mb-0">
                    {isDelegated ? (
                      <>
                        <ShieldCheck className="h-5 w-5 mr-2 text-green-500" />
                        <div>
                          <p className="text-sm font-medium">Delegation Active</p>
                          <p className="text-xs text-gray-500">This app can transact on your behalf</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <KeyRound className="h-5 w-5 mr-2 text-amber-500" />
                        <div>
                          <p className="text-sm font-medium">Delegation Required</p>
                          <p className="text-xs text-gray-500">Enable agent automation</p>
                        </div>
                      </>
                    )}
                  </div>
                  
                  {isDelegated ? (
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={handleRevokeAccess}
                      disabled={isRevoking}
                      className="flex items-center"
                    >
                      {isRevoking ? <Loader2 className="h-3 w-3 mr-1 animate-spin" /> : <ShieldAlert className="h-3 w-3 mr-1" />}
                      Revoke Access
                    </Button>
                  ) : (
                    <Button 
                      variant="default" 
                      size="sm"
                      onClick={handleDelegateAccess}
                      disabled={isDelegating || !embeddedWallet}
                      className="bg-purple-600 hover:bg-purple-700 text-white flex items-center"
                    >
                      {isDelegating ? <Loader2 className="h-3 w-3 mr-1 animate-spin" /> : <KeyRound className="h-3 w-3 mr-1" />}
                      Allow Agent Access
                    </Button>
                  )}
                </div>
              </div>
            )}

            <div className="flex flex-wrap justify-between items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleAddToContext}
                      className="border-gray-200 dark:border-gray-800 shadow-sm"
                      disabled={tokens.length === 0}
                    >
                      <PlusCircle className="h-4 w-4 mr-1" />
                      Add to Context
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Add wallet to chat context</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

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
            
            {/* Info box explaining delegation */}
            {embeddedWallet && (
              <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-sm border border-blue-100 dark:border-blue-800/30">
                <p className="text-blue-800 dark:text-blue-300 font-medium mb-1">About Wallet Delegation</p>
                <p className="text-blue-700/80 dark:text-blue-400/80 text-xs">
                  Wallet delegation allows Shiami's autonomous agents to initiate transactions on your behalf without prompting for approval each time.
                  You can revoke this permission at any time. All transactions will still use your funds and follow your agent's configuration.
                </p>
              </div>
            )}
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
                <CreditCard className="h-6 w-6 text-gray-500 dark:text-gray-400" />
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
                    Your embedded wallet doesn't have any tokens yet.
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

export default WalletPage;
