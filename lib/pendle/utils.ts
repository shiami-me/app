/**
 * Helper functions for Pendle components 
 */

/**
 * Extract a user-friendly error message from various error types
 */
export function extractPendleErrorMessage(error: any): string {
  if (!error) return "Unknown error occurred";
  
  // If it's an Error object with a message
  if (error instanceof Error) {
    const message = error.message;
    
    // Common error patterns
    if (message.includes("user rejected") || message.includes("user denied")) {
      return "Transaction rejected by user";
    }
    
    if (message.includes("insufficient funds")) {
      return "Insufficient funds for this transaction";
    }
    
    if (message.includes("gas required exceeds")) {
      return "Gas required exceeds allowance or available funds";
    }
    
    if (message.toLowerCase().includes("price impact")) {
      return "Price impact too high. Try using a smaller amount or increasing slippage tolerance";
    }
    
    if (message.toLowerCase().includes("execution reverted")) {
      const revertMatch = message.match(/execution reverted: (.*?)(?:$|")/i);
      if (revertMatch && revertMatch[1]) {
        return `Transaction failed: ${revertMatch[1]}`;
      }
      return "Transaction would fail on-chain: Execution reverted";
    }
    
    if (message.toLowerCase().includes("nonce")) {
      return "Transaction nonce error. Try resetting your wallet connection";  
    }
    
    // If message is too long, truncate it
    if (message.length > 100) {
      return message.substring(0, 97) + "...";
    }
    
    return message;
  }
  
  // If it's a string directly
  if (typeof error === "string") {
    return error.length > 100 ? error.substring(0, 97) + "..." : error;
  }
  
  // If it's some other object, try to stringify or return a generic message
  try {
    const stringified = JSON.stringify(error);
    return stringified.length > 100 ? stringified.substring(0, 97) + "..." : stringified;
  } catch {
    return "Unknown error occurred";
  }
}
