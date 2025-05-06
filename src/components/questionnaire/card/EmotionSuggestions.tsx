
import { useState } from "react";
import { HeartIcon, SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { emotionsList } from "@/data/questionnaireData";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

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
  
  // Helper function to determine if string might be an emotion
  const mightBeEmotion = (input: string): boolean => {
    const lowerInput = input.toLowerCase();
    // Check if the input contains any common emotion-related terms
    return emotionsList.some(emotion => 
      lowerInput.includes(emotion.name.toLowerCase())
    );
  };
  
  // Filter emotions based on search term
  const filteredEmotions = searchTerm ? 
    emotionsList.filter(emotion => 
      emotion.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emotion.description.toLowerCase().includes(searchTerm.toLowerCase())
    ) : 
    emotionsList;

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

  return (
    <div className="mt-4 space-y-4">
      {showEmotionHelp && (
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md text-sm">
          <p className="font-medium text-yellow-800 mb-1">
            What you've entered doesn't seem to be an emotion.
          </p>
          <p className="text-yellow-700">
            Try thinking about how this situation makes you feel inside. Some common emotions are: fear, anger, sadness, joy, disgust, surprise, etc.
          </p>
        </div>
      )}
      
      <div>
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm font-medium text-muted-foreground flex items-center">
            <HeartIcon className="h-4 w-4 mr-2" />
            Emotion suggestions:
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
                    const isSelected = currentEmotions.includes(emotion.name);
                    return (
                      <CommandItem
                        key={emotion.name}
                        onSelect={() => onSuggestionClick(emotion.name)}
                        className={isSelected ? "bg-primary/10" : ""}
                      >
                        <span className={isSelected ? "font-medium" : ""}>
                          {emotion.name}
                        </span>
                        <span className="ml-2 text-xs text-muted-foreground truncate">
                          {emotion.description}
                        </span>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pb-2">
            {emotionsList.slice(0, 20).map((emotion) => {
              const isSelected = currentEmotions.includes(emotion.name);
              return (
                <TooltipProvider key={emotion.name}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        type="button" 
                        variant={isSelected ? "default" : "outline"}
                        size="sm"
                        onClick={() => onSuggestionClick(emotion.name)}
                        className={`text-xs ${isSelected ? "bg-primary text-primary-foreground" : ""}`}
                      >
                        {emotion.name}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-[250px]">
                      <p>{emotion.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            })}
            {emotionsList.length > 20 && !isSearching && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={toggleSearch}
                className="text-xs text-muted-foreground"
              >
                +{emotionsList.length - 20} more...
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
