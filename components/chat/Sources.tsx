"use client";
import { Message, Source } from "@/types/messages";
import Link from "next/link";
import { JSX, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { BookOpen, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "../ui/card";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import remarkBreaks from "remark-breaks";

interface Props {
  sources: Source[];
  components: {
    code({ inline, className, children, ...props }: any): JSX.Element;
  };
  message: Message;
  response: string;
}

const Sources: React.FC<Props> = (props: Props) => {
  const [openSourceIndex, setOpenSourceIndex] = useState<number | null>(null);
  const [toolMessage, setToolMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      const parsedResponse = JSON.parse(props.response);
      if (parsedResponse.tool) {
        const formattedTool = parsedResponse.tool
          .split("_")
          .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(" ");
        
        setToolMessage(formattedTool);
      } else {
        setToolMessage(null);
      }
    } catch {
      setToolMessage(null);
    }
  }, [props.response]);

  return (
    <div className="flex space-x-4">
      <div className="flex-shrink-0">
        <Image
          src="/shiami.jpeg"
          alt="Chatbot Avatar"
          width={40}
          height={40}
          className="rounded-full"
        />
      </div>

      <div className="space-y-4 w-[75%] py-2">
        {toolMessage ? (
          <div className="text-gray-500 dark:text-gray-300 font-thin text-lg animate-blink font-[family-name:var(--font-roboto-mono)]">
          {toolMessage}
        </div>
        ) : (
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkBreaks]}
          rehypePlugins={[rehypeHighlight]}
          components={{
            table: ({ children }) => (
              <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
                {children}
              </table>
            ),
            th: ({ children }) => (
              <th className="border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 px-4 py-2 text-left">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                {children}
              </td>
            ),
            a: ({ ...props }) => (
              <a
                {...props}
                target="_blank"
                className="text-blue-600 hover:underline dark:text-blue-400"
              />
            ),
          }}
          className="text-md prose dark:prose-invert max-w-none break-words whitespace-pre-wrap"
        >
          {props.response}
        </ReactMarkdown>

        )}

        {props.message.browserLogs && (
          <div className="mt-2">
            <button
              onClick={() =>
                setOpenSourceIndex(
                  openSourceIndex === props.message.id ? null : props.message.id
                )
              }
              className="text-md text-muted-foreground hover:text-foreground flex items-center gap-2"
            >
              <svg
                className={`h-4 w-4 transition-transform ${
                  openSourceIndex === props.message.id ? "rotate-180" : ""
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
              {openSourceIndex === props.message.id
                ? "Hide browser logs"
                : "Show browser logs"}
            </button>

            {openSourceIndex === props.message.id && (
              <div className="mt-2 space-y-3 rounded-lg bg-muted/50 p-4 animate-in slide-in-from-top-1 shadow-md">
                {props.message.browserLogs.map((log, i) => (
                  <div key={i} className="relative rounded-xl p-4 shadow-lg">
                    <div className="flex flex-col space-y-1 text-gray-100">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Memory</span>
                      <span className="font-semibold text-black dark:text-white">{log.memory}</span>
                    </div>

                    <div className="flex flex-col space-y-1 mt-3 text-gray-100">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Goal</span>
                      <span className="font-semibold text-black dark:text-white">{log.goal}</span>
                    </div>

                    <div className="flex flex-col space-y-1 mt-3">
                      <span className="text-sm text-gray-600 dark:text-gray-400">URL</span>
                      <Link
                        href={log.url}
                        target="_blank"
                        className="font-medium text-blue-400 hover:underline break-words"
                        rel="noopener noreferrer"
                      >
                        {log.url}
                      </Link>
                    </div>

                    <span className="absolute bottom-2 right-3 text-xs text-gray-500">
                      #{i + 1}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {props.sources.length > 0 && (
          <div className="mt-6">
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-6 w-6 text-gray-500" />
              <p className="text-lg font-semibold dark:text-gray-300 text-gray-800">Sources</p>
            </div>

            <div className="space-y-4">
              {props.sources.map((source, index) => (
                <Card
                  key={index}
                  className="rounded-xl"
                >
                  <button
                    onClick={() =>
                      setOpenSourceIndex(
                        openSourceIndex === index ? null : index
                      )
                    }
                    className="flex w-full items-center justify-between px-4 py-3 dark:text-gray-400 text-gray-600 hover:text-blue-500 transition-all"
                  >
                    <span className="text-sm truncate max-w-[280px]">
                      {source.url}
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform",
                        openSourceIndex === index && "rotate-180"
                      )}
                    />
                  </button>

                  {openSourceIndex === index && (
                    <CardContent className="p-4 rounded-b-xl shadow-inner animate-fade-in">
                      <Link
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-400 hover:underline break-all"
                      >
                        {source.url}
                      </Link>
                      <div className="mt-3 dark:text-gray-400 text-gray-600 text-sm leading-relaxed">
                        <ReactMarkdown className="prose dark:prose-invert max-w-none">
                          {source.content}
                        </ReactMarkdown>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sources;
