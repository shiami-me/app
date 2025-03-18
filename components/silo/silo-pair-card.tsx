import React from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { MarketData } from "@/components/silo/types";
import { MarketCard } from "@/components/silo/market-card";
import { BadgeCheck, PlusCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useChat } from "@/providers/ChatProvider";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SiloPairCardProps {
  markets: MarketData[];
}

export const SiloPairCard: React.FC<SiloPairCardProps> = ({ markets }) => {
  const { addToContext } = useChat();

  const handleAddToContext = () => {
    addToContext({
      id: `silo-${markets[0].id}`,
      type: "silo",
      title: `${markets[0].market}/${markets[1].market}`,
      data: {
        id: markets[0].id,
        token0: {
          symbol: markets[0].market,
          depositAPR: markets[0].deposit_apr,
          borrowAPR: markets[0].borrow_apr,
          collateralPrograms: markets[0].collateral_programs,
          debtPrograms: markets[0].debt_programs,
          collateralPoints: markets[0].collateral_points,
          debtPoints: markets[0].debt_points,
          isBorrowable: markets[0].isBorrowable
        },
        token1: {
          symbol: markets[1].market,
          depositAPR: markets[1].deposit_apr,
          borrowAPR: markets[1].borrow_apr,
          collateralPrograms: markets[1].collateral_programs,
          debtPrograms: markets[1].debt_programs,
          collateralPoints: markets[1].collateral_points,
          debtPoints: markets[1].debt_points,
          isBorrowable: markets[1].isBorrowable
        }
      }
    });
  };

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
          
          <div className="flex gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700"
                    onClick={handleAddToContext}
                  >
                    <PlusCircle className="h-4 w-4 text-slate-700 dark:text-slate-300" />
                    <span className="sr-only">Add to context</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Add to chat context</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Link href={`/dashboard/silo/${markets[0].id}`} passHref>
              <Button variant="outline" className="px-4 py-2 hover:bg-primary hover:text-white">
                View Details
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
        {markets.map((market, index) => (
          <MarketCard key={index} market={market} />
        ))}
      </div>
    </Card>
  );
};
