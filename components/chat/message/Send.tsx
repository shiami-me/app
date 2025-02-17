"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Send, Globe } from "lucide-react";
import { useState } from "react";
import { useChat } from "@/providers/ChatProvider";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

interface Props {
  sendMessage: (message: string, chat: string) => void;
  loading: boolean;
  useBrowser: boolean;
  setUseBrowser: (value: boolean) => void;
}

const toTitleCase = (str: string) => {
  return str
    .split(" ")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
};

const SendMessage: React.FC<Props> = ({
  sendMessage,
  loading,
  useBrowser,
  setUseBrowser,
}: Props) => {
  const [input, setInput] = useState("");
  const { chatId, setMessageHistory, setChatId } = useChat();
  const router = useRouter();

  const handleSendMessage = async () => {
    if (!chatId) {
      const newChatId = uuidv4();
      const title = toTitleCase(input.split(" ").slice(0, 3).join(" "));
      const chats = JSON.parse(localStorage.getItem("chats") || "{}");
      chats[newChatId] = { id: newChatId, title };
      setMessageHistory(chats);
      localStorage.setItem("chats", JSON.stringify(chats));
      setChatId(newChatId);  // Update the `chatId` for the first time
      router.replace(`/chat/${newChatId}`);  // Update the route with the new chatId

      sendMessage(input, newChatId);  // Send the first message
    } else {
      sendMessage(input, chatId);  // Send message to existing chatId
    }
    setInput("")
  };

  return (
    <div className="relative flex items-center w-full rounded-3xl bg-muted px-4 py-3">
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask Shiami..."
        className="flex-1 text-md bg-transparent border-none text-black dark:text-gray-200 outline-none focus:ring-0 focus:border-none focus-visible:ring-0 focus-visible:border-none"
        onKeyDown={(e) => {
          if (e.key === "Enter" && loading === false) {
            handleSendMessage();
          }
        }}
      />

      <Button
        onClick={() => setUseBrowser(!useBrowser)}
        variant="ghost"
        size="sm"
        className={`flex items-center gap-1 ${
          useBrowser
            ? "border-green-500 text-green-400"
            : "border-gray-500 text-gray-400"
        }`}
      >
        <Globe className="w-4 h-4" />
        <span className="hidden md:inline">
          Search
        </span>
      </Button>

      <Button
        className="ml-2 rounded-full p-2 bg-gray-700 hover:bg-gray-600 text-white"
        onClick={handleSendMessage}
        disabled={loading || !input.trim()}
      >
        {loading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <Send className="h-5 w-5" />
        )}
      </Button>
    </div>
  );
};

export default SendMessage;
