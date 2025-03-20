"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, Wallet, Globe } from "lucide-react";
import React, { useEffect } from "react";
import { useSendTransaction } from "@/hooks/useSendTransaction";
import { BaseTransaction } from "@/types/transaction";
import { Message } from "@/types/messages";
import { ZerePyClient } from "@/lib/ZerePyClient";
import { formatEther } from "viem";
import { useTransactionStatus } from '@/hooks/useTransactionStatus';
import { StatusIndicator } from './StatusIndicator';
import { useChat } from "@/providers/ChatProvider";

interface Props {
  tx: BaseTransaction;
  account: string;
  sendTransaction: any;
  setMessages: (messages: Message[]) => void;
  messages: Message[];
  client: ZerePyClient;
  closeModal: () => void;
}

const SendTransaction: React.FC<Props> = ({
  tx,
  account,
  sendTransaction,
  setMessages,
  messages,
  client,
  closeModal,
}) => {
  const { status, updateStatus } = useTransactionStatus();
  const { chatId } = useChat()
  const handleSendTransaction = useSendTransaction({
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
    if (status.state === 'confirmed' || status.state === 'failed') {
      closeModal();
    }
  }, [status.state, closeModal]);

  return (
    <Card className="w-full sm:w-[420px] md:w-[540px] lg:w-[640px] shadow-xl rounded-2xl overflow-hidden border-0 bg-gradient-to-b from-green-950 to-slate-950">
      <CardHeader className="py-5 px-6 border-b border-green-900/30 text-center bg-green-950/80">
        <CardTitle className="text-2xl font-semibold tracking-wide font-mono text-white">
          {tx.type}
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3 border-b border-green-900/30 pb-4 group transition-all duration-300 hover:bg-green-900/20 p-2 rounded-md">
            <div className="h-9 w-9 rounded-full bg-green-900/80 flex items-center justify-center">
              <Wallet className="h-5 w-5 text-green-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-white/70 text-sm mb-1">Recipient / Contract</span>
              <span className="font-semibold text-white truncate">{tx.to}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 border-b border-green-900/30 pb-4 group transition-all duration-300 hover:bg-green-900/20 p-2 rounded-md">
            <div className="h-9 w-9 rounded-full bg-green-900/80 flex items-center justify-center">
              <Send className="h-5 w-5 text-green-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-white/70 text-sm mb-1">Value</span>
              <span className="font-semibold text-white">
                {formatEther(BigInt(tx.value ? tx.value.toString() : "0"))} S
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 group transition-all duration-300 hover:bg-green-900/20 p-2 rounded-md">
            <div className="h-9 w-9 rounded-full bg-green-900/80 flex items-center justify-center">
              <Globe className="h-5 w-5 text-green-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-white/70 text-sm mb-1">Chain ID</span>
              <span className="font-semibold text-white">{tx.chainId}</span>
            </div>
          </div>
        </div>

        <Button
          className="w-full mt-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transition-all duration-300 font-semibold py-3 h-auto rounded-lg shadow-[0_4px_16px_rgba(0,255,0,0.1)]"
          variant="default"
          onClick={async () => {
            await handleSendTransaction();
          }}
          disabled={status.state !== 'idle' && status.state !== 'failed'}
        >
          <StatusIndicator status={status} />
        </Button>
      </CardContent>
    </Card>
  );
};

export default SendTransaction;
