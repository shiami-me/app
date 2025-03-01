import React from "react";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatUnits } from "viem";

interface MarketOverviewProps {
  marketData: any;
}

export const MarketOverview: React.FC<MarketOverviewProps> = ({ marketData }) => {
  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>Market Overview</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs defaultValue="silo0">
          <TabsList className="mb-6">
            <TabsTrigger value="silo0" className="flex items-center gap-2">
              <Image
                src={marketData.silo0.logos.coinGecko?.large || "https://coin-images.coingecko.com/coins/images/52857/large/wrapped_sonic.png"}
                alt={marketData.silo0.symbol}
                width={20}
                height={20}
                className="rounded-full"
              />
              {marketData.silo0.symbol}
            </TabsTrigger>
            <TabsTrigger value="silo1" className="flex items-center gap-2">
              <Image
                src={marketData.silo1.logos.coinGecko?.large || "https://coin-images.coingecko.com/coins/images/52857/large/wrapped_sonic.png"}
                alt={marketData.silo1.symbol}
                width={20}
                height={20}
                className="rounded-full"
              />
              {marketData.silo1.symbol}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="silo0">
            <SiloMarketData silo={marketData.silo0} />
          </TabsContent>
          
          <TabsContent value="silo1">
            <SiloMarketData silo={marketData.silo1} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

const SiloMarketData = ({ silo }: { silo: any }) => {
  // Format values for better display
  const depositAPR = ((Number(silo.collateralBaseApr) / 10**18) * 100).toFixed(2);
  const borrowAPR = ((Number(silo.debtBaseApr) / 10**18) * 100).toFixed(2);
  const maxLtv = ((Number(silo.maxLtv) / 10**18) * 100).toFixed(2);
  const liquidationThreshold = ((Number(silo.lt) / 10**18) * 100).toFixed(2);
  const liquidity = Number(formatUnits(silo.liquidity || "0", silo.decimals)).toFixed(2);
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
        <h3 className="text-sm font-medium text-green-700 dark:text-green-300 mb-1">Deposit APR</h3>
        <p className="text-2xl font-bold text-green-800 dark:text-green-200">{depositAPR}%</p>
      </div>
      
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
        <h3 className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-1">Borrow APR</h3>
        <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">{borrowAPR}%</p>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-lg">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Available Liquidity</h3>
        <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{liquidity} {silo.symbol}</p>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-lg">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Max LTV</h3>
        <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{maxLtv}%</p>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-lg">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Liquidation Threshold</h3>
        <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{liquidationThreshold}%</p>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-lg">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Borrowable</h3>
        <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          {silo.isNonBorrowable ? "No" : "Yes"}
        </p>
      </div>
    </div>
  );
};
