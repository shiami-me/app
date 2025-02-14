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
    sendTransactionAsync
}: Props) => {
  return (
    <>
      {messages.length === 1 && (
        <div className="flex justify-center">
          <div className="max-w-[75%] rounded-lg bg-muted p-3 text-center">
            <p className="text-sm">
              Welcome! Type a message to start chatting.
            </p>
          </div>
        </div>
      )}

      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${
            message.sender === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`max-w-[75%] rounded-lg p-3 ${
              message.sender === "user"
                ? "bg-primary text-primary-foreground"
                : "bg-muted"
            }`}
          >
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
              <p className="text-sm">{message.text}</p>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default ChatMain;
