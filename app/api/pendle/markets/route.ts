import { NextResponse } from "next/server";
import { PendleConnection } from "@/lib/pendle/connection";

export async function GET() {
  try {
    const pendleClient = new PendleConnection();
    const markets = await pendleClient.getMarkets();
    
    return NextResponse.json({
      timestamp: new Date().toISOString(),
      markets,
    });
  } catch (error) {
    console.error("Error fetching Pendle markets:", error);
    return NextResponse.json(
      { error: "Failed to fetch Pendle markets" },
      { status: 500 }
    );
  }
}
