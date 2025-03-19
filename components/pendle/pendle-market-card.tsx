import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, PlusCircle, LineChart, DollarSign, TrendingUp, ArrowRight } from "lucide-react";
import { PendleMarketCardProps } from "./types";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { formatDate, formatNumber, formatPercent } from "@/lib/utils"; 

export function PendleMarketCard({ market, onAddToContext }: PendleMarketCardProps) {
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 300,
        damping: 20
      }
    },
    hover: {
      y: -5,
      boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
      transition: { 
        type: "spring", 
        stiffness: 300,
        damping: 15
      }
    }
  };

  const iconVariants = {
    hover: { 
      scale: 1.05,
      transition: { 
        yoyo: Infinity,
        duration: 1.2
      }
    }
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        delay: 0.2,
        duration: 0.3
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      whileHover="hover"
      variants={cardVariants}
      className="h-full"
    >
      <Card className="h-full flex flex-col border border-gray-100 dark:border-gray-800 p-4 rounded-lg transition-all hover:shadow-md hover:border-purple-200 dark:hover:border-purple-800">
        <div className="flex items-center space-x-3 mb-4">
          <div className="relative">
            <motion.div 
              variants={iconVariants}
              whileHover="hover"
            >
              {market.icon ? (
                <Image
                  src={market.icon}
                  alt={market.symbol}
                  width={36}
                  height={36}
                  className="rounded-full border-2 border-white dark:border-gray-900 shadow-sm"
                />
              ) : (
                <div className="h-9 w-9 flex items-center justify-center bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full border-2 border-white dark:border-gray-900 shadow-sm">
                  <span className="text-sm font-semibold text-white">{market.symbol.substring(0, 2)}</span>
                </div>
              )}
            </motion.div>
          </div>
          <div>
            <span className="text-gray-900 dark:text-gray-100 font-bold">{market.symbol}</span>
            <p className="text-xs text-gray-600 dark:text-gray-400">{market.protocol}</p>
          </div>
          
          <div className="flex ml-auto space-x-1">
            <AnimatePresence>
              {market.isFeatured && (
                <motion.div
                  variants={badgeVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    Featured
                  </Badge>
                </motion.div>
              )}
              {market.isNew && (
                <motion.div
                  variants={badgeVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    New
                  </Badge>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <div className="p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-foreground">
                <LineChart className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                <span className="text-sm">Underlying APY</span>
              </div>
              <span className="font-bold text-gray-900 dark:text-gray-100">
                {formatPercent(market.underlyingApy)}
              </span>
            </div>
          </div>

          <div className="p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-foreground">
                <DollarSign className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                <span className="text-sm">Implied APY</span>
              </div>
              <span className="font-bold text-gray-900 dark:text-gray-100">
                {formatPercent(market.impliedApy)}
              </span>
            </div>
          </div>
          
          {market.maxBoostedApy > 0 && (
            <div className="p-3 rounded-lg border border-purple-100 dark:border-purple-900/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-foreground">
                  <TrendingUp className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  <span className="text-sm">Max Boosted APY</span>
                </div>
                <span className="font-bold text-gray-900 dark:text-gray-100">
                  {formatPercent(market.maxBoostedApy)}
                </span>
              </div>
            </div>
          )}

          <div className="flex flex-col space-y-2 border-t border-gray-100 dark:border-gray-800 pt-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600 dark:text-gray-400">Liquidity:</span>
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                ${formatNumber(market.liquidity)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600 dark:text-gray-400">Volume:</span>
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                ${formatNumber(market.tradingVolume)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600 dark:text-gray-400">Expiry:</span>
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {formatDate(market.expiry)}
              </span>
            </div>
          </div>

          {market.categoryIds && market.categoryIds.length > 0 && (
            <div className="flex items-center justify-between py-2 border-t border-gray-100 dark:border-gray-800 mt-2">
              <div className="flex flex-col">
                <span className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                  Categories
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {market.categoryIds.map((category, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + (index * 0.05) }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <Badge variant="outline" className="text-xs capitalize px-2 py-0.5 border border-gray-200 dark:border-gray-700">
                        {category}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
        
        <div className="flex justify-between items-center w-full mt-4 pt-2 border-t border-gray-100 dark:border-gray-800">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.div whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onAddToContext(market)}
                    className="text-xs"
                  >
                    <PlusCircle className="h-3 w-3 mr-1" />
                    Add to Context
                  </Button>
                </motion.div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Add this market to chat context</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.div whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.05 }}>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => window.open(`https://app.pendle.finance/trade/markets/${market.address}`, '_blank')}
                    className="text-xs"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </motion.div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">View on Pendle Finance</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          {/* View Details Button */}
          <Button 
            variant="default"
            size="sm"
            asChild
            className="text-xs px-3 bg-purple-600 hover:bg-purple-700 text-white"
          >
            <Link href={`/dashboard/pendle/${market.address}`} className="flex items-center">
              View Details
              <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
