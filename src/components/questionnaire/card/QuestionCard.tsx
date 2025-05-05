
import { useState, useEffect } from "react";
import { Question } from "@/data/questionnaireData";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { PreviousAnswersSection } from "./PreviousAnswersSection";
import { EmotionSuggestions } from "./EmotionSuggestions";
import { BodyLocationSuggestions } from "./BodyLocationSuggestions";
import { TextureSuggestions } from "./TextureSuggestions";
import { ShapeColorHint } from "./ShapeColorHint";

interface QuestionCardProps {
  question: Question;
  previousAnswers: {[key: number]: string | number};
  onAnswer: (questionId: number, answer: string | number) => void;
  onNext: () => void;
  onBack?: () => void;
  isFirst: boolean;
  isLast: boolean;
}

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

  // Function to extract body locations from the answer to question 3
  const getBodyLocations = (): string[] => {
    if (!previousAnswers[3] || typeof previousAnswers[3] !== 'string') return [];
    return previousAnswers[3].split(',').map(location => location.trim()).filter(Boolean);
  };

  // Helper function to determine if string might be an emotion
  const mightBeEmotion = (input: string): boolean => {
    return false; // This is implemented in the EmotionSuggestions component
  };

  // Render suggestions for certain question types
  const renderSuggestions = () => {
    if (question.type === 'emotion') {
      // Check if current answer doesn't seem to be an emotion
      const showEmotionHelp = typeof answer === 'string' && 
                              answer.trim() !== '' && 
                              !mightBeEmotion(answer);
      
      return (
        <EmotionSuggestions 
          answer={answer as string}
          showEmotionHelp={showEmotionHelp}
          onSuggestionClick={handleSuggestionClick}
        />
      );
    } else if (question.type === 'bodyLocation') {
      return (
        <BodyLocationSuggestions onSuggestionClick={handleSuggestionClick} />
      );
    } else if (question.type === 'texture') {
      return (
        <TextureSuggestions onSuggestionClick={handleSuggestionClick} />
      );
    } else if (question.type === 'shape' || question.type === 'color') {
      // For shape and color questions, remind about connecting to body locations
      const bodyLocations = getBodyLocations();
      
      if (bodyLocations.length > 0) {
        return (
          <ShapeColorHint 
            questionType={question.type} 
            bodyLocations={bodyLocations} 
          />
        );
      }
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
        <PreviousAnswersSection 
          questionId={question.id} 
          previousAnswers={previousAnswers} 
        />
        
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
