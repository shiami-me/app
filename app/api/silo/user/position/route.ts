import { NextRequest, NextResponse } from "next/server";
import { createPublicClient, http, PublicClient, publicActions } from "viem";
import { anvilSonic } from "@/lib/chain";
import { getUserPositionData } from "@/lib/silo";

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
      chain: anvilSonic,
      transport: http(),
    }).extend(publicActions);
    
    // Fetch user position data
    const positionData = await getUserPositionData(
      publicClient, 
      siloAddress as `0x${string}`, 
      userAddress as `0x${string}`
    );
    
    // Format and return the data with additional context
    return NextResponse.json({
      userAddress,
      siloAddress,
      position: {
        ...positionData,
        // Format some values for easier consumption
        regularDepositFormatted: formatUnits(positionData.regularDeposit),
        protectedDepositFormatted: formatUnits(positionData.protectedDeposit),
        totalCollateralFormatted: formatUnits(positionData.totalCollateral),
        borrowedAmountFormatted: formatUnits(positionData.borrowedAmount),
        loanToValuePercentage: ((Number(positionData.loanToValue) / 10**18) * 100).toFixed(2) + '%',
        maxBorrowAmountFormatted: formatUnits(positionData.maxBorrowAmount)
      },
      timestamp: new Date().toISOString(),
    }, { status: 200 });
    
  } catch (error: any) {
    console.error("Error fetching user position:", error);
    return NextResponse.json(
      { error: "Failed to fetch user position data", message: error.message }, 
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
