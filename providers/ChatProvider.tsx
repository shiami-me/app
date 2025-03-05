"use client";
import { ZerePyClient } from "@/lib/ZerePyClient";
import { Message, MessageHistory } from "@/types/messages";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useRef,
} from "react";
import { useAccount } from "wagmi";
import { useSendMessage } from "@/hooks/useSendMessage";
import { useRouter } from "next/navigation";

export interface ContextItem {
  id: string;
  type: string;
  title: string;
  data: any;
}

interface ChatContextType {
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  sendMessage: (content: string, chat: string) => void;
  loading: boolean;
  setIsLoading: (loading: boolean) => void;
  useBrowser: boolean;
  setUseBrowser: (useBrowser: boolean) => void;
  client: ZerePyClient;
  chatId: string | null;
  setChatId: (chatId: string | null) => void;
  chatHistory: MessageHistory;
  setMessageHistory: (chatHistory: MessageHistory) => void;
  deleteChatHistory: (chatId: string) => void;
  contextData: ContextItem[];
  addToContext: (item: ContextItem) => void;
  removeFromContext: (id: string) => void;
  clearContext: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setIsLoading] = useState(false);
  const [useBrowser, setUseBrowser] = useState(false);
  const [chatId, setChatId] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<MessageHistory>({});
  const [contextData, setContextData] = useState<ContextItem[]>([]);
  const account = useAccount();
  const client = new ZerePyClient("https://api.shiami.me");
  const router = useRouter();

  const sendMessage = useSendMessage(
    client,
    account,
    messages,
    setMessages,
    setIsLoading,
    useBrowser,
    contextData
  );

  useEffect(() => {
    const chats = JSON.parse(localStorage.getItem("chats") || "{}");
    if (Object.keys(chats).length > 0 && Object.keys(chatHistory).length === 0) {
      setChatHistory(chats);
    }
  
    if (!chatId) {
      setMessages([]);
      return;
    }
  
    if (chats[chatId]) {
      if (loading) return;
      client
        .performAction("gemini", "get-message-history", [chatId])
        .then((response) => {
          setMessages(response.result);
        })
        .catch((error) => {
          console.error("Error fetching message history:", error);
          setMessages([]);
          router.replace("/chat");
        });
    } else {
      setChatId(null);
      setMessages([]);
      if (!window.location.pathname.includes("/chat")) return;
      router.replace("/chat");
    }
  }, [chatId, chatHistory, setChatHistory, setMessages, router]);
  
  const addToContext = (item: ContextItem) => {
    // Prevent duplicate items
    setContextData(prev => {
      if (prev.some(i => i.id === item.id)) {
        return prev;
      }
      return [...prev, item];
    });
  };

  const removeFromContext = (id: string) => {
    setContextData(prev => prev.filter(item => item.id !== id));
  };

  const clearContext = () => {
    setContextData([]);
  };

  const deleteChatHistory = (chatIdInput: string) => {
    client
      .performAction("gemini", "delete-chat", [chatIdInput])
      .then((response) => {
        const updatedChats = { ...chatHistory };
        delete updatedChats[chatIdInput];
        setChatHistory(updatedChats);
        localStorage.setItem("chats", JSON.stringify(updatedChats));
        if (chatIdInput === chatId) {
          setChatId(null);
          setMessages([]);
          router.replace("/chat");
        }
      })
      .catch((error) => {
        console.error("Error deleting chat:", error);
      });
  };

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
        client,
        chatId,
        setChatId,
        chatHistory,
        setMessageHistory: setChatHistory,
        deleteChatHistory,
        contextData,
        addToContext,
        removeFromContext,
        clearContext,
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
