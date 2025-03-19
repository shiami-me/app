import { PendleMarket } from "@/lib/pendle/types";
import { ContextItem } from "@/providers/ChatProvider";

export interface PendleDashboardProps {
  markets: PendleMarket[];
  loading: boolean;
  isRefreshing: boolean;
  lastUpdated: string | null;
  onRefresh: () => void;
  onAddToContext: (item: ContextItem) => void;
}

export interface PendleMarketCardProps {
  market: PendleMarket;
  onAddToContext: (market: PendleMarket) => void;
}
