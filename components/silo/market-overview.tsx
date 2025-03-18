import React from "react";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatUnits } from "viem";
import { formatNumber } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import PointsIcon, { formatPointsText } from "@/components/shared/points-icon";

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
  const baseDepositApr = (Number(silo.collateralBaseApr) / 10 ** 18) * 100;
  const baseBorrowApr = (Number(silo.debtBaseApr) / 10 ** 18) * 100;
  
  const totalDepositAPR = (
    baseDepositApr + 
    (silo.collateralPrograms.reduce((acc: any, program: any) => acc + Number(program.apr), 0) / 10 ** 18) * 100
  );
  
  const totalBorrowAPR = (
    baseBorrowApr +
    (silo.debtPrograms.reduce((acc: any, program: any) => acc + Number(program.apr), 0) / 10 ** 18) * 100
  );
  
  const maxLtv = ((Number(silo.maxLtv) / 10**18) * 100).toFixed(2);
  const liquidationThreshold = ((Number(silo.lt) / 10**18) * 100).toFixed(2);
  const liquidity = Number(formatUnits(silo.liquidity || "0", silo.decimals)).toFixed(2);
  
  const hasPoints = (silo.collateralPoints && silo.collateralPoints.length > 0) || 
                    (silo.debtPoints && silo.debtPoints.length > 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* First column */}
      <div className="space-y-4">
        {/* Deposit APR Section with breakdown */}
        <div className="rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="bg-green-50 dark:bg-green-900/20 p-4">
            <h3 className="text-sm font-medium text-green-700 dark:text-green-300 mb-1">Total Deposit APR</h3>
            <p className="text-2xl font-bold text-green-800 dark:text-green-200">{totalDepositAPR.toFixed(2)}%</p>
          </div>
          
          <div className="p-4 bg-white dark:bg-gray-950">
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Base Deposit APR</span>
              <span className="font-medium text-green-600 dark:text-green-400">{baseDepositApr.toFixed(2)}%</span>
            </div>
            
            {silo.collateralPrograms.length > 0 && (
              <>
                <div className="my-2 h-px bg-gray-100 dark:bg-gray-800"></div>
                <h4 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2 font-medium">Reward Programs</h4>
                
                {silo.collateralPrograms.map((program: any, idx: number) => (
                  <div key={idx} className="flex justify-between items-center text-sm mb-1.5 last:mb-0">
                    <div className="flex items-center gap-1.5">
                      <ChevronRight className="h-3 w-3 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400">
                        Rewards in {program.rewardTokenSymbol}
                      </span>
                    </div>
                    <span className="font-medium text-blue-600 dark:text-blue-400">
                      {(Number(program.apr) / 10**16).toFixed(2)}%
                    </span>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
        
        {/* Available Liquidity */}
        <div className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Available Liquidity</h3>
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{formatNumber(liquidity)} {silo.symbol}</p>
        </div>
        
        {/* Max LTV */}
        <div className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Max LTV</h3>
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{maxLtv}%</p>
        </div>
        
        {/* Points Section - First Column */}
        {hasPoints && (
          <div className="rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4">
              <h3 className="text-sm font-medium text-indigo-700 dark:text-indigo-300 mb-1">Collateral Points</h3>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-950">
              {silo.collateralPoints && silo.collateralPoints.length > 0 ? (
                silo.collateralPoints.map((point: any, idx: number) => (
                  <div key={idx} className="flex items-center gap-3 mb-2 last:mb-0">
                    <div className="flex-shrink-0">
                      <PointsIcon point={point} type="collateral" showTooltip={false} size="md" />
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {formatPointsText(point)}
                    </span>
                  </div>
                ))
              ) : (
                <span className="text-sm text-gray-500 dark:text-gray-400">No collateral points available</span>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Second column */}
      <div className="space-y-4">
        {/* Borrow APR Section with breakdown */}
        <div className="rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4">
            <h3 className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-1">Total Borrow APR</h3>
            <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">{totalBorrowAPR.toFixed(2)}%</p>
          </div>
          
          <div className="p-4 bg-white dark:bg-gray-950">
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Base Borrow APR</span>
              <span className="font-medium text-red-600 dark:text-red-400">{baseBorrowApr.toFixed(2)}%</span>
            </div>
            
            {silo.debtPrograms.length > 0 && (
              <>
                <div className="my-2 h-px bg-gray-100 dark:bg-gray-800"></div>
                <h4 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2 font-medium">Reward Programs</h4>
                
                {silo.debtPrograms.map((program: any, idx: number) => (
                  <div key={idx} className="flex justify-between items-center text-sm mb-1.5 last:mb-0">
                    <div className="flex items-center gap-1.5">
                      <ChevronRight className="h-3 w-3 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400">
                        Rewards in {program.rewardTokenSymbol}
                      </span>
                    </div>
                    <span className="font-medium text-blue-600 dark:text-blue-400">
                      {(Number(program.apr) / 10**16).toFixed(2)}%
                    </span>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
        
        {/* Liquidation Threshold */}
        <div className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Liquidation Threshold</h3>
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{liquidationThreshold}%</p>
        </div>
        
        {/* Borrowable */}
        <div className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Borrowable</h3>
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            {silo.isNonBorrowable ? "No" : "Yes"}
          </p>
        </div>
        
        {/* Points Section - Second Column */}
        {hasPoints && (
          <div className="rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4">
              <h3 className="text-sm font-medium text-purple-700 dark:text-purple-300 mb-1">Debt Points</h3>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-950">
              {silo.debtPoints && silo.debtPoints.length > 0 ? (
                silo.debtPoints.map((point: any, idx: number) => (
                  <div key={idx} className="flex items-center gap-3 mb-2 last:mb-0">
                    <div className="flex-shrink-0">
                      <PointsIcon point={point} type="debt" showTooltip={false} size="md" />
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {formatPointsText(point)}
                    </span>
                  </div>
                ))
              ) : (
                <span className="text-sm text-gray-500 dark:text-gray-400">No debt points available</span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
