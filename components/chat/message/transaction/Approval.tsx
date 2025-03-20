"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, Flame, Store, ArrowRightLeft } from "lucide-react";
import React, { useEffect } from "react";
import { useApproveTransaction } from "@/hooks/useApproveTransaction";
import { ApproveTransaction } from "@/types/transaction";
import { Message } from "@/types/messages";
import { ZerePyClient } from "@/lib/ZerePyClient";
import { useTransactionStatus } from '@/hooks/useTransactionStatus';
import { StatusIndicator } from './StatusIndicator';
import { useChat } from "@/providers/ChatProvider";

interface Props {
  tx: ApproveTransaction;
  account: string;
  sendTransaction: any;
  setMessages: (messages: Message[]) => void;
  messages: Message[];
  client: ZerePyClient;
  closeModal: () => void;
}

const ApproveSendTransaction: React.FC<Props> = ({
  tx,
  account,
  sendTransaction,
  setMessages,
  messages,
  client,
  closeModal,
}: Props) => {
  const { status, updateStatus } = useTransactionStatus();
  const { chatId } = useChat()
  const handleApproveTransaction = useApproveTransaction({
    tx,
    account,
    sendTransaction,
    setMessages,
    messages,
    client,
    updateStatus,
    chat: chatId!
  });
  useEffect(() => {
    if (status.state === "approved" || status.state === "failed") {
      closeModal();
    }
  }, [status.state, closeModal]);
  return (
    <Card className="w-full sm:w-[420px] md:w-[540px] lg:w-[640px] shadow-xl rounded-2xl overflow-hidden border-0 bg-gradient-to-b from-green-950 to-slate-950">
      <CardHeader className="py-5 px-6 border-b border-green-900/30 text-center bg-green-950/80 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-400 via-transparent to-transparent"></div>
        <CardTitle className="text-2xl font-semibold tracking-wide font-mono text-white relative z-10 flex items-center justify-center gap-2">
          <ArrowRightLeft className="h-6 w-6 text-green-400" />
          <span>Approve Swap</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-green-900/20 rounded-xl p-4 border border-green-800/30">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-9 w-9 rounded-full bg-green-900/80 flex items-center justify-center">
                <Wallet className="h-5 w-5 text-green-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-white/70 text-sm mb-1">Token Exchange</span>
                <span className="font-semibold text-white">
                  {tx.approve.amountIn} → {tx.approve.amountOut}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-2">
              <div className="flex flex-col p-3 bg-green-900/40 rounded-lg">
                <span className="text-xs text-white/60">USD Value In</span>
                <span className="font-semibold text-white text-lg">${tx.approve.amountInUsd}</span>
              </div>
              <div className="flex flex-col p-3 bg-green-900/40 rounded-lg">
                <span className="text-xs text-white/60">USD Value Out</span>
                <span className="font-semibold text-white text-lg">${tx.approve.amountOutUsd}</span>
              </div>
            </div>
          </div>

          <div className="bg-green-900/20 rounded-xl p-4 border border-green-800/30">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-9 w-9 rounded-full bg-green-900/80 flex items-center justify-center">
                <Flame className="h-5 w-5 text-green-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-white/70 text-sm">Transaction Fees</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-2">
              <div className="flex flex-col p-3 bg-green-900/40 rounded-lg">
                <span className="text-xs text-white/60">Gas (Est.)</span>
                <span className="font-medium text-white">{tx.approve.gas} units</span>
              </div>
              <div className="flex flex-col p-3 bg-green-900/40 rounded-lg">
                <span className="text-xs text-white/60">Gas Price</span>
                <span className="font-medium text-white">
                  {Number(tx.approve.gasPrice) / 1e9} Gwei
                </span>
              </div>
              <div className="flex flex-col p-3 bg-green-900/40 rounded-lg">
                <span className="text-xs text-white/60">Total Fee</span>
                <span className="font-medium text-white">${tx.approve.gasUsd}</span>
              </div>
            </div>
          </div>

          {tx.approve.route && tx.approve.route[0] && tx.approve.route[0][0] && (
            <div className="flex items-center gap-3 bg-green-900/20 p-4 rounded-xl border border-green-800/30">
              <div className="h-9 w-9 rounded-full bg-green-900/80 flex items-center justify-center">
                <Store className="h-5 w-5 text-green-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-white/70 text-sm mb-1">Exchange</span>
                <span className="font-semibold text-white">
                  {tx.approve.route[0][0].exchange}
                </span>
              </div>
            </div>
          )}
        </div>

        <Button
          className="w-full mt-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transition-all duration-300 font-semibold py-3 h-auto rounded-lg shadow-[0_4px_16px_rgba(0,255,0,0.1)]"
          variant="default"
          onClick={async () => {
            await handleApproveTransaction();
            if (status.state === 'approved') {
              closeModal();
            }
          }}
          disabled={status.state !== 'idle' && status.state !== 'failed'}
        >
          <StatusIndicator status={status} />
        </Button>
      </CardContent>
    </Card>
  );
};

export default ApproveSendTransaction;
