
import { HeartIcon } from "lucide-react";
import { EmotionSearchBar } from "./EmotionSearchBar";

interface EmotionSuggestionsHeaderProps {
  isSearching: boolean;
  toggleSearch: () => void;
}

export function EmotionSuggestionsHeader({ isSearching, toggleSearch }: EmotionSuggestionsHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-2">
      <div className="text-sm font-medium text-muted-foreground flex items-center">
        <HeartIcon className="h-4 w-4 mr-2" />
        Emotion suggestions: <span className="ml-1 text-xs text-muted-foreground">(click multiple to add)</span>
      </div>
      <EmotionSearchBar isSearching={isSearching} toggleSearch={toggleSearch} />
    </div>
  );
}
