"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Wallet } from "lucide-react";
import React, { useEffect } from "react";
import { useBeetsSwap } from "@/hooks/useBeetsSwap";
import { BeetsSwap } from "@/types/transaction";
import { Message } from "@/types/messages";
import { ZerePyClient } from "@/lib/ZerePyClient";
import { useTransactionStatus } from '@/hooks/useTransactionStatus';
import { StatusIndicator } from './StatusIndicator';
import { useChat } from "@/providers/ChatProvider";

interface Props {
  tx: BeetsSwap;
  account: string;
  sendTransaction: any;
  setMessages: (messages: Message[]) => void;
  messages: Message[];
  client: ZerePyClient;
  closeModal: () => void;
}

const BeetsSwapTransaction: React.FC<Props> = ({
  tx,
  account,
  sendTransaction,
  setMessages,
  messages,
  client,
  closeModal,
}) => {
  const { status, updateStatus } = useTransactionStatus();
  const { chatId } = useChat();
  
  const handleBeetsSwap = useBeetsSwap({
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

  // Extract token info from the first path
  const inputToken = tx.paths[0]?.tokens[0];
  const outputToken = tx.paths[0]?.tokens[tx.paths[0]?.tokens.length - 1];
  const inputAmount = tx.paths[0]?.inputAmountRaw;
  const outputAmount = tx.paths[0]?.outputAmountRaw;

  return (
    <Card className="w-full sm:w-[420px] md:w-[540px] lg:w-[640px] shadow-xl rounded-2xl overflow-hidden border-0">
      <CardHeader className="py-5 px-6 border-b border-white/10 text-center">
        <CardTitle className="text-2xl font-semibold tracking-wide font-[family-name:var(--font-roboto-mono)]">
          Beets Swap
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3 border-b border-white/10 pb-3">
            <Wallet className="h-5 w-5 text-white/80" />
            <div className="flex flex-col">
              <span className="text-white/80 text-md">From</span>
              <span className="font-semibold truncate">{inputToken?.address}</span>
              <span className="text-sm text-white/70">Amount: {parseInt(inputAmount.toString()) / (10**(inputToken?.decimals))}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 border-b border-white/10 pb-3">
            <ArrowRight className="h-5 w-5 text-white/80" />
            <div className="flex flex-col">
              <span className="text-white/80 text-md">To</span>
              <span className="font-semibold truncate">{outputToken?.address}</span>
              <span className="text-sm text-white/70">Amount: {parseInt(outputAmount.toString()) / (10**(outputToken?.decimals))}</span>
            </div>
          </div>

          {tx.paths.map((path, pathIndex) => (
            <div key={pathIndex} className="flex items-center gap-3 border-b border-white/10 pb-3">
              <ArrowRight className="h-5 w-5 text-white/80" />
              <div className="flex flex-col">
                <span className="text-white/80 text-md">Path {pathIndex + 1}</span>
                <span className="text-sm text-white/70">{path.pools.length} pool(s)</span>
              </div>
            </div>
          ))}
        </div>

        <Button
          className="w-full mt-2 transition-all duration-300 font-semibold py-2 rounded-lg shadow-md"
          variant="default"
          onClick={async () => {
            await handleBeetsSwap();
          }}
          disabled={status.state !== 'idle' && status.state !== 'failed'}
        >
          <StatusIndicator status={status} />
        </Button>
      </CardContent>
    </Card>
  );
};

export default BeetsSwapTransaction;
