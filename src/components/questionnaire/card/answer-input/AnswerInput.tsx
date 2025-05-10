
import { Question } from "@/data/questionnaireData";
import { TextInput } from "./TextInput";
import { ScaleInput } from "./ScaleInput";
import { FormatHint } from "./FormatHint";
import { StructuredLocationInput } from "./StructuredLocationInput";
import { getBodyLocations } from "../reference/parseUtils";

interface AnswerInputProps {
  question: Question;
  answer: string | number;
  setAnswer: (answer: string | number) => void;
  showFormatHint: boolean;
  previousAnswers: {[key: number]: string | number};
}

export function AnswerInput({ 
  question, 
  answer, 
  setAnswer, 
  showFormatHint, 
  previousAnswers 
}: AnswerInputProps) {
  // Get body locations from question 3 if available
  const bodyLocations = getBodyLocations(previousAnswers);
  
  // Check if this is question 5 (color) or 6 (texture)
  const isStructuredQuestion = (question.id === 5 || question.id === 6) && bodyLocations.length > 0;
  
  // Extract shape data from question 4 if available
  const getShapeData = () => {
    if (!previousAnswers[4] || typeof previousAnswers[4] !== 'string') return {};
    const shapeData = previousAnswers[4] as string;
    const result: {[location: string]: string} = {};
    
    shapeData.split('\n').forEach(line => {
      const parts = line.split(':');
      if (parts.length >= 2) {
        const location = parts[0].trim();
        const shape = parts[1].trim();
        result[location] = shape;
      }
    });
    
    return result;
  };
  
  // Extract color data from question 5 if available for question 6
  const getColorData = () => {
    if (!previousAnswers[5] || typeof previousAnswers[5] !== 'string') return {};
    const colorData = previousAnswers[5] as string;
    const result: {[location: string]: string} = {};
    
    colorData.split('\n').forEach(line => {
      const parts = line.split(':');
      if (parts.length >= 2) {
        const location = parts[0].trim();
        const color = parts[1].trim();
        result[location] = color;
      }
    });
    
    return result;
  };

  const shapeData = getShapeData();
  const colorData = getColorData();

  return (
    <>
      {showFormatHint && <FormatHint type={question.type} />}
      
      {/* Text input for most questions */}
      {(question.type === 'text' || question.type === 'emotion' || 
        (question.type === 'bodyLocation')) && (
        <TextInput
          placeholder={question.placeholder}
          value={answer as string}
          onChange={(value) => setAnswer(value)}
        />
      )}
      
      {/* Structured input for shape, color, texture questions with body locations */}
      {isStructuredQuestion && (
        <StructuredLocationInput
          value={answer as string}
          onChange={(value) => setAnswer(value)}
          locationNames={bodyLocations}
          previousShapes={shapeData}
          previousColors={colorData}
          currentQuestionId={question.id}
        />
      )}
      
      {/* Regular text input for shape, color, texture if no body locations */}
      {(question.type === 'shape' || question.type === 'color' || 
       question.type === 'texture') && !isStructuredQuestion && (
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
