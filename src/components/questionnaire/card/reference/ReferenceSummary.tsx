
import { AlertCircleIcon, HeartIcon, UserIcon } from "lucide-react";

interface ReferenceSummaryProps {
  relevantPreviousQuestions: Array<{
    id: number;
    text: string;
    answer: string | number;
    icon?: React.ReactNode;
  }>;
}

export function ReferenceSummary({ relevantPreviousQuestions }: ReferenceSummaryProps) {
  return (
    <div className="space-y-2">
      {relevantPreviousQuestions.map(q => (
        <div key={q.id} className="text-sm">
          <span className="font-medium flex items-center">
            {q.id === 1 && <AlertCircleIcon className="h-3 w-3 mr-1" />}
            {q.icon || null}
            {q.text}
          </span>
          <p className="text-muted-foreground ml-4">{q.answer as string}</p>
        </div>
      ))}
    </div>
  );
}
