
import { useState, useEffect } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UserIcon } from "lucide-react";

// Common body locations
const bodyLocations = [
  'Head', 'Face', 'Eyes', 'Ears', 'Nose', 'Mouth', 'Throat',
  'Neck', 'Shoulders', 'Chest', 'Heart', 'Stomach', 'Abdomen',
  'Lower back', 'Upper back', 'Arms', 'Hands', 'Legs', 'Feet',
  'Skin', 'Jaw', 'Pelvis', 'Hips'
];

interface BodyLocationSuggestionsProps {
  onSuggestionClick: (suggestion: string) => void;
}

export function BodyLocationSuggestions({ onSuggestionClick }: BodyLocationSuggestionsProps) {
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  const handleLocationToggle = (location: string) => {
    setSelectedLocations(prev => {
      if (prev.includes(location)) {
        return prev.filter(item => item !== location);
      } else {
        return [...prev, location];
      }
    });
  };

  const handleAddSelected = () => {
    if (selectedLocations.length > 0) {
      onSuggestionClick(selectedLocations.join(', '));
    }
  };

  return (
    <div className="mt-6 space-y-4">
      <div>
        <Label className="text-sm font-medium mb-2 block">Common body locations:</Label>
        <div className="grid grid-cols-3 gap-2 mt-2">
          {bodyLocations.map((location) => (
            <div key={location} className="flex items-center space-x-2">
              <Checkbox 
                id={`location-${location}`}
                checked={selectedLocations.includes(location)}
                onCheckedChange={() => handleLocationToggle(location)}
              />
              <label
                htmlFor={`location-${location}`}
                className="text-sm cursor-pointer"
              >
                {location}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {selectedLocations.length > 0 && (
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            {selectedLocations.length} location(s) selected
          </div>
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center gap-1"
            onClick={handleAddSelected}
          >
            <UserIcon className="h-3.5 w-3.5" />
            <span>Add selected</span>
          </Button>
        </div>
      )}

      <div className="text-xs text-muted-foreground mt-2">
        Select multiple locations if the feeling/sensation appears in different parts of your body.
      </div>
    </div>
  );
}
