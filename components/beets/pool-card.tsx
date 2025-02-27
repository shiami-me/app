import React from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { formatNumber, truncateAddress } from "@/lib/utils";
import { PoolData } from "@/components/beets/types";
import Link from "next/link";
import { DollarSign, TrendingUp, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PoolCardProps {
  pool: PoolData;
}

// Function to determine if a pool has boosted tokens
const hasBoostedTokens = (pool: PoolData) => {
  return pool.poolTokens.some(token => token.underlyingToken);
};

export const PoolCard: React.FC<PoolCardProps> = ({ pool }) => {
  return (
    <Card className="border-gray-200 dark:border-gray-800 shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-green-200 dark:hover:border-green-800">
      <div className="p-5 sm:p-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2 relative">
              {pool.poolTokens.slice(0, 4).map((token, i) => (
                <div key={token.address} className="z-[1] relative" style={{ zIndex: 20 - i }}>
                  {token.logoURI ? (
                    <Image
                      src={token.logoURI}
                      alt={token.symbol}
                      width={36}
                      height={36}
                      className="rounded-full border-2 border-white dark:border-gray-900 shadow-sm"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center border-2 border-white dark:border-gray-900">
                      <span className="text-sm font-bold">{token.symbol.charAt(0)}</span>
                    </div>
                  )}
                </div>
              ))}
              
              {/* Show count badge if there are more tokens */}
              {pool.poolTokens.length > 4 && (
                <div className="z-10 relative">
                  <div className="w-9 h-9 rounded-full bg-gray-50 dark:bg-gray-800 border-2 border-white dark:border-gray-900 flex items-center justify-center shadow-sm">
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">+{pool.poolTokens.length - 4}</span>
                  </div>
                </div>
              )}
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{pool.name}</h2>
              <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <span>{pool.symbol}</span>
                <span>•</span>
                <span>{truncateAddress(pool.address)}</span>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <span className="capitalize">{pool.type}</span>
                  {hasBoostedTokens(pool) && (
                    <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs px-2 py-0.5 rounded-full font-medium">
                      BOOSTED
                    </span>
                  )}
                </div>
                <span>•</span>
                <span>v{pool.protocolVersion}</span>
              </div>
            </div>
          </div>

          <div>
            <Link href={`/dashboard/beets/${pool.id}`}>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20"
              >
                View Details
              </Button>
            </Link>
          </div>
        </div>

        {/* User Position */}
        {pool.userBalance && pool.userBalance.totalBalanceUsd > 0 && (
          <div className="w-full my-4 p-3 bg-green-50/70 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-green-700 dark:text-green-400">
                Your Position
              </span>
              <span className="font-bold text-green-700 dark:text-green-400">
                ${formatNumber(pool.userBalance.totalBalanceUsd)}
              </span>
            </div>
          </div>
        )}

        {/* Metrics Row */}
        <div className="grid grid-cols-3 gap-4 mt-4 p-4 bg-gray-50/80 dark:bg-transparent rounded-xl">
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <DollarSign className="h-4 w-4 text-green-600 dark:text-green-400" />
              <span className="text-xs">Total Liquidity</span>
            </div>
            <span className="font-bold text-gray-900 dark:text-gray-100">
              ${formatNumber(pool.dynamicData.totalLiquidity)}
            </span>
          </div>
          
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <TrendingUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-xs">24h Volume</span>
            </div>
            <span className="font-bold text-gray-900 dark:text-gray-100">
              ${formatNumber(pool.dynamicData.volume24h)}
            </span>
          </div>
          
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Percent className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              <span className="text-xs">24h Yield</span>
            </div>
            <span className="font-bold text-gray-900 dark:text-gray-100">
              ${formatNumber(pool.dynamicData.yieldCapture24h)}
            </span>
          </div>
        </div>

        {/* Token Pills - Simplified */}
        <div className="mt-4 flex flex-wrap gap-2">
          {pool.poolTokens.slice(0, 8).map((token) => (
            <div 
              key={token.address} 
              className="inline-flex items-center gap-1.5 py-1 px-2 bg-gray-100/80 dark:bg-gray-800/80 rounded-full text-xs"
            >
              {token.logoURI ? (
                <Image
                  src={token.logoURI}
                  alt={token.symbol}
                  width={14}
                  height={14}
                  className="rounded-full"
                />
              ) : (
                <div className="w-3.5 h-3.5 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
                  <span className="text-[8px]">{token.symbol.charAt(0)}</span>
                </div>
              )}
              <span className="font-medium">{token.symbol}</span>
              {token.underlyingToken && (
                <span className="w-2 h-2 bg-purple-500 rounded-full" />
              )}
            </div>
          ))}
          
          {pool.poolTokens.length > 8 && (
            <div className="inline-flex items-center py-1 px-2 bg-gray-100 dark:bg-gray-800 rounded-full text-xs">
              +{pool.poolTokens.length - 8} more
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
