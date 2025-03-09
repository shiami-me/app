import { NextRequest, NextResponse } from "next/server";
import { createPublicClient, http, PublicClient, publicActions } from "viem";
import { SILO_LENS_ABI, SiloConnection } from "@/lib/silo";
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
    
    // Fetch solvency data
    const [isSolvent, loanToValue, maxLtv, lt]: any = await Promise.all([
      siloConnection.isSolvent(siloAddress as `0x${string}`, userAddress as `0x${string}`),
      siloConnection.getLoanToValue(siloAddress as `0x${string}`, userAddress as `0x${string}`),
      // Get the market's max LTV and liquidation threshold for context
      siloConnection.publicClient.readContract({
        address: siloConnection.siloLensAddress,
        abi: SILO_LENS_ABI,
        functionName: "getMaxLtv",
        args: [siloAddress]
      }),
      siloConnection.publicClient.readContract({
        address: siloConnection.siloLensAddress,
        abi: SILO_LENS_ABI,
        functionName: "getLt",
        args: [siloAddress]
      })
    ]);
    
    // Format and return the data
    return NextResponse.json({
      userAddress,
      siloAddress,
      solvency: {
        isSolvent,
        lt: Number(lt),
        loanToValue,
        maxLtv: maxLtv.toString(),
        liquidationThreshold: lt.toString(),
        // Formatted values for easier consumption
        loanToValuePercentage: ((Number(loanToValue) / 10**18) * 100).toFixed(2) + '%',
        maxLtvPercentage: ((Number(maxLtv) / 10**18) * 100).toFixed(2) + '%',
        liquidationThresholdPercentage: ((Number(lt) / 10**18) * 100).toFixed(2) + '%',
        // Calculate safety margin
        marginToLiquidation: isSolvent ? 
          ((Number(lt) - Number(loanToValue)) / 10**18 * 100).toFixed(2) + '%' : 
          "Position is liquidatable",
      },
      timestamp: new Date().toISOString(),
    }, { status: 200 });
    
  } catch (error: any) {
    console.error("Error checking user solvency:", error);
    return NextResponse.json(
      { error: "Failed to check user solvency", message: error.message }, 
      { status: 500 }
    );
  }
}
