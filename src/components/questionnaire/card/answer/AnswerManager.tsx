
import { useState, useEffect } from "react";
import { Question } from "@/data";
import { mightBeEmotion, getBodyLocations, parseBodySpecificFormat } from "../utils/questionHelpers";

interface UseAnswerManagerResult {
  answer: string | number;
  setAnswer: (value: string | number) => void;
  showEmotionHelp: boolean;
  liveAnswers: {[key: number]: string | number};
  isNextDisabled: boolean;
  handleSuggestionClick: (suggestion: string) => void;
  handleBodyLocationClick: (location: string) => void;
  showFormatHint: boolean;
}

export function useAnswerManager(
  question: Question,
  previousAnswers: {[key: number]: string | number}
): UseAnswerManagerResult {
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
      
      // Auto-populate question 4 with body locations from question 3
      if (question.id === 4 && previousAnswers[3]) {
        const bodyLocations = getBodyLocations(previousAnswers);
        if (bodyLocations.length > 0) {
          const formattedLocations = bodyLocations.map(location => `${location}:`).join('\n');
          setAnswer(formattedLocations);
        }
      }
      
      // Auto-populate question 5 with body locations and shapes from questions 3 and 4
      if (question.id === 5 && previousAnswers[3] && previousAnswers[4]) {
        const bodyLocations = getBodyLocations(previousAnswers);
        const shapesData = typeof previousAnswers[4] === 'string' ? 
          parseBodySpecificFormat(previousAnswers[4] as string) : [];
          
        if (bodyLocations.length > 0) {
          // Create a formatted string with each body location and its shape, if available
          const formattedLocationsWithShapes = bodyLocations.map(location => {
            const shapeInfo = shapesData.find(item => item.location === location);
            const shape = shapeInfo?.description || '';
            return `${location}: ${shape ? shape + ':' : ''}`;
          }).join('\n');
          
          setAnswer(formattedLocationsWithShapes);
        }
      }
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

  return {
    answer,
    setAnswer,
    showEmotionHelp,
    liveAnswers,
    isNextDisabled,
    handleSuggestionClick,
    handleBodyLocationClick,
    showFormatHint
  };
}
