import { NextRequest, NextResponse } from "next/server";
import { PendleConnection } from "@/lib/pendle/connection";
import { PendleMarket } from "@/lib/pendle/types";

export async function GET(request: NextRequest) {
  try {
    // Get the search parameters
    const searchParams = request.nextUrl.searchParams;
    const chainId = searchParams.get('chainId') 
      ? parseInt(searchParams.get('chainId') as string) 
      : 146;
    const address = searchParams.get('address');
    
    // Validate required params
    if (!address) {
      return NextResponse.json(
        { error: "Missing address parameter" },
        { status: 400 }
      );
    }

    const pendleClient = new PendleConnection();
    const markets = await pendleClient.getMarkets(chainId);
    
    // Find the specific market
    const market = markets.find((m: PendleMarket) => 
      m.address.toLowerCase() === address.toLowerCase()
    );
    
    if (!market) {
      return NextResponse.json(
        { error: "Market not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: market,
    });
    
  } catch (error: any) {
    console.error("Error fetching market:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch market" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { chainId = 146, address } = body;

    // Validate required params
    if (!address) {
      return NextResponse.json(
        { error: "Missing address parameter" },
        { status: 400 }
      );
    }

    const pendleClient = new PendleConnection();
    const markets = await pendleClient.getMarkets(chainId);
    
    // Find the specific market
    const market = markets.find((m: PendleMarket) => 
      m.address.toLowerCase() === address.toLowerCase()
    );
    
    if (!market) {
      return NextResponse.json(
        { error: "Market not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: market,
    });
    
  } catch (error: any) {
    console.error("Error fetching market:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch market" },
      { status: 500 }
    );
  }
}
