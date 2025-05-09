
import { Question } from "@/data";
import { EmotionSuggestions } from "../emotion-suggestions";
import { BodyLocationSuggestions } from "../BodyLocationSuggestions";
import { TextureSuggestions } from "../TextureSuggestions";
import { ShapeColorHint } from "../ShapeColorHint";
import { getBodyLocations } from "../utils/questionHelpers";

interface SuggestionsRendererProps {
  question: Question;
  answer: string | number;
  previousAnswers: {[key: number]: string | number};
  showEmotionHelp: boolean;
  onSuggestionClick: (suggestion: string) => void;
}

export function SuggestionsRenderer({
  question,
  answer,
  previousAnswers,
  showEmotionHelp,
  onSuggestionClick,
}: SuggestionsRendererProps) {
  if (question.type === 'emotion') {
    return (
      <EmotionSuggestions 
        answer={answer as string}
        showEmotionHelp={showEmotionHelp}
        onSuggestionClick={onSuggestionClick}
      />
    );
  } 
  
  if (question.type === 'bodyLocation') {
    return (
      <BodyLocationSuggestions onSuggestionClick={onSuggestionClick} />
    );
  } 
  
  if (question.type === 'texture') {
    return (
      <TextureSuggestions onSuggestionClick={onSuggestionClick} />
    );
  } 
  
  if (question.type === 'shape' || question.type === 'color') {
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
}
