"use client"
import { useEffect, useState } from "react";
import { ZerePyClient } from "@/lib/ZerePyClient";

export const useLoadAgent = (client: ZerePyClient, agentName: string) => {
  const [agent, setAgent] = useState<string | null>(null);

  useEffect(() => {
    if (!agent) {
      client.loadAgent(agentName).then((res) => {
        setAgent(JSON.stringify(res));
      });
    }
  }, []);

  return agent;
};
