import { ZerePyClient } from "@/lib/ZerePyClient";
import { Message } from "@/types/messages";
import { Tx, isBaseTransaction } from "@/types/transaction";
import { Config, useAccount } from "wagmi";
import { SendTransactionMutateAsync } from "wagmi/query";
import SendTransaction from "./transaction/Send";
import ApproveSendTransaction from "./transaction/Approval";
import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { useCancelTransaction } from "@/hooks/useCancelTransaction";

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
  status,
  tx,
}: Props) => {
  const account = useAccount();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const cancelTransaction = useCancelTransaction({
    txType: isBaseTransaction(tx) ? tx.type : "approve",
    client,
    setMessages,
    messages,
    isUser: true
  });

  const closeModal = async () => {
    setIsModalOpen(false);
    await cancelTransaction();
  };

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      {isBaseTransaction(tx) ? (
        <SendTransaction
          client={client}
          setMessages={setMessages}
          sendTransaction={sendTransaction}
          tx={tx}
          status={status}
          account={account.address!}
          messages={messages}
          closeModal={() => setIsModalOpen(false)}
        />
      ) : (
        "approve" in tx && (
          <ApproveSendTransaction
            tx={tx}
            account={account.address!}
            sendTransaction={sendTransaction}
            setMessages={setMessages}
            messages={messages}
            client={client}
            closeModal={() => setIsModalOpen(false)}
          />
        )
      )}
    </Modal>
  );
};

export default Transaction;
