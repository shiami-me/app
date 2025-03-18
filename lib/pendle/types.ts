export type Address = string;
export type ChainId = number;

export interface RewardToken {
  asset: string;
  amount: number;
}

export interface Movement10Percent {
  ptMovementUpUsd: number;
  ptMovementDownUsd: number;
  ytMovementUpUsd: number;
  ytMovementDownUsd: number;
}

export interface ExtendedInfo {
  floatingPt: number;
  floatingSy: number;
  totalTvl: number;
  pyUnit: string;
  ptEqualsPyUnit: boolean;
  underlyingAssetWorthMore: string;
  nativeWithdrawalURL: string;
  movement10Percent: Movement10Percent;
  feeRate: number;
  yieldRange: {
    min: number;
    max: number;
  };
  underlyingAssetSupply: number;
}

export interface MarketMathData {
  interestFeeRate: number;
  ptExchangeRate: number;
  syIndex: number;
  totalActiveSupply: number;
}

export interface MarketInfo {
  deployedBy: string;
}

export interface PendleMarket {
  chainId: ChainId;
  address: Address;
  symbol: string;
  expiry: number;
  icon: string;
  pt: string;
  yt: string;
  sy: string;
  accountingAsset: string;
  underlyingAsset: string;
  rewardTokens: RewardToken[];
  inputTokens: string[];
  outputTokens: string[];
  protocol: string;
  underlyingPool: string;
  isWhitelistedPro: boolean;
  maxBoostedApy: number;
  lpRewardApy: number;
  voterApy: number;
  ytRoi: number;
  ptRoi: number;
  estimatedDailyPoolRewards: RewardToken[];
  liquidityChange24h: number;
  tradingVolumeChange24h: number;
  underlyingApyChange24h: number;
  impliedApyChange24h: number;
  categoryIds: string[];
  timestamp: number;
  scalarRoot: number;
  initialAnchor: number;
  info: MarketInfo;
  extendedInfo: ExtendedInfo;
  tvlThresholdTimestamp: number;
  offchainRewardApy: number | null;
  whitelistedAt: number;
  marketMathData: MarketMathData;
  isNew: boolean;
  isFeatured: boolean;
  isPopular: boolean;
  apyMethodology: string;
  groupId: string | null;
  votable: boolean;
  isActive: boolean;
  isWhitelistedLimitOrder: boolean;
  accentColor: string;
  totalPt: number;
  totalSy: number;
  totalLp: number;
  totalActiveSupply: number;
  liquidity: number;
  tradingVolume: number;
  underlyingInterestApy: number;
  underlyingRewardApy: number;
  underlyingRewardApyBreakdown: any[];
  underlyingApy: number;
  impliedApy: number;
  ytFloatingApy: number;
  ptDiscount: number;
  swapFeeApy: number;
  pendleApy: number;
  arbApy: number;
  aggregatedApy: number;
  isPrime: boolean | null;
  isPasswordProtected: boolean | null;
}

export interface PendleMarketsResponse {
  chainIdList: ChainId[];
  addressList: Address[];
  symbolList: string[];
  expiryList: number[];
  iconList: string[];
  ptList: string[];
  ytList: string[];
  syList: string[];
  accountingAssetList: string[];
  underlyingAssetList: string[];
  rewardTokensList: RewardToken[][];
  inputTokensList: string[][];
  outputTokensList: string[][];
  protocolList: string[];
  underlyingPoolList: string[];
  isWhitelistedProList: boolean[];
  maxBoostedApyList: number[];
  lpRewardApyList: number[];
  voterApyList: number[];
  ytRoiList: number[];
  ptRoiList: number[];
  estimatedDailyPoolRewardsList: RewardToken[][];
  liquidityChange24hList: number[];
  tradingVolumeChange24hList: number[];
  underlyingApyChange24hList: number[];
  impliedApyChange24hList: number[];
  categoryIdsList: string[][];
  timestampList: number[];
  scalarRootList: number[];
  initialAnchorList: number[];
  infoList: MarketInfo[];
  extendedInfoList: ExtendedInfo[];
  tvlThresholdTimestampList: number[];
  offchainRewardApyList: (number | null)[];
  whitelistedAtList: number[];
  marketMathDataList: MarketMathData[];
  isNewList: boolean[];
  isFeaturedList: boolean[];
  isPopularList: boolean[];
  apyMethodologyList: string[];
  groupIdList: (string | null)[];
  votableList: boolean[];
  isActiveList: boolean[];
  isWhitelistedLimitOrderList: boolean[];
  accentColorList: string[];
  totalPtList: number[];
  totalSyList: number[];
  totalLpList: number[];
  totalActiveSupplyList: number[];
  liquidityList: number[];
  tradingVolumeList: number[];
  underlyingInterestApyList: number[];
  underlyingRewardApyList: number[];
  underlyingRewardApyBreakdownList: any[][];
  underlyingApyList: number[];
  impliedApyList: number[];
  ytFloatingApyList: number[];
  ptDiscountList: number[];
  swapFeeApyList: number[];
  pendleApyList: number[];
  arbApyList: number[];
  aggregatedApyList: number[];
  isPrimeList: (boolean | null)[];
  isPasswordProtectedList: (boolean | null)[];
}
