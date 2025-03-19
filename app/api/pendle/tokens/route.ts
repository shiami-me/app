import { NextRequest, NextResponse } from "next/server";
import { PendleConnection } from "@/lib/pendle/connection";

export async function GET(request: NextRequest) {
  try {
    // Get the chainId from the query parameters, default to 146 (Sonic chain)
    const searchParams = request.nextUrl.searchParams;
    const chainId = searchParams.get('chainId') 
      ? parseInt(searchParams.get('chainId') as string) 
      : 146;

    const pendleClient = new PendleConnection();
    const assets = await pendleClient.getAssets(chainId);
    
    return NextResponse.json({
      success: true,
      data: assets,
    });
    
  } catch (error: any) {
    console.error("Error fetching tokens:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch tokens" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { chainId = 146 } = body;

    const pendleClient = new PendleConnection();
    const assets = await pendleClient.getAssets(chainId);
    
    return NextResponse.json({
      success: true,
      data: assets,
    });
    
  } catch (error: any) {
    console.error("Error fetching tokens:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch tokens" },
      { status: 500 }
    );
  }
}
