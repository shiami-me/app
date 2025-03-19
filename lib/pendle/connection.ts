import { PendleMarket, PendleMarketsResponse, PendleAsset, PendleAssetsResponse } from './types';
import { callSDK } from './helper';

// Define the correct return types based on the examples
interface AddLiquidityData {
  amountLpOut: string;
  priceImpact: number;
  amountYtOut?: string; // Only present when zpi is true
}

interface AddLiquidityDualData {
  amountOut: string;
  priceImpact: number;
}

// Define types for remove liquidity data
interface RemoveLiquidityData {
  amountOut: string;
  priceImpact: number;
}

interface RemoveLiquidityDualData {
  amountTokenOut: string;
  amountPtOut: string;
  priceImpact: number;
}

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
   * Fetches all assets for a given chain ID and transforms the response
   * from list format to proper asset objects
   */
  async getAssets(chainId: number = 146): Promise<PendleAsset[]> {
    const url = `${this.baseUrl}/bff/v3/assets/all?chainId=${chainId}`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch assets: ${response.statusText}`);
      }
      
      const data = await response.json() as PendleAssetsResponse;
      return this.transformAssetsResponse(data);
    } catch (error) {
      console.error('Error fetching Pendle assets:', error);
      throw error;
    }
  }

  /**
   * Parse token ID in format "146-0x..." to get the clean address
   */
  parseTokenId(tokenId: string): { chainId: number, address: string } | null {
    try {
      // Check if it's in the format of CHAINID-ADDRESS
      if (tokenId.includes('-')) {
        const [chainIdStr, address] = tokenId.split('-');
        return {
          chainId: parseInt(chainIdStr),
          address: address
        };
      }
      
      // If no dash, assume it's just an address
      return {
        chainId: 146, // Default to Sonic chain
        address: tokenId
      };
    } catch (error) {
      console.error('Error parsing token ID:', error);
      return null;
    }
  }

  /**
   * Add liquidity to a Pendle market with a single token input
   * Follows the example in add-liquidity.ts
   */
  async addLiquidity(
    chainId: number,
    marketAddress: string,
    tokenIn: string,
    amountIn: string,
    slippage: number = 0.01,
    zpi: boolean = false,
    userAddress: string
  ): Promise<{data: AddLiquidityData, tx: {to: string, data: string, value: string}}> {
    try {
      // Format amount to Wei (18 decimals)
      const amountInWei = this.formatToWei(amountIn);
      
      const result = await callSDK<AddLiquidityData>(
        `v1/sdk/${chainId}/markets/${marketAddress}/add-liquidity`,
        {
          receiver: userAddress,
          slippage,
          tokenIn,
          amountIn: amountInWei,
          zpi
        }
      );
      
      console.log('Amount LP Out: ', result.data.amountLpOut);
      console.log('Price impact: ', result.data.priceImpact);
      
      if (zpi && result.data.amountYtOut) {
        console.log('Amount YT Out: ', result.data.amountYtOut);
      }
      
      // Return both data and tx
      return {
        data: result.data,
        tx: result.tx
      };
    } catch (error) {
      console.error('Error adding liquidity:', error);
      throw error;
    }
  }
  
  /**
   * Add liquidity to a Pendle market with dual inputs (token and PT)
   * Follows the example in add-liquidity-dual.ts
   */
  async addLiquidityDual(
    chainId: number,
    marketAddress: string,
    tokenIn: string,
    amountTokenIn: string,
    amountPtIn: string,
    slippage: number = 0.01,
    userAddress: string
  ): Promise<{data: AddLiquidityDualData, tx: {to: string, data: string, value: string}}> {
    try {
      // Format amounts to Wei (18 decimals)
      const amountTokenInWei = this.formatToWei(amountTokenIn);
      const amountPtInWei = this.formatToWei(amountPtIn);
      
      const result = await callSDK<AddLiquidityDualData>(
        `v1/sdk/${chainId}/markets/${marketAddress}/add-liquidity-dual`,
        {
          receiver: userAddress,
          slippage,
          tokenIn,
          amountTokenIn: amountTokenInWei,
          amountPtIn: amountPtInWei
        }
      );
      
      console.log('Amount LP Out: ', result.data.amountOut);
      console.log('Price impact: ', result.data.priceImpact);
      
      // Return both data and tx
      return {
        data: result.data,
        tx: result.tx
      };
    } catch (error) {
      console.error('Error adding dual liquidity:', error);
      throw error;
    }
  }

  /**
   * Remove liquidity from a Pendle market with single token output
   * Follows the example in remove-liquidity.ts
   */
  async removeLiquidity(
    chainId: number,
    marketAddress: string,
    tokenOut: string,
    amountIn: string,
    slippage: number = 0.01,
    userAddress: string
  ): Promise<{data: RemoveLiquidityData, tx: {to: string, data: string, value: string}}> {
    try {
      // Format amount to Wei (18 decimals)
      const amountInWei = this.formatToWei(amountIn);
      
      const result = await callSDK<RemoveLiquidityData>(
        `v1/sdk/${chainId}/markets/${marketAddress}/remove-liquidity`,
        {
          receiver: userAddress,
          slippage,
          tokenOut,
          amountIn: amountInWei
        }
      );
      
      console.log('Amount Out: ', result.data.amountOut);
      console.log('Price impact: ', result.data.priceImpact);
      
      // Return both data and tx
      return {
        data: result.data,
        tx: result.tx
      };
    } catch (error) {
      console.error('Error removing liquidity:', error);
      throw error;
    }
  }
  
  /**
   * Remove liquidity from a Pendle market to token and PT
   * Follows the example in remove-liquidity-dual.ts
   */
  async removeLiquidityDual(
    chainId: number,
    marketAddress: string,
    tokenOut: string,
    amountIn: string,
    slippage: number = 0.01,
    userAddress: string
  ): Promise<{data: RemoveLiquidityDualData, tx: {to: string, data: string, value: string}}> {
    try {
      // Format amount to Wei (18 decimals)
      const amountInWei = this.formatToWei(amountIn);
      
      const result = await callSDK<RemoveLiquidityDualData>(
        `v1/sdk/${chainId}/markets/${marketAddress}/remove-liquidity-dual`,
        {
          receiver: userAddress,
          slippage,
          tokenOut,
          amountIn: amountInWei
        }
      );
      
      console.log('Amount Token Out: ', result.data.amountTokenOut);
      console.log('Amount PT Out: ', result.data.amountPtOut);
      console.log('Price impact: ', result.data.priceImpact);
      
      // Return both data and tx
      return {
        data: result.data,
        tx: result.tx
      };
    } catch (error) {
      console.error('Error removing dual liquidity:', error);
      throw error;
    }
  }

  /**
   * Helper function to format amount to Wei (18 decimals)
   * Changed from private to public to allow external access
   */
  formatToWei(amount: string): string {
    if (!amount || amount === '') return '0';
    
    // Parse the amount to a number
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount)) return '0';
    
    // Convert to wei (18 decimals)
    const weiAmount = BigInt(Math.floor(parsedAmount * 10**18));
    
    // Return as a string
    return weiAmount.toString();
  }

  /**
   * Transforms the list-based API response into an array of market objects
   */
  private transformMarketsResponse(response: PendleMarketsResponse): PendleMarket[] {
    const markets: PendleMarket[] = [];
    const len = response.chainIdList.length;
    
    for (let i = 0; i < len; i++) {
      if (!response.liquidityList[i]) continue;
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

  /**
   * Transforms the list-based assets API response into an array of asset objects
   */
  private transformAssetsResponse(response: PendleAssetsResponse): PendleAsset[] {
    const assets: PendleAsset[] = [];
    const len = response.chainIdList.length;
    
    for (let i = 0; i < len; i++) {
      const asset: PendleAsset = {
        chainId: response.chainIdList[i],
        address: response.addressList[i],
        symbol: response.symbolList[i],
        icon: response.iconList[i],
        decimals: response.decimalsList[i],
        price: response.priceList[i],
        type: response.typeList[i],
        underlyingPool: response.underlyingPoolList[i],
        zappable: response.zappableList[i],
        expiry: response.expiryList[i],
      };
      
      assets.push(asset);
    }
    
    return assets;
  }
}
