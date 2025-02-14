"use client"
import { Message, Source } from "@/types/messages";
import Link from "next/link";
import { JSX, useState } from "react";
import ReactMarkdown from "react-markdown";

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

  return (
    <div className="space-y-4">
      <ReactMarkdown
        components={props.components}
        className="text-sm prose dark:prose-invert max-w-none"
      >
        {props.response}
      </ReactMarkdown>

      {props.message.browserLogs && (
        <div className="mt-2">
          <button
            onClick={() =>
              setOpenSourceIndex(
                openSourceIndex === props.message.id
                  ? null
                  : props.message.id
              )
            }
            className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2"
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
            <div className="mt-2 rounded-lg bg-muted/50 p-3 animate-in slide-in-from-top-1">
              <div className="space-y-2">
                {props.message.browserLogs.map((log, i) => (
                  <div
                    key={i}
                    className="text-sm border-b border-muted-foreground/20 pb-2 last:border-0"
                  >
                    <div className="grid grid-cols-[80px,1fr] gap-2">
                      <span className="font-medium">Memory:</span>
                      <span>{log.memory}</span>
                    </div>
                    <div className="grid grid-cols-[80px,1fr] gap-2">
                      <span className="font-medium">Goal:</span>
                      <span>{log.goal}</span>
                    </div>
                    <div className="grid grid-cols-[80px,1fr] gap-2">
                      <span className="font-medium">URL:</span>
                      <Link
                        href={log.url}
                        target="_blank"
                        className="text-blue-500 hover:underline break-all"
                        rel="noopener noreferrer"
                      >
                        {log.url}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      {props.sources.length > 0 && (
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
            <p className="text-sm font-medium text-muted-foreground">Sources</p>
          </div>
          <div className="space-y-2">
            {props.sources.map((source, index) => (
              <div key={index} className="space-y-2">
                <button
                  onClick={() =>
                    setOpenSourceIndex(
                      openSourceIndex === index ? null : index
                    )
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
                        <Link
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-500 hover:underline break-all"
                        >
                          {source.url}
                        </Link>
                      </div>
                      <ReactMarkdown
                        components={props.components}
                        className="text-sm prose dark:prose-invert max-w-none"
                      >
                        {source.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sources;
