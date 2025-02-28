import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface TransactionFilterProps {
  onSortChange: (sort: string) => void;
  onRefresh: () => void;
  currentSort: string;
  isRefreshing: boolean;
}

export const TransactionFilter: React.FC<TransactionFilterProps> = ({
  onSortChange,
  onRefresh,
  currentSort,
  isRefreshing
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500 dark:text-gray-400">Sort by:</span>
        <Select 
          defaultValue={currentSort} 
          onValueChange={onSortChange}
        >
          <SelectTrigger className="w-[180px] border-gray-200 dark:border-gray-800">
            <SelectValue placeholder="Sort order" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Oldest first</SelectItem>
            <SelectItem value="desc">Newest first</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onRefresh} 
        disabled={isRefreshing}
        className="border-gray-200 dark:border-gray-800"
      >
        {isRefreshing ? (
          <RefreshCw className="h-4 w-4 animate-spin" />
        ) : (
          <>
            <RefreshCw className="h-4 w-4 mr-2" /> Refresh
          </>
        )}
      </Button>
    </div>
  );
};
