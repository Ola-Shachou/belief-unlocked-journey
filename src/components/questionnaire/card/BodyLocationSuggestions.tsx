
import { UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { bodyLocationsList } from "@/data/questionnaireData";

interface BodyLocationSuggestionsProps {
  onSuggestionClick: (suggestion: string) => void;
}

export function BodyLocationSuggestions({ onSuggestionClick }: BodyLocationSuggestionsProps) {
  return (
    <div className="mt-4 space-y-4">
      <div className="text-sm">
        <p className="text-muted-foreground mb-2">
          You can list multiple locations separated by commas. Include sensations both inside your body and around it.
        </p>
      </div>
      
      <div>
        <div className="text-sm font-medium text-muted-foreground mb-2 flex items-center">
          <UserIcon className="h-4 w-4 mr-2" />
          Common locations:
        </div>
        <div className="flex flex-wrap gap-2">
          {bodyLocationsList.map((location) => (
            <TooltipProvider key={location.name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    key={location.name}
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={() => onSuggestionClick(location.name)}
                    className="text-xs"
                  >
                    {location.name}
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="max-w-[250px]">
                  <p>{location.description}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </div>
    </div>
  );
}
