import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, BadgeCheck, ExternalLink, PlusCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useChat } from "@/providers/ChatProvider";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SiloDetailHeaderProps {
  marketData: any;
  userData?: any;
}

export const SiloDetailHeader: React.FC<SiloDetailHeaderProps> = ({
  marketData,
  userData,
}) => {
  const { addToContext } = useChat();

  const handleAddToContext = () => {
    addToContext({
      id: `silo-detail-${marketData.id}`,
      type: "silo-detail",
      title: `${marketData.silo0.symbol}/${marketData.silo1.symbol} Market`,
      data: {
        market: {
          id: marketData.id,
          pair: `${marketData.silo0.symbol}/${marketData.silo1.symbol}`,
          isVerified: marketData.isVerified,
          configAddress: marketData.configAddress,
          token0: {
            symbol: marketData.silo0.symbol,
            depositAPR: ((parseFloat(marketData.silo0.collateralBaseApr) / 10 ** 18) * 100).toFixed(2) + "%",
            borrowAPR: ((parseFloat(marketData.silo0.debtBaseApr) / 10 ** 18) * 100).toFixed(2) + "%",
            isBorrowable: !marketData.silo0.isNonBorrowable,
          },
          token1: {
            symbol: marketData.silo1.symbol,
            depositAPR: ((parseFloat(marketData.silo1.collateralBaseApr) / 10 ** 18) * 100).toFixed(2) + "%",
            borrowAPR: ((parseFloat(marketData.silo1.debtBaseApr) / 10 ** 18) * 100).toFixed(2) + "%",
            isBorrowable: !marketData.silo1.isNonBorrowable,
          }
        },
        user: userData || null
      }
    });
  };

  return (
    <Card className="border-0 overflow-hidden">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-green-100 to-blue-50 dark:from-green-900/30 dark:to-blue-900/30 rounded-xl opacity-70"></div>
        <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-700/20 [mask-image:linear-gradient(0deg,transparent,white)] rounded-xl"></div>

        <div className="relative p-6 z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-start gap-4">
              <Link
                href="/dashboard/silo"
                className="flex items-center text-sm text-blue-600 dark:text-blue-400 hover:underline mt-1"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Back to Markets</span>
              </Link>

              <div>
                <div className="flex items-center gap-3 mb-1">
                  <div className="flex -space-x-2 relative">
                    <div className="z-20">
                      <Image
                        src={
                          marketData.silo0.logos.coinGecko?.large ||
                          "https://coin-images.coingecko.com/coins/images/52857/large/wrapped_sonic.png?1734536585"
                        }
                        alt={marketData.silo0.symbol}
                        width={40}
                        height={40}
                        className="rounded-full border-2 border-white dark:border-gray-900"
                      />
                    </div>
                    <div className="z-10">
                      <Image
                        src={
                          marketData.silo1.logos.coinGecko?.large ||
                          "https://coin-images.coingecko.com/coins/images/52857/large/wrapped_sonic.png?1734536585"
                        }
                        alt={marketData.silo1.symbol}
                        width={40}
                        height={40}
                        className="rounded-full border-2 border-white dark:border-gray-900"
                      />
                    </div>
                  </div>
                  <h1 className="text-3xl font-extrabold bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400 bg-clip-text text-transparent font-[family-name:var(--font-roboto-mono)]">
                    {marketData.silo0.symbol}/{marketData.silo1.symbol}
                  </h1>

                  {marketData.isVerified && (
                    <BadgeCheck className="h-5 w-5 text-green-500" />
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <span>ID {marketData.id}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    {marketData.isVerified ? (
                      <span className="text-green-600 dark:text-green-400">
                        Verified
                      </span>
                    ) : (
                      <span className="text-amber-500">Unverified</span>
                    )}
                  </div>
                  <span>•</span>
                  <span>Silo Finance</span>
                  <span>•</span>
                  <a
                    href={`https://sonicscan.org/address/${marketData.configAddress}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    View on Explorer
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleAddToContext}
                      className="border-gray-200 dark:border-gray-800 shadow-sm"
                    >
                      <PlusCircle className="h-4 w-4 mr-1" />
                      Add to Context
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Add this market to chat context</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <div className="flex items-center h-6 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 rounded text-blue-800 dark:text-blue-300 text-xs font-medium">
                <Image
                  src="https://coin-images.coingecko.com/coins/images/52857/large/wrapped_sonic.png?1734536585"
                  alt="Sonic"
                  width={14}
                  height={14}
                  className="rounded-full mr-1"
                />
                <span>Sonic</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
