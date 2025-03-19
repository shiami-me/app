import { NextRequest, NextResponse } from "next/server";
import { PendleConnection } from "@/lib/pendle/connection";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      chainId, 
      marketAddress, 
      tokenIn,
      tokenOut, 
      amountIn, 
      slippage = 0.01,
      receiver,
      enableAggregator = false
    } = body;

    // Validate required params
    if (!chainId || !marketAddress || !tokenIn || !tokenOut || !amountIn || !receiver) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    const pendleClient = new PendleConnection();
    
    const result = await pendleClient.swap(
      chainId,
      marketAddress,
      tokenIn,
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
    console.error("Error swapping tokens:", error);
    return NextResponse.json(
      { error: error.message || "Failed to swap tokens" },
      { status: 500 }
    );
  }
}
