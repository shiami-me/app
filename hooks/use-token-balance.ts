import { useState, useEffect } from 'react';
import { useAccount, usePublicClient } from 'wagmi';
import { PendleAsset } from '@/lib/pendle/types';
import { PendleConnection } from '@/lib/pendle/connection';
import { formatUnits } from 'viem';
import { erc20Abi } from 'viem';

interface TokenBalance {
  formatted: string;
  symbol: string;
  value: bigint;
  decimals: number;
  loading: boolean;
  error?: Error;
}

/**
 * Hook to fetch token balances for any token including those with chainId prefixes
 */
export const useTokenBalance = (tokenId?: string, assets?: PendleAsset[]) => {
  const [balance, setBalance] = useState<TokenBalance>({
    formatted: '0',
    symbol: '',
    value: BigInt(0),
    decimals: 18,
    loading: false,
  });
  const { address: account, isConnected } = useAccount();
  const client = usePublicClient();

  useEffect(() => {
    if (!tokenId || !isConnected || !account || !client) {
      setBalance(prev => ({ ...prev, loading: false }));
      return;
    }

    let isMounted = true;
    const loadBalance = async () => {
      try {
        setBalance(prev => ({ ...prev, loading: true }));
        
        // Parse the token ID to get the actual address
        const pendleClient = new PendleConnection();
        const parsedToken = pendleClient.parseTokenId(tokenId);
        
        if (!parsedToken) {
          throw new Error('Invalid token ID');
        }

        const tokenAddress = parsedToken.address;

        // Find token info from assets if available
        let tokenSymbol = '';
        let decimals = 18; // Default to 18 if not found
        
        if (assets && assets.length > 0) {
          const asset = assets.find(a => 
            a.address.toLowerCase() === parsedToken.address.toLowerCase() && 
            a.chainId === parsedToken.chainId
          );
          
          if (asset) {
            tokenSymbol = asset.symbol;
            decimals = asset.decimals;
          }
        }
        
        let balanceValue: bigint = BigInt(0);
        
        // Check if it's the native token (address 0x0000...0000)
        if (tokenAddress === '0x0000000000000000000000000000000000000000') {
          // For native token, get balance directly
          const nativeBalance = await client.getBalance({
            address: account,
          });
          balanceValue = nativeBalance;
        } else {
          // For ERC20 tokens, use the contract
          try {
            // First try to get decimals on-chain if not already known
            if (!decimals) {
              const tokenDecimals = await client.readContract({
                address: tokenAddress as `0x${string}`,
                abi: erc20Abi,
                functionName: 'decimals',
              });
              decimals = Number(tokenDecimals);
            }
            
            // If we don't have the symbol from assets, fetch it on-chain
            if (!tokenSymbol) {
              try {
                tokenSymbol = await client.readContract({
                  address: tokenAddress as `0x${string}`,
                  abi: erc20Abi,
                  functionName: 'symbol',
                });
              } catch (e) {
                console.warn('Failed to fetch token symbol:', e);
                tokenSymbol = 'Unknown';
              }
            }
            
            // Get the token balance
            const tokenBalance = await client.readContract({
              address: tokenAddress as `0x${string}`,
              abi: erc20Abi,
              functionName: 'balanceOf',
              args: [account],
            });
            
            balanceValue = tokenBalance as bigint;
          } catch (error) {
            console.error('Error reading token contract:', error);
            throw new Error(`Failed to read token data: ${error}`);
          }
        }
        
        // Format the balance
        const formatted = formatUnits(balanceValue, decimals);
        
        if (isMounted) {
          setBalance({
            formatted,
            symbol: tokenSymbol,
            value: balanceValue,
            decimals,
            loading: false,
          });
        }
      } catch (error) {
        console.error('Error fetching token balance:', error);
        if (isMounted) {
          setBalance(prev => ({ 
            ...prev, 
            loading: false, 
            error: error instanceof Error ? error : new Error('Unknown error') 
          }));
        }
      }
    };
    loadBalance();
    console.log(balance)

    return () => {
      isMounted = false;
    };
  }, [tokenId, account, isConnected, assets, client]);

  return balance;
};
