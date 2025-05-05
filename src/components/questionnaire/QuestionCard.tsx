
import { useState } from "react";
import { Question } from "@/data/questionnaireData";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";

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
    // Extract first few words from the belief to use in place of "it"
    const beliefStart = previousAnswers[1].split(' ').slice(0, 3).join(' ');
    displayText = displayText.replace(/\bit\b/gi, `"${beliefStart}..."`);
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
        {question.type === 'text' && (
          question.id === 1 ? (
            <Textarea
              placeholder={question.placeholder}
              value={answer as string}
              onChange={(e) => setAnswer(e.target.value)}
              className="min-h-[100px]"
            />
          ) : (
            <Textarea
              placeholder={question.placeholder}
              value={answer as string}
              onChange={(e) => setAnswer(e.target.value)}
              className="min-h-[100px]"
            />
          )
        )}
        {question.type === 'emotion' && (
          <Textarea
            placeholder={question.placeholder}
            value={answer as string}
            onChange={(e) => setAnswer(e.target.value)}
            className="min-h-[100px]"
          />
        )}
        {question.type === 'scale' && (
          <div className="space-y-6">
            <Slider
              value={[answer as number]}
              min={1}
              max={10}
              step={1}
              onValueChange={(value) => setAnswer(value[0])}
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>1 - Not at all</span>
              <span>10 - Completely</span>
            </div>
            <div className="text-center text-xl font-semibold">
              {answer}
            </div>
          </div>
        )}
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
