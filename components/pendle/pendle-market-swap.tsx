import React, { useState } from "react";
import { PendleMarket } from "@/lib/pendle/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PendleSwap } from "./pendle-swap";
import { ArrowLeftRight, CoinsIcon } from "lucide-react";
import { PendleMarketMint } from "./pendle-market-mint";

interface PendleMarketSwapProps {
  market: PendleMarket;
}

export function PendleMarketSwap({ market }: PendleMarketSwapProps) {
  const [activeTab, setActiveTab] = useState("swap");

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="space-y-4 p-4">
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="w-full rounded-none h-10 grid grid-cols-2 mb-4">
          <TabsTrigger 
            value="swap" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
          >
            <ArrowLeftRight className="h-4 w-4 mr-1" />
            Swap
          </TabsTrigger>
          <TabsTrigger 
            value="mint"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
          >
            <CoinsIcon className="h-4 w-4 mr-1" />
            Mint
          </TabsTrigger>
        </TabsList>

        <TabsContent value="swap">
          <PendleSwap market={market} />
        </TabsContent>
        
        <TabsContent value="mint">
          <PendleMarketMint market={market} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
