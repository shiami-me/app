"use client";
import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import Image from "next/image";

interface MarketData {
  id: number;
  reviewed: boolean;
  market: string;
  deposit_apr: string;
  borrow_apr: string;
  isBorrowable: boolean;
  logo: string;
}

const MarketTable = () => {
  const [data, setData] = useState<MarketData[][]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://v2.silo.finance/api/display-markets",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              isApeMode: false,
              isCurated: true,
              protocolKey: "sonic",
              search: null,
              sort: null,
            }),
          }
        );
        const result = await response.json();
        const formattedData: MarketData[][] = result.map((item: any) => [
          {
            id: item.id,
            reviewed: item.isVerified,
            market: item.silo0.symbol,
            deposit_apr: ((parseFloat(item.silo0.collateralBaseApr) / 10 ** 18) * 100).toFixed(2) + "%",
            borrow_apr: ((parseFloat(item.silo0.debtBaseApr) / 10 ** 18) * 100).toFixed(2) + "%",
            isBorrowable: !item.silo0.isNonBorrowable,
            logo: item.silo0.logos.coinMarketCap?.large || item.silo0.logos.coinGecko?.large || "https://s2.coinmarketcap.com/static/img/coins/128x128/34753.png",
          },
          {
            id: item.id,
            reviewed: item.isVerified,
            market: item.silo1.symbol,
            deposit_apr: ((parseFloat(item.silo1.collateralBaseApr) / 10 ** 18) * 100).toFixed(2) + "%",
            borrow_apr: ((parseFloat(item.silo1.debtBaseApr) / 10 ** 18) * 100).toFixed(2) + "%",
            isBorrowable: !item.silo1.isNonBorrowable,
            logo: item.silo1.logos.coinMarketCap?.large || item.silo1.logos.coinGecko?.large || "https://s2.coinmarketcap.com/static/img/coins/128x128/34753.png",
          }
        ]);
        setData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin text-black dark:text-white" size={32} />
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {data.map((item) => (
          <Card key={item[0].id} className="border-0 shadow-lg rounded-xl overflow-hidden">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                  <Image src="https://s2.coinmarketcap.com/static/img/coins/128x128/34753.png" alt="Sonic Logo" width={30} height={30} className="rounded-full"/>
                  <span className="text-sm">ID {item[0].id}</span>
                  <span className="text-sm">Reviewed</span>
                  <span className="text-sm text-green-400">{item[0].reviewed ? "Yes" : "No"}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 p-4">
              {[item[0], item[1]].map((market, index) => (
                <Card key={index} className="bg-secondary border-0 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-4">
                    <Image src={market.logo} alt="Market Logo" width={30} height={30} className="rounded-full"/>
                    <span className="text-gray-500 dark:text-gray-300 font-[family-name:var(--font-roboto-mono)] font-bold">{market.market}</span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-gray-600 dark:text-gray-400 text-sm">Deposit APR</span>
                        <span className="text-black dark:text-white text-lg font-medium">{market.deposit_apr}</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-gray-600 dark:text-gray-400 text-sm">Borrow APR</span>
                        <span className="text-black dark:text-white text-lg font-medium">{market.borrow_apr}</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-gray-600 dark:text-gray-400 text-sm">Available to borrow</span>
                        {!market.isBorrowable ? (
                          <span className="text-yellow-600 dark:text-yellow-400 text-right">Non-borrowable</span>
                        ) : (
                          <span className="text-black dark:text-white">Available</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MarketTable;