import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw, PlusCircle, BarChart3 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { PendleDashboardProps } from "./types";
import { PendleMarketCard } from "./pendle-market-card";
import { PendleMarket } from "@/lib/pendle/types";

export function PendleDashboard({
  markets,
  loading,
  isRefreshing,
  lastUpdated,
  onRefresh,
  onAddToContext
}: PendleDashboardProps) {
  // Format date time for display
  const formatDateTime = (dateString: string | null) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  // Enhanced animation configurations
  const fadeIn = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring", 
        stiffness: 200, 
        damping: 20 
      } 
    },
    exit: { 
      opacity: 0, 
      y: -10, 
      transition: { 
        duration: 0.2 
      } 
    }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        when: "beforeChildren"
      }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      boxShadow: "0 5px 10px rgba(0,0,0,0.1)"
    },
    tap: { 
      scale: 0.95 
    }
  };

  const loaderVariants = {
    animate: {
      opacity: [0.5, 1, 0.5]
    },
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: "loop" as const
    }
  };

  // Handler for adding a specific market to context
  const handleAddMarketToContext = (market: PendleMarket) => {
    console.log("Adding market to context:", market);
  };

  if (loading && markets.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <motion.div 
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            animate={{ 
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop"
            }}
          >
            <Loader2 className="text-primary h-10 w-10" />
          </motion.div>
          <motion.p 
            className="text-sm text-muted-foreground"
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: [0.5, 1, 0.5],
              y: 0,
              transition: {
                opacity: {
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop"
                },
                y: { duration: 0.3 }
              }
            }}
          >
            Loading Pendle Markets...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <MotionConfig reducedMotion="user">
      <motion.div 
        className="p-4 sm:p-6 min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header with enhanced background gradient */}
        <motion.div 
          className="relative mb-8"
          variants={headerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-100 via-indigo-50 to-blue-50 dark:from-purple-900/30 dark:via-indigo-900/20 dark:to-blue-900/10 rounded-xl opacity-80"></div>
          <motion.div 
            className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-700/20 [mask-image:linear-gradient(0deg,transparent,white)] rounded-xl"
            animate={{
              backgroundPosition: ['0px 0px', '100px 100px'],
              transition: {
                duration: 20,
                repeat: Infinity,
                repeatType: "loop"
              }
            }}
          ></motion.div>
          
          <Card className="border-0 shadow-lg rounded-xl overflow-hidden bg-transparent backdrop-blur-[2px]">
            <div className="p-6 sm:p-8 relative z-10">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <motion.div 
                    className="flex items-center gap-3 mb-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                  >
                    <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent font-[family-name:var(--font-roboto-mono)]">
                      Pendle Finance
                    </h1>
                  </motion.div>
                  
                  <motion.p 
                    className="text-sm text-gray-600 dark:text-gray-300 mt-1 max-w-md"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                  >
                    Explore yield markets and liquidity positions on Pendle Finance platform.
                    {lastUpdated && (
                      <span className="block mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Last updated: {formatDateTime(lastUpdated)}
                      </span>
                    )}
                  </motion.p>
                </div>

                <div className="flex items-center gap-3">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <motion.div
                          variants={buttonVariants}
                          whileHover="hover"
                          whileTap="tap"
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={onAddToContext}
                            className="border-gray-200 dark:border-gray-700 shadow-sm bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
                          >
                            <PlusCircle className="h-4 w-4 mr-1.5" />
                            Add to Context
                          </Button>
                        </motion.div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">Add Pendle markets overview to chat context</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <motion.div
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={onRefresh} 
                      disabled={isRefreshing}
                      className="border-gray-200 dark:border-gray-700 shadow-sm bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
                    >
                      {isRefreshing ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin mr-1.5" />
                          Refreshing...
                        </>
                      ) : (
                        <>
                          <RefreshCw className="h-4 w-4 mr-1.5" /> 
                          Refresh
                        </>
                      )}
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Market Cards with stagger animation */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto"
        >
          <AnimatePresence>
            {markets.map((market, index) => (
              <motion.div 
                key={`market-${market.address}-${index}`}
                variants={fadeIn}
                transition={{ delay: index * 0.05 }}
              >
                <PendleMarketCard 
                  market={market} 
                  onAddToContext={handleAddMarketToContext}
                />
              </motion.div>
            ))}
          </AnimatePresence>

          {markets.length === 0 && !loading && (
            <motion.div 
              variants={fadeIn}
              className="col-span-full flex flex-col items-center justify-center p-12 bg-card rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm"
            >
              <div className="text-center space-y-3">
                <motion.div 
                  className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-50 dark:bg-gray-800 mb-3"
                  animate={{
                    rotate: [0, 360],
                    transition: { duration: 4, repeat: Infinity, ease: "linear" }
                  }}
                >
                  <RefreshCw className="h-7 w-7 text-gray-500 dark:text-gray-400" />
                </motion.div>
                <h3 className="text-lg font-medium">No markets found</h3>
                <p className="text-muted-foreground max-w-sm mx-auto">Unable to load Pendle Finance markets at this time. Please try again later.</p>
                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="pt-2"
                >
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={onRefresh} 
                    className="mt-2"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" /> Try Again
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {loading && markets.length > 0 && (
          <div className="flex justify-center items-center h-40 mt-6">
            <div className="flex flex-col items-center gap-3">
              <motion.div
                animate={{ 
                  opacity: [0.5, 1, 0.5],
                  scale: [1, 1.1, 1] 
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              >
                <Loader2 className="text-primary h-8 w-8" />
              </motion.div>
              <p className="text-sm text-muted-foreground">Refreshing market data...</p>
            </div>
          </div>
        )}
      </motion.div>
    </MotionConfig>
  );
}
