"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Wallet, Repeat, ArrowDown } from "lucide-react";
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
    <Card className="w-full sm:w-[420px] md:w-[540px] lg:w-[640px] shadow-xl rounded-2xl overflow-hidden border-0 bg-gradient-to-b from-green-950 to-slate-950">
      <CardHeader className="py-5 px-6 border-b border-green-900/30 text-center bg-green-950/80 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-400 via-transparent to-transparent"></div>
        <CardTitle className="text-2xl font-semibold tracking-wide font-mono text-white relative z-10">
          Beets Swap
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3 border-b border-green-900/30 pb-4 group transition-all duration-300 hover:bg-green-900/20 p-2 rounded-md">
            <div className="h-9 w-9 rounded-full bg-green-900/80 flex items-center justify-center">
              <Wallet className="h-5 w-5 text-green-400" />
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-white/70 text-sm mb-1">From</span>
              <span className="font-semibold text-white truncate">{inputToken?.address}</span>
              <span className="text-sm text-green-300 mt-1">
                Amount: {parseInt(inputAmount.toString()) / (10**(inputToken?.decimals))}
              </span>
            </div>
          </div>

          <div className="flex justify-center -my-2">
            <div className="h-8 w-8 rounded-full bg-green-900/80 flex itemscenter justify-center">
              <ArrowDown className="h-4 w-4 text-green-400" />
            </div>
          </div>

          <div className="flex items-center gap-3 border-b border-green-900/30 pb-4 group transition-all duration-300 hover:bg-green-900/20 p-2 rounded-md">
            <div className="h-9 w-9 rounded-full bg-green-900/80 flex items-center justify-center">
              <ArrowRight className="h-5 w-5 text-green-400" />
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-white/70 text-sm mb-1">To</span>
              <span className="font-semibold text-white truncate">{outputToken?.address}</span>
              <span className="text-sm text-green-300 mt-1">
                Amount: {parseInt(outputAmount.toString()) / (10**(outputToken?.decimals))}
              </span>
            </div>
          </div>

          {tx.paths.map((path, pathIndex) => (
            <div key={pathIndex} className="flex items-center gap-3 border-b border-green-900/30 pb-4 group transition-all duration-300 hover:bg-green-900/20 p-2 rounded-md">
              <div className="h-9 w-9 rounded-full bg-green-900/80 flex items-center justify-center">
                <Repeat className="h-5 w-5 text-green-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-white/70 text-sm mb-1">Path {pathIndex + 1}</span>
                <span className="text-white/90">{path.pools.length} pool{path.pools.length > 1 ? 's' : ''}</span>
              </div>
            </div>
          ))}
        </div>

        <Button
          className="w-full mt-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transition-all duration-300 font-semibold py-3 h-auto rounded-lg shadow-[0_4px_16px_rgba(0,255,0,0.1)]"
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
