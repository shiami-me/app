export interface TokenData {
  id: string;
  address: string;
  symbol: string;
  decimals: number;
  name: string;
  logoURI: string;
  underlyingToken?: {
    address: string;
    symbol: string;
    name: string;
    decimals: number;
  };
}

export interface PoolData {
  id: string;
  address: string;
  chain: string;
  name: string;
  symbol: string;
  protocolVersion: string;
  type: string;
  dynamicData: {
    totalLiquidity: number;
    volume24h: number;
    yieldCapture24h: number;
  };
  userBalance?: {
    totalBalanceUsd: number;
  }
  poolTokens: TokenData[];
}

export interface FilterOptions {
  first: number;
  orderBy: string;
  orderDirection: string;
  skip: number;
  textSearch: string;
}
