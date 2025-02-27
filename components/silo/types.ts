export interface MarketData {
  id: number;
  reviewed: boolean;
  market: string;
  deposit_apr: string;
  borrow_apr: string;
  isBorrowable: boolean;
  logo: string;
  token0: string;
  token1: string;
}
