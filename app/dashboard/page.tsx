"use client";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useTheme } from "next-themes";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ModeToggle } from "@/components/theme-toggle";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  vscDarkPlus,
  vs,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { ZerePyClient } from "@/lib/ZerePyClient";

interface Source {
  url: string;
  content: string;
}

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
}

const parseResponse = (
  text: string
): { sources: Source[]; response: string } => {
  try {
    // Look for array pattern at the start of the text
    const match = text.match(/^\s*(\[.*?\])\s*([\s\S]*)/);

    if (!match) {
      return { sources: [], response: text };
    }

    const [_, sourcesJson, remainingText] = match;

    try {
      const sources = JSON.parse(sourcesJson) as Source[];
      // If we successfully parsed the sources, return them along with the remaining text
      return {
        sources,
        response: remainingText.trim(),
      };
    } catch (parseError) {
      // If JSON parsing failed, it means this wasn't actually a sources array
      return { sources: [], response: text };
    }
  } catch (error) {
    console.error("Error parsing response:", error);
    return { sources: [], response: text };
  }
};

export default function Page() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! How can I assist you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [openSourceIndex, setOpenSourceIndex] = useState<number | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useTheme();

  const client = new ZerePyClient("http://localhost:8000");

  const handleSend = async () => {
    if (input.trim()) {
      setMessages((prev) => [
        ...prev,
        { id: prev.length + 1, text: input, sender: "user" },
      ]);
      setInput("");
      setIsLoading(true);

      try {
        await client.loadAgent("eternalai-example");

        const response = await client.performAction("groq", "generate-text", [
          input,
          "You are a helpful AI assistant",
        ]);

        setMessages((prev) => [
          ...prev,
          { id: prev.length + 1, text: response.result, sender: "bot" },
        ]);
      } catch (error) {
        console.error("Error generating response:", error);
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            text: "Sorry, something went wrong. Please try again.",
            sender: "bot",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  };

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

  const renderSource = (source: Source, index: number) => (
    <div key={index} className="space-y-2">
      <button
        onClick={() =>
          setOpenSourceIndex(openSourceIndex === index ? null : index)
        }
        className="flex w-full items-center justify-between rounded-full bg-muted px-4 py-2 text-sm hover:bg-muted/70 transition-colors"
      >
        <div className="flex items-center space-x-2">
          <span>Source {index + 1}</span>
          <span className="text-xs text-muted-foreground truncate max-w-[300px]">
            - {source.url}
          </span>
        </div>
        <svg
          className={`h-4 w-4 shrink-0 transition-transform ${
            openSourceIndex === index ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {openSourceIndex === index && (
        <div className="px-3 py-2 animate-in slide-in-from-top-1">
          <div className="rounded-lg bg-muted/50 p-3">
            <div className="mb-2">
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-500 hover:underline break-all"
              >
                {source.url}
              </a>
            </div>
            <ReactMarkdown
              components={components}
              className="text-sm prose dark:prose-invert max-w-none"
            >
              {source.content}
            </ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );

  const renderBotMessage = (message: Message) => {
    const { sources, response } = parseResponse(message.text);

    return (
      <div className="space-y-4">
        <ReactMarkdown
          components={components}
          className="text-sm prose dark:prose-invert max-w-none"
        >
          {response}
        </ReactMarkdown>

        {sources.length > 0 && (
          <div className="mt-4 space-y-2">
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              <p className="text-sm font-medium text-muted-foreground">
                Sources
              </p>
            </div>
            <div className="space-y-2">
              {sources.map((source, index) => renderSource(source, index))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <SidebarProvider className="font-[family-name:var(--font-roboto-sans)]">
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
          </div>
          <div className="ml-auto px-4">
            <ModeToggle />
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex h-[calc(100vh-8rem)] flex-col rounded-lg bg-background shadow-sm">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
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
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
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
                        renderBotMessage(message)
                      ) : (
                        <p className="text-sm">{message.text}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  disabled={isLoading}
                />
                <Button onClick={handleSend} disabled={isLoading}>
                  {isLoading ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                    </svg>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
