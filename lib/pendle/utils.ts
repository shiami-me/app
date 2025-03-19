/**
 * Helper functions for Pendle components 
 */

/**
 * Utility function to extract readable error messages from Pendle API error responses
 */
export function extractPendleErrorMessage(error: any): string {
  if (!error) return "Unknown error occurred";

  // Handle Axios/fetch error responses with data
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  
  // Handle error objects with message property
  if (error.message) {
    const message = error.message;
    
    // Common error patterns
    if (message.includes("insufficient funds")) {
      return "Insufficient funds for this transaction";
    }
    
    if (message.includes("user rejected") || message.includes("user denied")) {
      return "Transaction was rejected by the user";
    }
    
    if (message.includes("gas required exceeds allowance")) {
      return "Gas required exceeds your wallet's allowance";
    }
    
    if (message.includes("slippage too high")) {
      return "Price movement exceeds slippage tolerance";
    }
    
    if (message.includes("cannot estimate gas")) {
      return "Cannot estimate gas. The transaction may fail.";
    }
    
    // Check for Pendle specific errors
    if (message.includes("PENDLE")) {
      // Extract the specific error message after "PENDLE:"
      const pendleErrorMatch = message.match(/PENDLE:?\s*(.*)/i);
      if (pendleErrorMatch && pendleErrorMatch[1]) {
        return pendleErrorMatch[1].trim();
      }
    }
    
    // Default - use the original message but trim if too long
    return message.length > 150 ? message.substring(0, 150) + "..." : message;
  }
  
  // Fallback for other error formats
  if (typeof error === 'string') {
    return error;
  }
  
  return "Transaction failed. Please try again.";
}
