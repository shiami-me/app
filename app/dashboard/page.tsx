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
import { Loader2, Send } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Config, useAccount, usePublicClient, useSendTransaction } from "wagmi";
import { SendTransactionMutateAsync } from "wagmi/query";
import { waitForTransactionReceipt } from "@wagmi/core";
import { encodeFunctionData, formatEther } from "viem";
import { config } from "@/providers/WalletProvider";

const ERC20_ABI = [
  {
    constant: true,
    inputs: [
      { name: "_owner", type: "address" },
      { name: "_spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ name: "", type: "uint256" }],
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "_spender", type: "address" },
      { name: "_value", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "", type: "bool" }],
    type: "function",
  },
];

interface Source {
  url: string;
  content: string;
}

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  browserLogs?: Array<{ memory: string; goal: string; url: string }>;
}

type BrowserAction =
  | { go_to_url: { url: string } }
  | { input_text: { index: number; text: string } }
  | { click_element: { index: number } }
  | { extract_content: { include_links: boolean } }
  | { done: { text: string } };

type BrowserState = {
  evaluation_previous_goal: string;
  memory: string;
  next_goal: string;
};

type BrowserResult = {
  is_done: boolean;
  extracted_content?: string;
  include_in_memory?: boolean;
};

type BrowserHistoryEntry = {
  model_output: {
    current_state: BrowserState;
    action: BrowserAction[];
  };
  result: BrowserResult[];
  state?: {
    tabs?: { page_id: number; url: string; title: string }[];
    interacted_element?: (string | null)[];
    url?: string;
    title?: string;
  };
};

type BrowserResponse = {
  status: string;
  result: {
    status: string;
    result: {
      history: BrowserHistoryEntry[];
    };
  };
};

const parseResponse = (
  text: string
): { sources: Source[]; response: string } => {
  try {
    // Look for array pattern at the start of the text
    const match = text.match(/^\s*(\[.*?\])\s*([\s\S]*)/);

    if (!match) {
      return { sources: [], response: text };
    }

    const [, sourcesJson, remainingText] = match;

    try {
      const sources = JSON.parse(sourcesJson) as Source[];
      // If we successfully parsed the sources, return them along with the remaining text
      return {
        sources,
        response: remainingText.trim(),
      };
    } catch {
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
  const [agent, setAgent] = useState<string | null>(null);
  const [openSourceIndex, setOpenSourceIndex] = useState<number | null>(null);
  const [useBrowser, setUseBrowser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useTheme();
  const account = useAccount();
  const { sendTransactionAsync, status } = useSendTransaction();

  const client = new ZerePyClient("http://localhost:8000");
  const publicClient = usePublicClient();
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = `${input}`;
    setInput("");
    setMessages((prev) => [
      ...prev,
      { id: prev.length + 1, sender: "user", text: input },
    ]);

    setIsLoading(true);
    try {
      // Load agent first
      if (!agent) {
        const agentRes = await client.loadAgent("shiami");
        setAgent(JSON.stringify(agentRes));
      }

      if (useBrowser) {
        const response = await client.performAction("browser_use", "browse", [
          userMessage,
        ]);

        // Type assertion and processing browser response
        const browserResponse = response as BrowserResponse;
        const history = browserResponse.result.result.history;

        // Collect logs
        const logs = history.map((entry) => ({
          memory: entry.model_output.current_state.memory,
          goal: entry.model_output.current_state.next_goal,
          url: entry.state?.url || "N/A",
        }));

        // Find the final response
        const finalEntry = history.find((entry) =>
          entry.result.some((r) => r.is_done)
        );

        if (finalEntry) {
          const doneAction = finalEntry.model_output.action.find(
            (a) => "done" in a
          ) as { done: { text: string } } | undefined;

          const responseText = doneAction?.done.text || "No response found";
          setMessages((prev) => [
            ...prev,
            {
              id: prev.length + 1,
              sender: "bot",
              text: responseText,
              browserLogs: logs,
            },
          ]);
        }
      } else {
        // Use GROQ generate-text action
        const response = await client.performAction("gemini", "generate-text", [
          userMessage,
          `You are a helpful AI assistant - Connected Wallet(sender for sonic transactions) - ${account.address}`,
        ]);
        setMessages((prev) => [
          ...prev,
          { id: prev.length + 1, sender: "bot", text: response.result },
        ]);
      }
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          sender: "bot",
          text: "Sorry, there was an error processing your request.",
        },
      ]);
    }
    setIsLoading(false);
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

  const renderBotMessage = (
    message: Message,
    sendTransaction: SendTransactionMutateAsync<Config, unknown>,
    status: "error" | "idle" | "pending" | "success"
  ) => {
    const response = message.text;

    if (response) {
      const ipfsHashMatch = response.match(/"ipfs_hash":\s*"([^"]+)"/);

      // Match the width and height values
      const widthMatch = response.match(/"width":\s*(\d+)/);
      const heightMatch = response.match(/"height":\s*(\d+)/);
      const match = response.match(/\{.*?\}/);
      let txMatch = match ? JSON.parse(match[0]) : false;

      console.log(txMatch);
      if (ipfsHashMatch && widthMatch && heightMatch) {
        const ipfsHash = ipfsHashMatch[1];
        const width = parseInt(widthMatch[1], 10);
        const height = parseInt(heightMatch[1], 10);

        console.log("IPFS Hash:", ipfsHash);
        console.log("Width:", width);
        console.log("Height:", height);

        // Construct the IPFS URL
        const ipfsUrl = `https://ipfs.io/ipfs/${ipfsHash}`;

        return (
          <div className="space-y-4">
            <div
              className="relative w-full max-w-full"
              style={{ width: `${width}px`, height: `${height}px` }}
            >
              <Image
                src={ipfsUrl}
                alt={`Generated image`}
                fill
                className="object-contain rounded-lg"
                sizes={`(max-width: ${width}px) 100vw, ${width}px`}
                priority
              />
            </div>
          </div>
        );
      } else if (txMatch) {
        try {
          if (
            txMatch.type === "transfer" ||
            txMatch.type === "swap" ||
            txMatch.type === "deposit" ||
            txMatch.type === "borrow" ||
            txMatch.type === "repay" ||
            txMatch.type === "withdraw"
          ) {
            const tx = txMatch;
            // Add wagmi hooks for transaction
            const result = {
              to: tx.to,
              value: tx.value ? tx.value.toString() : "0",
              chainId: tx.chainId,
              data: tx.data || undefined,
              gas: tx.gas ? BigInt(tx.gas) : undefined,
              maxFeePerGas: tx.maxFeePerGas
                ? BigInt(tx.maxFeePerGas)
                : undefined,
              maxPriorityFeePerGas: tx.maxPriorityFeePerGas
                ? BigInt(tx.maxPriorityFeePerGas) > BigInt(tx.maxFeePerGas) // Ensure valid values
                  ? BigInt(tx.maxFeePerGas)
                  : BigInt(tx.maxPriorityFeePerGas)
                : undefined,
            };

            return (
              <div className="space-y-4">
                <div className="rounded-lg bg-muted/50 p-4">
                  <h3 className="font-medium mb-2">Transaction Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="grid grid-cols-[100px,1fr] gap-2">
                      <span className="font-medium">Tx Type:</span>
                      <span className="truncate">
                        {tx.type.toLocaleUpperCase()}
                      </span>
                    </div>
                    <div className="grid grid-cols-[100px,1fr] gap-2">
                      <span className="font-medium">To:</span>
                      <span className="truncate">{result.to}</span>
                    </div>
                    <div className="grid grid-cols-[100px,1fr] gap-2">
                      <span className="font-medium">Value:</span>
                      <span>{formatEther(result.value)}</span>
                    </div>
                    <div className="grid grid-cols-[100px,1fr] gap-2">
                      <span className="font-medium">Chain ID:</span>
                      <span>{result.chainId}</span>
                    </div>
                  </div>
                  <Button
                    className="mt-4"
                    onClick={async () => {
                      if (
                        txMatch.type === "deposit" ||
                        txMatch.type === "repay"
                      ) {
                        const allowance = (await publicClient?.readContract({
                          address: txMatch.tokenAddress as `0x${string}`,
                          abi: ERC20_ABI,
                          functionName: "allowance",
                          args: [account.address, txMatch.to],
                        })) as unknown as bigint; // ✅ Explicit cast

                        console.log(`Allowance: ${allowance}`);

                        if (BigInt(allowance) >= BigInt(txMatch.amount)) {
                          console.log(
                            "Sufficient allowance, no need to approve."
                          );
                        } else {
                          // Step 2: Approve if allowance is insufficient
                          console.log("Approving token...");

                          const approveTx = await sendTransaction({
                            to: txMatch.tokenAddress as `0x${string}`,
                            data: encodeFunctionData({
                              abi: ERC20_ABI,
                              functionName: "approve",
                              args: [txMatch.to, txMatch.amount],
                            }),
                            chainId: tx.chainId,
                          });

                          console.log("Approval TX sent: ", approveTx);
                          const txReceipt = await waitForTransactionReceipt(
                            config,
                            {
                              hash: approveTx,
                            }
                          );
                          if (txReceipt.status === "reverted") {
                            setMessages((prev) => [
                              ...prev,
                              {
                                id: prev.length + 1,
                                sender: "bot",
                                text: "Approval failed. Please try again.",
                              },
                            ]);
                            return;
                          }
                        }
                      }
                      await sendTransaction(result, {
                        onSuccess: async (data) => {
                          console.log(data);
                          const confirmMessage = `${txMatch.type} done - https://testnet.soniclabs.com/${data}`;
                          await client.performAction(
                            "gemini",
                            "continue-execution",
                            [confirmMessage]
                          );
                          setMessages((prev) => [
                            ...prev,
                            {
                              id: prev.length + 1,
                              sender: "bot",
                              text: confirmMessage,
                            },
                          ]);
                        },
                      });
                    }}
                    disabled={status === "success" || status === "pending"}
                  >
                    {status !== "idle" ? (
                      status !== "success" ? (
                        <div className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Confirming...</span>
                        </div>
                      ) : (
                        <span>Confirmed</span>
                      )
                    ) : (
                      <span>Confirm Transaction</span>
                    )}
                  </Button>
                </div>
              </div>
            );
          } else if ("approve" in txMatch) {
            const tx = txMatch["approve"];
            return (
              <div className="space-y-4">
                <div className="rounded-lg bg-muted/50 p-4">
                  <h3 className="font-medium mb-2">Swap Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="grid grid-cols-[120px,1fr] gap-2">
                      <span className="font-medium">Type:</span>
                      <span className="truncate">Approve Token Transfer</span>
                    </div>
                    <div className="grid grid-cols-[120px,1fr] gap-2">
                      <span className="font-medium">Amount In:</span>
                      <span>{formatEther(tx.amountIn)}</span>
                    </div>
                    <div className="grid grid-cols-[120px,1fr] gap-2">
                      <span className="font-medium">Amount Out:</span>
                      <span>{formatEther(tx.amountOut)}</span>
                    </div>
                    <div className="grid grid-cols-[120px,1fr] gap-2">
                      <span className="font-medium">USD Value In:</span>
                      <span>${tx.amountInUsd}</span>
                    </div>
                    <div className="grid grid-cols-[120px,1fr] gap-2">
                      <span className="font-medium">USD Value Out:</span>
                      <span>${tx.amountOutUsd}</span>
                    </div>
                    <div className="grid grid-cols-[120px,1fr] gap-2">
                      <span className="font-medium">Gas (Est.):</span>
                      <span>{tx.gas} units</span>
                    </div>
                    <div className="grid grid-cols-[120px,1fr] gap-2">
                      <span className="font-medium">Gas Price:</span>
                      <span>{Number(tx.gasPrice) / 1e9} Gwei</span>
                    </div>
                    <div className="grid grid-cols-[120px,1fr] gap-2">
                      <span className="font-medium">Gas USD:</span>
                      <span>${tx.gasUsd}</span>
                    </div>
                    {tx.route && tx.route[0] && tx.route[0][0] && (
                      <div className="grid grid-cols-[120px,1fr] gap-2">
                        <span className="font-medium">Exchange:</span>
                        <span>{tx.route[0][0].exchange}</span>
                      </div>
                    )}
                  </div>
                  <Button
                    className="mt-4"
                    onClick={async () => {
                      const tx = txMatch["approve"];
                      if (
                        tx.tokenIn !==
                        "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
                      ) {
                        // Need to approve token first
                        try {
                          // Step 1: Check Allowance
                          const allowance = (await publicClient?.readContract({
                            address: tx.tokenIn as `0x${string}`,
                            abi: ERC20_ABI,
                            functionName: "allowance",
                            args: [account.address, tx.routerAddress],
                          })) as unknown as bigint; // ✅ Explicit cast

                          console.log(`Allowance: ${allowance}`);

                          if (BigInt(allowance) >= BigInt(tx.amountIn)) {
                            console.log(
                              "Sufficient allowance, no need to approve."
                            );
                          } else {
                            // Step 2: Approve if allowance is insufficient
                            console.log("Approving token...");

                            const approveTx = await sendTransaction({
                              to: tx.tokenIn as `0x${string}`,
                              data: encodeFunctionData({
                                abi: ERC20_ABI,
                                functionName: "approve",
                                args: [tx.routerAddress, tx.amountIn],
                              }),
                              chainId: tx.chainId,
                            });

                            console.log("Approval TX sent: ", approveTx);
                            const txReceipt = await waitForTransactionReceipt(
                              config,
                              {
                                hash: approveTx,
                              }
                            );
                            if (txReceipt.status === "reverted") {
                              setMessages((prev) => [
                                ...prev,
                                {
                                  id: prev.length + 1,
                                  sender: "bot",
                                  text: "Approval failed. Please try again.",
                                },
                              ]);
                              return;
                            }
                          }

                          setMessages((prev) => [
                            ...prev,
                            {
                              id: prev.length + 1,
                              sender: "bot",
                              text: JSON.stringify(
                                JSON.stringify({
                                  ...txMatch["swap"],
                                  type: "swap",
                                })
                              ),
                            },
                          ]);
                        } catch (error) {
                          console.error(
                            "Error in allowance check or approval:",
                            error
                          );
                        }
                      } else {
                        // Native token, no approval needed
                        setMessages((prev) => [
                          ...prev,
                          {
                            id: prev.length + 1,
                            sender: "bot",
                            text: JSON.stringify(
                              JSON.stringify({
                                ...txMatch["swap"],
                                type: "swap",
                              })
                            ),
                          },
                        ]);
                      }
                    }}
                  >
                    Approve Swap
                  </Button>
                </div>
              </div>
            );
          }
        } catch (error) {
          console.error("Error parsing transaction data:", error);
        }
      } else {
        const { sources, response } = parseResponse(message.text);

        return (
          <div className="space-y-4">
            <ReactMarkdown
              components={components}
              className="text-sm prose dark:prose-invert max-w-none"
            >
              {response}
            </ReactMarkdown>

            {message.browserLogs && (
              <div className="mt-2">
                <button
                  onClick={() =>
                    setOpenSourceIndex(
                      openSourceIndex === message.id ? null : message.id
                    )
                  }
                  className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2"
                >
                  <svg
                    className={`h-4 w-4 transition-transform ${
                      openSourceIndex === message.id ? "rotate-180" : ""
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
                  {openSourceIndex === message.id
                    ? "Hide browser logs"
                    : "Show browser logs"}
                </button>

                {openSourceIndex === message.id && (
                  <div className="mt-2 rounded-lg bg-muted/50 p-3 animate-in slide-in-from-top-1">
                    <div className="space-y-2">
                      {message.browserLogs.map((log, i) => (
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
      }
    } else {
      return <div className="text-sm">Something went wrong</div>;
    }
  };

  return (
    <SidebarProvider className="font-[family-name:var(--font-roboto-sans)]">
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
          </div>
          <div className="ml-auto px-4 flex items-center gap-2">
            <ConnectButton />
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
                        renderBotMessage(message, sendTransactionAsync, status)
                      ) : (
                        <p className="text-sm">{message.text}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="border-t p-4">
              <div className="flex space-x-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
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
                  onClick={sendMessage}
                  disabled={isLoading || !input.trim()}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
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
