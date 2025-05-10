
import { Question } from "@/data/questionnaireData";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { PreviousAnswersSection } from "./reference/PreviousAnswersSection";
import { AnswerInput } from "./answer-input/AnswerInput";
import { CardNavigation } from "./navigation/CardNavigation";
import { processQuestionText } from "./utils/questionHelpers";
import { QuestionHeader } from "./question-header/QuestionHeader";
import { SuggestionsRenderer } from "./suggestions/SuggestionsRenderer";
import { useAnswerManager } from "./answer/AnswerManager";

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

  // Use our custom hook for managing answer state
  const {
    answer,
    setAnswer,
    showEmotionHelp,
    liveAnswers,
    isNextDisabled,
    handleSuggestionClick,
    showFormatHint
  } = useAnswerManager(question, previousAnswers);

  // Handler for submitting the answer and moving to the next question
  const handleNext = () => {
    onAnswer(question.id, answer);
    onNext();
  };

  return (
    <Card className="w-full max-w-xl mx-auto animate-enter">
      <QuestionHeader 
        question={question} 
        displayText={displayText} 
      />
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
          previousAnswers={previousAnswers}
        />

        <SuggestionsRenderer 
          question={question}
          answer={answer}
          previousAnswers={previousAnswers}
          showEmotionHelp={showEmotionHelp}
          onSuggestionClick={handleSuggestionClick}
        />
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
