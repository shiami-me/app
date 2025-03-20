/**
 * Types for Pendle transaction outputs from the pendle_tools
 */

/**
 * Base transaction interface for all Pendle operations
 */
export interface PendleBaseTransaction {
  success: boolean;
  type: string;
  price_impact: string;
  user_address: string;
  aggregator_used?: boolean;
  transaction: {
    to: string;
    data: string;
    value: string;
  };
}

/**
 * Add single-sided liquidity transaction
 */
export interface PendleAddLiquidityTransaction extends PendleBaseTransaction {
  type: "Add Liquidity";
  market: string;
  market_address: string;
  token_in: string;
  token_address: string;
  token_decimals: number;
  token_type: string;
  amount_in: string;
  lp_tokens_received: string;
  yt_tokens_received?: string; // Only present with ZPI
}

/**
 * Add dual-sided liquidity transaction (token + PT)
 */
export interface PendleAddLiquidityDualTransaction
  extends PendleBaseTransaction {
  type: "Add Dual Liquidity";
  market: string;
  market_address: string;
  token_in: string;
  token_type: string;
  token_address: string;
  token_decimals: number;
  pt_token: string;
  pt_address: string;
  pt_decimals: number;
  amount_token_in: string;
  amount_pt_in: string;
  lp_tokens_received: string;
}

/**
 * Remove single-sided liquidity transaction
 */
export interface PendleRemoveLiquidityTransaction
  extends PendleBaseTransaction {
  type: "Remove Liquidity";
  market: string;
  market_address: string;
  market_decimals: number;
  token_out: string;
  token_out_type: string;
  lp_tokens_removed: string;
  tokens_received: string;
}

/**
 * Remove dual-sided liquidity transaction
 */
export interface PendleRemoveLiquidityDualTransaction
  extends PendleBaseTransaction {
  type: "Remove Dual Liquidity";
  market: string;
  market_address: string;
  market_decimals: number;
  token_out: string;
  token_out_type: string;
  lp_tokens_removed: string;
  tokens_received: string;
  pt_tokens_received: string;
}

/**
 * Swap tokens transaction
 */
export interface PendleSwapTransaction extends PendleBaseTransaction {
  type: "Swap";
  market: string;
  market_address: string;
  token_in: string;
  token_out: string;
  token_decimals: number;
  token_address: string;
  token_in_type: string;
  token_out_type: string;
  amount_in: string;
  amount_out: string;
}

/**
 * Mint SY transaction
 */
export interface PendleMintSyTransaction extends PendleBaseTransaction {
  type: "Mint SY";
  sy_symbol: string;
  sy_address: string;
  token_in: string;
  token_in_type: string;
  token_in_decimals: number;
  token_in_address: string;
  amount_in: string;
  sy_tokens_received: string;
}

/**
 * Mint PT and YT transaction
 */
export interface PendleMintPyTransaction extends PendleBaseTransaction {
  type: "Mint PT and YT";
  market: string;
  yt_address: string;
  pt_address: string;
  token_in: string;
  token_in_type: string;
  token_in_decimals: number;
  token_in_address: string;
  amount_in: string;
  tokens_received: string;
  note: string;
}

/**
 * Redeem SY transaction
 */
export interface PendleRedeemSyTransaction extends PendleBaseTransaction {
  type: "Redeem SY";
  sy_symbol: string;
  sy_address: string;
  sy_decimals: number;
  token_out: string;
  token_out_type: string;
  amount_in: string;
  tokens_received: string;
}

/**
 * Redeem PT and YT transaction
 */
export interface PendleRedeemPyTransaction extends PendleBaseTransaction {
  type: "Redeem PT and YT";
  market: string;
  yt_address: string;
  pt_address: string;
  token_out: string;
  token_out_type: string;
  amount_in: string;
  tokens_received: string;
  note: string;
}

/**
 * Union type for all Pendle transaction outputs
 */
export type PendleTransaction =
  | PendleAddLiquidityTransaction
  | PendleAddLiquidityDualTransaction
  | PendleRemoveLiquidityTransaction
  | PendleRemoveLiquidityDualTransaction
  | PendleSwapTransaction
  | PendleMintSyTransaction
  | PendleMintPyTransaction
  | PendleRedeemSyTransaction
  | PendleRedeemPyTransaction;

/**
 * Type guards for checking transaction types
 */
export function isPendleAddLiquidityTransaction(
  tx: PendleTransaction
): tx is PendleAddLiquidityTransaction {
  return tx.type === "Add Liquidity";
}

export function isPendleAddLiquidityDualTransaction(
  tx: PendleTransaction
): tx is PendleAddLiquidityDualTransaction {
  return tx.type === "Add Dual Liquidity";
}

export function isPendleRemoveLiquidityTransaction(
  tx: PendleTransaction
): tx is PendleRemoveLiquidityTransaction {
  return tx.type === "Remove Liquidity";
}

export function isPendleRemoveLiquidityDualTransaction(
  tx: PendleTransaction
): tx is PendleRemoveLiquidityDualTransaction {
  return tx.type === "Remove Dual Liquidity";
}

export function isPendleSwapTransaction(
  tx: PendleTransaction
): tx is PendleSwapTransaction {
  return tx.type === "Swap";
}

export function isPendleMintSyTransaction(
  tx: PendleTransaction
): tx is PendleMintSyTransaction {
  return tx.type === "Mint SY";
}

export function isPendleMintPyTransaction(
  tx: PendleTransaction
): tx is PendleMintPyTransaction {
  return tx.type === "Mint PT and YT";
}

export function isPendleRedeemSyTransaction(
  tx: PendleTransaction
): tx is PendleRedeemSyTransaction {
  return tx.type === "Redeem SY";
}

export function isPendleRedeemPyTransaction(
  tx: PendleTransaction
): tx is PendleRedeemPyTransaction {
  return tx.type === "Redeem PT and YT";
}

/**
 * Helper function to parse JSON transaction output from Pendle tools
 */
export function parsePendleTransaction(
  jsonString: string
): PendleTransaction | null {
  try {
    const transaction = JSON.parse(jsonString) as PendleTransaction;

    // Validate it has the minimum required properties
    if (!transaction.success || !transaction.type || !transaction.transaction) {
      return null;
    }

    return transaction;
  } catch (error) {
    console.error("Failed to parse Pendle transaction:", error);
    return null;
  }
}

/**
 * Check if a transaction is related to any Pendle operation
 */
export function isPendleTransaction(tx: any): tx is PendleTransaction {
  return (
    tx &&
    typeof tx === "object" &&
    "success" in tx &&
    "type" in tx &&
    (tx.type === "Add Liquidity" ||
      tx.type === "Add Dual Liquidity" ||
      tx.type === "Remove Liquidity" ||
      tx.type === "Remove Dual Liquidity" ||
      tx.type === "Swap" ||
      tx.type === "Mint SY" ||
      tx.type === "Mint PT and YT" ||
      tx.type === "Redeem SY" ||
      tx.type === "Redeem PT and YT")
  );
}

/**
 * Helper to extract the necessary transaction data for sending to a wallet
 */
export function extractPendleTransactionForWallet(tx: PendleTransaction): {
  to: string;
  data: string;
  value: string;
} {
  return {
    to: tx.transaction.to,
    data: tx.transaction.data,
    value: tx.transaction.value,
  };
}
