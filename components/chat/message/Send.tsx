"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Send } from "lucide-react";
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
    <>
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            sendMessage(input);
            setInput("");
          }
        }}
      />

      <button
        onClick={() => setUseBrowser(!useBrowser)}
        className={`px-4 py-2 rounded-md border transition-colors ${
          useBrowser
            ? "border-green-500 text-green-500 hover:bg-green-50"
            : "border-gray-300 hover:bg-gray-50"
        }`}
      >
        Search
      </button>

      <Button
        onClick={() => {
          sendMessage(input);
          setInput("");
        }}
        disabled={loading || !input.trim()}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
      </Button>
    </>
  );
};

export default SendMessage;
