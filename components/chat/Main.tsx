import { ZerePyClient } from "@/lib/ZerePyClient";
import { Message } from "@/types/messages";
import { Config } from "wagmi";
import { SendTransactionMutateAsync } from "wagmi/query";
import RenderMessage from "./Message";
import React from "react";
import { motion } from "framer-motion";
import { Gauge, Sprout, Database, TrendingUp } from "lucide-react";

const chatSuggestions = [
  {
    text: "Swap 1 S to Anon",
    color: "text-blue-500/90 border-blue-200/50 dark:border-blue-500/20",
    icon: <Gauge className="w-5 h-5" />,
  },
  {
    text: "Show me the best yield farming opportunities",
    color: "text-purple-500/90 border-purple-200/50 dark:border-purple-500/20",
    icon: <Sprout className="w-5 h-5" />,
  },
  {
    text: "Explain how to deposit S on Silo Finance",
    color: "text-green-500/90 border-green-200/50 dark:border-green-500/20",
    icon: <Database className="w-5 h-5" />,
  },
  {
    text: "Compare APY between different Silo pairs",
    color: "text-orange-500/90 border-orange-200/50 dark:border-orange-500/20",
    icon: <TrendingUp className="w-5 h-5" />,
  },
];

interface Props {
  messages: Message[];
  setMessages: (value: Message[]) => void;
  client: ZerePyClient;
  sendTransactionAsync: SendTransactionMutateAsync<Config, unknown>;
  caller?: string;
}

const ChatMain: React.FC<Props> = ({
  messages,
  setMessages,
  client,
  sendTransactionAsync,
  caller,
}: Props) => {
  const handleSuggestionClick = (suggestion: string) => {
    setMessages([
      ...messages,
      {
        id: messages.length,
        text: suggestion,
        sender: "user",
      },
    ]);
  };

  return (
    <>
      {messages.length === 0 ? (
        <div className="flex flex-col items-center space-y-8">
          <div className="text-center">
            <p className={`${caller ? "text-lg pt-8" : " text-4xl"} font-bold font-[family-name:var(--font-roboto-mono)]`}>
              Hi! I&apos;m Shiami. Your personal DeFi assistant.
            </p>
          </div>
          {!caller && (
            <div className="w-full max-w-2xl mx-auto px-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {chatSuggestions.map((suggestion, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion.text)}
                    className={`group px-4 py-3 rounded-lg border ${suggestion.color} 
                    text-left transition-all duration-200
                    hover:scale-[1.02] active:scale-[0.98]
                    bg-background/50 backdrop-blur-sm
                    flex items-center gap-3`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div
                      className={`${suggestion.color.split(" ")[0]} shrink-0`}
                    >
                      {suggestion.icon}
                    </div>
                    <p className="text-sm font-medium">{suggestion.text}</p>
                  </motion.button>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <>
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
                <div key={message.id} className="flex justify-end">
                  <div
                    className={
                      "max-w-[75%] rounded-3xl px-5 py-3 bg-primary text-primary-foreground"
                    }
                  >
                    <p className="text-md break-words whitespace-pre-wrap">
                      {message.text}
                    </p>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </>
      )}
    </>
  );
};

export default ChatMain;
