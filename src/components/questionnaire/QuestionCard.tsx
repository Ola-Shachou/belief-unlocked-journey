
import { useState } from "react";
import { Question } from "@/data/questionnaireData";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HelpCircleIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface QuestionCardProps {
  question: Question;
  previousAnswers: {[key: number]: string | number};
  onAnswer: (questionId: number, answer: string | number) => void;
  onNext: () => void;
  onBack?: () => void;
  isFirst: boolean;
  isLast: boolean;
}

// Common emotions with descriptions for assistance
const emotionSuggestions = [
  { name: "Anger", description: "A strong feeling of displeasure, hostility or antagonism towards someone or something." },
  { name: "Fear", description: "An unpleasant emotion caused by the belief that someone or something is dangerous or a threat." },
  { name: "Sadness", description: "Feeling unhappy or showing sorrow; affected by grief." },
  { name: "Shame", description: "A painful feeling of humiliation or distress caused by the consciousness of wrong or foolish behavior." },
  { name: "Guilt", description: "A feeling of having done wrong or failed in an obligation." },
  { name: "Anxiety", description: "A feeling of worry, nervousness, or unease about something with an uncertain outcome." },
  { name: "Frustration", description: "The feeling of being upset or annoyed as a result of being unable to change or achieve something." },
  { name: "Disappointment", description: "Sadness or displeasure caused by the non-fulfillment of one's hopes or expectations." },
  { name: "Resentment", description: "Bitter indignation at having been treated unfairly." },
  { name: "Overwhelm", description: "To have a strong emotional effect on; to cause to feel sudden strong emotion." }
];

// Common body locations where emotions are felt
const bodyLocationSuggestions = [
  "Chest/Heart area",
  "Stomach/Gut",
  "Throat",
  "Head/Temples",
  "Shoulders/Upper back",
  "Jaw/Face",
  "Hands",
  "Legs",
  "Entire body"
];

// Common texture descriptions
const textureSuggestions = [
  "Rough", "Smooth", "Sticky", "Slimy", "Sharp", "Soft", 
  "Hard", "Heavy", "Light", "Prickly", "Fuzzy", "Cold", 
  "Hot", "Hollow", "Dense", "Liquid", "Solid", "Airy"
];

export function QuestionCard({ 
  question, 
  previousAnswers, 
  onAnswer, 
  onNext, 
  onBack, 
  isFirst, 
  isLast 
}: QuestionCardProps) {
  // Replace any instances of "it" in the question text with the answer to question 1
  let displayText = question.text;
  if (question.id > 1 && previousAnswers[1] && typeof previousAnswers[1] === 'string') {
    // Extract first few words from the difficulty to use in place of "it"
    const difficultyStart = previousAnswers[1].split(' ').slice(0, 3).join(' ');
    displayText = displayText.replace(/\bit\b/gi, `"${difficultyStart}..."`);
  }

  // State for the current answer
  const [answer, setAnswer] = useState<string | number>(
    previousAnswers[question.id] !== undefined ? previousAnswers[question.id] : (question.type === 'scale' ? 5 : '')
  );

  // Handler for submitting the answer and moving to the next question
  const handleNext = () => {
    onAnswer(question.id, answer);
    onNext();
  };

  // Handler for going back to the previous question
  const handleBack = () => {
    if (onBack) onBack();
  };

  // Determine if the next button should be disabled
  const isNextDisabled = question.type !== 'scale' && (!answer || (typeof answer === 'string' && answer.trim() === ''));

  // Handler for emotion suggestions
  const handleSuggestionClick = (suggestion: string) => {
    if (typeof answer === 'string') {
      // Add the suggestion to the current answer
      const currentAnswers = answer.split(',').map(a => a.trim()).filter(a => a);
      if (!currentAnswers.includes(suggestion)) {
        const newAnswer = currentAnswers.length > 0 
          ? `${answer.trim()}, ${suggestion}` 
          : suggestion;
        setAnswer(newAnswer);
      }
    } else {
      setAnswer(suggestion);
    }
  };

  // Render suggestions for certain question types
  const renderSuggestions = () => {
    if (question.type === 'emotion') {
      return (
        <div className="mt-4">
          <div className="text-sm font-medium text-muted-foreground mb-2">Suggestions:</div>
          <div className="flex flex-wrap gap-2">
            {emotionSuggestions.map((emotion) => (
              <TooltipProvider key={emotion.name}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleSuggestionClick(emotion.name)}
                      className="text-xs"
                    >
                      {emotion.name}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">{emotion.description}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>
      );
    } else if (question.type === 'bodyLocation') {
      return (
        <div className="mt-4">
          <div className="text-sm font-medium text-muted-foreground mb-2">Common locations:</div>
          <div className="flex flex-wrap gap-2">
            {bodyLocationSuggestions.map((location) => (
              <Button 
                key={location}
                type="button" 
                variant="outline" 
                size="sm"
                onClick={() => handleSuggestionClick(location)}
                className="text-xs"
              >
                {location}
              </Button>
            ))}
          </div>
        </div>
      );
    } else if (question.type === 'texture') {
      return (
        <div className="mt-4">
          <div className="text-sm font-medium text-muted-foreground mb-2">Texture ideas:</div>
          <div className="flex flex-wrap gap-2">
            {textureSuggestions.map((texture) => (
              <Button 
                key={texture}
                type="button" 
                variant="outline" 
                size="sm"
                onClick={() => handleSuggestionClick(texture)}
                className="text-xs"
              >
                {texture}
              </Button>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="w-full max-w-xl mx-auto animate-enter">
      <CardHeader>
        <CardTitle className="text-xl text-belief-purple">Question {question.id}</CardTitle>
        <CardDescription className="text-lg font-medium text-foreground mt-2">{displayText}</CardDescription>
        {question.description && (
          <CardDescription className="mt-2 text-sm text-muted-foreground">{question.description}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Text input for most questions */}
        {(question.type === 'text' || question.type === 'emotion' || 
          question.type === 'shape' || question.type === 'texture' || 
          question.type === 'color' || question.type === 'bodyLocation') && (
          <Textarea
            placeholder={question.placeholder}
            value={answer as string}
            onChange={(e) => setAnswer(e.target.value)}
            className="min-h-[100px]"
          />
        )}
        
        {/* Scale for intensity question */}
        {question.type === 'scale' && (
          <div className="space-y-6">
            <Slider
              value={[answer as number]}
              min={0}
              max={10}
              step={1}
              onValueChange={(value) => setAnswer(value[0])}
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>0 - None</span>
              <span>10 - Extreme</span>
            </div>
            <div className="text-center text-xl font-semibold">
              {answer}
            </div>
          </div>
        )}

        {renderSuggestions()}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={handleBack} 
          disabled={isFirst}
        >
          Back
        </Button>
        <Button 
          onClick={handleNext} 
          disabled={isNextDisabled}
        >
          {isLast ? "Complete" : "Next"}
        </Button>
      </CardFooter>
    </Card>
  );
}
