import { PendleMarket, PendleAsset } from './types';
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

// Define types for swap data
interface SwapData {
  amountOut: string;
  priceImpact: number;
}

// Define types for mint operations
interface MintSyData {
  amountOut: string;
  priceImpact: number;
}

interface MintPyData {
  amountOut: string;
  priceImpact: number;
}

// Define types for redeem operations
interface RedeemSyData {
  amountOut: string;
  priceImpact: number;
}

interface RedeemPyData {
  amountOut: string;
  priceImpact: number;
}

export class PendleConnection {
  private baseUrl: string;

  constructor() {
    this.baseUrl = 'https://api-v2.pendle.finance';
  }

  /**
   * Fetches all markets for a given chain ID and transforms the response
   * from the new API format to proper market objects
   */
  async getMarkets(chainId: number = 146): Promise<PendleMarket[]> {
    const url = `${this.baseUrl}/core/v1/${chainId}/markets`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch markets: ${response.statusText}`);
      }
      
      const data = await response.json();
      return await this.transformNewMarketsResponse(data.results);
    } catch (error) {
      console.error('Error fetching Pendle markets:', error);
      throw error;
    }
  }

  /**
   * Fetches all assets for a given chain ID using the new endpoint
   */
  async getAssets(chainId: number = 146): Promise<PendleAsset[]> {
    const url = `${this.baseUrl}/core/v1/${chainId}/assets/all`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch assets: ${response.statusText}`);
      }
      
      // The API returns an array of assets with a different structure
      const data = await response.json();
      
      // Map the response to match our PendleAsset interface
      return data.map((asset: any) => ({
        chainId: asset.chainId,
        address: asset.address,
        symbol: asset.symbol,
        // Use simpleIcon as the icon source
        icon: asset.simpleIcon || asset.proIcon || '',
        decimals: asset.decimals,
        // Map price.usd to price
        price: asset.price?.usd || null,
        // Use baseType as the type if available, otherwise use the first type from types array
        type: asset.baseType || (asset.types && asset.types.length > 0 ? asset.types[0] : ''),
        // No direct mapping for underlyingPool in the new response
        underlyingPool: null,
        zappable: asset.zappable || false,
        // No direct expiry field in the response, default to null
        expiry: null
      }));
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
    userAddress: string,
    enableAggregator: boolean = false
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
          zpi,
          enableAggregator
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
    userAddress: string,
    enableAggregator: boolean = false
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
          amountPtIn: amountPtInWei,
          enableAggregator
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
    userAddress: string,
    enableAggregator: boolean = false
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
          amountIn: amountInWei,
          enableAggregator
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
    userAddress: string,
    enableAggregator: boolean = false
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
          amountIn: amountInWei,
          enableAggregator
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
   * Execute a swap in a Pendle market
   * Follows the example in swap.ts
   */
  async swap(
    chainId: number,
    marketAddress: string,
    tokenIn: string,
    tokenOut: string,
    amountIn: string,
    slippage: number = 0.01,
    userAddress: string,
    enableAggregator: boolean = false
  ): Promise<{data: SwapData, tx: {to: string, data: string, value: string}}> {
    try {
      // Format amount to Wei (18 decimals)
      const amountInWei = this.formatToWei(amountIn);
      
      const result = await callSDK<SwapData>(
        `v1/sdk/${chainId}/markets/${marketAddress}/swap`,
        {
          receiver: userAddress,
          slippage,
          tokenIn,
          tokenOut,
          amountIn: amountInWei,
          enableAggregator
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
      console.error('Error swapping tokens:', error);
      throw error;
    }
  }

  /**
   * Mint SY tokens from a base token
   * Follows the example in mint-sy.ts
   */
  async mintSy(
    chainId: number,
    sy: string,
    tokenIn: string,
    amountIn: string,
    slippage: number = 0.01,
    userAddress: string,
    enableAggregator: boolean = false
  ): Promise<{data: MintSyData, tx: {to: string, data: string, value: string}}> {
    try {
      // Format amount to Wei (18 decimals)
      const amountInWei = this.formatToWei(amountIn);
      
      const result = await callSDK<MintSyData>(
        `v1/sdk/${chainId}/mint-sy`,
        {
          receiver: userAddress,
          sy,
          tokenIn,
          amountIn: amountInWei,
          slippage,
          enableAggregator
        }
      );
      
      console.log('Amount SY Out: ', result.data.amountOut);
      console.log('Price impact: ', result.data.priceImpact);
      
      // Return both data and tx
      return {
        data: result.data,
        tx: result.tx
      };
    } catch (error) {
      console.error('Error minting SY:', error);
      throw error;
    }
  }

  /**
   * Mint PT and YT from SY or a base token
   * Follows the example in mint-py.ts
   */
  async mintPy(
    chainId: number,
    yt: string,
    tokenIn: string,
    amountIn: string,
    slippage: number = 0.01,
    userAddress: string,
    enableAggregator: boolean = false
  ): Promise<{data: MintPyData, tx: {to: string, data: string, value: string}}> {
    try {
      // Format amount to Wei (18 decimals)
      const amountInWei = this.formatToWei(amountIn);
      
      const result = await callSDK<MintPyData>(
        `v1/sdk/${chainId}/mint`,
        {
          receiver: userAddress,
          yt,
          tokenIn,
          amountIn: amountInWei,
          slippage,
          enableAggregator
        }
      );
      
      console.log('Amount PT & YT Out: ', result.data.amountOut);
      console.log('Price impact: ', result.data.priceImpact);
      
      // Return both data and tx
      return {
        data: result.data,
        tx: result.tx
      };
    } catch (error) {
      console.error('Error minting PT and YT:', error);
      throw error;
    }
  }

  /**
   * Redeem SY tokens to a base token
   * Follows the example in redeem-sy.ts
   */
  async redeemSy(
    chainId: number,
    sy: string,
    tokenOut: string,
    amountIn: string,
    slippage: number = 0.01,
    userAddress: string,
    enableAggregator: boolean = false
  ): Promise<{data: RedeemSyData, tx: {to: string, data: string, value: string}}> {
    try {
      // Format amount to Wei (18 decimals)
      const amountInWei = this.formatToWei(amountIn);
      
      const result = await callSDK<RedeemSyData>(
        `v1/sdk/${chainId}/redeem-sy`,
        {
          receiver: userAddress,
          sy,
          tokenOut,
          amountIn: amountInWei,
          slippage,
          enableAggregator
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
      console.error('Error redeeming SY:', error);
      throw error;
    }
  }

  /**
   * Redeem PT and YT to SY or a base token
   * Follows the example in redeem-py.ts
   */
  async redeemPy(
    chainId: number,
    yt: string,
    tokenOut: string,
    amountIn: string,
    slippage: number = 0.01,
    userAddress: string,
    enableAggregator: boolean = false
  ): Promise<{data: RedeemPyData, tx: {to: string, data: string, value: string}}> {
    try {
      // Format amount to Wei (18 decimals)
      const amountInWei = this.formatToWei(amountIn);
      
      const result = await callSDK<RedeemPyData>(
        `v1/sdk/${chainId}/redeem`,
        {
          receiver: userAddress,
          yt,
          tokenOut,
          amountIn: amountInWei,
          slippage,
          enableAggregator
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
      console.error('Error redeeming PT and YT:', error);
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
   * Fetches the list of supported tokens for a specific market
   * This includes tokens for minting SY, redeeming SY, tokens in, and tokens out
   */
  async getMarketTokens(chainId: number, marketAddress: string): Promise<{
    tokensMintSy: string[];
    tokensRedeemSy: string[];
    tokensIn: string[];
    tokensOut: string[];
  }> {
    const url = `${this.baseUrl}/core/v1/sdk/${chainId}/markets/${marketAddress}/tokens`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch market tokens: ${response.statusText}`);
      }
      
      const data = await response.json();
      return {
        tokensMintSy: data.tokensMintSy || [],
        tokensRedeemSy: data.tokensRedeemSy || [],
        tokensIn: data.tokensIn || [],
        tokensOut: data.tokensOut || []
      };
    } catch (error) {
      console.error(`Error fetching tokens for market ${marketAddress}:`, error);
      // Return empty arrays if there's an error
      return {
        tokensMintSy: [],
        tokensRedeemSy: [],
        tokensIn: [],
        tokensOut: []
      };
    }
  }

  /**
   * Transforms the new API response format into an array of market objects
   */
  private async transformNewMarketsResponse(results: any[]): Promise<PendleMarket[]> {
    // Process markets sequentially to avoid too many concurrent requests
    const markets: PendleMarket[] = [];
    
    for (const result of results) {
      try {
        // Parse expiry date string to timestamp
        const expiryTimestamp = result.expiry ? new Date(result.expiry).getTime() / 1000 : 0;
        
        // Extract addresses from nested objects
        const ptAddress = result.pt?.address || '';
        const ytAddress = result.yt?.address || '';
        const syAddress = result.sy?.address || '';
        const accountingAssetAddress = result.accountingAsset?.address || '';
        const underlyingAssetAddress = result.underlyingAsset?.address || '';

        // Transform liquidity and trading volume from objects to numbers
        const liquidity = result.liquidity?.usd || 0;
        const tradingVolume = result.tradingVolume?.usd || 0;

        // Map reward tokens
        const rewardTokens: { asset: string; amount: number }[] = 
          (result.estimatedDailyPoolRewards || []).map((reward: any) => ({
            asset: reward.asset || '',
            amount: reward.amount || 0
          }));

        // Extract market math data
        const marketMathData = {
          interestFeeRate: result.extendedInfo?.feeRate || 0,
          ptExchangeRate: result.pt?.price?.usd || 0,
          syIndex: 0, // Not directly available in the response
          totalActiveSupply: result.totalActiveSupply || 0
        };

        // Construct market info object
        const info = {
          deployedBy: '' // This field isn't directly available in the response
        };

        // Fetch token lists for this market
        const tokenLists = await this.getMarketTokens(result.chainId, result.address);

        // Map the response to match our PendleMarket interface
        markets.push({
          chainId: result.chainId,
          address: result.address,
          symbol: result.proSymbol || result.symbol,
          expiry: expiryTimestamp,
          icon: result.proIcon || result.simpleIcon || '',
          pt: ptAddress,
          yt: ytAddress,
          sy: syAddress,
          accountingAsset: accountingAssetAddress,
          underlyingAsset: underlyingAssetAddress,
          rewardTokens: rewardTokens,
          // Use the fetched token lists
          inputTokens: tokenLists.tokensIn,
          outputTokens: tokenLists.tokensOut,
          // Add new token lists for mint and redeem SY operations
          tokensMintSy: tokenLists.tokensMintSy,
          tokensRedeemSy: tokenLists.tokensRedeemSy,
          protocol: result.protocol || '',
          underlyingPool: result.underlyingPool || '',
          isWhitelistedPro: result.isWhitelistedPro || false,
          maxBoostedApy: result.maxBoostedApy || 0,
          lpRewardApy: result.lpRewardApy || 0,
          voterApy: result.voterApy || 0,
          ytRoi: result.ytRoi || 0,
          ptRoi: result.ptRoi || 0,
          estimatedDailyPoolRewards: rewardTokens,
          liquidityChange24h: result.liquidityChange24h || 0,
          tradingVolumeChange24h: result.tradingVolumeChange24h || 0,
          underlyingApyChange24h: result.underlyingApyChange24h || 0,
          impliedApyChange24h: result.impliedApyChange24h || 0,
          categoryIds: result.categoryIds || [],
          timestamp: new Date(result.dataUpdatedAt || Date.now()).getTime(),
          scalarRoot: result.scalarRoot || 0,
          initialAnchor: result.initialAnchor || 0,
          info: info,
          extendedInfo: {
            floatingPt: result.extendedInfo?.floatingPt || 0,
            floatingSy: result.extendedInfo?.floatingSy || 0,
            totalTvl: result.extendedInfo?.totalTvl || liquidity || 0,
            pyUnit: result.extendedInfo?.pyUnit || '',
            ptEqualsPyUnit: result.extendedInfo?.ptEqualsPyUnit || false,
            underlyingAssetWorthMore: result.extendedInfo?.underlyingAssetWorthMore || '',
            nativeWithdrawalURL: result.extendedInfo?.nativeWithdrawalURL || '',
            movement10Percent: {
              ptMovementUpUsd: result.extendedInfo?.movement10Percent?.ptMovementUpUsd || 0,
              ptMovementDownUsd: result.extendedInfo?.movement10Percent?.ptMovementDownUsd || 0,
              ytMovementUpUsd: result.extendedInfo?.movement10Percent?.ytMovementUpUsd || 0,
              ytMovementDownUsd: result.extendedInfo?.movement10Percent?.ytMovementDownUsd || 0
            },
            feeRate: result.extendedInfo?.feeRate || 0,
            yieldRange: {
              min: result.extendedInfo?.yieldRange?.min || 0,
              max: result.extendedInfo?.yieldRange?.max || 0
            },
            underlyingAssetSupply: result.extendedInfo?.underlyingAssetSupply || 0
          },
          tvlThresholdTimestamp: new Date(result.tvlThresholdTimestamp || Date.now()).getTime(),
          offchainRewardApy: result.offchainRewardApy,
          whitelistedAt: new Date(result.whitelistedAt || Date.now()).getTime(),
          marketMathData: marketMathData,
          isNew: result.isNew || false,
          isFeatured: result.isFeatured || false,
          isPopular: result.isPopular || false,
          apyMethodology: result.apyMethodology || '',
          groupId: result.groupId,
          votable: result.votable || false,
          isActive: result.isActive || false,
          isWhitelistedLimitOrder: result.isWhitelistedLimitOrder || false,
          accentColor: result.accentColor || '',
          totalPt: result.totalPt || 0,
          totalSy: result.totalSy || 0,
          totalLp: result.totalLp || 0,
          totalActiveSupply: result.totalActiveSupply || 0,
          liquidity: liquidity,
          tradingVolume: tradingVolume,
          underlyingInterestApy: result.underlyingInterestApy || 0,
          underlyingRewardApy: result.underlyingRewardApy || 0,
          underlyingRewardApyBreakdown: result.underlyingRewardApyBreakdown || [],
          underlyingApy: result.underlyingApy || 0,
          impliedApy: result.impliedApy || 0,
          ytFloatingApy: result.ytFloatingApy || 0,
          ptDiscount: result.ptDiscount || 0,
          swapFeeApy: result.swapFeeApy || 0,
          pendleApy: result.pendleApy || 0,
          arbApy: result.arbApy || 0,
          aggregatedApy: result.aggregatedApy || 0,
          isPrime: result.isPrime,
          isPasswordProtected: result.isPasswordProtected
        });
      } catch (error) {
        console.error(`Error processing market ${result.address}:`, error);
        // Continue with next market if there's an error
      }
    }
    
    return markets;
  }
}
