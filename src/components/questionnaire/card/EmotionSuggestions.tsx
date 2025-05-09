import { useState, useEffect } from "react";
import { HeartIcon, SearchIcon, InfoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { findEmotionsByPrefix, Emotion } from "@/data/questionnaireData";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface EmotionSuggestionsProps {
  answer: string;
  showEmotionHelp: boolean;
  onSuggestionClick: (suggestion: string) => void;
}

export function EmotionSuggestions({ 
  answer, 
  showEmotionHelp, 
  onSuggestionClick 
}: EmotionSuggestionsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [filteredEmotions, setFilteredEmotions] = useState<Emotion[]>([]);
  const [selectedBody, setSelectedBody] = useState<string | null>(null);
  
  // Update filtered emotions when search term changes
  useEffect(() => {
    setFilteredEmotions(findEmotionsByPrefix(searchTerm, 15));
  }, [searchTerm]);

  // Parse current emotions from input
  const getCurrentEmotions = (): string[] => {
    if (typeof answer !== 'string' || !answer.trim()) return [];
    return answer.split(',').map(e => e.trim()).filter(Boolean);
  };
  
  const currentEmotions = getCurrentEmotions();
  
  // Toggle search interface
  const toggleSearch = () => {
    setIsSearching(prev => !prev);
    setSearchTerm("");
  };

  // Handle emotion suggestion click with multiple emotion support
  const handleSuggestionClick = (emotion: Emotion) => {
    // Extract body part if there's a colon in the current answer
    let bodyPart = selectedBody;
    
    if (!bodyPart) {
      const colonIndex = answer.lastIndexOf(':');
      if (colonIndex !== -1) {
        bodyPart = answer.substring(0, colonIndex).trim();
      }
    }
    
    // Check if the emotion is already in the current selection
    const currentEmotionsList = getCurrentEmotions();
    const emotionName = emotion.name.trim();
    const emotionAlreadySelected = currentEmotionsList.some(
      e => e.toLowerCase() === emotionName.toLowerCase()
    );
    
    // Don't add duplicates
    if (emotionAlreadySelected) return;
    
    if (bodyPart) {
      // Add emotion to the specific body part
      let newAnswer = answer;
      const colonIndex = answer.lastIndexOf(':');
      
      if (colonIndex !== -1) {
        // Check if there's already content after the colon
        const afterColon = answer.substring(colonIndex + 1).trim();
        
        if (afterColon) {
          // Add to existing emotions for this body part
          newAnswer = `${answer}, ${emotion.name}`;
        } else {
          // First emotion after colon
          newAnswer = `${answer} ${emotion.name}`;
        }
      } else {
        // No colon yet, add one with the body part
        newAnswer = `${bodyPart}: ${emotion.name}`;
      }
      
      onSuggestionClick(newAnswer);
    } else {
      // Handle multiple emotions in a comma-separated list
      if (!answer || answer.trim() === '') {
        // If empty, just add the emotion
        onSuggestionClick(emotion.name);
      } else {
        // Otherwise, append with a comma
        onSuggestionClick(`${answer}, ${emotion.name}`);
      }
    }
  };

  return (
    <div className="mt-4 space-y-4">
      {showEmotionHelp && (
        <Alert className="bg-yellow-50 border-yellow-200">
          <InfoIcon className="h-4 w-4 text-yellow-800" />
          <AlertDescription className="text-yellow-700">
            <p className="font-medium text-yellow-800 mb-1">
              What you've entered doesn't seem to be an emotion.
            </p>
            <p>
              Try thinking about how this situation makes you feel inside. Some common emotions are: fear, anger, sadness, joy, disgust, surprise, etc.
            </p>
            <p className="mt-2 text-sm">
              <strong>Tip:</strong> Use format "body part: emotion" (e.g., "chest: anxiety, fear") to specify emotions for specific body locations.
            </p>
          </AlertDescription>
        </Alert>
      )}
      
      <div>
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm font-medium text-muted-foreground flex items-center">
            <HeartIcon className="h-4 w-4 mr-2" />
            Emotion suggestions: <span className="ml-1 text-xs text-muted-foreground">(click multiple to add)</span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 px-2 text-muted-foreground"
            onClick={toggleSearch}
          >
            <SearchIcon className="h-4 w-4 mr-2" />
            {isSearching ? "Hide search" : "Search emotions"}
          </Button>
        </div>

        {isSearching ? (
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
                        onSelect={() => handleSuggestionClick(emotion)}
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
        ) : (
          <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pb-2">
            {filteredEmotions.slice(0, 20).map((emotion) => {
              const isSelected = currentEmotions.some(
                e => e.toLowerCase() === emotion.name.toLowerCase()
              );
              return (
                <TooltipProvider key={emotion.name}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        type="button" 
                        variant={isSelected ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleSuggestionClick(emotion)}
                        className={`text-xs ${isSelected ? "bg-primary text-primary-foreground" : ""}`}
                      >
                        {emotion.name}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-[250px]">
                      <div>
                        <p className="font-medium">{emotion.name}</p>
                        <p className="text-sm text-muted-foreground">{emotion.description}</p>
                        {emotion.synonyms && emotion.synonyms.length > 0 && (
                          <p className="text-xs text-muted-foreground mt-1">
                            <span className="font-medium">Similar:</span> {emotion.synonyms.join(", ")}
                          </p>
                        )}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            })}
            {filteredEmotions.length > 20 && !isSearching && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={toggleSearch}
                className="text-xs text-muted-foreground"
              >
                +{filteredEmotions.length - 20} more...
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
