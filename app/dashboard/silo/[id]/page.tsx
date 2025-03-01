"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAccount } from "wagmi";
import { SiloDetailHeader } from "@/components/silo/silo-detail-header";
import { MarketOverview } from "@/components/silo/market-overview";
import { UserPosition } from "@/components/silo/user-position";
import { ActionPanel } from "@/components/silo/action-panel";

export default function SiloDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { address: userAddress, isConnected } = useAccount();
  const [marketData, setMarketData] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMarketData() {
      try {
        const response = await fetch(`/api/silo/markets`);
        if (!response.ok) throw new Error("Failed to fetch market data");
        const data = await response.json();
        
        // Find the market with the matching ID
        const market = data.markets.find((m: any) => m.id.toString() === id);
        if (!market) {
          console.error("Market not found");
          router.push("/dashboard/silo");
          return;
        }
        
        setMarketData(market);
      } catch (error) {
        console.error("Error fetching market data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMarketData();
  }, [id, router]);

  useEffect(() => {
    // Fetch user data if wallet is connected and market data is loaded
    if (isConnected && userAddress && marketData) {
      async function fetchUserData() {
        try {
          // We need to fetch data for both silos in the pair
          const [silo0Position, silo1Position, silo0Solvency, silo1Solvency] = await Promise.all([
            fetch(`/api/silo/user/position?siloAddress=${marketData.silo0.siloAddress}&userAddress=${userAddress}`).then(res => res.json()),
            fetch(`/api/silo/user/position?siloAddress=${marketData.silo1.siloAddress}&userAddress=${userAddress}`).then(res => res.json()),
            fetch(`/api/silo/user/solvency?siloAddress=${marketData.silo0.siloAddress}&userAddress=${userAddress}`).then(res => res.json()),
            fetch(`/api/silo/user/solvency?siloAddress=${marketData.silo1.siloAddress}&userAddress=${userAddress}`).then(res => res.json())
          ]);
          console.log(silo0Position)
          console.log(silo1Position)
          console.log(silo0Solvency)
            console.log(silo1Solvency)
          setUserData({
            silo0: {
              position: silo0Position.position,
              solvency: silo0Solvency.solvency
            },
            silo1: {
              position: silo1Position.position,
              solvency: silo1Solvency.solvency
            }
          });
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
      
      fetchUserData();
    }
  }, [isConnected, userAddress, marketData]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!marketData) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Market not found</h2>
          <p className="text-muted-foreground">The requested Silo market doesn&apos;t exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <SiloDetailHeader marketData={marketData} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <MarketOverview marketData={marketData} />
          
          {isConnected && userData && (
            <UserPosition marketData={marketData} userData={userData} />
          )}
        </div>
        
        <div className="lg:col-span-1">
          <ActionPanel marketData={marketData} userData={userData} />
        </div>
      </div>
    </div>
  );
}
