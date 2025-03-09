import { NextRequest, NextResponse } from "next/server";
import { createPublicClient, http, PublicClient, publicActions } from "viem";
import { SiloConnection } from "@/lib/silo";
import { sonic } from "viem/chains";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    // Get silo address and user address from query parameters
    const searchParams = request.nextUrl.searchParams;
    const siloAddress = searchParams.get('siloAddress');
    const userAddress = searchParams.get('userAddress');
    
    // Validate required parameters
    if (!siloAddress || !userAddress) {
      return NextResponse.json(
        { error: "Missing required parameters: siloAddress and userAddress" }, 
        { status: 400 }
      );
    }
    
    // Create a public client for the configured chain
    const publicClient: PublicClient = createPublicClient({
      chain: sonic,
      transport: http(),
    }).extend(publicActions);
    
    // Create a SiloConnection instance
    const siloConnection = new SiloConnection(publicClient);
    
    // Fetch borrow data in parallel
    const [borrowedAmount, maxBorrowAmount, loanToValue, isSolvent] = await Promise.all([
      siloConnection.getBorrowedAmount(siloAddress as `0x${string}`, userAddress as `0x${string}`),
      siloConnection.getMaxBorrowAmount(siloAddress as `0x${string}`, userAddress as `0x${string}`),
      siloConnection.getLoanToValue(siloAddress as `0x${string}`, userAddress as `0x${string}`),
      siloConnection.isSolvent(siloAddress as `0x${string}`, userAddress as `0x${string}`)
    ]);
    
    // Format and return the data
    return NextResponse.json({
      userAddress,
      siloAddress,
      borrows: {
        borrowedAmount,
        maxBorrowAmount,
        loanToValue,
        isSolvent,
        // Formatted values for easier consumption
        borrowedAmountFormatted: formatUnits(borrowedAmount),
        maxBorrowAmountFormatted: formatUnits(maxBorrowAmount),
        loanToValuePercentage: ((Number(loanToValue) / 10**18) * 100).toFixed(2) + '%',
        // Calculate remaining borrow capacity
        remainingBorrowCapacity: (BigInt(maxBorrowAmount) - BigInt(borrowedAmount)).toString(),
        remainingBorrowCapacityFormatted: formatUnits((BigInt(maxBorrowAmount) - BigInt(borrowedAmount)).toString()),
      },
      timestamp: new Date().toISOString(),
    }, { status: 200 });
    
  } catch (error: any) {
    console.error("Error fetching user borrows:", error);
    return NextResponse.json(
      { error: "Failed to fetch user borrows", message: error.message }, 
      { status: 500 }
    );
  }
}

// Helper function to format big numbers to more readable units
function formatUnits(value: string, decimals: number = 18): string {
  const numValue = Number(value);
  if (isNaN(numValue)) return "0";
  
  return (numValue / 10**decimals).toFixed(decimals > 6 ? 6 : decimals);
}
