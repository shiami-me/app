import { ZerePyClient } from "@/lib/ZerePyClient";
import { Message } from "@/types/messages";
import { Tx, isBaseTransaction } from "@/types/transaction";
import { Config, useAccount } from "wagmi";
import { SendTransactionMutateAsync } from "wagmi/query";
import SendTransaction from "./transaction/Send";
import ApproveSendTransaction from "./transaction/Approval";

interface Props {
  client: ZerePyClient;
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  sendTransaction: SendTransactionMutateAsync<Config, unknown>;
  status: "error" | "idle" | "pending" | "success";
  tx: Tx;
}

const Transaction: React.FC<Props> = ({
  client,
  messages,
  setMessages,
  sendTransaction,
  tx,
}: Props) => {
  const account = useAccount();
  if (isBaseTransaction(tx)) {
    return (
      <SendTransaction
        client={client}
        setMessages={setMessages}
        sendTransaction={sendTransaction}
        tx={tx}
        status={status}
        account={account.address!}
        messages={messages}
      />
    );
  } else if ("approve" in tx) {
    return (
      <ApproveSendTransaction
        tx={tx}
        account={account.address!}
        sendTransaction={sendTransaction}
        setMessages={setMessages}
        messages={messages}
      />
    );
  }
};

export default Transaction;
