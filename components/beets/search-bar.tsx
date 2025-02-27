import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  onSearch: (query: string) => void;
  isSearching: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isSearching }) => {
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchInput);
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2 w-full sm:w-auto">
      <Input
        placeholder="Search pools..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="min-w-[200px]"
        disabled={isSearching}
      />
      <Button type="submit" size="sm" disabled={isSearching}>
        {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
      </Button>
    </form>
  );
};
