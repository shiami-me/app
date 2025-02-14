import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import React from "react";
import { useSendTransaction } from "@/hooks/useSendTransaction";
import { BaseTransaction } from "@/types/transaction";
import { Message } from "@/types/messages";
import { ZerePyClient } from "@/lib/ZerePyClient";
import { formatEther } from "viem";

interface Props {
  tx: BaseTransaction;
  account: string;
  sendTransaction: any;
  status: any;
  setMessages: (messages: Message[]) => void;
  messages: Message[];
  client: ZerePyClient;
}

const SendTransaction: React.FC<Props> = ({
  tx,
  account,
  sendTransaction,
  setMessages,
  status,
  messages,
  client,
}: Props) => {
  const handleSendTransaction = useSendTransaction({
    tx,
    account,
    sendTransaction,
    setMessages,
    messages,
    client,
  });

  return (
    <div className="space-y-4">
      <div className="rounded-lg bg-muted/50 p-4">
        <h3 className="font-medium mb-2">Transaction Details</h3>
        <div className="space-y-2 text-sm">
          <div className="grid grid-cols-[100px,1fr] gap-2">
            <span className="font-medium">Tx Type:</span>
            <span className="truncate">{tx.type.toLocaleUpperCase()}</span>
          </div>
          <div className="grid grid-cols-[100px,1fr] gap-2">
            <span className="font-medium">To:</span>
            <span className="truncate">{tx.to}</span>
          </div>
          <div className="grid grid-cols-[100px,1fr] gap-2">
            <span className="font-medium">Value:</span>
            <span>{formatEther(BigInt(tx.value ? tx.value.toString() : "0"))}</span>
          </div>
          <div className="grid grid-cols-[100px,1fr] gap-2">
            <span className="font-medium">Chain ID:</span>
            <span>{tx.chainId}</span>
          </div>
        </div>
        <Button
          className="mt-4"
          onClick={handleSendTransaction}
          disabled={status === "success" || status === "pending"}
        >
          {status !== "idle" ? (
            status !== "success" ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Confirming...</span>
              </div>
            ) : (
              <span>Confirmed</span>
            )
          ) : (
            <span>Confirm Transaction</span>
          )}
        </Button>
      </div>
    </div>
  );
};

export default SendTransaction;
