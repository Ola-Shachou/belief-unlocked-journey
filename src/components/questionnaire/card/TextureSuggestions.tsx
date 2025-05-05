
import { UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TextureSuggestionsProps {
  onSuggestionClick: (suggestion: string) => void;
}

// Common texture descriptions
const textureSuggestions = [
  "Rough", "Smooth", "Sticky", "Slimy", "Sharp", "Soft", 
  "Hard", "Heavy", "Light", "Prickly", "Fuzzy", "Cold", 
  "Hot", "Hollow", "Dense", "Liquid", "Solid", "Airy"
];

export function TextureSuggestions({ onSuggestionClick }: TextureSuggestionsProps) {
  return (
    <div className="mt-4">
      <div className="text-sm font-medium text-muted-foreground mb-2 flex items-center">
        <UserIcon className="h-4 w-4 mr-2" />
        Texture ideas:
      </div>
      <div className="flex flex-wrap gap-2">
        {textureSuggestions.map((texture) => (
          <Button 
            key={texture}
            type="button" 
            variant="outline" 
            size="sm"
            onClick={() => onSuggestionClick(texture)}
            className="text-xs"
          >
            {texture}
          </Button>
        ))}
      </div>
    </div>
  );
}
