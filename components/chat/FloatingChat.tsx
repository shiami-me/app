"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSendTransaction } from "wagmi";
import { useChat } from "@/providers/ChatProvider";
import ChatMain from "@/components/chat/Main";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import ContextDisplay from "@/components/chat/ContextDisplay";

export default function FloatingChat({
  caller
}: {
  caller: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { sendTransactionAsync } = useSendTransaction();
  const {
    messages,
    sendMessage,
    loading,
    setMessages,
    client,
    setMessageHistory,
    setChatId,
    chatId,
    contextData,
    removeFromContext,
    clearContext
  } = useChat();
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };
  
  useEffect(() => {
    console.log(caller)
    if (caller) {
      setChatId(caller.split("/").join("-"));
    }
  }, [caller, setChatId]);

  useEffect(() => {
    if (scrollRef.current && isOpen) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, isOpen]);

  const toTitleCase = (str: string) => {
    return str
      .split(" ")
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(" ");
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    if (!chatId) {
      const newChatId = caller.split("/").join("-");
      const chats = JSON.parse(localStorage.getItem("chats") || "{}");
      chats[newChatId] = { id: newChatId, title: caller.split("/").map(toTitleCase).join(" ") };
      localStorage.setItem("chats", JSON.stringify(chats));
      setMessageHistory(chats);
      setChatId(newChatId);
      
      sendMessage(input, newChatId);
    } else {
      sendMessage(input, chatId);
    }
    
    setInput("");
  };

  const expandToFullChat = () => {
    if (chatId) {
      router.push(`/chat/${chatId}`);
    } else {
      router.push('/chat');
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="bg-background border rounded-xl shadow-lg flex flex-col w-[90vw] sm:w-[380px] h-[520px] overflow-hidden"
          >
            {/* Chat Header */}
            <div className="p-4 border-b flex justify-between items-center bg-background rounded-t-xl">
              <div className="flex flex-col">
                <h3 className="font-semibold text-foreground">Shiami</h3>
                <span className="text-xs text-muted-foreground">Your personal DeFi assistant</span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full hover:bg-muted"
                  onClick={expandToFullChat}
                >
                  <MessageCircle className="h-4 w-4" />
                  <span className="sr-only">Open full chat</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full hover:bg-muted"
                  onClick={toggleChat}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close chat</span>
                </Button>
              </div>
            </div>

            {/* Chat Messages */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-auto custom-scrollbar"
              >
                <ScrollArea className="flex flex-1 justify-center items-center p-4">
                  <div className="max-w-[80%] flex flex-col gap-7">
                    <ChatMain
                      messages={messages}
                      setMessages={setMessages}
                      client={client}
                      sendTransactionAsync={sendTransactionAsync}
                      caller={caller}
                      sendMessage={sendMessage}
                      chatId={chatId}
                    />
                  </div>
                </ScrollArea>
              </div>

            {/* Message Input */}
            <div className="p-3 border-t">
              {contextData.length > 0 && (
                <div className="mb-2 rounded-md bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                  <ContextDisplay 
                    contextData={contextData} 
                    removeFromContext={removeFromContext} 
                    clearContext={clearContext}
                    compact={true}
                  />
                </div>
              )}
              
              <div className="relative flex items-center w-full rounded-3xl bg-muted px-4 py-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask Shiami..."
                  className="flex-1 text-sm bg-transparent border-none text-black dark:text-gray-200 outline-none focus:ring-0 focus:border-none focus-visible:ring-0 focus-visible:border-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !loading) {
                      handleSendMessage();
                    }
                  }}
                />
                <Button
                  className="ml-2 rounded-full p-1 h-8 w-8 bg-gray-700 hover:bg-gray-600 text-white flex items-center justify-center"
                  onClick={handleSendMessage}
                  disabled={loading || !input.trim()}
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <div className="relative">
                      <Send className="h-4 w-4" />
                      {contextData.length > 0 && (
                        <span className="absolute -top-1 -right-1 h-2 w-2 bg-green-500 rounded-full"></span>
                      )}
                    </div>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleChat}
            className="h-14 w-14 rounded-full shadow-lg bg-primary text-primary-foreground hover:shadow-xl transition-shadow flex items-center justify-center relative"
          >
            <MessageCircle className="h-6 w-6" />
            {contextData.length > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                {contextData.length}
              </span>
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}