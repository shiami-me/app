import React from "react";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HealthIndicator } from "@/components/silo/health-indicator";
import { AlertCircle, Info } from "lucide-react";

interface UserPositionProps {
  marketData: any;
  userData: any;
}

export const UserPosition: React.FC<UserPositionProps> = ({ marketData, userData }) => {
  if (!userData) return null;

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>Your Position</CardTitle>
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
            <SiloUserPosition 
              silo={marketData.silo0} 
              userData={userData.silo0} 
              silo1={userData.silo1}
            />
          </TabsContent>
          
          <TabsContent value="silo1">
            <SiloUserPosition 
              silo={marketData.silo1} 
              userData={userData.silo1} 
              silo1={userData.silo0}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

const SiloUserPosition = ({ silo, userData, silo1 }: { silo: any, userData: any, silo1: any }) => {
  if (!userData?.position) return (
    <div className="text-center py-8">
      <p className="text-gray-500 dark:text-gray-400">No position data available</p>
    </div>
  );

  const { position, solvency } = userData;
  const hasBorrows = Number(position.borrowedAmount) > 0;
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-green-700 dark:text-green-300 mb-1">Total Deposited</h3>
          <p className="text-2xl font-bold text-green-800 dark:text-green-200">
            {(position.totalCollateral / (10 ** silo.decimals)).toFixed(6)} {silo.symbol}
          </p>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-1">Total Borrowed</h3>
          <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">
            {(position.borrowedAmount / (10 ** silo.decimals)).toFixed(6)} {silo.symbol}
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Available to Borrow</h3>
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            {(Number(position.maxBorrowAmount)) / 10**silo.decimals} {silo.symbol}
          </p>
        </div>
      </div>

      {hasBorrows && (
        <Card className="border border-gray-200 dark:border-gray-700">
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Health Factor</h3>
            <HealthIndicator solvencyData={{
                ...solvency,
                maxLtvPercentage: silo1.solvency.maxLtvPercentage,
                liquidationThresholdPercentage: silo1.solvency.liquidationThresholdPercentage,
                marginToLiquidation: solvency.isSolvent ? 
                ((Number(silo1.solvency.lt) - Number(solvency.loanToValue)) / 10**18 * 100).toFixed(2) + '%' : 
                "Position is liquidatable"
            }} />
          </CardContent>
        </Card>
      )}

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="text-base font-medium">Position Details</h3>
          <div className="flex items-center text-xs text-gray-500">
            <Info className="h-3.5 w-3.5 mr-1" />
            <span>Last updated: {new Date().toLocaleString()}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-3 rounded-lg border border-gray-100 dark:border-gray-800">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-gray-600 dark:text-gray-400">Regular Deposit</span>
              <span className="font-medium">{(position.regularDeposit / (10 ** silo.decimals)).toFixed(6)} {silo.symbol}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Protected Deposit</span>
              <span className="font-medium">{(position.protectedDeposit / (10 ** silo.decimals)).toFixed(6)} {silo.symbol}</span>
            </div>
          </div>
          
          <div className="p-3 rounded-lg border border-gray-100 dark:border-gray-800">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-gray-600 dark:text-gray-400">Loan-to-Value</span>
              <span className="font-medium">{solvency?.loanToValuePercentage || "0%"}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Liquidation Threshold</span>
              <span className="font-medium">{solvency?.liquidationThresholdPercentage || "0%"}</span>
            </div>
          </div>
        </div>
      </div>

      {!position.isSolvent && (
        <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
          <div>
            <h4 className="font-medium text-red-700 dark:text-red-300">Position at Risk</h4>
            <p className="text-sm text-red-600 dark:text-red-400">
              Your position is currently at risk of liquidation. Consider repaying some debt or adding more collateral.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};