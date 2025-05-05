import { useState, useEffect } from "react";
import { Question, emotionsList, bodyLocationsList } from "@/data/questionnaireData";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircleIcon, UserIcon, HeartIcon, LayersIcon, DropletIcon, AlertCircleIcon } from "lucide-react";

interface QuestionCardProps {
  question: Question;
  previousAnswers: {[key: number]: string | number};
  onAnswer: (questionId: number, answer: string | number) => void;
  onNext: () => void;
  onBack?: () => void;
  isFirst: boolean;
  isLast: boolean;
}

// Common texture descriptions
const textureSuggestions = [
  "Rough", "Smooth", "Sticky", "Slimy", "Sharp", "Soft", 
  "Hard", "Heavy", "Light", "Prickly", "Fuzzy", "Cold", 
  "Hot", "Hollow", "Dense", "Liquid", "Solid", "Airy"
];

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

  // Handler for emotion suggestions
  const handleSuggestionClick = (suggestion: string) => {
    if (typeof answer === 'string') {
      // Add the suggestion to the current answer
      const currentAnswers = answer.split(',').map(a => a.trim()).filter(a => a);
      if (!currentAnswers.includes(suggestion)) {
        const newAnswer = currentAnswers.length > 0 
          ? `${answer.trim()}, ${suggestion}` 
          : suggestion;
        setAnswer(newAnswer);
      }
    } else {
      setAnswer(suggestion);
    }
  };

  // Function to extract body locations from the answer to question 3
  const getBodyLocations = (): string[] => {
    if (!previousAnswers[3] || typeof previousAnswers[3] !== 'string') return [];
    return previousAnswers[3].split(',').map(location => location.trim()).filter(Boolean);
  };

  // Get attributes for each body location
  const getLocationAttributes = () => {
    const bodyLocations = getBodyLocations();
    
    if (bodyLocations.length === 0) return [];
    
    return bodyLocations.map(location => {
      // For each location, get its attributes from questions 4-8
      return {
        location,
        shape: previousAnswers[4] && typeof previousAnswers[4] === 'string' ? previousAnswers[4] : '',
        color: previousAnswers[5] && typeof previousAnswers[5] === 'string' ? previousAnswers[5] : '',
        texture: previousAnswers[6] && typeof previousAnswers[6] === 'string' ? previousAnswers[6] : '',
        dimension: previousAnswers[7] && typeof previousAnswers[7] === 'string' ? previousAnswers[7] : '',
        backgroundColor: previousAnswers[8] && typeof previousAnswers[8] === 'string' ? previousAnswers[8] : ''
      };
    });
  };

  // Render section for referencing previous answers
  const renderPreviousAnswersSection = () => {
    if (question.id <= 1) return null;

    const relevantPreviousQuestions = [];
    
    // Always show the main problem (question 1)
    if (question.id !== 1 && previousAnswers[1]) {
      relevantPreviousQuestions.push({
        id: 1,
        text: "Your current challenge:",
        answer: previousAnswers[1]
      });
    }
    
    // Show emotions for shape/color/texture questions
    if ((question.type === 'shape' || question.type === 'color' || question.type === 'texture') && previousAnswers[2]) {
      relevantPreviousQuestions.push({
        id: 2,
        text: "Associated emotions:",
        answer: previousAnswers[2]
      });
    }
    
    // Show body locations for shape/color/texture questions
    if ((question.type === 'shape' || question.type === 'color' || question.type === 'texture') && previousAnswers[3]) {
      relevantPreviousQuestions.push({
        id: 3,
        text: "Body locations:",
        answer: previousAnswers[3]
      });
    }
    
    if (relevantPreviousQuestions.length === 0) return null;
    
    // For questions after body locations, show detailed location-based attributes
    const showDetailedAttributes = question.id > 4 && previousAnswers[3];
    const locationAttributes = showDetailedAttributes ? getLocationAttributes() : [];
    
    return (
      <div className="mt-4 p-4 bg-belief-lightpurple/10 rounded-lg border border-belief-lightpurple/30">
        <h4 className="text-sm font-medium mb-3 text-belief-purple flex items-center">
          <AlertCircleIcon className="h-4 w-4 mr-2" />
          Reference Information
        </h4>

        {showDetailedAttributes && locationAttributes.length > 0 ? (
          <Accordion type="single" collapsible className="w-full">
            {locationAttributes.map((attr, index) => (
              <AccordionItem key={index} value={`location-${index}`}>
                <AccordionTrigger className="text-sm font-medium py-2">
                  {attr.location}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {attr.shape && (
                      <div className="flex items-start gap-2">
                        <LayersIcon className="h-4 w-4 text-belief-purple mt-0.5 shrink-0" />
                        <div>
                          <span className="font-medium block">Shape:</span>
                          <span className="text-muted-foreground">{attr.shape}</span>
                        </div>
                      </div>
                    )}
                    {attr.color && (
                      <div className="flex items-start gap-2">
                        <DropletIcon className="h-4 w-4 text-belief-purple mt-0.5 shrink-0" />
                        <div>
                          <span className="font-medium block">Color:</span>
                          <span className="text-muted-foreground">{attr.color}</span>
                        </div>
                      </div>
                    )}
                    {attr.texture && (
                      <div className="flex items-start gap-2">
                        <UserIcon className="h-4 w-4 text-belief-purple mt-0.5 shrink-0" />
                        <div>
                          <span className="font-medium block">Texture:</span>
                          <span className="text-muted-foreground">{attr.texture}</span>
                        </div>
                      </div>
                    )}
                    {attr.dimension && (
                      <div className="flex items-start gap-2">
                        <LayersIcon className="h-4 w-4 text-belief-purple mt-0.5 shrink-0" />
                        <div>
                          <span className="font-medium block">Dimensions:</span>
                          <span className="text-muted-foreground">{attr.dimension}</span>
                        </div>
                      </div>
                    )}
                    {attr.backgroundColor && (
                      <div className="flex items-start gap-2">
                        <DropletIcon className="h-4 w-4 text-belief-purple mt-0.5 shrink-0" />
                        <div>
                          <span className="font-medium block">Background:</span>
                          <span className="text-muted-foreground">{attr.backgroundColor}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className="space-y-2">
            {relevantPreviousQuestions.map(q => (
              <div key={q.id} className="text-sm">
                <span className="font-medium flex items-center">
                  {q.id === 1 && <AlertCircleIcon className="h-3 w-3 mr-1" />}
                  {q.id === 2 && <HeartIcon className="h-3 w-3 mr-1" />}
                  {q.id === 3 && <UserIcon className="h-3 w-3 mr-1" />}
                  {q.text}
                </span>
                <p className="text-muted-foreground ml-4">{q.answer as string}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Helper function to determine if string might be an emotion
  const mightBeEmotion = (input: string): boolean => {
    const lowerInput = input.toLowerCase();
    // Check if the input contains any common emotion-related terms
    return emotionsList.some(emotion => 
      lowerInput.includes(emotion.name.toLowerCase())
    );
  };

  // Render suggestions for certain question types
  const renderSuggestions = () => {
    if (question.type === 'emotion') {
      // Check if current answer doesn't seem to be an emotion
      const showEmotionHelp = typeof answer === 'string' && 
                              answer.trim() !== '' && 
                              !mightBeEmotion(answer);
      
      return (
        <div className="mt-4 space-y-4">
          {showEmotionHelp && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md text-sm">
              <p className="font-medium text-yellow-800 mb-1">
                What you've entered doesn't seem to be an emotion.
              </p>
              <p className="text-yellow-700">
                Try thinking about how this situation makes you feel inside. Some common emotions are: fear, anger, sadness, joy, disgust, surprise, etc.
              </p>
            </div>
          )}
          
          <div>
            <div className="text-sm font-medium text-muted-foreground mb-2 flex items-center">
              <HeartIcon className="h-4 w-4 mr-2" />
              Emotion suggestions:
            </div>
            <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pb-2">
              {emotionsList.map((emotion) => (
                <TooltipProvider key={emotion.name}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleSuggestionClick(emotion.name)}
                        className="text-xs"
                      >
                        {emotion.name}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-[250px]">
                      <p>{emotion.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          </div>
        </div>
      );
    } else if (question.type === 'bodyLocation') {
      return (
        <div className="mt-4 space-y-4">
          <div className="text-sm">
            <p className="text-muted-foreground mb-2">
              You can list multiple locations separated by commas. Include sensations both inside your body and around it.
            </p>
          </div>
          
          <div>
            <div className="text-sm font-medium text-muted-foreground mb-2 flex items-center">
              <UserIcon className="h-4 w-4 mr-2" />
              Common locations:
            </div>
            <div className="flex flex-wrap gap-2">
              {bodyLocationsList.map((location) => (
                <TooltipProvider key={location.name}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        key={location.name}
                        type="button" 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleSuggestionClick(location.name)}
                        className="text-xs"
                      >
                        {location.name}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-[250px]">
                      <p>{location.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          </div>
        </div>
      );
    } else if (question.type === 'texture') {
      return (
        <div className="mt-4">
          <div className="text-sm font-medium text-muted-foreground mb-2 flex items-center">
            <UserIcon className="h-4 w-4 mr-2" />
            Texture ideas:
          </div>
          <div className="flex flex-wrap gap-2">
            {textureSuggestions.map((texture) => (
              <Button 
                key={texture}
                type="button" 
                variant="outline" 
                size="sm"
                onClick={() => handleSuggestionClick(texture)}
                className="text-xs"
              >
                {texture}
              </Button>
            ))}
          </div>
        </div>
      );
    } else if (question.type === 'shape' || question.type === 'color') {
      // For shape and color questions, remind about connecting to body locations
      const bodyLocations = getBodyLocations();
      
      if (bodyLocations.length > 0) {
        return (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-md">
            <p className="text-sm text-blue-700">
              Try to describe the {question.type === 'shape' ? 'shape' : 'color'} for each body location you identified:
              {bodyLocations.map((location, i) => (
                <span key={i} className="font-medium"> {location}{i < bodyLocations.length - 1 ? ',' : ''}</span>
              ))}
            </p>
          </div>
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
        {renderPreviousAnswersSection()}
        
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
