import { AddLiquidityBoostedQueryOutput, Address, ExactInQueryOutput, ExactOutQueryOutput, Path, RemoveLiquidityBoostedQueryOutput, Slippage } from "@balancer/sdk";

type TransactionType =
  | "transfer"
  | "swap"
  | "deposit"
  | "borrow"
  | "repay"
  | "withdraw"
  | "bridge"
  | "stake"
  | "undelegate"
  | "claim_rewards"
  | "withdraw_stake";

export interface TransactionData {
  to: string;
  data: string;
  value: bigint;
}

export type BeetsSwap = {
  transaction: {
    to: string;
    data: string;
    value: number;
  };
  approvals: {
    token: string;
    spender: string;
    amount: number;
  }[];
  paths: Path[];
  permitData: {
    slippage: Slippage;
    queryOutput: ExactInQueryOutput;
  }
};

export interface BaseTransaction {
  type: TransactionType;
  to: `0x${string}`;
  value?: string;
  chainId: number;
  data?: `0x${string}` | undefined;
  gas?: string;
  maxFeePerGas?: string;
  maxPriorityFeePerGas?: string;
  tokenAddress?: `0x${string}`;
  amount?: string;
}

export interface ApproveTransaction {
  approve: {
    amountIn: string;
    amountOut: string;
    amountInUsd: number;
    amountOutUsd: number;
    gas: number;
    gasPrice: string;
    gasUsd: number;
    tokenIn: `0x${string}`;
    routerAddress: `0x${string}`;
    chainId: number;
    route?: {
      exchange: string;
    }[][];
  };
  swap: BaseTransaction;
}

export interface AddLiquidity {
  transaction?: TransactionData;
  priceImpact?: string;
  expectedBptOut?: string;
  poolAddress: string;
  tokens: [TokenAmountData];
  approvals: [
    {
      token: string;
      amount: string;
      spender: string;
    }
  ];
  minBptOut?: string;
  permitData?: {
    slippage: Slippage;
    queryOutput: AddLiquidityBoostedQueryOutput;
  };
}

export interface TokenAmountData {
  address: string;
  amount: string;
}

export interface RemoveLiquidity {
  // Transaction data
  transaction: TransactionData;

  // BPT information (for single token exact out and unbalanced)
  bptIn?: string;
  maxBptIn?: string;

  // Output tokens information
  expectedAmountsOut?: TokenAmountData[]; // For proportional removals
  tokenOut?: string; // For single token removals
  expectedAmountOut?: string; // For single token exact in

  // Additional metadata
  poolAddress?: string; // Pool contract address
  priceImpact?: string | number; // Price impact as percentage
  permitData?: {
    slippage: Slippage;
    queryOutput: RemoveLiquidityBoostedQueryOutput;
  };
}

export type Tx =
  | BaseTransaction
  | ApproveTransaction
  | AddLiquidity
  | RemoveLiquidity
  | BeetsSwap;

export function isBaseTransaction(tx: Tx): tx is BaseTransaction {
  return "type" in tx;
}

export function isApproveTransaction(tx: Tx): tx is ApproveTransaction {
  return "approve" in tx;
}

export function isAddLiquidity(tx: Tx): tx is AddLiquidity {
  return "approvals" in tx && "expectedBptOut" in tx;
}

export function isRemoveLiquidity(tx: Tx): tx is RemoveLiquidity {
  return ("bptIn" in tx || "expectedAmountsOut" in tx || "tokenOut" in tx);
}

export function isBeetsSwap(tx: Tx): tx is BeetsSwap {
  return "paths" in tx && "approvals" in tx;
}

export type TransactionStatus = {
  state:
    | "idle"
    | "approving"
    | "approved"
    | "signing"
    | "confirming"
    | "confirmed"
    | "failed";
  message?: string;
};
