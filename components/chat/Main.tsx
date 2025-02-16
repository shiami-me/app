import { ZerePyClient } from "@/lib/ZerePyClient";
import { Message } from "@/types/messages";
import { Config } from "wagmi";
import { SendTransactionMutateAsync } from "wagmi/query";
import RenderMessage from "./Message";
import React from "react";

interface Props {
  messages: Message[];
  setMessages: (value: Message[]) => void;
  client: ZerePyClient;
  sendTransactionAsync: SendTransactionMutateAsync<Config, unknown>;
}

const ChatMain: React.FC<Props> = ({
  messages,
  setMessages,
  client,
  sendTransactionAsync,
}: Props) => {
  return (
    <>
      {messages.length === 0 && (
        <div className="flex justify-center">
          <div className="max-w-[75%] p-3 text-center">
            <p className="text-4xl font-bold font-[family-name:var(--font-roboto-mono)]">
              Hi! I&apos;m Shiami. Your personal DeFi assistant.
            </p>
          </div>
        </div>
      )}

      {messages.map((message) => (
        <React.Fragment key={message.id}>
          {message.sender === "bot" ? (
            <RenderMessage
              message={message}
              sendTransaction={sendTransactionAsync}
              client={client}
              setMessages={setMessages}
              messages={messages}
            />
          ) : (
            <div
              key={message.id}
              className="flex justify-end"
            >
              <div
                className={"max-w-[75%] rounded-3xl px-5 py-3 bg-primary text-primary-foreground"}
              >
                <p className="text-md break-words whitespace-pre-wrap">{message.text}</p>
              </div>
            </div>
          )}
        </React.Fragment>
      ))}
    </>
  );
};

export default ChatMain;
