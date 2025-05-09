
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";

interface EmotionSearchBarProps {
  isSearching: boolean;
  toggleSearch: () => void;
}

export function EmotionSearchBar({ isSearching, toggleSearch }: EmotionSearchBarProps) {
  return (
    <Button 
      variant="ghost" 
      size="sm" 
      className="h-8 px-2 text-muted-foreground"
      onClick={toggleSearch}
    >
      <SearchIcon className="h-4 w-4 mr-2" />
      {isSearching ? "Hide search" : "Search emotions"}
    </Button>
  );
}
