
import { useState, useEffect } from "react";
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

// Expanded emotions with descriptions for assistance
const emotionSuggestions = [
  { name: "Admiration", description: "Feeling of respect and warm approval." },
  { name: "Adoration", description: "Deep love and respect." },
  { name: "Aesthetic Appreciation", description: "Admiration of beauty or artistic qualities." },
  { name: "Amusement", description: "Finding something funny or entertaining." },
  { name: "Anger", description: "Strong feeling of displeasure, hostility or antagonism." },
  { name: "Anxiety", description: "Feeling of worry, nervousness, or unease about something with an uncertain outcome." },
  { name: "Awe", description: "Feeling of reverential respect mixed with fear or wonder." },
  { name: "Awkwardness", description: "Feeling uncomfortable, self-conscious, or embarrassed." },
  { name: "Boredom", description: "Feeling weary because one is unoccupied or lacks interest." },
  { name: "Calmness", description: "State of tranquility, free from disturbance or agitation." },
  { name: "Confusion", description: "Feeling bewildered or unable to think clearly." },
  { name: "Craving", description: "Powerful desire for something." },
  { name: "Disgust", description: "Strong feeling of revulsion or profound disapproval." },
  { name: "Empathetic Pain", description: "Feeling hurt or suffering because of another's pain." },
  { name: "Entrancement", description: "State of being captivated or delighted." },
  { name: "Envy", description: "Feeling of discontented or resentful longing aroused by someone else's possessions, qualities, or luck." },
  { name: "Excitement", description: "Feeling of great enthusiasm and eagerness." },
  { name: "Fear", description: "Unpleasant emotion caused by the belief that someone or something is dangerous or a threat." },
  { name: "Frustration", description: "Feeling upset or annoyed as a result of being unable to change or achieve something." },
  { name: "Guilt", description: "Feeling of having done wrong or failed in an obligation." },
  { name: "Horror", description: "Intense feeling of fear, shock, or disgust." },
  { name: "Interest", description: "Feeling of wanting to know or learn about something." },
  { name: "Joy", description: "Feeling of great pleasure and happiness." },
  { name: "Nostalgia", description: "Sentimental longing for a period in the past." },
  { name: "Resentment", description: "Bitter indignation at having been treated unfairly." },
  { name: "Romance", description: "Feeling of excitement and mystery associated with love." },
  { name: "Sadness", description: "Feeling unhappy or showing sorrow; affected by grief." },
  { name: "Satisfaction", description: "Fulfillment of one's wishes, expectations, or needs." },
  { name: "Shame", description: "Painful feeling of humiliation or distress caused by the consciousness of wrong or foolish behavior." },
  { name: "Sexual Desire", description: "Strong physical and emotional attraction towards another person." },
  { name: "Sympathy", description: "Feelings of pity and sorrow for someone else's misfortune." },
  { name: "Triumph", description: "Great satisfaction and elation resulting from a success or victory." },
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
    question.type === 'scale' ? 5 : ''
  );
  
  // Reset the answer field when question changes
  useEffect(() => {
    // Check if this question already has an answer
    if (previousAnswers[question.id] !== undefined) {
      setAnswer(previousAnswers[question.id]);
    } else {
      // Reset to default value if no previous answer
      setAnswer(question.type === 'scale' ? 5 : '');
    }
  }, [question.id, previousAnswers]);

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

  // Render section for referencing previous answers
  const renderPreviousAnswersSection = () => {
    if (question.id <= 1) return null;

    const relevantPreviousQuestions = [];
    
    // Always show the main problem (question 1)
    if (question.id !== 1 && previousAnswers[1]) {
      relevantPreviousQuestions.push({
        id: 1,
        text: "Your current challenge:",
        answer: previousAnswers[1]
      });
    }
    
    // Show emotions for shape/color/texture questions
    if ((question.type === 'shape' || question.type === 'color' || question.type === 'texture') && previousAnswers[2]) {
      relevantPreviousQuestions.push({
        id: 2,
        text: "Associated emotions:",
        answer: previousAnswers[2]
      });
    }
    
    // Show body locations for shape/color/texture questions
    if ((question.type === 'shape' || question.type === 'color' || question.type === 'texture') && previousAnswers[3]) {
      relevantPreviousQuestions.push({
        id: 3,
        text: "Body locations:",
        answer: previousAnswers[3]
      });
    }
    
    if (relevantPreviousQuestions.length === 0) return null;
    
    return (
      <div className="mt-4 p-3 bg-belief-lightpurple/20 rounded-md">
        <h4 className="text-sm font-medium mb-2 text-belief-purple">Reference Information:</h4>
        <div className="space-y-2">
          {relevantPreviousQuestions.map(q => (
            <div key={q.id} className="text-sm">
              <span className="font-medium">{q.text}</span>
              <p className="text-muted-foreground">{q.answer as string}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render suggestions for certain question types
  const renderSuggestions = () => {
    if (question.type === 'emotion') {
      return (
        <div className="mt-4">
          <div className="text-sm font-medium text-muted-foreground mb-2">Suggestions:</div>
          <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pb-2">
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
                  <TooltipContent className="max-w-[250px]">
                    <p>{emotion.description}</p>
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
        {renderPreviousAnswersSection()}
        
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
