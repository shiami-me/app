"use client";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { ScrollArea } from "@/components/ui/scroll-area";
import { ModeToggle } from "@/components/theme-toggle";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useSendTransaction } from "wagmi";
import { useChat } from "@/providers/ChatProvider";
import SendMessage from "@/components/chat/message/Send";
import ChatMain from "@/components/chat/Main";

export default function Page() {
  const { sendTransactionAsync, status } = useSendTransaction();

  const {
    messages,
    sendMessage,
    loading,
    setMessages,
    useBrowser,
    setUseBrowser,
    client,
  } = useChat();

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
                <ChatMain 
                  messages={messages}
                  setMessages={setMessages}
                  status={status}
                  client={client}
                  sendTransactionAsync={sendTransactionAsync}
                />
              </div>
            </ScrollArea>

            <div className="border-t p-4">
              <div className="flex space-x-2">
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
      </SidebarInset>
    </SidebarProvider>
  );
}
