import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatNumber } from "@/lib/utils";
import {
  LoopingStrategyOutput,
  Strategy,
  YieldTableEntry,
} from "@/types/messages";
import {
  BadgeCheck,
  ChevronRight,
  ChevronDown,
  TrendingUp,
  Percent,
  AlertTriangle,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  Info,
  Calculator,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSiloMarkets, calculateMaxLeverage, calculateMaxYield } from "@/hooks/silo/useSiloMarkets";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";
import { formatPointsText, TokenIcon } from "@/components/shared/points-icon";
import { PendleConnection } from "@/lib/pendle/connection";

interface StrategyOutputProps {
  data: LoopingStrategyOutput;
}

const StrategyCard: React.FC<{ 
  strategy: Strategy; 
  isDynamic?: boolean; 
  refreshData?: () => void; 
  lastUpdated?: Date | null;
  loading?: boolean;
}> = ({ 
  strategy, 
  isDynamic = false,
  refreshData,
  lastUpdated,
  loading = false
}) => {
  const [expanded, setExpanded] = useState(false);
  const [riskExpanded, setRiskExpanded] = useState(false);
  const numericLiquidity = parseFloat(
    strategy.strategy_overview.available_liquidity.replace(/,/g, "")
  );
  const formattedLiquidity = !isNaN(numericLiquidity)
    ? `${formatNumber(numericLiquidity)} ${strategy.borrow_token}`
    : `${strategy.strategy_overview.available_liquidity} ${strategy.borrow_token}`;

  // Parse leverage value for points calculations
  const leverageValue = parseFloat(
    strategy.strategy_overview.max_leverage.replace('x', '')
  );
  
  const ltvUsedValue = parseFloat(strategy.strategy_overview.ltv_used) * 100

  // Helper to format points after multiplier
  const formatPointMultiplier = (point: any, multiplier: number) => {
    if (!point) return null;
    
    if (point.basePoints) {
      const multipliedPoints = (point.basePoints * point.multiplier * multiplier).toFixed(2);
      return `${multipliedPoints} points per $ / day`;
    } else if (point.multiplier) {
      const multipliedValue = (point.multiplier * multiplier).toFixed(2);
      return `${multipliedValue}x points`;
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-gray-200 dark:border-gray-800 shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg mb-4">
        <div className="p-5 sm:p-6">
          {/* Header with badges and refresh button */}
          <div className="flex items-center justify-between mb-4">
            <Badge
              variant="outline"
              className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800"
            >
              Market ID: {strategy.market_id}
            </Badge>
            
            <div className="flex items-center gap-2">
              {isDynamic && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.div whileTap={{ scale: 0.95 }} whileHover={{ rotate: loading ? 0 : 15 }}>
                        <Button 
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={refreshData}
                          disabled={loading || !refreshData}
                        >
                          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                          <span className="sr-only">Refresh data</span>
                        </Button>
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="text-xs">
                        {loading ? "Loading..." : "Refresh market data"}
                        {lastUpdated && !loading && (
                          <div className="text-gray-500 text-[10px] mt-1">
                            Last updated: {lastUpdated.toLocaleTimeString()}
                          </div>
                        )}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              
              {strategy.verified ? (
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Badge className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800 flex items-center gap-1">
                    <BadgeCheck className="h-3.5 w-3.5" />
                    Verified
                  </Badge>
                </motion.div>
              ) : (
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Badge
                    variant="outline"
                    className="bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-800"
                  >
                    Unverified
                  </Badge>
                </motion.div>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
            <div className="flex items-center gap-4">
              <motion.div 
                className="flex -space-x-2 relative" 
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="z-20 relative">
                  <Image
                    src={strategy.strategy_overview.deposit_token_logo}
                    alt={strategy.deposit_token}
                    width={40}
                    height={40}
                    className="rounded-full border-2 border-white dark:border-gray-900 shadow-sm"
                  />
                </div>

                <div className="z-10 relative">
                  <Image
                    src={strategy.strategy_overview.borrow_token_logo}
                    alt={strategy.borrow_token}
                    width={40}
                    height={40}
                    className="rounded-full border-2 border-white dark:border-gray-900 shadow-sm"
                  />
                </div>
              </motion.div>

              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {strategy.deposit_token}/{strategy.borrow_token}
                </h2>
                <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-medium">{strategy.market}</span>
                  <span>•</span>
                  <span>Silo Looping Strategy</span>
                  {isDynamic && (
                    <>
                      <span>•</span>
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-green-600 dark:text-green-400 font-medium flex items-center gap-1"
                      >
                        <Info className="h-3 w-3" /> Live Data
                      </motion.span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div>
              <YieldTableDialog strategy={strategy} />
            </div>
          </div>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 border border-gray-200 dark:border-gray-800 rounded-xl mb-4 shadow-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                <span className="text-xs font-medium">Deposit APR</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-bold text-gray-900 dark:text-gray-100">
                  {strategy.strategy_overview.deposit_apr}
                </span>
                
                {strategy.strategy_overview.collateral_programs.length > 0 && (
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
                          {strategy.strategy_overview.collateral_programs && 
                           Array.isArray(strategy.strategy_overview.collateral_programs) && 
                           strategy.strategy_overview.collateral_programs.length > 0 && (
                            <>
                              
                              <p className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Reward Programs:</p>
                              {strategy.strategy_overview.collateral_programs.map((program: any, idx: number) => (
                                <div key={idx} className="flex justify-between">
                                  <span className="text-sm text-gray-600 dark:text-gray-300">
                                    Rewards APR in {program.rewardTokenSymbol}:
                                  </span>
                                  <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                                    {(Number(program.apr) / 10**16).toFixed(2)}%
                                  </span>
                                </div>
                              ))}
                            </>
                          )}
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </div>

            <div className="flex flex-col items-start">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <TrendingUp className="h-4 w-4 text-red-600 dark:text-red-400" />
                <span className="text-xs font-medium">Borrow APR</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-bold text-gray-900 dark:text-gray-100">
                  {strategy.strategy_overview.borrow_apr}
                </span>
                
                {strategy.strategy_overview.debt_programs.length > 0 && (
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
                          
                          {strategy.strategy_overview.debt_programs && 
                           Array.isArray(strategy.strategy_overview.debt_programs) && 
                           strategy.strategy_overview.debt_programs.length > 0 && (
                            <>
                              
                              <p className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Reward Programs:</p>
                              {strategy.strategy_overview.debt_programs.map((program: any, idx: number) => (
                                <div key={idx} className="flex justify-between">
                                  <span className="text-sm text-gray-600 dark:text-gray-300">
                                    Rewards APR in {program.rewardTokenSymbol}:
                                  </span>
                                  <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                                    {(Number(program.apr) / 10**16).toFixed(2)}%
                                  </span>
                                </div>
                              ))}
                            </>
                          )}
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </div>

            <div className="flex flex-col items-start">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Percent className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span className="text-xs font-medium">Spread</span>
              </div>
              <span className="font-bold text-gray-900 dark:text-gray-100">
                {strategy.strategy_overview.spread}
              </span>
            </div>

            <div className="flex flex-col items-start">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <TrendingUp className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                <span className="text-xs font-medium">Max Yield</span>
              </div>
              <span className="font-bold text-gray-900 dark:text-gray-100">
                {strategy.strategy_overview.max_yield}
              </span>
            </div>
          </motion.div>

          <motion.div 
            className="mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-800">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center">
                <ShieldCheck className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                Strategy Details
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <motion.div 
                  className="p-3 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm"
                  whileHover={{ y: -2, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" }}
                >
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-medium">Max Leverage</div>
                  <div className="font-bold text-gray-900 dark:text-gray-100 text-lg">
                    {strategy.strategy_overview.max_leverage}
                  </div>
                </motion.div>
                
                <motion.div 
                  className="p-3 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm"
                  whileHover={{ y: -2, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" }}
                >
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-medium">Available Liquidity</div>
                  <div className="font-bold text-gray-900 dark:text-gray-100 text-lg">
                    {formattedLiquidity}
                  </div>
                </motion.div>
              </div>
              
            </div>
          </motion.div>

          {/* Points Multiplier Section - Always visible */}
          {((strategy.strategy_overview.collateral_points && strategy.strategy_overview.collateral_points.length > 0) ||
            (strategy.strategy_overview.debt_points && strategy.strategy_overview.debt_points.length > 0)) && (
            <motion.div 
              className="mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
            >
              <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-800">
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center">
                  <Calculator className="h-5 w-5 mr-2 text-purple-600 dark:text-purple-400" />
                  Points
                </h3>
                
                <div className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded-full">Leverage: {leverageValue.toFixed(2)}x</div>
                    <div className="text-xs px-2 py-0.5 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 rounded-full">LTV Used: {(ltvUsedValue).toFixed(2)}%</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Collateral Points After Loop */}
                  {strategy.strategy_overview.collateral_points && strategy.strategy_overview.collateral_points.length > 0 && (
                    <div className="border border-green-100 dark:border-green-900/30 rounded-lg p-3 bg-green-50/50 dark:bg-green-900/10">
                      <h5 className="font-medium text-green-700 dark:text-green-400 mb-2">Collateral Points</h5>
                      <ul className="space-y-2">
                        {strategy.strategy_overview.collateral_points.map((point: any, i: number) => (
                          <li key={`coll-mult-${i}`} className="flex items-center gap-2 text-sm">
                            <TokenIcon tag={point._tag} size="sm" />
                            <div className="flex flex-col">
                              <span className="text-xs font-medium text-gray-600 dark:text-gray-300">Base: {formatPointsText(point)}</span>
                              <span className="text-sm font-semibold text-green-700 dark:text-green-400">
                                After Strategy: {formatPointMultiplier(point, leverageValue)}
                              </span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Debt Points After Loop */}
                  {strategy.strategy_overview.debt_points && strategy.strategy_overview.debt_points.length > 0 && (
                    <div className="border border-blue-100 dark:border-blue-900/30 rounded-lg p-3 bg-blue-50/50 dark:bg-blue-900/10">
                      <h5 className="font-medium text-blue-700 dark:text-blue-400 mb-2">Debt Points</h5>
                      <ul className="space-y-2">
                        {strategy.strategy_overview.debt_points.map((point: any, i: number) => (
                          <li key={`debt-mult-${i}`} className="flex items-center gap-2 text-sm">
                            <TokenIcon tag={point._tag} size="sm" />
                            <div className="flex flex-col">
                              <span className="text-xs font-medium text-gray-600 dark:text-gray-300">Base: {formatPointsText(point)}</span>
                              <span className="text-sm font-semibold text-blue-700 dark:text-blue-400">
                                After Strategy: {formatPointMultiplier(point, leverageValue - 1)}
                              </span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Risk Considerations Toggle */}
          <div className="mt-4 border-t border-gray-100 dark:border-gray-800 pt-4">
            <Button
              variant="ghost"
              className="w-full justify-between text-left group"
              onClick={() => setRiskExpanded(!riskExpanded)}
            >
              <span className="font-medium flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <span>Risk Considerations</span>
              </span>
              <motion.div
                animate={{ rotate: riskExpanded ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {riskExpanded ? (
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-gray-500" />
                )}
              </motion.div>
            </Button>

            <AnimatePresence>
              {riskExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="mt-2 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
                    <motion.ul 
                      className="text-sm space-y-2 text-gray-700 dark:text-gray-300"
                      initial="hidden"
                      animate="visible"
                      variants={{
                        visible: { transition: { staggerChildren: 0.07 } },
                        hidden: {}
                      }}
                    >
                      {strategy.risk_considerations.map((risk, index) => (
                        <motion.li 
                          key={index} 
                          className="flex items-start gap-2"
                          variants={{
                            hidden: { opacity: 0, x: -10 },
                            visible: { opacity: 1, x: 0 }
                          }}
                        >
                          <span className="min-w-[6px] h-1.5 w-1.5 rounded-full bg-amber-500 mt-1.5" />
                          <span>{risk}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Execution Steps Toggle */}
          <div className="mt-4 border-t border-gray-100 dark:border-gray-800 pt-4">
            <Button
              variant="ghost"
              className="w-full justify-between text-left group"
              onClick={() => setExpanded(!expanded)}
            >
              <span className="font-medium flex items-center gap-2">
                <ExternalLink className="h-4 w-4 text-blue-500" />
                <span>Execution Steps</span>
              </span>
              <motion.div
                animate={{ rotate: expanded ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {expanded ? (
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-gray-500" />
                )}
              </motion.div>
            </Button>

            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="mt-2 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
                    <motion.ol 
                      className="grid grid-cols-1 gap-4"
                      initial="hidden"
                      animate="visible"
                      variants={{
                        visible: { transition: { staggerChildren: 0.1 } },
                        hidden: {}
                      }}
                    >
                      {strategy.execution_steps.map((step, index) => (
                        <motion.li 
                          key={index} 
                          className="relative flex items-center"
                          variants={{
                            hidden: { opacity: 0, y: 10 },
                            visible: { opacity: 1, y: 0 }
                          }}
                        >
                          <motion.div 
                            className="h-7 w-7 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center mr-3 flex-shrink-0"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.1 * index }}
                          >
                            <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">{index + 1}</span>
                          </motion.div>
                          
                          {index < 3 ? (
                            <motion.div whileHover={{ y: -2 }} className="w-full">
                              <Button 
                                className={`justify-start text-left py-3 w-full h-auto ${
                                  index === 0
                                    ? "bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800/50"
                                    : "bg-gray-50 hover:bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800/50 dark:hover:bg-gray-800/80 dark:text-gray-200 dark:border-gray-700"
                                }`}
                                variant="outline"
                              >
                                <span className="font-medium text-sm">{step}</span>
                              </Button>
                            </motion.div>
                          ) : (
                            <motion.div 
                              whileHover={{ y: -2 }} 
                              className={`p-3 w-full rounded-md border shadow-sm ${
                                index === strategy.execution_steps.length - 1
                                  ? "bg-green-50/70 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800/50"
                                  : "bg-white text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700"
                              }`}
                            >
                              <span className="text-sm">{step}</span>
                            </motion.div>
                          )}
                          
                          {index < strategy.execution_steps.length - 1 && (
                            <motion.div 
                              className="absolute left-3.5 top-7 h-full w-0.5 bg-gray-200 dark:bg-gray-700 -z-10"
                              initial={{ height: 0 }}
                              animate={{ height: "100%" }}
                              transition={{ delay: 0.2 }}
                            ></motion.div>
                          )}
                        </motion.li>
                      ))}
                    </motion.ol>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

const YieldTableDialog: React.FC<{ strategy: Strategy }> = ({ strategy }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div whileTap={{ scale: 0.97 }} whileHover={{ y: -2 }}>
          <Button
            variant="outline"
            className="border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 font-medium"
            size="sm"
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            View Yield Table
          </Button>
        </motion.div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <span>
              Yield Table for {strategy.deposit_token}/{strategy.borrow_token}
            </span>
            {strategy.verified && (
              <motion.div 
                initial={{ scale: 0 }} 
                animate={{ scale: 1 }} 
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <BadgeCheck className="h-4 w-4 text-green-500" />
              </motion.div>
            )}
          </DialogTitle>
        </DialogHeader>
        <motion.div 
          className="max-h-[500px] overflow-y-auto custom-scrollbar"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/80 dark:bg-gray-900/30">
                <TableHead>Loops</TableHead>
                <TableHead>Leverage</TableHead>
                <TableHead>Net APR</TableHead>
                <TableHead>Total Deposit</TableHead>
                <TableHead>Total Borrowed</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {strategy.yield_table.map(
                (entry: YieldTableEntry, index: number) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.05 * index }}
                    className={
                      index === 0
                        ? "bg-green-50 dark:bg-green-900/20 font-medium"
                        : index % 2 === 0
                        ? "bg-gray-50/30 dark:bg-gray-900/10"
                        : ""
                    }
                  >
                    <TableCell>{entry.loops}</TableCell>
                    <TableCell>{entry.leverage}</TableCell>
                    <TableCell className="font-medium text-green-700 dark:text-green-400">
                      {entry.net_apr}
                    </TableCell>
                    <TableCell>{entry.total_deposit}</TableCell>
                    <TableCell>{entry.total_borrowed}</TableCell>
                  </motion.tr>
                )
              )}
            </TableBody>
          </Table>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

const StrategyOutput: React.FC<StrategyOutputProps> = ({ data }) => {
  // Extract market IDs from strategies for API filtering
  const marketIds = data.strategies.map(strategy => parseInt((strategy.market_id).toString()));
  
  // State for managing original vs. live data
  const [showLiveData, setShowLiveData] = useState<boolean>(false);
  
  // Fetch market data using our hook
  const { 
    markets, 
    loading, 
    error, 
    refresh: refreshMarkets, 
    lastUpdated 
  } = useSiloMarkets(data.filtered_token, marketIds);

  // Enhanced strategies with live data
  const [enhancedStrategies, setEnhancedStrategies] = useState<Strategy[]>([]);
  
  // Process market data to update strategies when markets data changes
  useEffect(() => {
    (async () => {
      if (markets && markets.length > 0) {
        const updatedStrategies = await Promise.all(data.strategies.map(async strategy => {
          // Find matching market
          const market = markets.find(m => m.id === parseInt((strategy.market_id).toString()));
          
          if (!market) return strategy;
          
          // Determine which side of the market to use based on deposit token
          const isDeposit0 = market.silo0.market === strategy.deposit_token;
          const isBorrow1 = market.silo1.market === strategy.borrow_token;
          
          const depositSide = isDeposit0 ? market.silo0 : market.silo1;
          const borrowSide = isBorrow1 ? market.silo1 : market.silo0;
          
          // Parse APRs to numbers for calculations
          let depositApr = parseFloat(depositSide.deposit_apr.replace('%', '')) / 100;
          const borrowApr = parseFloat(borrowSide.borrow_apr.replace('%', '')) / 100;
          if (strategy.deposit_token.startsWith("PT")) {
            const pendle = new PendleConnection();
            const pendleMarkets = await pendle.getMarkets();
            const matchingMarket = pendleMarkets.find(market =>
              market.symbol === strategy.deposit_token.split("-")[1].split(" ")[0]
            );
            if (matchingMarket) {
              depositApr = matchingMarket.impliedApy;
              depositSide.deposit_apr = ((matchingMarket.impliedApy) * 100).toFixed(2) + '%';
            }
          }
          // Calculate max leverage and max yield
          const maxLtv = depositSide.max_ltv;
          const maxLeverage = calculateMaxLeverage(maxLtv);
          const maxYield = calculateMaxYield(depositApr, borrowApr, maxLeverage);
          
          // Format for display
          const formattedMaxLeverage = maxLeverage.toFixed(2) + 'x';
          const formattedMaxYield = maxYield > 0 ? `${(maxYield * 100).toFixed(2)}%` : '0%';
          const formattedSpread = ((depositApr - borrowApr) * 100).toFixed(2) + '%';
          
          return {
            ...strategy,
            verified: market.reviewed,
            strategy_overview: {
              ...strategy.strategy_overview,
              deposit_apr: depositSide.deposit_apr,
              borrow_apr: borrowSide.borrow_apr,
              collateral_programs: depositSide.collateral_programs,
              debt_programs: borrowSide.debt_programs,
              collateral_points: depositSide.collateral_points,
              debt_points: borrowSide.debt_points,
              spread: formattedSpread,
              max_leverage: formattedMaxLeverage,
              max_yield: formattedMaxYield,
              available_liquidity: borrowSide.liquidity.toString(),
              deposit_token_logo: depositSide.logo,
              borrow_token_logo: borrowSide.logo,
            }
          };
        }));
        
        setEnhancedStrategies(updatedStrategies);

      }
    })()
  }, [markets, data.strategies]);

  return (
    <motion.div 
      className="w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div 
        className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-100 dark:border-blue-800"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
            {data.message}
          </p>
          
          {enhancedStrategies.length > 0 && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                size="sm" 
                variant="outline"
                className={`text-xs flex items-center gap-1 h-7 ${
                  showLiveData 
                    ? "border-green-200 dark:border-green-800 text-green-700 dark:text-green-400" 
                    : "border-blue-200 dark:border-blue-800"
                }`}
                onClick={() => setShowLiveData(!showLiveData)}
              >
                {loading ? (
                  <RefreshCw className="h-3.5 w-3.5 mr-1 animate-spin" />
                ) : (
                  <RefreshCw className="h-3.5 w-3.5 mr-1" />
                )}
                {showLiveData ? "Show Original" : "Show Live Data"}
              </Button>
            </motion.div>
          )}
        </div>
        
        <motion.div 
          className="flex flex-wrap gap-2"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } }
          }}
        >
          <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
            <Badge
              variant="outline"
              className="bg-white/50 dark:bg-gray-800/50 border-blue-200 dark:border-blue-800/50"
            >
              Found {data.strategies_count} strategies
            </Badge>
          </motion.div>
          
          <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
            <Badge
              variant="outline"
              className="bg-white/50 dark:bg-gray-800/50 border-green-200 dark:border-green-800/50"
            >
              Initial Amount: ${formatNumber(data.initial_amount)}
            </Badge>
          </motion.div>
          
          {data.filtered_token && (
            <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
              <Badge
                variant="outline"
                className="bg-white/50 dark:bg-gray-800/50 border-purple-200 dark:border-purple-800/50"
              >
                Token: {data.filtered_token}
              </Badge>
            </motion.div>
          )}
        </motion.div>
        
        {error && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-2 text-xs text-red-600 dark:text-red-400"
          >
            Error loading market data: {error}
          </motion.div>
        )}
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={showLiveData ? 'live' : 'original'}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Show either original or enhanced strategies */}
          {(showLiveData && enhancedStrategies.length > 0 ? enhancedStrategies : data.strategies).map((strategy, index) => (
            <StrategyCard 
              key={index} 
              strategy={strategy}
              isDynamic={showLiveData}
              refreshData={showLiveData ? refreshMarkets : undefined}
              lastUpdated={showLiveData ? lastUpdated : null}
              loading={loading}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {data.note && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="mt-3 text-sm text-gray-500 dark:text-gray-400 italic p-3 bg-gray-50 dark:bg-gray-900/30 rounded-lg border border-gray-100 dark:border-gray-800"
        >
          <span className="font-medium text-gray-700 dark:text-gray-300">
            Note:{" "}
          </span>
          {data.note}
        </motion.div>
      )}
    </motion.div>
  );
};

export default StrategyOutput;
