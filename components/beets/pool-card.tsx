import React from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { formatNumber, truncateAddress } from "@/lib/utils";
import { TokenData, PoolData } from "@/components/beets/types";

interface PoolCardProps {
  pool: PoolData;
}

// Function to determine if a pool has boosted tokens
const hasBoostedTokens = (pool: PoolData) => {
  return pool.poolTokens.some(token => token.underlyingToken);
};

export const PoolCard: React.FC<PoolCardProps> = ({ pool }) => {
  return (
    <Card
      key={pool.id}
      className="border-0 shadow-md rounded-xl overflow-hidden transition-shadow hover:shadow-lg"
    >
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {pool.poolTokens.slice(0, 4).map((token, i) => (
                <div key={token.address} className="z-[1] relative" style={{ zIndex: 10 - i }}>
                  {token.logoURI ? (
                    <Image
                      src={token.logoURI}
                      alt={token.symbol}
                      width={28}
                      height={28}
                      className="rounded-full border border-gray-200 dark:border-gray-800"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <span className="text-xs">{token.symbol.charAt(0)}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div>
              <h2 className="text-lg font-semibold">{pool.name}</h2>
              <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <span>{pool.symbol}</span>
                <span>•</span>
                <span>{truncateAddress(pool.address)}</span>
                <span>•</span>
                <span className="capitalize">
                  {pool.type} {hasBoostedTokens(pool) && <span className="text-purple-500 font-medium">BOOSTED</span>}
                </span>
                <span>•</span>
                <span>v{pool.protocolVersion}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-6">
            {pool.userBalance && pool.userBalance.totalBalanceUsd > 0 && (
              <div className="w-full mb-2">
                <div className="flex items-center justify-between p-2 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800">
                  <span className="text-sm font-medium text-green-700 dark:text-green-400">
                    Your Position (wallet + staked)
                  </span>
                  <span className="font-bold text-green-700 dark:text-green-400">
                    ${formatNumber(pool.userBalance.totalBalanceUsd)}
                  </span>
                </div>
              </div>
            )}
            
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Total Liquidity</div>
              <div className="font-semibold">${formatNumber(pool.dynamicData.totalLiquidity)}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">24h Volume</div>
              <div className="font-semibold">${formatNumber(pool.dynamicData.volume24h)}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">24h Yield</div>
              <div className="font-semibold">${formatNumber(pool.dynamicData.yieldCapture24h)}</div>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium">Pool Tokens</h3>
            <span className="text-xs text-gray-500 dark:text-gray-400">{pool.poolTokens.length} tokens</span>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {pool.poolTokens.map((token) => (
              <TokenCard key={token.address} token={token} />
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

interface TokenCardProps {
  token: TokenData;
}

const TokenCard: React.FC<TokenCardProps> = ({ token }) => {
  return (
    <div 
      className="flex items-center gap-3 p-2.5 bg-gray-50/80 dark:bg-gray-700/60 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-600/80 border border-transparent hover:border-gray-200 dark:hover:border-gray-800"
    >
      <div className="relative">
        {token.logoURI ? (
          <Image
            src={token.logoURI}
            alt={token.symbol}
            width={20}
            height={20}
            className="rounded-full"
          />
        ) : (
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
            <span className="text-[10px] font-bold">{token.symbol.charAt(0)}</span>
          </div>
        )}
        {token.underlyingToken && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 border border-white dark:border-gray-900 rounded-full" />
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="font-medium text-sm truncate">{token.symbol}</div>
        {token.underlyingToken && (
          <div className="text-[10px] text-purple-500 font-medium">Boosted</div>
        )}
      </div>
    </div>
  );
};
