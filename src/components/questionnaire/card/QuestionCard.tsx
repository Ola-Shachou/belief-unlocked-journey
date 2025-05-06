
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
import { emotionsList } from "@/data/questionnaireData";
import { InfoIcon } from "lucide-react";

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
  
  // State to track if the current input appears to be an emotion
  const [showEmotionHelp, setShowEmotionHelp] = useState<boolean>(false);

  // Real-time tracking of all answers including current draft
  const [liveAnswers, setLiveAnswers] = useState<{[key: number]: string | number}>(previousAnswers);

  // Update liveAnswers whenever answer or previousAnswers change
  useEffect(() => {
    setLiveAnswers({
      ...previousAnswers,
      [question.id]: answer
    });
  }, [answer, previousAnswers, question.id]);
  
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

  // Effect to check if current input looks like an emotion when needed
  useEffect(() => {
    if (question.type === 'emotion' && typeof answer === 'string' && answer.trim() !== '') {
      // Only show help if the answer doesn't seem like an emotion
      setShowEmotionHelp(!mightBeEmotion(answer));
    } else {
      setShowEmotionHelp(false);
    }
  }, [answer, question.type]);

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

  // Helper function to determine if string might be an emotion
  const mightBeEmotion = (input: string): boolean => {
    const lowerInput = input.toLowerCase();
    
    // Check for colon format (body part: emotion)
    if (input.includes(':')) {
      const parts = input.split(':');
      if (parts.length >= 2 && parts[1].trim()) {
        // Check the part after the colon for emotions
        return emotionsList.some(emotion => 
          parts[1].toLowerCase().includes(emotion.name.toLowerCase())
        );
      }
    }
    
    // Regular check
    return emotionsList.some(emotion => 
      lowerInput.includes(emotion.name.toLowerCase())
    );
  };

  // Handler for emotion suggestions
  const handleSuggestionClick = (suggestion: string) => {
    setAnswer(suggestion);
  };

  // Function to extract body locations from the answer to question 3
  const getBodyLocations = (): string[] => {
    if (!previousAnswers[3] || typeof previousAnswers[3] !== 'string') return [];
    return previousAnswers[3].split(',').map(location => location.trim()).filter(Boolean);
  };

  // Handler for formatting input with body part: emotion format
  const handleBodyLocationClick = (location: string) => {
    if (typeof answer !== 'string') return;
    
    // Format as "location: " to encourage proper format
    setAnswer(`${location}: `);
  };

  // Render suggestions for certain question types
  const renderSuggestions = () => {
    if (question.type === 'emotion') {
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

  // Determine if the user is on a question that benefits from showing the format hint
  const showFormatHint = question.id > 3 && (
    question.type === 'shape' || 
    question.type === 'color' || 
    question.type === 'texture'
  );

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
          previousAnswers={liveAnswers} 
        />
        
        {showFormatHint && (
          <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-100 rounded-md mb-4">
            <InfoIcon className="h-5 w-5 text-blue-500 mt-0.5" />
            <div className="text-sm text-blue-700">
              <p className="font-medium">How to format your answer:</p>
              <p>Use <strong>body part: description</strong> format to be specific about each body location.</p>
              <p className="mt-1 italic text-blue-600">Example: "Throat: tight, constricted"</p>
            </div>
          </div>
        )}
        
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
