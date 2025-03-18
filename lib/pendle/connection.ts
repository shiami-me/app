import { PendleMarket, PendleMarketsResponse } from './types';

export class PendleConnection {
  private baseUrl: string;

  constructor() {
    this.baseUrl = 'https://api-v2.pendle.finance';
  }

  /**
   * Fetches all markets for a given chain ID and transforms the response
   * from list format to proper market objects
   */
  async getMarkets(chainId: number = 146): Promise<PendleMarket[]> {
    const url = `${this.baseUrl}/bff/v3/markets/all?chainId=${chainId}&select=all`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch markets: ${response.statusText}`);
      }
      
      const data = await response.json() as PendleMarketsResponse;
      return this.transformMarketsResponse(data);
    } catch (error) {
      console.error('Error fetching Pendle markets:', error);
      throw error;
    }
  }

  /**
   * Transforms the list-based API response into an array of market objects
   */
  private transformMarketsResponse(response: PendleMarketsResponse): PendleMarket[] {
    const markets: PendleMarket[] = [];
    const len = response.chainIdList.length;
    
    for (let i = 0; i < len; i++) {
      const market: PendleMarket = {
        chainId: response.chainIdList[i],
        address: response.addressList[i],
        symbol: response.symbolList[i],
        expiry: response.expiryList[i],
        icon: response.iconList[i],
        pt: response.ptList[i],
        yt: response.ytList[i],
        sy: response.syList[i],
        accountingAsset: response.accountingAssetList[i],
        underlyingAsset: response.underlyingAssetList[i],
        rewardTokens: response.rewardTokensList[i] || [],
        inputTokens: response.inputTokensList[i] || [],
        outputTokens: response.outputTokensList[i] || [],
        protocol: response.protocolList[i],
        underlyingPool: response.underlyingPoolList[i],
        isWhitelistedPro: response.isWhitelistedProList[i],
        maxBoostedApy: response.maxBoostedApyList[i],
        lpRewardApy: response.lpRewardApyList[i],
        voterApy: response.voterApyList[i],
        ytRoi: response.ytRoiList[i],
        ptRoi: response.ptRoiList[i],
        estimatedDailyPoolRewards: response.estimatedDailyPoolRewardsList[i] || [],
        liquidityChange24h: response.liquidityChange24hList[i],
        tradingVolumeChange24h: response.tradingVolumeChange24hList[i],
        underlyingApyChange24h: response.underlyingApyChange24hList[i],
        impliedApyChange24h: response.impliedApyChange24hList[i],
        categoryIds: response.categoryIdsList[i] || [],
        timestamp: response.timestampList[i],
        scalarRoot: response.scalarRootList[i],
        initialAnchor: response.initialAnchorList[i],
        info: response.infoList[i],
        extendedInfo: response.extendedInfoList[i],
        tvlThresholdTimestamp: response.tvlThresholdTimestampList[i],
        offchainRewardApy: response.offchainRewardApyList[i],
        whitelistedAt: response.whitelistedAtList[i],
        marketMathData: response.marketMathDataList[i],
        isNew: response.isNewList[i],
        isFeatured: response.isFeaturedList[i],
        isPopular: response.isPopularList[i],
        apyMethodology: response.apyMethodologyList[i],
        groupId: response.groupIdList[i],
        votable: response.votableList[i],
        isActive: response.isActiveList[i],
        isWhitelistedLimitOrder: response.isWhitelistedLimitOrderList[i],
        accentColor: response.accentColorList[i],
        totalPt: response.totalPtList[i],
        totalSy: response.totalSyList[i],
        totalLp: response.totalLpList[i],
        totalActiveSupply: response.totalActiveSupplyList[i],
        liquidity: response.liquidityList[i],
        tradingVolume: response.tradingVolumeList[i],
        underlyingInterestApy: response.underlyingInterestApyList[i],
        underlyingRewardApy: response.underlyingRewardApyList[i],
        underlyingRewardApyBreakdown: response.underlyingRewardApyBreakdownList[i] || [],
        underlyingApy: response.underlyingApyList[i],
        impliedApy: response.impliedApyList[i],
        ytFloatingApy: response.ytFloatingApyList[i],
        ptDiscount: response.ptDiscountList[i],
        swapFeeApy: response.swapFeeApyList[i],
        pendleApy: response.pendleApyList[i],
        arbApy: response.arbApyList[i],
        aggregatedApy: response.aggregatedApyList[i],
        isPrime: response.isPrimeList[i],
        isPasswordProtected: response.isPasswordProtectedList[i],
      };
      
      markets.push(market);
    }
    
    return markets;
  }
}
