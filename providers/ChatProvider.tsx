"use client"
import { ZerePyClient } from "@/lib/ZerePyClient";
import { Message } from "@/types/messages";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { useAccount } from "wagmi";
import { useSendMessage } from "@/hooks/useSendMessage";

interface ChatContextType {
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  sendMessage: (content: string) => void;
  loading: boolean;
  setIsLoading: (loading: boolean) => void;
  useBrowser: boolean;
  setUseBrowser: (useBrowser: boolean) => void;
  client: ZerePyClient;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setIsLoading] = useState(false);
  const [useBrowser, setUseBrowser] = useState(false);
  const account = useAccount();
  const client = new ZerePyClient("http://localhost:8000");

  const sendMessage = useSendMessage(client, account, messages, setMessages, setIsLoading, useBrowser);

  return (
    <ChatContext.Provider
      value={{
        messages,
        sendMessage,
        setMessages,
        loading,
        setIsLoading,
        useBrowser,
        setUseBrowser,
        client
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
