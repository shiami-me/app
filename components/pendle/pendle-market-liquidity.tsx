import React, { useState } from "react";
import { PendleMarket } from "@/lib/pendle/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PendleAddLiquidity } from "./pendle-add-liquidity";
import { PendleRemoveLiquidity } from "./pendle-remove-liquidity";
import { Plus, Minus } from "lucide-react";

interface PendleMarketLiquidityProps {
  market: PendleMarket;
}

export function PendleMarketLiquidity({ market }: PendleMarketLiquidityProps) {
  const [activeTab, setActiveTab] = useState("add");

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="space-y-4">
    
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="w-full rounded-none h-10 grid grid-cols-2 mb-4">
          <TabsTrigger 
            value="add" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Liquidity
          </TabsTrigger>
          <TabsTrigger 
            value="remove"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
          >
            <Minus className="h-4 w-4 mr-1" />
            Remove Liquidity
          </TabsTrigger>
        </TabsList>

        <TabsContent value="add">
          <PendleAddLiquidity market={market} />
        </TabsContent>
        
        <TabsContent value="remove">
          <PendleRemoveLiquidity market={market} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
