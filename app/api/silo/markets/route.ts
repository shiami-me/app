import { NextResponse } from "next/server";
import { createPublicClient, http, publicActions, PublicClient } from "viem";
import { getUpdatedSiloMarketData } from "@/lib/silo";
import { sonic } from "viem/chains";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const publicClient: PublicClient = createPublicClient({
      chain: sonic,
      transport: http(),
    }).extend(publicActions);
    
    // Import the hardcoded market data
    const { siloMarketData } = await import("@/lib/siloMarketData");
    
    // Update the market data with dynamic values from SiloLens
    const updatedMarkets = await getUpdatedSiloMarketData(publicClient, siloMarketData);
    
    // Return the updated market data
    return NextResponse.json({ 
      markets: updatedMarkets,
      timestamp: new Date().toISOString(),
    }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching Silo markets:", error);
    return NextResponse.json(
      { error: "Failed to fetch Silo markets", message: error.message }, 
      { status: 500 }
    );
  }
}
