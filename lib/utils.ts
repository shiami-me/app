import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function truncateAddress(address: string, startChars: number = 6, endChars: number = 4): string {
  if (!address) return '';
  if (address.length <= startChars + endChars) return address;
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
}

export function formatEther(wei: string): string {
  if (!wei) return '0';
  const etherValue = parseInt(wei) / 1e18;
  return etherValue.toFixed(etherValue >= 0.001 ? 4 : 8);
}

export function formatNumber(value: number | string | undefined | null): string {
  // Return "0" for null/undefined values
  if (value === undefined || value === null) return "0";
  
  // Convert string to number if needed
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  
  // Check if it's a valid number
  if (isNaN(numValue)) return "0";
  
  // Handle different scales
  if (numValue >= 1_000_000_000) {
    return `${(numValue / 1_000_000_000).toFixed(2)}B`;
  } else if (numValue >= 1_000_000) {
    return `${(numValue / 1_000_000).toFixed(2)}M`;
  } else if (numValue >= 1_000) {
    return `${(numValue / 1_000).toFixed(2)}K`;
  } else if (numValue < 0.01 && numValue > 0) {
    return "<0.01";
  } else {
    return numValue.toFixed(2);
  }
}

/**
 * Format a date from a unix timestamp (seconds) 
 */
export function formatDate(timestamp: number): string {
  if (!timestamp) return "N/A";
  
  // Convert seconds to milliseconds for JS Date
  const date = new Date(timestamp * 1000);
  
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  };
  
  return date.toLocaleDateString(undefined, options);
}

/**
 * Format a number as a percentage
 */
export function formatPercent(value: number, decimals: number = 2): string {
  if (value === undefined || value === null) return "0%";
  
  // Convert to percentage
  const percentValue = value * 100;
  
  if (Math.abs(percentValue) < 0.01 && percentValue !== 0) {
    return percentValue > 0 ? "<0.01%" : ">-0.01%";
  }
  
  return `${percentValue.toFixed(decimals)}%`;
}
