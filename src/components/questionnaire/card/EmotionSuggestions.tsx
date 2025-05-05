
import { HeartIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { emotionsList } from "@/data/questionnaireData";

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
  // Helper function to determine if string might be an emotion
  const mightBeEmotion = (input: string): boolean => {
    const lowerInput = input.toLowerCase();
    // Check if the input contains any common emotion-related terms
    return emotionsList.some(emotion => 
      lowerInput.includes(emotion.name.toLowerCase())
    );
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
        <div className="text-sm font-medium text-muted-foreground mb-2 flex items-center">
          <HeartIcon className="h-4 w-4 mr-2" />
          Emotion suggestions:
        </div>
        <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pb-2">
          {emotionsList.map((emotion) => (
            <TooltipProvider key={emotion.name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={() => onSuggestionClick(emotion.name)}
                    className="text-xs"
                  >
                    {emotion.name}
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="max-w-[250px]">
                  <p>{emotion.description}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </div>
    </div>
  );
}
