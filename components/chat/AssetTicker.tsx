"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { PendleConnection } from "@/lib/pendle/connection";
import Image from "next/image";

interface Asset {
  symbol: string;
  price: number;
  icon: string;
  address: string;
}

const AssetTicker = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const tickerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  const fetchAssets = async () => {
    try {
      const connection = new PendleConnection();
      const allAssets = await connection.getAssets();

      const validAssets = allAssets
        .filter((asset) => asset.price && asset.icon)
        .filter((asset) => asset.type === "GENERIC" || asset.type === "NATIVE")
        .map((asset) => ({
          symbol: asset.symbol,
          price: asset.price || 0,
          icon: asset.icon,
          address: asset.address,
        }));

      setAssets(validAssets);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching assets:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
    const interval = setInterval(() => {
      fetchAssets();
    }, 100000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (tickerRef.current) {
      setWidth(tickerRef.current.scrollWidth);
    }
  }, [assets]);

  if (loading || assets.length === 0) return null;

  return (
    <div className="w-full overflow-hidden mt-2 py-1 bg-muted/30 rounded-md">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: [-0, -width] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30, // Adjust based on how fast you want it
            ease: "linear",
          },
        }}
        style={{ display: "flex" }}
      >
        <div ref={tickerRef} className="flex">
          {assets.map((asset, i) => (
            <div
              key={`${asset.address}-${i}`}
              className="flex items-center px-3 mx-1 bg-background/60 rounded-full h-8 backdrop-blur-sm border border-border/30"
            >
              {asset.icon && (
                <div className="w-4 h-4 mr-2 relative">
                  <Image
                    src={asset.icon}
                    alt={asset.symbol}
                    width={16}
                    height={16}
                    className="rounded-full"
                    unoptimized
                  />
                </div>
              )}
              <span className="text-xs font-medium">{asset.symbol}</span>
              <span className="ml-1 text-xs text-muted-foreground">
                ${asset.price.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
        {/* Duplicate for seamless loop */}
        <div className="flex">
          {assets.map((asset, i) => (
            <div
              key={`${asset.address}-dup-${i}`}
              className="flex items-center px-3 mx-1 bg-background/60 rounded-full h-8 backdrop-blur-sm border border-border/30"
            >
              {asset.icon && (
                <div className="w-4 h-4 mr-2 relative">
                  <Image
                    src={asset.icon}
                    alt={asset.symbol}
                    width={16}
                    height={16}
                    className="rounded-full"
                    unoptimized
                  />
                </div>
              )}
              <span className="text-xs font-medium">{asset.symbol}</span>
              <span className="ml-1 text-xs text-muted-foreground">
                ${asset.price.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AssetTicker;
