type TransactionType =
  | "transfer"
  | "swap"
  | "deposit"
  | "borrow"
  | "repay"
  | "withdraw";

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

export type Tx = BaseTransaction | ApproveTransaction;

export function isBaseTransaction(tx: Tx): tx is BaseTransaction {
  return "type" in tx;
}

export function isApproveTransaction(tx: Tx): tx is ApproveTransaction {
  return "approve" in tx;
}

export type TransactionStatus = {
  state: 'idle' | 'approving' | 'approved' | 'confirming' | 'confirmed' | 'failed';
  message?: string;
};
