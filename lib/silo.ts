import { Address, PublicClient } from "viem";
import { siloMarketData } from "./siloMarketData";
/*
silo lens - 0xB6AdBb29f2D8ae731C7C72036A7FD5A7E970B198
1. getRawLiquidity (liquidity)
2. getDepositAPR (collateralBaseApr)
3. getBorrowAPR (debtBaseApr)
4. getMaxLtv (maxLtv)
5. getLt (lt)
*/

interface SiloConfig {
  configAddress: Address;
  isToken0Silo0: boolean;
  tokenAddress: Address;
  decimals: number;
}

export class SiloConnection {
  public publicClient: PublicClient;
  public siloLensAddress: Address = '0xB6AdBb29f2D8ae731C7C72036A7FD5A7E970B198';

  constructor(publicClient: PublicClient) {
    this.publicClient = publicClient;
  }

  async getSiloAddress(
    configAddress: Address,
    tokenIndex: 0 | 1
  ): Promise<Address> {
    if (!this.publicClient) {
      throw new Error("Silo connection not properly configured");
    }

    try {
      const [silo0, silo1] = (await this.publicClient.readContract({
        address: configAddress,
        abi: SILO_CONFIG,
        functionName: "getSilos",
      })) as [Address, Address];

      if (tokenIndex === 0) {
        return silo0;
      } else if (tokenIndex === 1) {
        return silo1;
      } else {
        throw new Error("Invalid token index. Must be 0 or 1.");
      }
    } catch (error: any) {
      throw new Error(`Failed to get Silo address: ${error.message}`);
    }
  }

  async getSiloData(siloAddress: Address): Promise<{
    liquidity: string;
    collateralBaseApr: string;
    debtBaseApr: string;
    maxLtv: string;
    lt: string;
  }> {
    if (!this.publicClient) {
      throw new Error("Silo connection not properly configured");
    }

    try {
      const [liquidity, collateralBaseApr, debtBaseApr, maxLtv, lt]: any = await Promise.all([
        this.publicClient.readContract({
          address: this.siloLensAddress,
          abi: SILO_LENS_ABI,
          functionName: "getRawLiquidity",
          args: [siloAddress]
        }),
        this.publicClient.readContract({
          address: this.siloLensAddress,
          abi: SILO_LENS_ABI,
          functionName: "getDepositAPR",
          args: [siloAddress]
        }),
        this.publicClient.readContract({
          address: this.siloLensAddress,
          abi: SILO_LENS_ABI,
          functionName: "getBorrowAPR",
          args: [siloAddress]
        }),
        this.publicClient.readContract({
          address: this.siloLensAddress,
          abi: SILO_LENS_ABI,
          functionName: "getMaxLtv",
          args: [siloAddress]
        }),
        this.publicClient.readContract({
          address: this.siloLensAddress,
          abi: SILO_LENS_ABI,
          functionName: "getLt",
          args: [siloAddress]
        })
      ]);

      return {
        liquidity: liquidity.toString(),
        collateralBaseApr: collateralBaseApr.toString(),
        debtBaseApr: debtBaseApr.toString(),
        maxLtv: maxLtv.toString(),
        lt: lt.toString(),
      };
    } catch (error: any) {
      throw new Error(`Failed to fetch silo data: ${error.message}`);
    }
  }

  async updateSiloMarketData(market: any, siloIndex: 0 | 1): Promise<any> {
    const siloKey = siloIndex === 0 ? 'silo0' : 'silo1';
    const siloAddress = await this.getSiloAddress(market.configAddress as Address, siloIndex);
    const siloData = await this.getSiloData(siloAddress);
    
    // Update the market data with the fetched values
    return {
      ...market,
      [siloKey]: {
        ...market[siloKey],
        siloAddress,
        liquidity: siloData.liquidity,
        collateralBaseApr: siloData.collateralBaseApr,
        debtBaseApr: siloData.debtBaseApr,
        maxLtv: siloData.maxLtv,
        lt: siloData.lt,
      }
    };
  }

  // New functions for user position data

  // Check if user is solvent (not liquidatable)
  async isSolvent(siloAddress: Address, userAddress: Address): Promise<boolean> {
    if (!this.publicClient) {
      throw new Error("Silo connection not properly configured");
    }

    try {
      const isSolvent = await this.publicClient.readContract({
        address: siloAddress,
        abi: SILO_ABI,
        functionName: "isSolvent",
        args: [userAddress]
      });

      return isSolvent as boolean;
    } catch (error: any) {
      throw new Error(`Failed to check solvency: ${error.message}`);
    }
  }

  // Get user's loan-to-value ratio
  async getLoanToValue(siloAddress: Address, userAddress: Address): Promise<string> {
    if (!this.publicClient) {
      throw new Error("Silo connection not properly configured");
    }

    try {
      const ltv: any = await this.publicClient.readContract({
        address: this.siloLensAddress,
        abi: SILO_LENS_ABI,
        functionName: "getLtv",
        args: [siloAddress, userAddress]
      });

      return ltv.toString();
    } catch (error: any) {
      throw new Error(`Failed to get loan-to-value ratio: ${error.message}`);
    }
  }

  // Get user's regular deposit amount
  async getRegularDeposit(siloAddress: Address, userAddress: Address): Promise<string> {
    if (!this.publicClient) {
      throw new Error("Silo connection not properly configured");
    }

    try {
      const userShares = await this.publicClient.readContract({
        address: siloAddress,
        abi: SILO_ABI,
        functionName: "balanceOf",
        args: [userAddress]
      });

      const userAssets: any = await this.publicClient.readContract({
        address: siloAddress,
        abi: SILO_ABI,
        functionName: "previewRedeem",
        args: [userShares]
      });

      return userAssets.toString();
    } catch (error: any) {
      throw new Error(`Failed to get regular deposit amount: ${error.message}`);
    }
  }

  // Get user's protected deposit amount
  async getProtectedDeposit(siloAddress: Address, userAddress: Address): Promise<string> {
    if (!this.publicClient) {
      throw new Error("Silo connection not properly configured");
    }

    try {
      // Get silo config for this silo
      const config = await this.publicClient.readContract({
        address: siloAddress,
        abi: SILO_ABI,
        functionName: "config",
      });

      // Get protected share token from the config
      const [protectedShareToken] = await this.publicClient.readContract({
        address: config as Address,
        abi: SILO_CONFIG,
        functionName: "getShareTokens",
        args: [siloAddress]
      }) as [Address, Address, Address];

      // Get user's protected shares balance
      const userProtectedShares = await this.publicClient.readContract({
        address: protectedShareToken,
        abi: [
          {
            inputs: [{ name: "account", type: "address", internalType: "address" }],
            name: "balanceOf",
            outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
            stateMutability: "view",
            type: "function"
          }
        ],
        functionName: "balanceOf",
        args: [userAddress]
      });

      // Convert shares to assets
      const userProtectedAssets: any = await this.publicClient.readContract({
        address: siloAddress,
        abi: SILO_ABI,
        functionName: "previewRedeem",
        args: [userProtectedShares, 0] // 0 for Protected type
      });

      return userProtectedAssets.toString();
    } catch (error: any) {
      throw new Error(`Failed to get protected deposit amount: ${error.message}`);
    }
  }

  // Get user's total collateral balance (regular + protected deposits)
  async getTotalCollateralBalance(siloAddress: Address, userAddress: Address): Promise<string> {
    if (!this.publicClient) {
      throw new Error("Silo connection not properly configured");
    }

    try {
      const totalCollateral: any = await this.publicClient.readContract({
        address: this.siloLensAddress,
        abi: SILO_LENS_ABI,
        functionName: "collateralBalanceOfUnderlying",
        args: [siloAddress, userAddress]
      });

      return totalCollateral.toString();
    } catch (error: any) {
      throw new Error(`Failed to get total collateral balance: ${error.message}`);
    }
  }

  // Get user's borrowed amount
  async getBorrowedAmount(siloAddress: Address, userAddress: Address): Promise<string> {
    if (!this.publicClient) {
      throw new Error("Silo connection not properly configured");
    }

    try {
      const borrowedAmount: any = await this.publicClient.readContract({
        address: this.siloLensAddress,
        abi: SILO_LENS_ABI,
        functionName: "debtBalanceOfUnderlying",
        args: [siloAddress, userAddress]
      });

      return borrowedAmount.toString();
    } catch (error: any) {
      throw new Error(`Failed to get borrowed amount: ${error.message}`);
    }
  }

  // Get maximum amount user can borrow
  async getMaxBorrowAmount(siloAddress: Address, userAddress: Address): Promise<string> {
    if (!this.publicClient) {
      throw new Error("Silo connection not properly configured");
    }

    try {
      const maxBorrow: any = await this.publicClient.readContract({
        address: siloAddress,
        abi: SILO_ABI,
        functionName: "maxBorrow",
        args: [userAddress]
      });

      return maxBorrow.toString();
    } catch (error: any) {
      throw new Error(`Failed to get max borrow amount: ${error.message}`);
    }
  }
}

export const getSiloConfigAddress = async (
  token0: string,
  token1: string
): Promise<SiloConfig> => {
  // This data is still hardcoded, but the dynamic values will be fetched using SiloLens
  const siloData = siloMarketData

  for (const market of siloData) {
    if (
      (market.silo0.symbol === token0 && market.silo1.symbol === token1) ||
      (market.silo0.symbol === token1 && market.silo1.symbol === token0)
    ) {
      return {
        configAddress: market.configAddress as Address,
        isToken0Silo0: market.silo0.symbol === token0,
        tokenAddress:
          market.silo0.symbol === token0
            ? (market.silo0.tokenAddress as Address)
            : (market.silo1.tokenAddress as Address),
        decimals:
          market.silo0.symbol === token0
            ? market.silo0.decimals
            : market.silo1.decimals,
      };
    }
  }

  throw new Error(`No silo found for token pair ${token0}/${token1}`);
};

// Helper function to get updated market data with dynamic values from SiloLens
export const getUpdatedSiloMarketData = async (publicClient: PublicClient, marketData: any[]): Promise<any[]> => {
  const siloConnection = new SiloConnection(publicClient);
  const updatedMarkets = [];

  for (const market of marketData) {
    try {
      // Update silo0 data
      let updatedMarket = await siloConnection.updateSiloMarketData(market, 0);
      // Update silo1 data
      updatedMarket = await siloConnection.updateSiloMarketData(updatedMarket, 1);
      updatedMarkets.push(updatedMarket);
    } catch (error) {
      console.error(`Error updating market ${market.id}:`, error);
      // Keep the original market data if there's an error
      updatedMarkets.push(market);
    }
  }

  return updatedMarkets;
};

export async function getUpdatedMarketsForTokens(
  publicClient: PublicClient, 
  marketData: any[], 
  requestedTokens: string[]
): Promise<any[]> {
  const siloConnection = new SiloConnection(publicClient);
  const filteredMarkets = [];

  // First, filter the markets based on the requested tokens
  for (const market of marketData) {
    const marketTokens = [
      market.silo0.symbol.toLowerCase(),
      market.silo1.symbol.toLowerCase()
    ];
    // Count how many requested tokens are in this market
    const matchCount = requestedTokens.filter(token => 
      marketTokens.includes(token.toLowerCase())
    ).length;
    
    // Check if at least two tokens match (or all tokens if less than 2 requested)
    const minRequired = Math.min(2, requestedTokens.length);
    if (matchCount >= minRequired) {
      try {
        // Now update only the markets that match our filter
        const updatedSilo0 = await siloConnection.updateSiloMarketData(market, 0);
        const updatedMarket = await siloConnection.updateSiloMarketData(updatedSilo0, 1);
        filteredMarkets.push(updatedMarket);
      } catch (error) {
        console.error(`Error updating market ${market.id}:`, error);
        // Include the market anyway, but with the original data
        filteredMarkets.push(market);
      }
    }
  }

  return filteredMarkets;
}



// Get complete user position data
export const getUserPositionData = async (
  publicClient: PublicClient,
  siloAddress: Address,
  userAddress: Address
): Promise<{
  regularDeposit: string;
  protectedDeposit: string;
  totalCollateral: string;
  borrowedAmount: string;
  maxBorrowAmount: string;
  loanToValue: string;
  isSolvent: boolean;
}> => {
  const siloConnection = new SiloConnection(publicClient);

  // Fetch all position data in parallel
  const [
    regularDeposit,
    protectedDeposit,
    totalCollateral,
    borrowedAmount,
    maxBorrowAmount,
    loanToValue,
    isSolvent
  ] = await Promise.all([
    siloConnection.getRegularDeposit(siloAddress, userAddress),
    siloConnection.getProtectedDeposit(siloAddress, userAddress),
    siloConnection.getTotalCollateralBalance(siloAddress, userAddress),
    siloConnection.getBorrowedAmount(siloAddress, userAddress),
    siloConnection.getMaxBorrowAmount(siloAddress, userAddress),
    siloConnection.getLoanToValue(siloAddress, userAddress),
    siloConnection.isSolvent(siloAddress, userAddress)
  ]);

  return {
    regularDeposit,
    protectedDeposit,
    totalCollateral,
    borrowedAmount,
    maxBorrowAmount,
    loanToValue,
    isSolvent
  };
};

export const SILO_ABI = [
  {
    inputs: [
      {
        internalType: "contract ISiloFactory",
        name: "_siloFactory",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
  {
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "accrueInterest",
    outputs: [
      {
        internalType: "uint256",
        name: "accruedInterest",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_interestRateModel",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_daoFee",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_deployerFee",
        type: "uint256",
      },
    ],
    name: "accrueInterestForConfig",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "result",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "asset",
    outputs: [
      {
        internalType: "address",
        name: "assetTokenAddress",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_account",
        type: "address",
      },
    ],
    name: "balanceOfAndTotalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_assets",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_receiver",
        type: "address",
      },
      {
        internalType: "address",
        name: "_borrower",
        type: "address",
      },
    ],
    name: "borrow",
    outputs: [
      {
        internalType: "uint256",
        name: "shares",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_assets",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_receiver",
        type: "address",
      },
      {
        internalType: "address",
        name: "_borrower",
        type: "address",
      },
    ],
    name: "borrowSameAsset",
    outputs: [
      {
        internalType: "uint256",
        name: "shares",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_shares",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_receiver",
        type: "address",
      },
      {
        internalType: "address",
        name: "_borrower",
        type: "address",
      },
    ],
    name: "borrowShares",
    outputs: [
      {
        internalType: "uint256",
        name: "assets",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "_spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_target",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
      {
        internalType: "enum ISilo.CallType",
        name: "_callType",
        type: "uint8",
      },
      {
        internalType: "bytes",
        name: "_input",
        type: "bytes",
      },
    ],
    name: "callOnBehalfOfSilo",
    outputs: [
      {
        internalType: "bool",
        name: "success",
        type: "bool",
      },
      {
        internalType: "bytes",
        name: "result",
        type: "bytes",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "config",
    outputs: [
      {
        internalType: "contract ISiloConfig",
        name: "siloConfig",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_shares",
        type: "uint256",
      },
    ],
    name: "convertToAssets",
    outputs: [
      {
        internalType: "uint256",
        name: "assets",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_shares",
        type: "uint256",
      },
      {
        internalType: "enum ISilo.AssetType",
        name: "_assetType",
        type: "uint8",
      },
    ],
    name: "convertToAssets",
    outputs: [
      {
        internalType: "uint256",
        name: "assets",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_assets",
        type: "uint256",
      },
      {
        internalType: "enum ISilo.AssetType",
        name: "_assetType",
        type: "uint8",
      },
    ],
    name: "convertToShares",
    outputs: [
      {
        internalType: "uint256",
        name: "shares",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_assets",
        type: "uint256",
      },
    ],
    name: "convertToShares",
    outputs: [
      {
        internalType: "uint256",
        name: "shares",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_assets",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_receiver",
        type: "address",
      },
    ],
    name: "deposit",
    outputs: [
      {
        internalType: "uint256",
        name: "shares",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_assets",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_receiver",
        type: "address",
      },
      {
        internalType: "enum ISilo.CollateralType",
        name: "_collateralType",
        type: "uint8",
      },
    ],
    name: "deposit",
    outputs: [
      {
        internalType: "uint256",
        name: "shares",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "eip712Domain",
    outputs: [
      {
        internalType: "bytes1",
        name: "fields",
        type: "bytes1",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "version",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "chainId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "verifyingContract",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "salt",
        type: "bytes32",
      },
      {
        internalType: "uint256[]",
        name: "extensions",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "factory",
    outputs: [
      {
        internalType: "contract ISiloFactory",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "flashFee",
    outputs: [
      {
        internalType: "uint256",
        name: "fee",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IERC3156FlashBorrower",
        name: "_receiver",
        type: "address",
      },
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "flashLoan",
    outputs: [
      {
        internalType: "bool",
        name: "success",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_from",
        type: "address",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "forwardTransferFromNoChecks",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getCollateralAndDebtTotalsStorage",
    outputs: [
      {
        internalType: "uint256",
        name: "totalCollateralAssets",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalDebtAssets",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCollateralAndProtectedTotalsStorage",
    outputs: [
      {
        internalType: "uint256",
        name: "totalCollateralAssets",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalProtectedAssets",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCollateralAssets",
    outputs: [
      {
        internalType: "uint256",
        name: "totalCollateralAssets",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getDebtAssets",
    outputs: [
      {
        internalType: "uint256",
        name: "totalDebtAssets",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getLiquidity",
    outputs: [
      {
        internalType: "uint256",
        name: "liquidity",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getSiloStorage",
    outputs: [
      {
        internalType: "uint192",
        name: "daoAndDeployerRevenue",
        type: "uint192",
      },
      {
        internalType: "uint64",
        name: "interestRateTimestamp",
        type: "uint64",
      },
      {
        internalType: "uint256",
        name: "protectedAssets",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "collateralAssets",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "debtAssets",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum ISilo.AssetType",
        name: "_assetType",
        type: "uint8",
      },
    ],
    name: "getTotalAssetsStorage",
    outputs: [
      {
        internalType: "uint256",
        name: "totalAssetsByType",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "hookReceiver",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "hookSetup",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "hookReceiver",
            type: "address",
          },
          {
            internalType: "uint24",
            name: "hooksBefore",
            type: "uint24",
          },
          {
            internalType: "uint24",
            name: "hooksAfter",
            type: "uint24",
          },
          {
            internalType: "uint24",
            name: "tokenType",
            type: "uint24",
          },
        ],
        internalType: "struct IShareToken.HookSetup",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISiloConfig",
        name: "_config",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_borrower",
        type: "address",
      },
    ],
    name: "isSolvent",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_borrower",
        type: "address",
      },
    ],
    name: "maxBorrow",
    outputs: [
      {
        internalType: "uint256",
        name: "maxAssets",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_borrower",
        type: "address",
      },
    ],
    name: "maxBorrowSameAsset",
    outputs: [
      {
        internalType: "uint256",
        name: "maxAssets",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_borrower",
        type: "address",
      },
    ],
    name: "maxBorrowShares",
    outputs: [
      {
        internalType: "uint256",
        name: "maxShares",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "maxDeposit",
    outputs: [
      {
        internalType: "uint256",
        name: "maxAssets",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
    ],
    name: "maxFlashLoan",
    outputs: [
      {
        internalType: "uint256",
        name: "maxLoan",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "maxMint",
    outputs: [
      {
        internalType: "uint256",
        name: "maxShares",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "enum ISilo.CollateralType",
        name: "_collateralType",
        type: "uint8",
      },
    ],
    name: "maxRedeem",
    outputs: [
      {
        internalType: "uint256",
        name: "maxShares",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
    ],
    name: "maxRedeem",
    outputs: [
      {
        internalType: "uint256",
        name: "maxShares",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_borrower",
        type: "address",
      },
    ],
    name: "maxRepay",
    outputs: [
      {
        internalType: "uint256",
        name: "assets",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_borrower",
        type: "address",
      },
    ],
    name: "maxRepayShares",
    outputs: [
      {
        internalType: "uint256",
        name: "shares",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "enum ISilo.CollateralType",
        name: "_collateralType",
        type: "uint8",
      },
    ],
    name: "maxWithdraw",
    outputs: [
      {
        internalType: "uint256",
        name: "maxAssets",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
    ],
    name: "maxWithdraw",
    outputs: [
      {
        internalType: "uint256",
        name: "maxAssets",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_shares",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_receiver",
        type: "address",
      },
    ],
    name: "mint",
    outputs: [
      {
        internalType: "uint256",
        name: "assets",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_shares",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_receiver",
        type: "address",
      },
      {
        internalType: "enum ISilo.CollateralType",
        name: "_collateralType",
        type: "uint8",
      },
    ],
    name: "mint",
    outputs: [
      {
        internalType: "uint256",
        name: "assets",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "nonces",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "permit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_assets",
        type: "uint256",
      },
    ],
    name: "previewBorrow",
    outputs: [
      {
        internalType: "uint256",
        name: "shares",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_shares",
        type: "uint256",
      },
    ],
    name: "previewBorrowShares",
    outputs: [
      {
        internalType: "uint256",
        name: "assets",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_assets",
        type: "uint256",
      },
      {
        internalType: "enum ISilo.CollateralType",
        name: "_collateralType",
        type: "uint8",
      },
    ],
    name: "previewDeposit",
    outputs: [
      {
        internalType: "uint256",
        name: "shares",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_assets",
        type: "uint256",
      },
    ],
    name: "previewDeposit",
    outputs: [
      {
        internalType: "uint256",
        name: "shares",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_shares",
        type: "uint256",
      },
      {
        internalType: "enum ISilo.CollateralType",
        name: "_collateralType",
        type: "uint8",
      },
    ],
    name: "previewMint",
    outputs: [
      {
        internalType: "uint256",
        name: "assets",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_shares",
        type: "uint256",
      },
    ],
    name: "previewMint",
    outputs: [
      {
        internalType: "uint256",
        name: "assets",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_shares",
        type: "uint256",
      },
    ],
    name: "previewRedeem",
    outputs: [
      {
        internalType: "uint256",
        name: "assets",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_shares",
        type: "uint256",
      },
      {
        internalType: "enum ISilo.CollateralType",
        name: "_collateralType",
        type: "uint8",
      },
    ],
    name: "previewRedeem",
    outputs: [
      {
        internalType: "uint256",
        name: "assets",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_assets",
        type: "uint256",
      },
    ],
    name: "previewRepay",
    outputs: [
      {
        internalType: "uint256",
        name: "shares",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_shares",
        type: "uint256",
      },
    ],
    name: "previewRepayShares",
    outputs: [
      {
        internalType: "uint256",
        name: "assets",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_assets",
        type: "uint256",
      },
    ],
    name: "previewWithdraw",
    outputs: [
      {
        internalType: "uint256",
        name: "shares",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_assets",
        type: "uint256",
      },
      {
        internalType: "enum ISilo.CollateralType",
        name: "_collateralType",
        type: "uint8",
      },
    ],
    name: "previewWithdraw",
    outputs: [
      {
        internalType: "uint256",
        name: "shares",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_shares",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_receiver",
        type: "address",
      },
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
    ],
    name: "redeem",
    outputs: [
      {
        internalType: "uint256",
        name: "assets",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_shares",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_receiver",
        type: "address",
      },
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "enum ISilo.CollateralType",
        name: "_collateralType",
        type: "uint8",
      },
    ],
    name: "redeem",
    outputs: [
      {
        internalType: "uint256",
        name: "assets",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_assets",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_borrower",
        type: "address",
      },
    ],
    name: "repay",
    outputs: [
      {
        internalType: "uint256",
        name: "shares",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_shares",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_borrower",
        type: "address",
      },
    ],
    name: "repayShares",
    outputs: [
      {
        internalType: "uint256",
        name: "assets",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "silo",
    outputs: [
      {
        internalType: "contract ISilo",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "siloConfig",
    outputs: [
      {
        internalType: "contract ISiloConfig",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "switchCollateralToThisSilo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint24",
        name: "_hooksBefore",
        type: "uint24",
      },
      {
        internalType: "uint24",
        name: "_hooksAfter",
        type: "uint24",
      },
    ],
    name: "synchronizeHooks",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "totalAssets",
    outputs: [
      {
        internalType: "uint256",
        name: "totalManagedAssets",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "result",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_from",
        type: "address",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "result",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_shares",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "enum ISilo.CollateralType",
        name: "_transitionFrom",
        type: "uint8",
      },
    ],
    name: "transitionCollateral",
    outputs: [
      {
        internalType: "uint256",
        name: "assets",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "updateHooks",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "utilizationData",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "collateralAssets",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "debtAssets",
            type: "uint256",
          },
          {
            internalType: "uint64",
            name: "interestRateTimestamp",
            type: "uint64",
          },
        ],
        internalType: "struct ISilo.UtilizationData",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_assets",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_receiver",
        type: "address",
      },
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "enum ISilo.CollateralType",
        name: "_collateralType",
        type: "uint8",
      },
    ],
    name: "withdraw",
    outputs: [
      {
        internalType: "uint256",
        name: "shares",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawFees",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "hooksBefore",
        type: "uint256",
      },
    ],
    name: "AccruedInterest",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "assets",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "shares",
        type: "uint256",
      },
    ],
    name: "Borrow",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "borrower",
        type: "address",
      },
    ],
    name: "CollateralTypeChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "assets",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "shares",
        type: "uint256",
      },
    ],
    name: "Deposit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "assets",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "shares",
        type: "uint256",
      },
    ],
    name: "DepositProtected",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [],
    name: "EIP712DomainChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "FlashLoan",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint24",
        name: "hooksBefore",
        type: "uint24",
      },
      {
        indexed: false,
        internalType: "uint24",
        name: "hooksAfter",
        type: "uint24",
      },
    ],
    name: "HooksUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint64",
        name: "version",
        type: "uint64",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "notificationReceiver",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "success",
        type: "bool",
      },
    ],
    name: "NotificationSent",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "assets",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "shares",
        type: "uint256",
      },
    ],
    name: "Repay",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "assets",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "shares",
        type: "uint256",
      },
    ],
    name: "Withdraw",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "assets",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "shares",
        type: "uint256",
      },
    ],
    name: "WithdrawProtected",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "daoFees",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "deployerFees",
        type: "uint256",
      },
    ],
    name: "WithdrawnFeed",
    type: "event",
  },
  {
    inputs: [],
    name: "AboveMaxLtv",
    type: "error",
  },
  {
    inputs: [],
    name: "AmountExceedsAllowance",
    type: "error",
  },
  {
    inputs: [],
    name: "BorrowNotPossible",
    type: "error",
  },
  {
    inputs: [],
    name: "CollateralSiloAlreadySet",
    type: "error",
  },
  {
    inputs: [],
    name: "CrossReentrantCall",
    type: "error",
  },
  {
    inputs: [],
    name: "ECDSAInvalidSignature",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "length",
        type: "uint256",
      },
    ],
    name: "ECDSAInvalidSignatureLength",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "ECDSAInvalidSignatureS",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "allowance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256",
      },
    ],
    name: "ERC20InsufficientAllowance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256",
      },
    ],
    name: "ERC20InsufficientBalance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "approver",
        type: "address",
      },
    ],
    name: "ERC20InvalidApprover",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "ERC20InvalidReceiver",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "ERC20InvalidSender",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "ERC20InvalidSpender",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "ERC2612ExpiredSignature",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "signer",
        type: "address",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "ERC2612InvalidSigner",
    type: "error",
  },
  {
    inputs: [],
    name: "EarnedZero",
    type: "error",
  },
  {
    inputs: [],
    name: "FlashloanAmountTooBig",
    type: "error",
  },
  {
    inputs: [],
    name: "FlashloanFailed",
    type: "error",
  },
  {
    inputs: [],
    name: "InputCanBeAssetsOrShares",
    type: "error",
  },
  {
    inputs: [],
    name: "InputZeroShares",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "currentNonce",
        type: "uint256",
      },
    ],
    name: "InvalidAccountNonce",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidInitialization",
    type: "error",
  },
  {
    inputs: [],
    name: "NoLiquidity",
    type: "error",
  },
  {
    inputs: [],
    name: "NotEnoughLiquidity",
    type: "error",
  },
  {
    inputs: [],
    name: "NotInitializing",
    type: "error",
  },
  {
    inputs: [],
    name: "NotSolvent",
    type: "error",
  },
  {
    inputs: [],
    name: "NothingToWithdraw",
    type: "error",
  },
  {
    inputs: [],
    name: "OnlyHookReceiver",
    type: "error",
  },
  {
    inputs: [],
    name: "OnlySilo",
    type: "error",
  },
  {
    inputs: [],
    name: "OnlySiloConfig",
    type: "error",
  },
  {
    inputs: [],
    name: "OwnerIsZero",
    type: "error",
  },
  {
    inputs: [],
    name: "RecipientIsZero",
    type: "error",
  },
  {
    inputs: [],
    name: "RecipientNotSolventAfterTransfer",
    type: "error",
  },
  {
    inputs: [],
    name: "RepayTooHigh",
    type: "error",
  },
  {
    inputs: [],
    name: "ReturnZeroAssets",
    type: "error",
  },
  {
    inputs: [],
    name: "ReturnZeroShares",
    type: "error",
  },
  {
    inputs: [],
    name: "SenderNotSolventAfterTransfer",
    type: "error",
  },
  {
    inputs: [],
    name: "SiloInitialized",
    type: "error",
  },
  {
    inputs: [],
    name: "UnsupportedFlashloanToken",
    type: "error",
  },
  {
    inputs: [],
    name: "ZeroAmount",
    type: "error",
  },
  {
    inputs: [],
    name: "ZeroTransfer",
    type: "error",
  },
];

export const SILO_CONFIG = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_siloId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_configData0",
        type: "tuple",
        internalType: "struct ISiloConfig.ConfigData",
        components: [
          {
            name: "daoFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "deployerFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "silo",
            type: "address",
            internalType: "address",
          },
          {
            name: "token",
            type: "address",
            internalType: "address",
          },
          {
            name: "protectedShareToken",
            type: "address",
            internalType: "address",
          },
          {
            name: "collateralShareToken",
            type: "address",
            internalType: "address",
          },
          {
            name: "debtShareToken",
            type: "address",
            internalType: "address",
          },
          {
            name: "solvencyOracle",
            type: "address",
            internalType: "address",
          },
          {
            name: "maxLtvOracle",
            type: "address",
            internalType: "address",
          },
          {
            name: "interestRateModel",
            type: "address",
            internalType: "address",
          },
          {
            name: "maxLtv",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "lt",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "liquidationTargetLtv",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "liquidationFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "flashloanFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "hookReceiver",
            type: "address",
            internalType: "address",
          },
          {
            name: "callBeforeQuote",
            type: "bool",
            internalType: "bool",
          },
        ],
      },
      {
        name: "_configData1",
        type: "tuple",
        internalType: "struct ISiloConfig.ConfigData",
        components: [
          {
            name: "daoFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "deployerFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "silo",
            type: "address",
            internalType: "address",
          },
          {
            name: "token",
            type: "address",
            internalType: "address",
          },
          {
            name: "protectedShareToken",
            type: "address",
            internalType: "address",
          },
          {
            name: "collateralShareToken",
            type: "address",
            internalType: "address",
          },
          {
            name: "debtShareToken",
            type: "address",
            internalType: "address",
          },
          {
            name: "solvencyOracle",
            type: "address",
            internalType: "address",
          },
          {
            name: "maxLtvOracle",
            type: "address",
            internalType: "address",
          },
          {
            name: "interestRateModel",
            type: "address",
            internalType: "address",
          },
          {
            name: "maxLtv",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "lt",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "liquidationTargetLtv",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "liquidationFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "flashloanFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "hookReceiver",
            type: "address",
            internalType: "address",
          },
          {
            name: "callBeforeQuote",
            type: "bool",
            internalType: "bool",
          },
        ],
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "SILO_ID",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "accrueInterestForBothSilos",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "accrueInterestForSilo",
    inputs: [
      {
        name: "_silo",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "borrowerCollateralSilo",
    inputs: [
      {
        name: "borrower",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "collateralSilo",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getAssetForSilo",
    inputs: [
      {
        name: "_silo",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "asset",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getCollateralShareTokenAndAsset",
    inputs: [
      {
        name: "_silo",
        type: "address",
        internalType: "address",
      },
      {
        name: "_collateralType",
        type: "uint8",
        internalType: "enum ISilo.CollateralType",
      },
    ],
    outputs: [
      {
        name: "shareToken",
        type: "address",
        internalType: "address",
      },
      {
        name: "asset",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getConfig",
    inputs: [
      {
        name: "_silo",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "config",
        type: "tuple",
        internalType: "struct ISiloConfig.ConfigData",
        components: [
          {
            name: "daoFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "deployerFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "silo",
            type: "address",
            internalType: "address",
          },
          {
            name: "token",
            type: "address",
            internalType: "address",
          },
          {
            name: "protectedShareToken",
            type: "address",
            internalType: "address",
          },
          {
            name: "collateralShareToken",
            type: "address",
            internalType: "address",
          },
          {
            name: "debtShareToken",
            type: "address",
            internalType: "address",
          },
          {
            name: "solvencyOracle",
            type: "address",
            internalType: "address",
          },
          {
            name: "maxLtvOracle",
            type: "address",
            internalType: "address",
          },
          {
            name: "interestRateModel",
            type: "address",
            internalType: "address",
          },
          {
            name: "maxLtv",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "lt",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "liquidationTargetLtv",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "liquidationFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "flashloanFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "hookReceiver",
            type: "address",
            internalType: "address",
          },
          {
            name: "callBeforeQuote",
            type: "bool",
            internalType: "bool",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getConfigsForBorrow",
    inputs: [
      {
        name: "_debtSilo",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "collateralConfig",
        type: "tuple",
        internalType: "struct ISiloConfig.ConfigData",
        components: [
          {
            name: "daoFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "deployerFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "silo",
            type: "address",
            internalType: "address",
          },
          {
            name: "token",
            type: "address",
            internalType: "address",
          },
          {
            name: "protectedShareToken",
            type: "address",
            internalType: "address",
          },
          {
            name: "collateralShareToken",
            type: "address",
            internalType: "address",
          },
          {
            name: "debtShareToken",
            type: "address",
            internalType: "address",
          },
          {
            name: "solvencyOracle",
            type: "address",
            internalType: "address",
          },
          {
            name: "maxLtvOracle",
            type: "address",
            internalType: "address",
          },
          {
            name: "interestRateModel",
            type: "address",
            internalType: "address",
          },
          {
            name: "maxLtv",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "lt",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "liquidationTargetLtv",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "liquidationFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "flashloanFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "hookReceiver",
            type: "address",
            internalType: "address",
          },
          {
            name: "callBeforeQuote",
            type: "bool",
            internalType: "bool",
          },
        ],
      },
      {
        name: "debtConfig",
        type: "tuple",
        internalType: "struct ISiloConfig.ConfigData",
        components: [
          {
            name: "daoFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "deployerFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "silo",
            type: "address",
            internalType: "address",
          },
          {
            name: "token",
            type: "address",
            internalType: "address",
          },
          {
            name: "protectedShareToken",
            type: "address",
            internalType: "address",
          },
          {
            name: "collateralShareToken",
            type: "address",
            internalType: "address",
          },
          {
            name: "debtShareToken",
            type: "address",
            internalType: "address",
          },
          {
            name: "solvencyOracle",
            type: "address",
            internalType: "address",
          },
          {
            name: "maxLtvOracle",
            type: "address",
            internalType: "address",
          },
          {
            name: "interestRateModel",
            type: "address",
            internalType: "address",
          },
          {
            name: "maxLtv",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "lt",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "liquidationTargetLtv",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "liquidationFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "flashloanFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "hookReceiver",
            type: "address",
            internalType: "address",
          },
          {
            name: "callBeforeQuote",
            type: "bool",
            internalType: "bool",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getConfigsForSolvency",
    inputs: [
      {
        name: "_borrower",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "collateralConfig",
        type: "tuple",
        internalType: "struct ISiloConfig.ConfigData",
        components: [
          {
            name: "daoFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "deployerFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "silo",
            type: "address",
            internalType: "address",
          },
          {
            name: "token",
            type: "address",
            internalType: "address",
          },
          {
            name: "protectedShareToken",
            type: "address",
            internalType: "address",
          },
          {
            name: "collateralShareToken",
            type: "address",
            internalType: "address",
          },
          {
            name: "debtShareToken",
            type: "address",
            internalType: "address",
          },
          {
            name: "solvencyOracle",
            type: "address",
            internalType: "address",
          },
          {
            name: "maxLtvOracle",
            type: "address",
            internalType: "address",
          },
          {
            name: "interestRateModel",
            type: "address",
            internalType: "address",
          },
          {
            name: "maxLtv",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "lt",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "liquidationTargetLtv",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "liquidationFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "flashloanFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "hookReceiver",
            type: "address",
            internalType: "address",
          },
          {
            name: "callBeforeQuote",
            type: "bool",
            internalType: "bool",
          },
        ],
      },
      {
        name: "debtConfig",
        type: "tuple",
        internalType: "struct ISiloConfig.ConfigData",
        components: [
          {
            name: "daoFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "deployerFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "silo",
            type: "address",
            internalType: "address",
          },
          {
            name: "token",
            type: "address",
            internalType: "address",
          },
          {
            name: "protectedShareToken",
            type: "address",
            internalType: "address",
          },
          {
            name: "collateralShareToken",
            type: "address",
            internalType: "address",
          },
          {
            name: "debtShareToken",
            type: "address",
            internalType: "address",
          },
          {
            name: "solvencyOracle",
            type: "address",
            internalType: "address",
          },
          {
            name: "maxLtvOracle",
            type: "address",
            internalType: "address",
          },
          {
            name: "interestRateModel",
            type: "address",
            internalType: "address",
          },
          {
            name: "maxLtv",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "lt",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "liquidationTargetLtv",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "liquidationFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "flashloanFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "hookReceiver",
            type: "address",
            internalType: "address",
          },
          {
            name: "callBeforeQuote",
            type: "bool",
            internalType: "bool",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getConfigsForWithdraw",
    inputs: [
      {
        name: "_silo",
        type: "address",
        internalType: "address",
      },
      {
        name: "_depositOwner",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "depositConfig",
        type: "tuple",
        internalType: "struct ISiloConfig.DepositConfig",
        components: [
          {
            name: "silo",
            type: "address",
            internalType: "address",
          },
          {
            name: "token",
            type: "address",
            internalType: "address",
          },
          {
            name: "collateralShareToken",
            type: "address",
            internalType: "address",
          },
          {
            name: "protectedShareToken",
            type: "address",
            internalType: "address",
          },
          {
            name: "daoFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "deployerFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "interestRateModel",
            type: "address",
            internalType: "address",
          },
        ],
      },
      {
        name: "collateralConfig",
        type: "tuple",
        internalType: "struct ISiloConfig.ConfigData",
        components: [
          {
            name: "daoFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "deployerFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "silo",
            type: "address",
            internalType: "address",
          },
          {
            name: "token",
            type: "address",
            internalType: "address",
          },
          {
            name: "protectedShareToken",
            type: "address",
            internalType: "address",
          },
          {
            name: "collateralShareToken",
            type: "address",
            internalType: "address",
          },
          {
            name: "debtShareToken",
            type: "address",
            internalType: "address",
          },
          {
            name: "solvencyOracle",
            type: "address",
            internalType: "address",
          },
          {
            name: "maxLtvOracle",
            type: "address",
            internalType: "address",
          },
          {
            name: "interestRateModel",
            type: "address",
            internalType: "address",
          },
          {
            name: "maxLtv",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "lt",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "liquidationTargetLtv",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "liquidationFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "flashloanFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "hookReceiver",
            type: "address",
            internalType: "address",
          },
          {
            name: "callBeforeQuote",
            type: "bool",
            internalType: "bool",
          },
        ],
      },
      {
        name: "debtConfig",
        type: "tuple",
        internalType: "struct ISiloConfig.ConfigData",
        components: [
          {
            name: "daoFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "deployerFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "silo",
            type: "address",
            internalType: "address",
          },
          {
            name: "token",
            type: "address",
            internalType: "address",
          },
          {
            name: "protectedShareToken",
            type: "address",
            internalType: "address",
          },
          {
            name: "collateralShareToken",
            type: "address",
            internalType: "address",
          },
          {
            name: "debtShareToken",
            type: "address",
            internalType: "address",
          },
          {
            name: "solvencyOracle",
            type: "address",
            internalType: "address",
          },
          {
            name: "maxLtvOracle",
            type: "address",
            internalType: "address",
          },
          {
            name: "interestRateModel",
            type: "address",
            internalType: "address",
          },
          {
            name: "maxLtv",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "lt",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "liquidationTargetLtv",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "liquidationFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "flashloanFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "hookReceiver",
            type: "address",
            internalType: "address",
          },
          {
            name: "callBeforeQuote",
            type: "bool",
            internalType: "bool",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getDebtShareTokenAndAsset",
    inputs: [
      {
        name: "_silo",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "shareToken",
        type: "address",
        internalType: "address",
      },
      {
        name: "asset",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getDebtSilo",
    inputs: [
      {
        name: "_borrower",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "debtSilo",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getFeesWithAsset",
    inputs: [
      {
        name: "_silo",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "daoFee",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "deployerFee",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "flashloanFee",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "asset",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getShareTokens",
    inputs: [
      {
        name: "_silo",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "protectedShareToken",
        type: "address",
        internalType: "address",
      },
      {
        name: "collateralShareToken",
        type: "address",
        internalType: "address",
      },
      {
        name: "debtShareToken",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getSilos",
    inputs: [],
    outputs: [
      {
        name: "silo0",
        type: "address",
        internalType: "address",
      },
      {
        name: "silo1",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "hasDebtInOtherSilo",
    inputs: [
      {
        name: "_thisSilo",
        type: "address",
        internalType: "address",
      },
      {
        name: "_borrower",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "hasDebt",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "onDebtTransfer",
    inputs: [
      {
        name: "_sender",
        type: "address",
        internalType: "address",
      },
      {
        name: "_recipient",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "reentrancyGuardEntered",
    inputs: [],
    outputs: [
      {
        name: "entered",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "setOtherSiloAsCollateralSilo",
    inputs: [
      {
        name: "_borrower",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setThisSiloAsCollateralSilo",
    inputs: [
      {
        name: "_borrower",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "turnOffReentrancyProtection",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "turnOnReentrancyProtection",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "error",
    name: "CrossReentrancyNotActive",
    inputs: [],
  },
  {
    type: "error",
    name: "CrossReentrantCall",
    inputs: [],
  },
  {
    type: "error",
    name: "DebtExistInOtherSilo",
    inputs: [],
  },
  {
    type: "error",
    name: "FeeTooHigh",
    inputs: [],
  },
  {
    type: "error",
    name: "OnlyDebtShareToken",
    inputs: [],
  },
  {
    type: "error",
    name: "OnlySilo",
    inputs: [],
  },
  {
    type: "error",
    name: "OnlySiloOrTokenOrHookReceiver",
    inputs: [],
  },
  {
    type: "error",
    name: "WrongSilo",
    inputs: [],
  },
];

export const SILO_LENS_ABI = [
  {
    inputs: [
      {
        internalType: "contract ISilo",
        name: "_silo",
        type: "address",
      },
      {
        internalType: "address",
        name: "_borrower",
        type: "address",
      },
    ],
    name: "collateralBalanceOfUnderlying",
    outputs: [
      {
        internalType: "uint256",
        name: "borrowerCollateral",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISilo",
        name: "_silo",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "_borrower",
        type: "address",
      },
    ],
    name: "collateralBalanceOfUnderlying",
    outputs: [
      {
        internalType: "uint256",
        name: "borrowerCollateral",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISilo",
        name: "_silo",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "_borrower",
        type: "address",
      },
    ],
    name: "debtBalanceOfUnderlying",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISilo",
        name: "_silo",
        type: "address",
      },
      {
        internalType: "address",
        name: "_borrower",
        type: "address",
      },
    ],
    name: "debtBalanceOfUnderlying",
    outputs: [
      {
        internalType: "uint256",
        name: "borrowerDebt",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISilo",
        name: "_silo",
        type: "address",
      },
    ],
    name: "getBorrowAPR",
    outputs: [
      {
        internalType: "uint256",
        name: "borrowAPR",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISilo",
        name: "_silo",
        type: "address",
      },
    ],
    name: "getDepositAPR",
    outputs: [
      {
        internalType: "uint256",
        name: "depositAPR",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISilo",
        name: "_silo",
        type: "address",
      },
    ],
    name: "getFeesAndFeeReceivers",
    outputs: [
      {
        internalType: "address",
        name: "daoFeeReceiver",
        type: "address",
      },
      {
        internalType: "address",
        name: "deployerFeeReceiver",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "daoFee",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "deployerFee",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISilo",
        name: "_silo",
        type: "address",
      },
    ],
    name: "getInterestRateModel",
    outputs: [
      {
        internalType: "address",
        name: "irm",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISilo",
        name: "_silo",
        type: "address",
      },
    ],
    name: "getLt",
    outputs: [
      {
        internalType: "uint256",
        name: "lt",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISilo",
        name: "_silo",
        type: "address",
      },
      {
        internalType: "address",
        name: "_borrower",
        type: "address",
      },
    ],
    name: "getLtv",
    outputs: [
      {
        internalType: "uint256",
        name: "ltv",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISilo",
        name: "_silo",
        type: "address",
      },
    ],
    name: "getMaxLtv",
    outputs: [
      {
        internalType: "uint256",
        name: "maxLtv",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISilo",
        name: "_silo",
        type: "address",
      },
    ],
    name: "getRawLiquidity",
    outputs: [
      {
        internalType: "uint256",
        name: "liquidity",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISilo",
        name: "_silo",
        type: "address",
      },
      {
        internalType: "contract IPartialLiquidation",
        name: "_hook",
        type: "address",
      },
      {
        internalType: "address",
        name: "_borrower",
        type: "address",
      },
    ],
    name: "maxLiquidation",
    outputs: [
      {
        internalType: "uint256",
        name: "collateralToLiquidate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "debtToRepay",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "sTokenRequired",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "fullLiquidation",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
