import { NextRequest, NextResponse } from "next/server";
import { createPublicClient, http, publicActions, PublicClient } from "viem";
import { getUpdatedMarketsForTokens } from "@/lib/silo";
import { sonic } from "viem/chains";
import { siloMarketData } from "@/lib/siloMarketData";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    // Get token symbols from query params
    const searchParams = request.nextUrl.searchParams;
    const tokensParam = searchParams.get("tokens");
    
    // Parse tokens from comma-separated list
    const requestedTokens = tokensParam ? tokensParam.split(',').map(token => token.trim()) : [];
    
    // Initialize Viem client
    const publicClient: PublicClient = createPublicClient({
      chain: sonic,
      transport: http(),
    }).extend(publicActions);
    
    // Get updated data only for markets with matching tokens
    const updatedFilteredMarkets = await getUpdatedMarketsForTokens(
      publicClient, 
      siloMarketData, 
      requestedTokens
    );
    
    return NextResponse.json({
      requestedTokens,
      markets: updatedFilteredMarkets,
      count: updatedFilteredMarkets.length,
      timestamp: new Date().toISOString()
    }, { status: 200 });
  } catch (error: any) {
    console.error("Error filtering Silo markets:", error);
    return NextResponse.json(
      { error: "Failed to filter Silo markets", message: error.message },
      { status: 500 }
    );
  }
}
