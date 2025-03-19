import { NextRequest, NextResponse } from "next/server";
import { PendleConnection } from "@/lib/pendle/connection";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      chainId, 
      marketAddress, 
      tokenIn, 
      amountIn, 
      slippage = 0.01,
      zpi = false,
      receiver,
      // For dual mode
      amountPtIn,
      isDualMode = false,
      enableAggregator = false
    } = body;

    // Validate required params
    if (!chainId || !marketAddress || !tokenIn || !amountIn || !receiver) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    const pendleClient = new PendleConnection();
    
    let result;
    if (isDualMode) {
      // Check for dual mode required params
      if (!amountPtIn) {
        return NextResponse.json(
          { error: "Missing amountPtIn parameter for dual mode" },
          { status: 400 }
        );
      }
      
      result = await pendleClient.addLiquidityDual(
        chainId,
        marketAddress,
        tokenIn,
        amountIn,
        amountPtIn,
        slippage,
        receiver,
        enableAggregator
      );
    } else {
      result = await pendleClient.addLiquidity(
        chainId,
        marketAddress,
        tokenIn,
        amountIn,
        slippage,
        zpi,
        receiver.
        enableAggregator
      );
    }
    
    return NextResponse.json({
      success: true,
      data: result.data,
      transaction: result.tx,
    });
    
  } catch (error: any) {
    console.error("Error adding liquidity:", error);
    return NextResponse.json(
      { error: error.message || "Failed to add liquidity" },
      { status: 500 }
    );
  }
}
