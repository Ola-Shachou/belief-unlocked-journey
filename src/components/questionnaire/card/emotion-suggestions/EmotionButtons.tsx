
import { Button } from "@/components/ui/button";
import { Emotion } from "@/data/questionnaireData";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

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
          <HoverCard key={emotion.name} openDelay={300}>
            <HoverCardTrigger asChild>
              <Button 
                type="button" 
                variant={isSelected ? "default" : "outline"}
                size="sm"
                onClick={() => onEmotionSelect(emotion)}
                className={`text-xs ${isSelected ? "bg-primary text-primary-foreground" : ""}`}
              >
                {emotion.name}
              </Button>
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
