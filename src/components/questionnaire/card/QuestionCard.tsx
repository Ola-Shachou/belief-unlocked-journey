
import { useState, useEffect } from "react";
import { Question } from "@/data/questionnaireData";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PreviousAnswersSection } from "./reference/PreviousAnswersSection";
import { EmotionSuggestions } from "./EmotionSuggestions";
import { BodyLocationSuggestions } from "./BodyLocationSuggestions";
import { TextureSuggestions } from "./TextureSuggestions";
import { ShapeColorHint } from "./ShapeColorHint";
import { AnswerInput } from "./answer-input/AnswerInput";
import { CardNavigation } from "./navigation/CardNavigation";
import { mightBeEmotion, getBodyLocations, processQuestionText } from "./utils/questionHelpers";

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
  // Process question text with previous answers
  const displayText = processQuestionText(question.id, question.text, previousAnswers);

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

  // Determine if the next button should be disabled
  const isNextDisabled = question.type !== 'scale' && (!answer || (typeof answer === 'string' && answer.trim() === ''));

  // Handler for emotion suggestions
  const handleSuggestionClick = (suggestion: string) => {
    setAnswer(suggestion);
  };

  // Handler for formatting input with body part: emotion format
  const handleBodyLocationClick = (location: string) => {
    if (typeof answer !== 'string') return;
    
    // Format as "location: " to encourage proper format
    setAnswer(`${location}: `);
  };

  // Determine if the user is on a question that benefits from showing the format hint
  const showFormatHint = question.id > 3 && (
    question.type === 'shape' || 
    question.type === 'color' || 
    question.type === 'texture'
  );

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
      const bodyLocations = getBodyLocations(previousAnswers);
      
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
          previousAnswers={liveAnswers} 
        />
        
        <AnswerInput
          question={question}
          answer={answer}
          setAnswer={setAnswer}
          showFormatHint={showFormatHint}
        />

        {renderSuggestions()}
      </CardContent>
      <CardFooter>
        <CardNavigation
          onNext={handleNext}
          onBack={onBack}
          isFirst={isFirst}
          isLast={isLast}
          isNextDisabled={isNextDisabled}
        />
      </CardFooter>
    </Card>
  );
}
