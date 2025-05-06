
import { useState } from "react";
import { AlertCircleIcon, UserIcon, HeartIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LocationsPanel } from "./LocationsPanel";
import { ReferenceSummary } from "./ReferenceSummary";
import { getLocationAttributes } from "./parseUtils";

interface PreviousAnswersSectionProps {
  questionId: number;
  previousAnswers: {[key: number]: string | number};
}

export function PreviousAnswersSection({ questionId, previousAnswers }: PreviousAnswersSectionProps) {
  const [expandedLocations, setExpandedLocations] = useState<boolean>(true);
  
  if (questionId <= 1) return null;

  const relevantPreviousQuestions = [];
  
  // Always show the main problem (question 1)
  if (questionId !== 1 && previousAnswers[1]) {
    relevantPreviousQuestions.push({
      id: 1,
      text: "Your current challenge:",
      answer: previousAnswers[1]
    });
  }
  
  // Show emotions for shape/color/texture questions
  if ((questionId >= 4 && questionId <= 8) && previousAnswers[2]) {
    relevantPreviousQuestions.push({
      id: 2,
      text: "Associated emotions:",
      answer: previousAnswers[2],
      icon: <HeartIcon className="h-3 w-3 mr-1" />
    });
  }
  
  // Show body locations for shape/color/texture questions
  if ((questionId >= 4 && questionId <= 8) && previousAnswers[3]) {
    relevantPreviousQuestions.push({
      id: 3,
      text: "Body locations:",
      answer: previousAnswers[3],
      icon: <UserIcon className="h-3 w-3 mr-1" />
    });
  }
  
  if (relevantPreviousQuestions.length === 0) return null;
  
  // For questions after body locations, show detailed location-based attributes
  const showDetailedAttributes = questionId > 4 && previousAnswers[3];
  const locationAttributes = showDetailedAttributes ? getLocationAttributes(previousAnswers) : [];
  
  const toggleAllLocations = () => {
    setExpandedLocations(!expandedLocations);
  };
  
  return (
    <div className="mt-4 p-4 bg-belief-lightpurple/10 rounded-lg border border-belief-lightpurple/30">
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-sm font-medium text-belief-purple flex items-center">
          <AlertCircleIcon className="h-4 w-4 mr-2" />
          Reference Information
        </h4>
        
        {showDetailedAttributes && locationAttributes.length > 1 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleAllLocations} 
            className="h-7 px-2 text-xs"
          >
            {expandedLocations ? "Collapse all" : "Expand all"}
          </Button>
        )}
      </div>

      {showDetailedAttributes && locationAttributes.length > 0 ? (
        <LocationsPanel locationAttributes={locationAttributes} />
      ) : (
        <ReferenceSummary relevantPreviousQuestions={relevantPreviousQuestions} />
      )}
    </div>
  );
}
