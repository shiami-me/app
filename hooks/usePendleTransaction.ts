import { useCallback } from "react";
import { encodeFunctionData } from "viem";
import { waitForTransactionReceipt } from "@wagmi/core";
import { useAccount, usePublicClient, useSendTransaction as useWagmiSendTransaction } from "wagmi";
import { config } from "@/providers/WalletProvider";
import { ERC20_ABI } from "@/utils/abis";

// Transaction status management
export type PendleTransactionStatus = {
  state: "idle" | "preparing" | "simulating" | "approving" | "executing" | "confirmed" | "failed";
  message?: string;
};

interface UsePendleTransactionProps {
  onStatusChange?: (status: PendleTransactionStatus) => void;
}

interface Transaction {
  to: string;
  data?: string;
  value: string;
  chainId: number;
  gas?: string;
  maxFeePerGas?: string;
  maxPriorityFeePerGas?: string;
}

interface TokenApprovalData {
  tokenAddress: string;
  spender: string;
  amount: string;
  tokenDecimals?: number;
}

export function usePendleTransaction({ onStatusChange = () => {} }: UsePendleTransactionProps = {}) {
  const publicClient = usePublicClient();
  const { sendTransactionAsync } = useWagmiSendTransaction();
  const { address: account, isConnected } = useAccount();
  
  const updateStatus = useCallback(
    (state: PendleTransactionStatus["state"], message?: string) => {
      onStatusChange({ state, message });
    },
    [onStatusChange]
  );
  
  const checkAndApproveToken = useCallback(
    async (approvalData: TokenApprovalData): Promise<boolean> => {
      try {
        updateStatus("preparing");
        
        if (!publicClient || !account) {
          throw new Error("Public client not available or wallet not connected");
        }
        
        if (approvalData.tokenAddress === "0x0000000000000000000000000000000000000000") return true;
        
        // Get current allowance
        const allowance = (await publicClient.readContract({
          address: approvalData.tokenAddress as `0x${string}`,
          abi: ERC20_ABI,
          functionName: "allowance",
          args: [account as `0x${string}`, approvalData.spender as `0x${string}`],
        })) as bigint;
        
        // Check if approval is needed
        if (BigInt(allowance) >= BigInt(approvalData.amount)) {
          return true; // Already approved
        }
        
        updateStatus("approving", `Approving token...`);
        
        // Prepare approval transaction
        const approveTx = await sendTransactionAsync({
          to: approvalData.tokenAddress as `0x${string}`,
          data: encodeFunctionData({
            abi: ERC20_ABI,
            functionName: "approve",
            args: [approvalData.spender as `0x${string}`, BigInt(approvalData.amount)],
          }),
          chainId: Number(publicClient.chain?.id),
        });
        
        // Wait for approval transaction receipt
        const approvalReceipt = await waitForTransactionReceipt(config, {
          hash: approveTx,
        });
        
        if (approvalReceipt.status === "reverted") {
          updateStatus("failed", "Token approval failed");
          return false;
        }
        
        updateStatus("preparing", "Token approved successfully");
        return true;
      } catch (error: any) {
        console.error("Token approval error:", error);
        const errorMessage = extractErrorMessage(error);
        updateStatus("failed", `Approval error: ${errorMessage}`);
        return false;
      }
    },
    [publicClient, sendTransactionAsync, updateStatus, account]
  );

  // Helper function to extract more readable error messages
  const extractErrorMessage = (error: any): string => {
    if (!error) return "Unknown error";
    
    // Handle specific error types
    if (error.shortMessage) return error.shortMessage;
    if (error.message) {
      // Clean up common RPC errors
      const message = error.message;
      if (message.includes("user rejected")) return "Transaction rejected by user";
      if (message.includes("insufficient funds")) return "Insufficient funds for transaction";
      if (message.includes("gas required exceeds allowance")) return "Gas required exceeds allowance";
      
      // Return a reasonably sized error message
      return message.length > 100 ? message.substring(0, 100) + "..." : message;
    }
    
    return "Transaction failed";
  };
  
  // Simulate transaction before sending
  const simulateTransaction = useCallback(
    async (tx: Transaction): Promise<{ success: boolean; error?: string }> => {
      if (!publicClient || !account) {
        return { success: false, error: "Wallet not connected" };
      }

      try {
        updateStatus("simulating", "Simulating transaction...");
        
        // Use publicClient.simulateContract for simulation if we have enough data
        // Otherwise fall back to a basic call
        await publicClient.call({
          account: account as `0x${string}`,
          to: tx.to as `0x${string}`,
          data: tx.data as `0x${string}` | undefined,
          value: tx.value ? BigInt(tx.value) : BigInt(0),
        });
        
        return { success: true };
      } catch (error: any) {
        console.error("Simulation error:", error);
        const errorMessage = extractErrorMessage(error);
        return { success: false, error: errorMessage };
      }
    },
    [publicClient, account, updateStatus]
  );
  
  const sendTransaction = useCallback(
    async (tx: Transaction, tokenApprovals: TokenApprovalData[] = []) => {
      try {
        updateStatus("preparing");
        
        if (!isConnected) {
          throw new Error("Wallet not connected");
        }
        
        // Process all token approvals first
        if (tokenApprovals.length > 0) {
          for (const approval of tokenApprovals) {
            const approved = await checkAndApproveToken(approval);
            if (!approved) {
              return { error: "Token approval failed" };
            }
          }
        }
        
        // Simulate transaction before sending
        const simulation = await simulateTransaction(tx);
        if (!simulation.success) {
          updateStatus("failed", `Simulation failed: ${simulation.error}`);
          return { error: simulation.error };
        }
        
        updateStatus("executing", "Executing transaction...");
        
        // Format transaction for wagmi
        const txRequest = {
          to: tx.to as `0x${string}`,
          data: tx.data as `0x${string}` | undefined,
          value: tx.value ? BigInt(tx.value) : BigInt(0),
          chainId: tx.chainId,
          gas: tx.gas ? BigInt(tx.gas) : undefined,
          maxFeePerGas: tx.maxFeePerGas ? BigInt(tx.maxFeePerGas) : undefined,
          maxPriorityFeePerGas: tx.maxPriorityFeePerGas ? BigInt(tx.maxPriorityFeePerGas) : undefined,
        };
        
        // Send the transaction
        const txHash = await sendTransactionAsync(txRequest);
        
        // Wait for transaction receipt
        const receipt = await waitForTransactionReceipt(config, {
          hash: txHash,
        });
        
        if (receipt.status === "reverted") {
          updateStatus("failed", "Transaction reverted");
          return { error: "Transaction reverted on-chain" };
        }
        
        updateStatus("confirmed", "Transaction confirmed");
        return {
          hash: txHash,
          receipt
        };
      } catch (error: any) {
        console.error("Transaction error:", error);
        const errorMessage = extractErrorMessage(error);
        updateStatus("failed", errorMessage);
        return { error: errorMessage };
      }
    },
    [checkAndApproveToken, sendTransactionAsync, updateStatus, simulateTransaction, isConnected]
  );
  
  return {
    sendTransaction,
    checkAndApproveToken,
    simulateTransaction
  };
}
