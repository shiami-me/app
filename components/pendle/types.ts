import { PendleMarket } from "@/lib/pendle/types";

export interface PendleDashboardProps {
  markets: PendleMarket[];
  loading: boolean;
  isRefreshing: boolean;
  lastUpdated: string | null;
  onRefresh: () => void;
  onAddToContext: () => void;
}

export interface PendleMarketCardProps {
  market: PendleMarket;
  onAddToContext: (market: PendleMarket) => void;
}
