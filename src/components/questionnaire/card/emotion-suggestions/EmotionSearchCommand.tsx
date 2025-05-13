
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Emotion } from "@/data/questionnaireData";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

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
  // Sort emotions alphabetically
  const sortedEmotions = [...filteredEmotions].sort((a, b) => 
    a.name.localeCompare(b.name)
  );

  return (
    <div className="border rounded-md">
      <Command>
        <CommandInput 
          placeholder="Search emotions..." 
          value={searchTerm}
          onValueChange={setSearchTerm}
        />
        <CommandList className="max-h-[300px]">
          <CommandEmpty>No emotions found.</CommandEmpty>
          <CommandGroup>
            {sortedEmotions.map((emotion) => {
              const isSelected = currentEmotions.some(
                e => e.toLowerCase() === emotion.name.toLowerCase()
              );
              return (
                <HoverCard key={emotion.name} openDelay={300}>
                  <HoverCardTrigger asChild>
                    <CommandItem
                      onSelect={() => onEmotionSelect(emotion)}
                      className={isSelected ? "bg-primary/10" : ""}
                    >
                      <span className={isSelected ? "font-medium" : ""}>
                        {emotion.name}
                      </span>
                      {emotion.intensity && (
                        <span className="ml-2 text-xs text-muted-foreground">
                          ({emotion.intensity})
                        </span>
                      )}
                      <span className="ml-2 text-xs text-muted-foreground truncate">
                        {emotion.description?.substring(0, 30)}
                        {emotion.description?.length > 30 ? "..." : ""}
                      </span>
                    </CommandItem>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80 p-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">{emotion.name}</h4>
                      <p className="text-sm text-muted-foreground">{emotion.description}</p>
                      {emotion.synonyms && emotion.synonyms.length > 0 && (
                        <div className="text-xs">
                          <span className="font-medium">Similar emotions: </span>
                          <span className="text-muted-foreground">{emotion.synonyms.join(", ")}</span>
                        </div>
                      )}
                      {emotion.intensity && (
                        <div className="text-xs">
                          <span className="font-medium">Intensity: </span>
                          <span className="text-muted-foreground">{emotion.intensity}</span>
                        </div>
                      )}
                    </div>
                  </HoverCardContent>
                </HoverCard>
              );
            })}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
}
