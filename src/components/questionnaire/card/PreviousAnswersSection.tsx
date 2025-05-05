
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { UserIcon, HeartIcon, LayersIcon, DropletIcon, AlertCircleIcon } from "lucide-react";

interface PreviousAnswersSectionProps {
  questionId: number;
  previousAnswers: {[key: number]: string | number};
}

// Helper functions
const getBodyLocations = (previousAnswers: {[key: number]: string | number}): string[] => {
  if (!previousAnswers[3] || typeof previousAnswers[3] !== 'string') return [];
  return previousAnswers[3].split(',').map(location => location.trim()).filter(Boolean);
};

const getLocationAttributes = (previousAnswers: {[key: number]: string | number}) => {
  const bodyLocations = getBodyLocations(previousAnswers);
  
  if (bodyLocations.length === 0) return [];
  
  return bodyLocations.map(location => {
    // For each location, get its attributes from questions 4-8
    return {
      location,
      shape: previousAnswers[4] && typeof previousAnswers[4] === 'string' ? previousAnswers[4] : '',
      color: previousAnswers[5] && typeof previousAnswers[5] === 'string' ? previousAnswers[5] : '',
      texture: previousAnswers[6] && typeof previousAnswers[6] === 'string' ? previousAnswers[6] : '',
      dimension: previousAnswers[7] && typeof previousAnswers[7] === 'string' ? previousAnswers[7] : '',
      backgroundColor: previousAnswers[8] && typeof previousAnswers[8] === 'string' ? previousAnswers[8] : ''
    };
  });
};

export function PreviousAnswersSection({ questionId, previousAnswers }: PreviousAnswersSectionProps) {
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
      answer: previousAnswers[2]
    });
  }
  
  // Show body locations for shape/color/texture questions
  if ((questionId >= 4 && questionId <= 8) && previousAnswers[3]) {
    relevantPreviousQuestions.push({
      id: 3,
      text: "Body locations:",
      answer: previousAnswers[3]
    });
  }
  
  if (relevantPreviousQuestions.length === 0) return null;
  
  // For questions after body locations, show detailed location-based attributes
  const showDetailedAttributes = questionId > 4 && previousAnswers[3];
  const locationAttributes = showDetailedAttributes ? getLocationAttributes(previousAnswers) : [];
  
  return (
    <div className="mt-4 p-4 bg-belief-lightpurple/10 rounded-lg border border-belief-lightpurple/30">
      <h4 className="text-sm font-medium mb-3 text-belief-purple flex items-center">
        <AlertCircleIcon className="h-4 w-4 mr-2" />
        Reference Information
      </h4>

      {showDetailedAttributes && locationAttributes.length > 0 ? (
        <Accordion type="single" collapsible className="w-full">
          {locationAttributes.map((attr, index) => (
            <AccordionItem key={index} value={`location-${index}`}>
              <AccordionTrigger className="text-sm font-medium py-2">
                {attr.location}
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {attr.shape && (
                    <div className="flex items-start gap-2">
                      <LayersIcon className="h-4 w-4 text-belief-purple mt-0.5 shrink-0" />
                      <div>
                        <span className="font-medium block">Shape:</span>
                        <span className="text-muted-foreground">{attr.shape}</span>
                      </div>
                    </div>
                  )}
                  {attr.color && (
                    <div className="flex items-start gap-2">
                      <DropletIcon className="h-4 w-4 text-belief-purple mt-0.5 shrink-0" />
                      <div>
                        <span className="font-medium block">Color:</span>
                        <span className="text-muted-foreground">{attr.color}</span>
                      </div>
                    </div>
                  )}
                  {attr.texture && (
                    <div className="flex items-start gap-2">
                      <UserIcon className="h-4 w-4 text-belief-purple mt-0.5 shrink-0" />
                      <div>
                        <span className="font-medium block">Texture:</span>
                        <span className="text-muted-foreground">{attr.texture}</span>
                      </div>
                    </div>
                  )}
                  {attr.dimension && (
                    <div className="flex items-start gap-2">
                      <LayersIcon className="h-4 w-4 text-belief-purple mt-0.5 shrink-0" />
                      <div>
                        <span className="font-medium block">Dimensions:</span>
                        <span className="text-muted-foreground">{attr.dimension}</span>
                      </div>
                    </div>
                  )}
                  {attr.backgroundColor && (
                    <div className="flex items-start gap-2">
                      <DropletIcon className="h-4 w-4 text-belief-purple mt-0.5 shrink-0" />
                      <div>
                        <span className="font-medium block">Background:</span>
                        <span className="text-muted-foreground">{attr.backgroundColor}</span>
                      </div>
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <div className="space-y-2">
          {relevantPreviousQuestions.map(q => (
            <div key={q.id} className="text-sm">
              <span className="font-medium flex items-center">
                {q.id === 1 && <AlertCircleIcon className="h-3 w-3 mr-1" />}
                {q.id === 2 && <HeartIcon className="h-3 w-3 mr-1" />}
                {q.id === 3 && <UserIcon className="h-3 w-3 mr-1" />}
                {q.text}
              </span>
              <p className="text-muted-foreground ml-4">{q.answer as string}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
