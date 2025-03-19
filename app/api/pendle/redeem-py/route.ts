import { NextRequest, NextResponse } from "next/server";
import { PendleConnection } from "@/lib/pendle/connection";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      chainId, 
      yt,
      tokenOut, 
      amountIn, 
      slippage = 0.01,
      receiver,
      enableAggregator = false
    } = body;

    // Validate required params
    if (!chainId || !yt || !tokenOut || !amountIn || !receiver) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    const pendleClient = new PendleConnection();
    
    const result = await pendleClient.redeemPy(
      chainId,
      yt,
      tokenOut,
      amountIn,
      slippage,
      receiver,
      enableAggregator
    );
    
    return NextResponse.json({
      success: true,
      data: result.data,
      transaction: result.tx,
    });
    
  } catch (error: any) {
    console.error("Error redeeming PT and YT tokens:", error);
    return NextResponse.json(
      { error: error.message || "Failed to redeem PT and YT tokens" },
      { status: 500 }
    );
  }
}
