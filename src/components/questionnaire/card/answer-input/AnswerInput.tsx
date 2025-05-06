
import { Question } from "@/data/questionnaireData";
import { TextInput } from "./TextInput";
import { ScaleInput } from "./ScaleInput";
import { FormatHint } from "./FormatHint";

interface AnswerInputProps {
  question: Question;
  answer: string | number;
  setAnswer: (answer: string | number) => void;
  showFormatHint: boolean;
}

export function AnswerInput({ question, answer, setAnswer, showFormatHint }: AnswerInputProps) {
  return (
    <>
      {showFormatHint && <FormatHint type={question.type} />}
      
      {/* Text input for most questions */}
      {(question.type === 'text' || question.type === 'emotion' || 
        question.type === 'shape' || question.type === 'texture' || 
        question.type === 'color' || question.type === 'bodyLocation') && (
        <TextInput
          placeholder={question.placeholder}
          value={answer as string}
          onChange={(value) => setAnswer(value)}
        />
      )}
      
      {/* Scale for intensity question */}
      {question.type === 'scale' && (
        <ScaleInput
          value={answer as number}
          onChange={(value) => setAnswer(value)}
        />
      )}
    </>
  );
}
