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
import { isAddLiquidity, isApproveTransaction, isBaseTransaction, isBeetsSwap, isRemoveLiquidity } from "@/types/transaction";
import { isStrategyOutput } from "@/types/messages";
import StrategyOutput from "./message/StrategyOutput";

interface Props {
  client: ZerePyClient;
  message: Message;
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  sendTransaction: SendTransactionMutateAsync<Config, unknown>;
}

const RenderMessage: React.FC<Props> = ({
  client,
  message,
  messages,
  setMessages,
  sendTransaction,
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
          className="rounded-md my-2 max-w-[75%]"
          {...props}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code className="bg-muted px-1 py-0.5 rounded max-w-[75%]" {...props}>
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
            <RenderImage ipfsUrl={ipfsUrl} width={width} height={height} />
          </div>
        </div>
      );
    } else {
      let parsedData;
      try {
        parsedData = JSON.parse(response);
        
        // Check if this is strategy output
        if (isStrategyOutput(parsedData)) {
          return (
            <div key={message.id} className="flex justify-start">
              <div className="w-full md:p-5">
                <StrategyOutput data={parsedData} />
              </div>
            </div>
          );
        }
        
        // Check if this is a transaction
        if (isBaseTransaction(parsedData) || isApproveTransaction(parsedData) || 
            isAddLiquidity(parsedData) || isRemoveLiquidity(parsedData) || isBeetsSwap(parsedData)) {
          return (
            <Transaction
              tx={parsedData}
              client={client}
              sendTransaction={sendTransaction}
              messages={messages}
              setMessages={setMessages}
            />
          );
        }
      } catch {
        // Try to extract JSON from the response
        const match = response.match(/\{.*?\}/);
        try {
          parsedData = match ? JSON.parse(match[0]) : false;
          if (parsedData && (isBaseTransaction(parsedData) || isApproveTransaction(parsedData) || 
              isAddLiquidity(parsedData) || isRemoveLiquidity(parsedData) || isBeetsSwap(parsedData))) {
            return (
              <Transaction
                tx={parsedData}
                client={client}
                sendTransaction={sendTransaction}
                messages={messages}
                setMessages={setMessages}
              />
            );
          }
        } catch {
          parsedData = false;
        }
      }
      
      // Default rendering with sources
      const { sources, response: parsedResponse } = parseResponse(message.text);
      return (
        <div key={message.id} className="flex justify-start">
          <div className="w-full md:p-5">
            <Sources
              sources={sources}
              components={components}
              message={message}
              response={parsedResponse}
            />
          </div>
        </div>
      );
    }
  }
};

export default RenderMessage;
