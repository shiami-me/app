import React from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { MarketData } from "@/components/silo/types";
import { DollarSign, LineChart, Check, AlertCircle } from "lucide-react";

interface MarketCardProps {
  market: MarketData;
}

export const MarketCard: React.FC<MarketCardProps> = ({ market }) => {
  return (
    <Card
      className="border border-gray-100 dark:border-gray-800 p-4 rounded-lg transition-all hover:shadow-md hover:border-green-200 dark:hover:border-green-800"
    >
      <div className="flex items-center space-x-3 mb-4">
        <div className="relative">
          <Image
            src={market.logo}
            alt={`${market.market} Logo`}
            width={36}
            height={36}
            className="rounded-full border-2 border-white dark:border-gray-900 shadow-sm"
          />
        </div>
        <span className="text-gray-900 dark:text-gray-100 font-bold">
          {market.market}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <div className="p-3 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-foreground">
              <DollarSign className="h-4 w-4 text-green-600 dark:text-green-400" />
              <span className="text-sm">Deposit APR</span>
            </div>
            <span className="font-bold text-gray-900 dark:text-gray-100">
              {market.deposit_apr}
            </span>
          </div>
        </div>

        <div className="p-3 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-foreground">
              <LineChart className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm">Borrow APR</span>
            </div>
            <span className="font-bold text-gray-900 dark:text-gray-100">
              {market.borrow_apr}
            </span>
          </div>
        </div>

        <div className="mt-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Borrow Status
            </span>
            {market.isBorrowable ? (
              <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                <Check className="h-4 w-4" />
                <span className="text-sm font-medium">Available</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-500">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm font-medium">Not Available</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
