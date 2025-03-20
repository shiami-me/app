"use client"
import React from "react";
import { ZerePyClient } from "@/lib/ZerePyClient";
import { Message } from "@/types/messages";
import { 
  PendleTransaction,
  isPendleAddLiquidityTransaction,
  isPendleAddLiquidityDualTransaction,
  isPendleRemoveLiquidityTransaction,
  isPendleRemoveLiquidityDualTransaction,
  isPendleSwapTransaction,
  isPendleMintSyTransaction,
  isPendleMintPyTransaction,
  isPendleRedeemSyTransaction,
  isPendleRedeemPyTransaction
} from "@/types/pendle-types";
import PendleAddLiquidity from "./add-liquidity";
import PendleAddLiquidityDual from "./add-liquidity-dual";
import PendleRemoveLiquidity from "./remove-liquidity";
import PendleRemoveLiquidityDual from "./remove-liquidity-dual";
import PendleSwap from "./swap";
import PendleMintSy from "./mint-sy";
import PendleMintPy from "./mint-py";
import PendleRedeemSy from "./redeem-sy";
import PendleRedeemPy from "./redeem-py";

interface Props {
  tx: PendleTransaction;
  setMessages: (messages: Message[]) => void;
  messages: Message[];
  client: ZerePyClient;
  closeModal: () => void;
}

const PendleTransactionRouter: React.FC<Props> = ({
  tx,
  setMessages,
  messages,
  client,
  closeModal,
}) => {
  // Route to the appropriate transaction component based on the transaction type
  if (isPendleAddLiquidityTransaction(tx)) {
    return (
      <PendleAddLiquidity
        tx={tx}
        setMessages={setMessages}
        messages={messages}
        client={client}
        closeModal={closeModal}
      />
    );
  }
  
  if (isPendleAddLiquidityDualTransaction(tx)) {
    return (
      <PendleAddLiquidityDual
        tx={tx}
        setMessages={setMessages}
        messages={messages}
        client={client}
        closeModal={closeModal}
      />
    );
  }
  
  if (isPendleRemoveLiquidityTransaction(tx)) {
    return (
      <PendleRemoveLiquidity
        tx={tx}
        setMessages={setMessages}
        messages={messages}
        client={client}
        closeModal={closeModal}
      />
    );
  }
  
  if (isPendleRemoveLiquidityDualTransaction(tx)) {
    return (
      <PendleRemoveLiquidityDual
        tx={tx}
        setMessages={setMessages}
        messages={messages}
        client={client}
        closeModal={closeModal}
      />
    );
  }
  
  if (isPendleSwapTransaction(tx)) {
    return (
      <PendleSwap
        tx={tx}
        setMessages={setMessages}
        messages={messages}
        client={client}
        closeModal={closeModal}
      />
    );
  }
  
  if (isPendleMintSyTransaction(tx)) {
    return (
      <PendleMintSy
        tx={tx}
        setMessages={setMessages}
        messages={messages}
        client={client}
        closeModal={closeModal}
      />
    );
  }
  
  if (isPendleMintPyTransaction(tx)) {
    return (
      <PendleMintPy
        tx={tx}
        setMessages={setMessages}
        messages={messages}
        client={client}
        closeModal={closeModal}
      />
    );
  }
  
  if (isPendleRedeemSyTransaction(tx)) {
    return (
      <PendleRedeemSy
        tx={tx}
        setMessages={setMessages}
        messages={messages}
        client={client}
        closeModal={closeModal}
      />
    );
  }
  
  if (isPendleRedeemPyTransaction(tx)) {
    return (
      <PendleRedeemPy
        tx={tx}
        setMessages={setMessages}
        messages={messages}
        client={client}
        closeModal={closeModal}
      />
    );
  }
};

export default PendleTransactionRouter;
