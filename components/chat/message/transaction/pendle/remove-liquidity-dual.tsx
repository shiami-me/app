"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, Wallet, MinusCircle } from "lucide-react";
import React, { useEffect, useCallback, useState } from "react";
import { PendleRemoveLiquidityDualTransaction } from "@/types/pendle-types";
import { Message } from "@/types/messages";
import { ZerePyClient } from "@/lib/ZerePyClient";
import { StatusIndicator } from "../StatusIndicator";
import { useChat } from "@/providers/ChatProvider";
import { PendleTransactionStatus, usePendleTransaction } from "@/hooks/usePendleTransaction";
import { waitForTransactionReceipt } from "@wagmi/core";
import { config } from "@/providers/WalletProvider";
import { useCancelTransaction } from "@/hooks/useCancelTransaction";

interface Props {
  tx: PendleRemoveLiquidityDualTransaction;
  setMessages: (messages: Message[]) => void;
  messages: Message[];
  client: ZerePyClient;
  closeModal: () => void;
}

const PendleRemoveLiquidityDual: React.FC<Props> = ({
  tx,
  setMessages,
  messages,
  client,
  closeModal,
}) => {
  const [transactionStatus, setTransactionStatus] = useState<PendleTransactionStatus>({
    state: "idle"
  });
  const { chatId } = useChat();
  const { sendTransaction: executePendleTransaction } = usePendleTransaction({
    onStatusChange: setTransactionStatus,
  });

  // Setup cancelTransaction hook
  const cancelTransaction = useCancelTransaction({
    txType: "Remove Dual Liquidity",
    client,
    setMessages,
    messages,
    isUser: false,
  });

  useEffect(() => {
    if (transactionStatus.state === "confirmed" || transactionStatus.state === "failed") {
      closeModal();
    }
  }, [transactionStatus.state, closeModal]);

  const handleRemoveLiquidityDual = useCallback(async () => {
    try {
      // For remove liquidity dual, we only need to approve the LP token (market_address)
      const tokenApprovals = [{
        tokenAddress: tx.market_address,
        spender: tx.transaction.to,
        amount: tx.lp_tokens_removed,
      }];

      // Execute the transaction
      const result = await executePendleTransaction(
        {
          to: tx.transaction.to,
          data: tx.transaction.data,
          value: tx.transaction.value,
          chainId: 146
        },
        tokenApprovals
      );

      // Handle transaction result
      if (result.error) {
        console.error("Transaction failed:", result.error);
        
        // Cancel the transaction
        if (chatId) {
          await cancelTransaction(chatId);
        }
      } else if (result.hash) {
        try {
          // Wait for transaction receipt
          const txReceipt = await waitForTransactionReceipt(config, {
            hash: result.hash,
          });
          
          if (txReceipt.status === "reverted") {
            // Transaction reverted
            setTransactionStatus({ state: "failed", message: "Transaction reverted" });
            if (chatId) {
              await cancelTransaction(chatId);
            }
          } else {
            // Transaction confirmed successfully
            setTransactionStatus({ state: "confirmed" });
            
            // Format a nice confirmation message
            const confirmMessage = `## Dual Liquidity Removed from Pendle Successfully 🚀\n\n**Transaction Details:**\n- **Market:** ${tx.market}\n- **LP Tokens Removed:** ${formatAmount(tx.lp_tokens_removed, tx.market_decimals)}\n- **Tokens Received:** ${formatAmount(tx.tokens_received)} ${tx.token_out}\n- **PT Tokens Received:** ${formatAmount(tx.pt_tokens_received)}\n- **Status:** Confirmed ✅\n- **Hash:** [${result.hash.slice(0, 10)}...${result.hash.slice(-8)}](https://sonicscan.org/tx/${result.hash})`;
            
            // Notify the assistant about the success
            if (chatId) {
              await client.performAction("gemini", "continue-execution", [
                confirmMessage,
                chatId,
              ]);
              
              // Update the messages in the UI
              setMessages([
                ...messages.slice(0, -1),
                {
                  id: messages.length,
                  sender: "bot",
                  text: confirmMessage,
                },
              ]);
            }
          }
        } catch (error) {
          console.error("Error waiting for transaction receipt:", error);
          setTransactionStatus({ state: "failed", message: "Failed to confirm transaction" });
          if (chatId) {
            await cancelTransaction(chatId);
          }
        }
      }
    } catch (error) {
      console.error("Error executing Pendle transaction:", error);
      setTransactionStatus({ state: "failed", message: "Transaction execution failed" });
      if (chatId) {
        await cancelTransaction(chatId);
      }
    }
  }, [tx, executePendleTransaction, client, chatId, cancelTransaction, setMessages, messages]);

  // Format amounts for display
  const formatAmount = (amount: string, decimals: number = 18) => {
    try {
      // Convert string amount to a number with the correct decimal places
      return (parseFloat(amount) / 10 ** decimals).toFixed(6);
    } catch {
      return "Error";
    }
  };

  return (
    <Card className="w-full sm:w-[420px] md:w-[540px] lg:w-[640px] shadow-xl rounded-2xl overflow-hidden border-0 bg-gradient-to-b from-green-950 to-slate-950">
      <CardHeader className="py-5 px-6 border-b border-green-900/30 text-center bg-green-950/80 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-400 via-transparent to-transparent"></div>
        <CardTitle className="text-2xl font-semibold tracking-wide font-mono text-white relative z-10 flex items-center justify-center gap-2">
          <MinusCircle className="h-6 w-6 text-green-400" />
          <span>Remove Dual Liquidity from Pendle</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        <div className="space-y-4">
          {/* LP tokens to remove */}
          <div className="flex items-center gap-3 border-b border-green-900/30 pb-4 group transition-all duration-300 hover:bg-green-900/20 p-2 rounded-md">
            <div className="h-9 w-9 rounded-full bg-green-900/80 flex items-center justify-center">
              <Wallet className="h-5 w-5 text-green-400" />
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-white/70 text-sm mb-1">LP Tokens to Remove</span>
              <span className="font-semibold text-white truncate">
                LP-{tx.market}
              </span>
              <span className="text-sm text-green-300 mt-1">
                Amount: {formatAmount(tx.lp_tokens_removed, tx.market_decimals)}
              </span>
            </div>
          </div>

          <div className="flex justify-center -my-2">
            <div className="h-8 w-8 rounded-full bg-green-900/80 flex items-center justify-center">
              <ArrowDown className="h-4 w-4 text-green-400" />
            </div>
          </div>

          {/* Base tokens received */}
          <div className="flex items-center gap-3 border-b border-green-900/30 pb-4 group transition-all duration-300 hover:bg-green-900/20 p-2 rounded-md">
            <div className="h-9 w-9 rounded-full bg-green-900/80 flex items-center justify-center">
              <MinusCircle className="h-5 w-5 text-green-400" />
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-white/70 text-sm mb-1">
                Tokens Received
              </span>
              <span className="font-semibold text-white truncate">
                {tx.token_out}
              </span>
              <span className="text-sm text-green-300 mt-1">
                Amount: {(tx.tokens_received)}
              </span>
            </div>
          </div>

          {/* PT tokens received */}
          <div className="flex items-center gap-3 border-b border-green-900/30 pb-4 group transition-all duration-300 hover:bg-green-900/20 p-2 rounded-md">
            <div className="h-9 w-9 rounded-full bg-green-900/80 flex items-center justify-center">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-green-400"
              >
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" />
                <path
                  d="M2 17L12 22L22 17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12L12 17L22 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-white/70 text-sm mb-1">
                PT Tokens Received
              </span>
              <span className="text-sm text-green-300 mt-1">
                Amount: {(tx.pt_tokens_received)}
              </span>
            </div>
          </div>

          {/* Price impact */}
          <div className="flex items-center gap-3 border-b border-green-900/30 pb-4 group transition-all duration-300 hover:bg-green-900/20 p-2 rounded-md">
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-white/70 text-sm mb-1">Price Impact</span>
              <span className="font-semibold text-white">
                {tx.price_impact}
              </span>
            </div>
          </div>
        </div>

        <Button
          className="w-full mt-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transition-all duration-300 font-semibold py-3 h-auto rounded-lg shadow-[0_4px_16px_rgba(0,255,0,0.1)]"
          variant="default"
          onClick={async () => {
            await handleRemoveLiquidityDual();
          }}
          disabled={transactionStatus.state !== "idle" && transactionStatus.state !== "failed"}
        >
          <StatusIndicator status={transactionStatus} />
        </Button>
      </CardContent>
    </Card>
  );
};

export default PendleRemoveLiquidityDual;
