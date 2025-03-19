import React, { useState } from "react";
import { PendleMarket } from "@/lib/pendle/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeftRight, CoinsIcon } from "lucide-react";
import { PendleMint } from "./pendle-mint";
import { PendleRedeem } from "./pendle-redeem";

interface PendleMarketMintProps {
  market: PendleMarket;
}

export function PendleMarketMint({ market }: PendleMarketMintProps) {
  const [activeTab, setActiveTab] = useState("mint");

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
      <TabsList className="w-full rounded-lg h-12 grid grid-cols-2 mb-6 bg-muted/50 p-1">
        <TabsTrigger
          value="mint"
          className="rounded-md transition-all data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-primary font-medium"
        >
          <ArrowLeftRight className="h-4 w-4 mr-2" />
          Mint
        </TabsTrigger>
        <TabsTrigger
          value="redeem"
          className="rounded-md transition-all data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-primary font-medium"
        >
          <CoinsIcon className="h-4 w-4 mr-2" />
          Redeem
        </TabsTrigger>
      </TabsList>

      <div className="px-1">
        <TabsContent
          value="mint"
          className="mt-0 focus-visible:outline-none focus-visible:ring-0"
        >
          <PendleMint market={market} />
        </TabsContent>

        <TabsContent
          value="redeem"
          className="mt-0 focus-visible:outline-none focus-visible:ring-0"
        >
          <PendleRedeem market={market} />
        </TabsContent>
      </div>
    </Tabs>
  );
}
