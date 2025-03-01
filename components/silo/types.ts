export interface MarketData {
  id: string | number;
  reviewed: boolean;
  market: string;
  deposit_apr: string;
  borrow_apr: string;
  isBorrowable: boolean;
  logo: string;
  token0: string;
  token1: string;
}

export interface SiloUserData {
  position?: {
    regularDeposit: string;
    protectedDeposit: string;
    totalCollateral: string;
    borrowedAmount: string;
    maxBorrowAmount: string;
    loanToValue: string;
    isSolvent: boolean;
    regularDepositFormatted?: string;
    protectedDepositFormatted?: string;
    totalCollateralFormatted?: string;
    borrowedAmountFormatted?: string;
    loanToValuePercentage?: string;
    maxBorrowAmountFormatted?: string;
  };
  solvency?: {
    isSolvent: boolean;
    loanToValue: string;
    maxLtv: string;
    liquidationThreshold: string;
    loanToValuePercentage: string;
    maxLtvPercentage: string;
    liquidationThresholdPercentage: string;
    marginToLiquidation: string;
  };
}

export interface SiloDetailData {
  id: string | number;
  configAddress: string;
  isVerified: boolean;
  silo0: {
    symbol: string;
    tokenAddress: string;
    siloAddress: string;
    decimals: number;
    logos: {
      coinGecko?: {
        thumb: string;
        small: string;
        large: string;
      };
      coinMarketCap?: {
        thumb: string;
        small: string;
        large: string;
      };
    };
    collateralBaseApr: string;
    debtBaseApr: string;
    maxLtv: string;
    lt: string;
    liquidity: string;
    isNonBorrowable: boolean;
  };
  silo1: {
    symbol: string;
    tokenAddress: string;
    siloAddress: string;
    decimals: number;
    logos: {
      coinGecko?: {
        thumb: string;
        small: string;
        large: string;
      };
      coinMarketCap?: {
        thumb: string;
        small: string;
        large: string;
      };
    };
    collateralBaseApr: string;
    debtBaseApr: string;
    maxLtv: string;
    lt: string;
    liquidity: string;
    isNonBorrowable: boolean;
  };
}
