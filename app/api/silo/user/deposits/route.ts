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
    
    // Fetch deposit data in parallel
    const [regularDeposit, protectedDeposit, totalCollateral] = await Promise.all([
      siloConnection.getRegularDeposit(siloAddress as `0x${string}`, userAddress as `0x${string}`),
      siloConnection.getProtectedDeposit(siloAddress as `0x${string}`, userAddress as `0x${string}`),
      siloConnection.getTotalCollateralBalance(siloAddress as `0x${string}`, userAddress as `0x${string}`)
    ]);
    
    // Format and return the data
    return NextResponse.json({
      userAddress,
      siloAddress,
      deposits: {
        regularDeposit,
        protectedDeposit,
        totalCollateral,
        // Formatted values for easier consumption
        regularDepositFormatted: formatUnits(regularDeposit),
        protectedDepositFormatted: formatUnits(protectedDeposit),
        totalCollateralFormatted: formatUnits(totalCollateral),
      },
      timestamp: new Date().toISOString(),
    }, { status: 200 });
    
  } catch (error: any) {
    console.error("Error fetching user deposits:", error);
    return NextResponse.json(
      { error: "Failed to fetch user deposits", message: error.message }, 
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
