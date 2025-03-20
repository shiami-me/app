"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, Wallet, LayersIcon } from "lucide-react";
import React, { useEffect, useCallback, useState } from "react";
import { PendleMintSyTransaction } from "@/types/pendle-types";
import { Message } from "@/types/messages";
import { ZerePyClient } from "@/lib/ZerePyClient";
import { StatusIndicator } from "../StatusIndicator";
import { useChat } from "@/providers/ChatProvider";
import { PendleTransactionStatus, usePendleTransaction } from "@/hooks/usePendleTransaction";
import { waitForTransactionReceipt } from "@wagmi/core";
import { config } from "@/providers/WalletProvider";
import { useCancelTransaction } from "@/hooks/useCancelTransaction";

interface Props {
  tx: PendleMintSyTransaction;
  setMessages: (messages: Message[]) => void;
  messages: Message[];
  client: ZerePyClient;
  closeModal: () => void;
}

const PendleMintSy: React.FC<Props> = ({
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
    txType: "Mint SY",
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

  const handleMintSy = useCallback(async () => {
    try {
      // For minting SY, we need to approve the token
      const tokenApprovals = [{
        tokenAddress: tx.token_in_address,
        spender: tx.transaction.to,
        amount: tx.amount_in,
      }];

      // Execute the transaction
      const result = await executePendleTransaction(
        {
          to: tx.transaction.to,
          data: tx.transaction.data,
          value: tx.transaction.value,
          chainId: 146 // Chain ID
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
            const confirmMessage = `## SY Tokens Minted Successfully 🚀\n\n**Transaction Details:**\n- **SY Token:** ${tx.sy_symbol}\n- **Token In:** ${tx.token_in}\n- **Amount In:** ${formatAmount(tx.amount_in, tx.token_in_decimals)} ${tx.token_in}\n- **SY Tokens Received:** ${formatAmount(tx.sy_tokens_received)} ${tx.sy_symbol}\n- **Status:** Confirmed ✅\n- **Hash:** [${result.hash.slice(0, 10)}...${result.hash.slice(-8)}](https://sonicscan.org/tx/${result.hash})`;
            
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
          <LayersIcon className="h-6 w-6 text-green-400" />
          <span>Mint SY Tokens</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        <div className="space-y-4">
          {/* Token input */}
          <div className="flex items-center gap-3 border-b border-green-900/30 pb-4 group transition-all duration-300 hover:bg-green-900/20 p-2 rounded-md">
            <div className="h-9 w-9 rounded-full bg-green-900/80 flex items-center justify-center">
              <Wallet className="h-5 w-5 text-green-400" />
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-white/70 text-sm mb-1">Token In</span>
              <span className="font-semibold text-white truncate">
                {tx.token_in}
              </span>
              <span className="text-sm text-green-300 mt-1">
                Amount: {formatAmount(tx.amount_in, tx.token_in_decimals)}
              </span>
            </div>
          </div>

          <div className="flex justify-center -my-2">
            <div className="h-8 w-8 rounded-full bg-green-900/80 flex items-center justify-center">
              <ArrowDown className="h-4 w-4 text-green-400" />
            </div>
          </div>

          {/* SY tokens output */}
          <div className="flex items-center gap-3 border-b border-green-900/30 pb-4 group transition-all duration-300 hover:bg-green-900/20 p-2 rounded-md">
            <div className="h-9 w-9 rounded-full bg-green-900/80 flex items-center justify-center">
              <LayersIcon className="h-5 w-5 text-green-400" />
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-white/70 text-sm mb-1">SY Tokens Received</span>
              <span className="font-semibold text-white truncate">
                SY-{tx.sy_symbol}
              </span>
              <span className="text-sm text-green-300 mt-1">
                Amount: {formatAmount(tx.sy_tokens_received)}
              </span>
            </div>
          </div>
        </div>

        <Button
          className="w-full mt-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transition-all duration-300 font-semibold py-3 h-auto rounded-lg shadow-[0_4px_16px_rgba(0,255,0,0.1)]"
          variant="default"
          onClick={async () => {
            await handleMintSy();
          }}
          disabled={transactionStatus.state !== "idle" && transactionStatus.state !== "failed"}
        >
          <StatusIndicator status={transactionStatus} />
        </Button>
      </CardContent>
    </Card>
  );
};

export default PendleMintSy;
