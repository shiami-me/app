import React from "react";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, ShieldCheck } from "lucide-react";

interface HealthIndicatorProps {
  solvencyData?: {
    isSolvent: boolean;
    loanToValuePercentage: string;
    maxLtvPercentage: string;
    liquidationThresholdPercentage: string;
    marginToLiquidation: string;
  };
}

export const HealthIndicator: React.FC<HealthIndicatorProps> = ({
  solvencyData,
}) => {
  if (!solvencyData) return null;

  const ltvPercentage = parseFloat(solvencyData.loanToValuePercentage || "0");
  const liquidationThresholdPercentage = parseFloat(
    solvencyData.liquidationThresholdPercentage || "100"
  );
  console.log(ltvPercentage, liquidationThresholdPercentage);
  // Health is based on how close the LTV is to the liquidation threshold
  const healthPercentage = Math.max(
    0,
    Math.min(100, 100 - (ltvPercentage / liquidationThresholdPercentage) * 100)
  );

  let trackColor = "";
  let healthTextColor = "";
  let healthIcon = null;
  let healthText = "";
  if (healthPercentage < 30) {
    trackColor = "bg-red-100 dark:bg-red-900/20";
    healthTextColor = "text-red-600 dark:text-red-400";
    healthIcon = (
      <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
    );
    healthText = "At Risk";
  } else if (healthPercentage < 60) {
    trackColor = "bg-yellow-100 dark:bg-yellow-900/20";
    healthTextColor = "text-yellow-600 dark:text-yellow-400";
    healthIcon = (
      <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
    );
    healthText = "Warning";
  } else {
    trackColor = "bg-green-100 dark:bg-green-900/20";
    healthTextColor = "text-green-600 dark:text-green-400";
    healthIcon = (
      <ShieldCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
    );
    healthText = "Healthy";
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1.5">
          {healthIcon}
          <span className={`text-sm font-medium ${healthTextColor}`}>
            {healthText} ({healthPercentage.toFixed(0)}%)
          </span>
        </div>

        <div className="text-xs text-gray-500 dark:text-gray-400">
          {solvencyData.marginToLiquidation} to liquidation
        </div>
      </div>

      <Progress value={healthPercentage} className={`h-2 ${trackColor}`} />

      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>Current LTV: {solvencyData.loanToValuePercentage}</span>
        <span>Max: {solvencyData.maxLtvPercentage}</span>
        <span>Liquidation: {solvencyData.liquidationThresholdPercentage}</span>
      </div>
    </div>
  );
};
