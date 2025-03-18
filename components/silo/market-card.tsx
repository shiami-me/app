import React from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { MarketData } from "@/components/silo/types";
import {
  DollarSign,
  LineChart,
  Check,
  AlertCircle,
  Info,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import PointsIcon from "@/components/shared/points-icon";

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
            <div className="flex items-center gap-1">
              <span className="font-bold text-gray-900 dark:text-gray-100">
                {(
                  market.deposit_apr +
                  market.collateral_programs.reduce(
                    (acc: number, program: any) => acc + Number(program.apr),
                    0
                  ) /
                    10 ** 16
                ).toFixed(2)}
                %
              </span>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-gray-500 cursor-help hover:text-blue-500 transition-colors" />
                  </TooltipTrigger>
                  <TooltipContent
                    className="w-64 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg rounded-lg"
                    sideOffset={5}
                  >
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                          Base Deposit APR:
                        </span>
                        <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                          {market.deposit_apr.toFixed(2)}%
                        </span>
                      </div>

                      {market.collateral_programs.length > 0 && (
                        <>
                          <div className="h-px bg-gray-200 dark:bg-gray-600 my-2"></div>
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                            Reward Programs:
                          </p>
                          {market.collateral_programs.map(
                            (program: any, idx: number) => (
                              <div key={idx} className="flex justify-between">
                                <span className="text-sm text-gray-600 dark:text-gray-300">
                                  Rewards APR in {program.rewardTokenSymbol}:
                                </span>
                                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                                  {(Number(program.apr) / 10 ** 16).toFixed(2)}%
                                </span>
                              </div>
                            )
                          )}
                        </>
                      )}
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>

        <div className="p-3 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-foreground">
              <LineChart className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm">Borrow APR</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-bold text-gray-900 dark:text-gray-100">
                {(
                  market.borrow_apr +
                  market.debt_programs.reduce(
                    (acc: number, program: any) => acc + Number(program.apr),
                    0
                  ) /
                    10 ** 16
                ).toFixed(2)}
                %
              </span>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-gray-500 cursor-help hover:text-blue-500 transition-colors" />
                  </TooltipTrigger>
                  <TooltipContent
                    className="w-64 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg rounded-lg"
                    sideOffset={5}
                  >
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                          Base Borrow APR:
                        </span>
                        <span className="text-sm font-semibold text-red-600 dark:text-red-400">
                          {market.borrow_apr.toFixed(2)}%
                        </span>
                      </div>

                      {market.debt_programs.length > 0 && (
                        <>
                          <div className="h-px bg-gray-200 dark:bg-gray-600 my-2"></div>
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                            Reward Programs:
                          </p>
                          {market.debt_programs.map(
                            (program: any, idx: number) => (
                              <div key={idx} className="flex justify-between">
                                <span className="text-sm text-gray-600 dark:text-gray-300">
                                  Rewards APR in {program.rewardTokenSymbol}:
                                </span>
                                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                                  {(Number(program.apr) / 10 ** 16).toFixed(2)}%
                                </span>
                              </div>
                            )
                          )}
                        </>
                      )}
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between py-2 border-t border-gray-100 dark:border-gray-800">
          <div className="flex flex-col">
            <span className="text-xs text-gray-600 dark:text-gray-400 mb-1">
              Points
            </span>
            <div className="flex gap-2">
              {/* Collateral Points */}
              <div className="flex items-center gap-1">
                <div className="flex gap-1">
                  {market.collateral_points &&
                    market.collateral_points.map((point, i) => (
                      <PointsIcon
                        key={`collateral-${i}`}
                        point={point}
                        type="collateral"
                      />
                    ))}
                </div>
              </div>

              {/* Debt Points */}
              <div className="flex items-center gap-1">
                <div className="flex gap-1">
                  {market.debt_points &&
                    market.debt_points.map((point, i) => (
                      <PointsIcon key={`debt-${i}`} point={point} type="debt" />
                    ))}
                </div>
              </div>

              {/* Show if there are no points */}
              {(!market.collateral_points ||
                market.collateral_points.length === 0) &&
                (!market.debt_points || market.debt_points.length === 0) && (
                  <span className="text-xs text-gray-400">No points</span>
                )}
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-sm">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Borrow:
            </span>
            {market.isBorrowable ? (
              <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                <Check className="h-4 w-4" />
                <span className="text-sm font-medium">Yes</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-500">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm font-medium">No</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
