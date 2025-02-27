import React from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { MarketData } from "@/components/silo/types";
import { MarketCard } from "@/components/silo/market-card";
import { BadgeCheck } from "lucide-react";

interface SiloPairCardProps {
  markets: MarketData[];
  onInteract: (market: MarketData) => void;
}

export const SiloPairCard: React.FC<SiloPairCardProps> = ({ markets, onInteract }) => {
  return (
    <Card className="border-gray-200 dark:border-gray-800 shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="p-5 sm:p-6 border-b border-gray-100 dark:border-gray-800">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2 relative">
              {/* First Token */}
              <div className="z-20 relative">
                <Image
                  src={markets[0].logo}
                  alt={markets[0].market}
                  width={36}
                  height={36}
                  className="rounded-full border-2 border-white dark:border-gray-900 shadow-sm"
                />
              </div>
              
              {/* Second Token */}
              <div className="z-10 relative">
                <Image
                  src={markets[1].logo}
                  alt={markets[1].market}
                  width={36}
                  height={36}
                  className="rounded-full border-2 border-white dark:border-gray-900 shadow-sm"
                />
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {markets[0].market}/{markets[1].market}
              </h2>
              <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <span>ID {markets[0].id}</span>
                <span>•</span>
                <div className="flex items-center gap-1">
                  {markets[0].reviewed ? (
                    <div className="flex items-center">
                      <BadgeCheck className="h-4 w-4 text-green-500" />
                      <span className="ml-1">Reviewed</span>
                    </div>
                  ) : (
                    <span className="text-amber-500">Unreviewed</span>
                  )}
                </div>
                <span>•</span>
                <span>Silo Finance</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center h-6 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 rounded text-blue-800 dark:text-blue-300 text-xs font-medium">
            <Image
              src="https://s2.coinmarketcap.com/static/img/coins/64x64/34753.png"
              alt="Sonic"
              width={14}
              height={14}
              className="rounded-full mr-1"
            />
            <span>Sonic</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
        {markets.map((market, index) => (
          <MarketCard key={index} market={market} onInteract={onInteract} />
        ))}
      </div>
    </Card>
  );
};
