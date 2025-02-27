"use client";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ModeToggle } from "@/components/theme-toggle";
import { ConnectButton } from "@rainbow-me/rainbowkit";
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

  useEffect(() => {
    const setChatFromParams = async () => {
      const resolvedParams = await params;
      const chatId = resolvedParams.chat?.[0];

      if (chatId) {
        setChatId(chatId);
      }
    };

    setChatFromParams();
  }, [params, setChatId]);

  return (
    <SidebarProvider className="font-[family-name:var(--font-roboto-sans)]">
      <SidebarInset>
        <header className="flex h-16 shrink-0 bg-transparent items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="ml-auto px-4 flex items-center gap-2">
            <ConnectButton />
            <ModeToggle />
          </div>
        </header>

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
      </SidebarInset>
    </SidebarProvider>
  );
}
