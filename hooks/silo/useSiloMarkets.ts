import { useState, useEffect, useCallback } from 'react';

interface SiloLogo {
  large?: string;
  small?: string;
  thumb?: string;
}

interface SiloLogos {
  trustWallet?: SiloLogo;
  coinGecko?: SiloLogo;
  coinMarketCap?: SiloLogo;
}

export interface SiloTokenData {
  symbol: string;
  collateralBaseApr: string;
  debtBaseApr: string;
  isNonBorrowable: boolean;
  maxLtv: string;
  lt: string;
  liquidity: string;
  decimals: number;
  logos: SiloLogos;
}

export interface RawSiloMarket {
  id: string;
  isVerified: boolean;
  silo0: SiloTokenData;
  silo1: SiloTokenData;
}

export interface ProcessedSiloMarket {
  id: number;
  reviewed: boolean;
  market: string;
  silo0: {
    market: string;
    deposit_apr: string;
    borrow_apr: string;
    isBorrowable: boolean;
    token0: string;
    token1: string;
    max_ltv: number;
    lt: number;
    liquidity: number;
    logo: string;
  };
  silo1: {
    market: string;
    deposit_apr: string;
    borrow_apr: string;
    isBorrowable: boolean;
    token0: string;
    token1: string;
    max_ltv: number;
    lt: number;
    liquidity: number;
    logo: string;
  };
}

export interface SiloApiResponse {
  requestedTokens: string[];
  markets: RawSiloMarket[];
  count: number;
  timestamp: string;
}

export function useSiloMarkets(filteredToken: string | null, marketIds: number[] = []) {
  const [markets, setMarkets] = useState<ProcessedSiloMarket[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Process the raw market data from API
  const processMarketData = (data: SiloApiResponse): ProcessedSiloMarket[] => {
    if (!data.markets) return [];
    
    return data.markets.map((item: RawSiloMarket) => {
      // Get logos with fallbacks
      const silo0Logo = 
        (item.silo0.logos.trustWallet?.large || 
         item.silo0.logos.coinGecko?.large || 
         item.silo0.logos.coinMarketCap?.large || 
         "https://coin-images.coingecko.com/coins/images/52857/large/wrapped_sonic.png?1734536585");
         
      const silo1Logo = 
        (item.silo1.logos.trustWallet?.large || 
         item.silo1.logos.coinGecko?.large || 
         item.silo1.logos.coinMarketCap?.large || 
         "https://coin-images.coingecko.com/coins/images/52857/large/wrapped_sonic.png?1734536585");

      return {
        id: parseInt(item.id),
        reviewed: item.isVerified,
        market: `${item.silo0.symbol}/${item.silo1.symbol}`,
        silo0: {
          market: item.silo0.symbol,
          deposit_apr: `${(parseFloat(item.silo0.collateralBaseApr) / 10**18) * 100}%`,
          borrow_apr: `${(parseFloat(item.silo0.debtBaseApr) / 10**18) * 100}%`,
          isBorrowable: !item.silo0.isNonBorrowable,
          token0: item.silo0.symbol,
          token1: item.silo1.symbol,
          max_ltv: parseInt(item.silo0.maxLtv) / 10**18,
          lt: parseInt(item.silo0.lt) / 10**18,
          liquidity: parseInt(item.silo0.liquidity) / 10**item.silo0.decimals,
          logo: silo0Logo
        },
        silo1: {
          market: item.silo1.symbol,
          deposit_apr: `${(parseFloat(item.silo1.collateralBaseApr) / 10**18) * 100}%`,
          borrow_apr: `${(parseFloat(item.silo1.debtBaseApr) / 10**18) * 100}%`,
          isBorrowable: !item.silo1.isNonBorrowable,
          token0: item.silo1.symbol,
          token1: item.silo0.symbol,
          max_ltv: parseInt(item.silo1.maxLtv) / 10**18,
          lt: parseInt(item.silo1.lt) / 10**18,
          liquidity: parseInt(item.silo1.liquidity) / 10**item.silo1.decimals,
          logo: silo1Logo
        }
      };
    });
  };

  // Function to fetch market data
  const fetchMarketData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const url = new URL("http://localhost:3000/api/silo/filter");
      
      // Add token filter if provided
      if (filteredToken) {
        url.searchParams.append("tokens", filteredToken);
      }
      
      const response = await fetch(url.toString(), {
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data: SiloApiResponse = await response.json();
      const processedData = processMarketData(data);
      
      // Filter by market IDs if provided
      let filteredMarkets = processedData;
      if (marketIds.length > 0) {
        filteredMarkets = processedData.filter(market => 
          marketIds.includes(market.id)
        );
      }
      
      setMarkets(filteredMarkets);
      setLastUpdated(new Date());
      console.log("Fetched Silo markets:", filteredMarkets);
    } catch (err) {
      console.error("Error fetching Silo markets:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [filteredToken, marketIds]);

  // Initial fetch
  useEffect(() => {
    if (markets) return;
    fetchMarketData();
  }, [markets]);

  return { 
    markets, 
    loading, 
    error, 
    refresh: fetchMarketData, 
    lastUpdated 
  };
}

// Helper functions for strategy calculations
export function calculateMaxLeverage(maxLtv: number): number {
  if (!maxLtv || maxLtv >= 1) return 1;
  return 1 / (1 - maxLtv);
}

export function calculateMaxYield(depositApr: number, borrowApr: number, maxLeverage: number): number {
  return (depositApr * maxLeverage) - (borrowApr * (maxLeverage - 1));
}
