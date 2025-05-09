
import { Button } from "@/components/ui/button";
import { Emotion } from "@/data/questionnaireData";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface EmotionButtonsProps {
  emotions: Emotion[];
  currentEmotions: string[];
  onEmotionSelect: (emotion: Emotion) => void;
  onShowMore: () => void;
  totalEmotions: number;
}

export function EmotionButtons({
  emotions,
  currentEmotions,
  onEmotionSelect,
  onShowMore,
  totalEmotions
}: EmotionButtonsProps) {
  return (
    <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pb-2">
      {emotions.map((emotion) => {
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
                  onClick={() => onEmotionSelect(emotion)}
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
      {totalEmotions > 20 && (
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onShowMore}
          className="text-xs text-muted-foreground"
        >
          +{totalEmotions - 20} more...
        </Button>
      )}
    </div>
  );
}
