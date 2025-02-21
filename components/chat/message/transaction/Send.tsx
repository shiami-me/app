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
    <Card className="w-full sm:w-[420px] md:w-[540px] lg:w-[640px] shadow-xl rounded-2xl overflow-hidden border-0">
      <CardHeader className="py-5 px-6 border-b border-white/10 text-center">
        <CardTitle className="text-2xl font-semibold tracking-wide font-[family-name:var(--font-roboto-mono)]">
          {tx.type}
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3 border-b border-white/10 pb-3">
            <Wallet className="h-5 w-5 text-white/80" />
            <div className="flex flex-col">
              <span className="text-white/80 text-md">Recipient / Contract</span>
              <span className="font-semibold truncate">{tx.to}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 border-b border-white/10 pb-3">
            <Send className="h-5 w-5 text-white/80" />
            <div className="flex flex-col">
              <span className="text-white/80 text-md">Value</span>
              <span className="font-semibold">
                {formatEther(BigInt(tx.value ? tx.value.toString() : "0"))} ETH
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Globe className="h-5 w-5 text-white/80" />
            <div className="flex flex-col">
              <span className="text-white/80 text-md">Chain ID</span>
              <span className="font-semibold">{tx.chainId}</span>
            </div>
          </div>
        </div>

        <Button
          className="w-full mt-2 bg-gradient-to-br from-green-600 to-green-800 dark:from-green-500 dark:to-green-700 transition-all duration-300 font-semibold py-2 rounded-lg shadow-md"
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
