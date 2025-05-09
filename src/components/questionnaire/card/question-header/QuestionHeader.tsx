
import { Question } from "@/data/types";
import { CardTitle, CardDescription, CardHeader } from "@/components/ui/card";

interface QuestionHeaderProps {
  question: Question;
  displayText: string;
}

export function QuestionHeader({ question, displayText }: QuestionHeaderProps) {
  return (
    <CardHeader>
      <CardTitle className="text-xl text-belief-purple">Question {question.id}</CardTitle>
      <CardDescription className="text-lg font-medium text-foreground mt-2">{displayText}</CardDescription>
      {question.description && (
        <CardDescription className="mt-2 text-sm text-muted-foreground">{question.description}</CardDescription>
      )}
    </CardHeader>
  );
}
