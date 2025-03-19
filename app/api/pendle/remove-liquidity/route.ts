import { NextRequest, NextResponse } from "next/server";
import { PendleConnection } from "@/lib/pendle/connection";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      chainId, 
      marketAddress, 
      tokenOut, 
      amountIn, 
      slippage = 0.01,
      receiver,
      isDualMode = false,
      enableAggregator = false
    } = body;

    // Validate required params
    if (!chainId || !marketAddress || !tokenOut || !amountIn || !receiver) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    const pendleClient = new PendleConnection();
    
    let result;
    if (isDualMode) {
      result = await pendleClient.removeLiquidityDual(
        chainId,
        marketAddress,
        tokenOut,
        amountIn,
        slippage,
        receiver,
        enableAggregator
      );
    } else {
      result = await pendleClient.removeLiquidity(
        chainId,
        marketAddress,
        tokenOut,
        amountIn,
        slippage,
        receiver,
        enableAggregator
      );
    }
    
    return NextResponse.json({
      success: true,
      data: result.data,
      transaction: result.tx,
    });
    
  } catch (error: any) {
    console.error("Error removing liquidity:", error);
    return NextResponse.json(
      { error: error.message || "Failed to remove liquidity" },
      { status: 500 }
    );
  }
}
