import { Message } from "@/types/messages";
import { Config } from "wagmi";
import { SendTransactionMutateAsync } from "wagmi/query";
import { ZerePyClient } from "@/lib/ZerePyClient";
import { parseResponse } from "@/utils/parseSearchResponse";
import Sources from "./Sources";
import { useTheme } from "next-themes";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  vscDarkPlus,
  vs,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import RenderImage from "./message/Image";
import Transaction from "./message/Transaction";
import { isApproveTransaction, isBaseTransaction } from "@/types/transaction";

interface Props {
  client: ZerePyClient;
  message: Message;
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  sendTransaction: SendTransactionMutateAsync<Config, unknown>;
  status: "error" | "idle" | "pending" | "success";
}

const RenderMessage: React.FC<Props> = ({
  client,
  message,
  messages,
  setMessages,
  sendTransaction,
  status,
}: Props) => {
  const response = message.text;
  const { theme } = useTheme();

  // Custom renderer for code blocks
  const components = {
    code({ inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || "");
      const language = match ? match[1] : "";

      return !inline ? (
        <SyntaxHighlighter
          style={theme === "dark" ? vscDarkPlus : vs}
          language={language}
          PreTag="div"
          className="rounded-md my-2"
          {...props}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code className="bg-muted px-1 py-0.5 rounded" {...props}>
          {children}
        </code>
      );
    },
  };

  if (response) {
    const ipfsHashMatch = response.match(/"ipfs_hash":\s*"([^"]+)"/);

    const widthMatch = response.match(/"width":\s*(\d+)/);
    const heightMatch = response.match(/"height":\s*(\d+)/);

    if (ipfsHashMatch && widthMatch && heightMatch) {
      const ipfsHash = ipfsHashMatch[1];
      const width = parseInt(widthMatch[1], 10);
      const height = parseInt(heightMatch[1], 10);

      const ipfsUrl = `https://ipfs.io/ipfs/${ipfsHash}`;

      return (
        <div key={message.id} className="flex justify-start">
          <div className="w-full">
            <RenderImage ipfsUrl={ipfsUrl} width={width} height={height} />;
          </div>
        </div>
      );
    } else {
      let txMatch;
      try {
        txMatch = JSON.parse(response);
      } catch {
        const match = response.match(/\{.*?\}/);
        try {
          txMatch = match ? JSON.parse(match[0]) : false;
        } catch {
          txMatch = false;
        }
      }

      if (txMatch && (isBaseTransaction(txMatch) || isApproveTransaction(txMatch))) {
        return (
          <Transaction
            tx={txMatch}
            client={client}
            sendTransaction={sendTransaction}
            status={status}
            messages={messages}
            setMessages={setMessages}
          />
        );
      } else {
        const { sources, response } = parseResponse(message.text);

        return (
          <div key={message.id} className="flex justify-start">
            <div className="w-full md:p-5">
              <Sources
                sources={sources}
                components={components}
                message={message}
                response={response}
              />
            </div>
          </div>
        );
      }
    }
  }
};

export default RenderMessage;
