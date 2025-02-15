"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Send, Globe } from "lucide-react";
import { useState } from "react";

interface Props {
  sendMessage: (message: string) => void;
  loading: boolean;
  useBrowser: boolean;
  setUseBrowser: (value: boolean) => void;
}

const SendMessage: React.FC<Props> = ({
  sendMessage,
  loading,
  useBrowser,
  setUseBrowser,
}: Props) => {
  const [input, setInput] = useState("");

  return (
    <div className="relative flex items-center w-full rounded-3xl bg-muted px-4 py-3">
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask Shiami..."
        className="flex-1 text-md bg-transparent border-none text-black dark:text-gray-200 outline-none focus:ring-0 focus:border-none focus-visible:ring-0 focus-visible:border-none"
        onKeyDown={(e) => {
          if (e.key === "Enter" && loading === false) {
            sendMessage(input);
            setInput("");
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
        onClick={() => {
          sendMessage(input);
          setInput("");
        }}
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
