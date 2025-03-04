"use client";
import { usePathname } from "next/navigation";
import FloatingChat from "./FloatingChat";

export default function FloatingChatWrapper() {
  // Get the current path to determine if we're on a chat page
  const pathname = usePathname();
  
  // Only show the floating chat if we're NOT on a chat page
  const isChatPage = pathname?.startsWith('/chat');
  
  if (isChatPage || pathname === "/") {
    return null;
  }
  
  return <FloatingChat caller={pathname.split("/").slice(0, 3).join("/")}/>;
}