import { ZerePyClient } from "@/lib/ZerePyClient";
import { Message } from "@/types/messages";
import { Config } from "wagmi";
import { SendTransactionMutateAsync } from "wagmi/query";
import RenderMessage from "./Message";

interface Props {
  messages: Message[];
  setMessages: (value: Message[]) => void;
  status: "error" | "idle" | "pending" | "success";
  client: ZerePyClient;
  sendTransactionAsync: SendTransactionMutateAsync<Config, unknown>;
}

const ChatMain: React.FC<Props> = ({
  messages,
  setMessages,
  status,
  client,
  sendTransactionAsync,
}: Props) => {
  return (
    <>
      {messages.length === 0 && (
        <div className="flex justify-center">
          <div className="max-w-[75%] rounded-lg bg-muted p-3 text-center">
            <p className="text-md">
              Welcome! Type a message to start chatting.
            </p>
          </div>
        </div>
      )}

      {messages.map((message) => (
        <>
          {message.sender === "bot" ? (
            <RenderMessage
              message={message}
              sendTransaction={sendTransactionAsync}
              status={status}
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
        </>
      ))}
    </>
  );
};

export default ChatMain;
