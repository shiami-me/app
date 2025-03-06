"use client";
import { useEffect, useRef, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSendTransaction } from "wagmi";
import { useChat } from "@/providers/ChatProvider";
import SendMessage from "@/components/chat/message/Send";
import ChatMain from "@/components/chat/Main";

export default function Page({
  params,
}: {
  params: Promise<{ chat?: string[] }>;
}) {
  const { sendTransactionAsync } = useSendTransaction();
  const {
    messages,
    sendMessage,
    loading,
    setMessages,
    useBrowser,
    setUseBrowser,
    client,
    setChatId,
    chatId,
  } = useChat();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const [resolvedParams, setResolvedParams] = useState<{ chat?: string[] } | null>(null);

  useEffect(() => {
    params.then((resolved) => {
      setResolvedParams(resolved);
    });

  }, [params]);

  useEffect(() => {
    if (resolvedParams) {
      if (resolvedParams?.chat?.[0]) {
        setChatId(resolvedParams.chat[0]);
      } else {
        setChatId(null);
      }
    }
  }, [resolvedParams, setChatId]);


  return (

        <div className="flex flex-1 flex-col gap-4 md:p-4 pt-0">
          <div className="flex flex-1 flex-col gap-4 md:p-4 pt-0 items-center justify-center">
            <div
              className={`w-full md:w-4/5${
                messages.length > 0 ? " h-[calc(100vh-8rem)]" : ""
              } flex flex-col rounded-lg bg-background shadow-sm`}
            >
              <div
                ref={scrollRef}
                className="flex-1 overflow-auto custom-scrollbar"
              >
                <ScrollArea className="flex flex-1 justify-center items-center p-4">
                  <div className="w-full flex flex-col gap-7">
                    <ChatMain
                      messages={messages}
                      setMessages={setMessages}
                      client={client}
                      sendTransactionAsync={sendTransactionAsync}
                      sendMessage={sendMessage}
                      chatId={chatId}
                    />
                  </div>
                </ScrollArea>
              </div>

              <div className="border-t p-4 flex justify-center">
                <div className="w-full">
                  <SendMessage
                    sendMessage={sendMessage}
                    loading={loading}
                    useBrowser={useBrowser}
                    setUseBrowser={setUseBrowser}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
  );
}
