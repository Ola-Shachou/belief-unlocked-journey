
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Emotion } from "@/data/questionnaireData";

interface EmotionSearchCommandProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filteredEmotions: Emotion[];
  currentEmotions: string[];
  onEmotionSelect: (emotion: Emotion) => void;
}

export function EmotionSearchCommand({
  searchTerm,
  setSearchTerm,
  filteredEmotions,
  currentEmotions,
  onEmotionSelect
}: EmotionSearchCommandProps) {
  return (
    <div className="border rounded-md">
      <Command>
        <CommandInput 
          placeholder="Search emotions..." 
          value={searchTerm}
          onValueChange={setSearchTerm}
        />
        <CommandList>
          <CommandEmpty>No emotions found.</CommandEmpty>
          <CommandGroup>
            {filteredEmotions.map((emotion) => {
              const isSelected = currentEmotions.some(
                e => e.toLowerCase() === emotion.name.toLowerCase()
              );
              return (
                <CommandItem
                  key={emotion.name}
                  onSelect={() => onEmotionSelect(emotion)}
                  className={isSelected ? "bg-primary/10" : ""}
                >
                  <span className={isSelected ? "font-medium" : ""}>
                    {emotion.name}
                  </span>
                  <span className="ml-2 text-xs text-muted-foreground truncate">
                    {emotion.description}
                  </span>
                  {emotion.synonyms && emotion.synonyms.length > 0 && (
                    <span className="ml-2 text-xs text-muted-foreground opacity-75 italic truncate">
                      Also: {emotion.synonyms.slice(0, 3).join(", ")}
                      {emotion.synonyms.length > 3 ? "..." : ""}
                    </span>
                  )}
                </CommandItem>
              );
            })}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
}
