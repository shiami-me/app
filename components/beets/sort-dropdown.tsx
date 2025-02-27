import { ChevronDown, Filter, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SortDropdownProps {
  currentOrderBy: string;
  currentDirection: string;
  onSortChange: (orderBy: string) => void;
  isSorting: boolean;
}

export const SortDropdown: React.FC<SortDropdownProps> = ({
  currentOrderBy,
  currentDirection,
  onSortChange,
  isSorting,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-1" disabled={isSorting}>
          <Filter className="h-4 w-4" />
          <span className="hidden sm:inline">Sort by</span>
          {isSorting ? <Loader2 className="h-4 w-4 animate-spin" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Sort Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onSortChange("totalLiquidity")}>
          Total Liquidity {currentOrderBy === "totalLiquidity" && (currentDirection === "desc" ? "↓" : "↑")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onSortChange("volume24h")}>
          24h Volume {currentOrderBy === "volume24h" && (currentDirection === "desc" ? "↓" : "↑")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onSortChange("fees24h")}>
          24h Fees {currentOrderBy === "fees24h" && (currentDirection === "desc" ? "↓" : "↑")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onSortChange("apr")}>
          APR {currentOrderBy === "apr" && (currentDirection === "desc" ? "↓" : "↑")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
