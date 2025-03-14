import { ZerePyClient } from "@/lib/ZerePyClient";
import { Message } from "@/types/messages";
import { 
  Tx, 
  isBaseTransaction, 
  isApproveTransaction,
  isAddLiquidity,
  isRemoveLiquidity,
  isBeetsSwap
} from "@/types/transaction";
import { Config, useAccount } from "wagmi";
import { SendTransactionMutateAsync } from "wagmi/query";
import SendTransaction from "./transaction/Send";
import ApproveSendTransaction from "./transaction/Approval";
import AddLiquidityTransaction from "./transaction/AddLiquidity";
import RemoveLiquidityTransaction from "./transaction/RemoveLiquidity";
import BeetsSwapTransaction from "./transaction/BeetsSwap";
import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { useCancelTransaction } from "@/hooks/useCancelTransaction";
import { useChat } from "@/providers/ChatProvider";

interface Props {
  client: ZerePyClient;
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  sendTransaction: SendTransactionMutateAsync<Config, unknown>;
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
  const [isModalOpen, setIsModalOpen] = useState(true);
  const { chatId } = useChat();
  
  let txType = "transaction";
  if (isBaseTransaction(tx)) {
    txType = tx.type;
  } else if (isApproveTransaction(tx)) {
    txType = "approve";
  } else if (isAddLiquidity(tx)) {
    txType = "deposit";
  } else if (isRemoveLiquidity(tx)) {
    txType = "withdraw";
  } else if (isBeetsSwap(tx)) {
    txType = "swap";
  }
  
  const cancelTransaction = useCancelTransaction({
    txType: txType,
    client,
    setMessages,
    messages,
    isUser: true
  });

  const closeModal = async () => {
    setIsModalOpen(false);
    await cancelTransaction(chatId!);
  };

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      {isBaseTransaction(tx) ? (
        <SendTransaction
          client={client}
          setMessages={setMessages}
          sendTransaction={sendTransaction}
          tx={tx}
          account={account.address!}
          messages={messages}
          closeModal={() => setIsModalOpen(false)}
        />
      ) : isApproveTransaction(tx) ? (
        <ApproveSendTransaction
          tx={tx}
          account={account.address!}
          sendTransaction={sendTransaction}
          setMessages={setMessages}
          messages={messages}
          client={client}
          closeModal={() => setIsModalOpen(false)}
        />
      ) : isAddLiquidity(tx) ? (
        <AddLiquidityTransaction
          tx={tx}
          account={account.address!}
          sendTransaction={sendTransaction}
          setMessages={setMessages}
          messages={messages}
          client={client}
          closeModal={() => setIsModalOpen(false)}
        />
      ) : isRemoveLiquidity(tx) ? (
        <RemoveLiquidityTransaction
          tx={tx}
          account={account.address!}
          sendTransaction={sendTransaction}
          setMessages={setMessages}
          messages={messages}
          client={client}
          closeModal={() => setIsModalOpen(false)}
        />
      ) : isBeetsSwap(tx) ? (
        <BeetsSwapTransaction
          tx={tx}
          account={account.address!}
          sendTransaction={sendTransaction}
          setMessages={setMessages}
          messages={messages}
          client={client}
          closeModal={() => setIsModalOpen(false)}
        />
      ) : null}
    </Modal>
  );
};

export default Transaction;
