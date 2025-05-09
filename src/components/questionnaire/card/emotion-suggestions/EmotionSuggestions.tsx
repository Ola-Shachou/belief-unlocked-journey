
import { useState, useEffect } from "react";
import { HeartIcon } from "lucide-react";
import { findEmotionsByPrefix, Emotion } from "@/data/questionnaireData";
import { EmotionHelp } from "./EmotionHelp";
import { EmotionSearchCommand } from "./EmotionSearchCommand";
import { EmotionButtons } from "./EmotionButtons";
import { EmotionSuggestionsHeader } from "./EmotionSuggestionsHeader";
import { parseEmotions, addEmotionToList, extractBodyPart } from "./utils/emotionUtils";

interface EmotionSuggestionsProps {
  answer: string;
  showEmotionHelp: boolean;
  onSuggestionClick: (suggestion: string) => void;
}

export function EmotionSuggestions({ 
  answer, 
  showEmotionHelp, 
  onSuggestionClick 
}: EmotionSuggestionsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [filteredEmotions, setFilteredEmotions] = useState<Emotion[]>([]);
  const [selectedBody, setSelectedBody] = useState<string | null>(null);
  
  // Update filtered emotions when search term changes
  useEffect(() => {
    setFilteredEmotions(findEmotionsByPrefix(searchTerm, 15));
  }, [searchTerm]);
  
  // Get the current emotions from answer
  const currentEmotions = parseEmotions(answer);
  
  // Toggle search interface
  const toggleSearch = () => {
    setIsSearching(prev => !prev);
    setSearchTerm("");
  };

  // Handle emotion suggestion click with multiple emotion support
  const handleSuggestionClick = (emotion: Emotion) => {
    // Extract body part if there's a colon in the current answer
    let bodyPart = selectedBody;
    
    if (!bodyPart) {
      bodyPart = extractBodyPart(answer);
    }
    
    // Check if the emotion is already selected
    const emotionName = emotion.name.trim();
    const isAlreadySelected = currentEmotions.some(
      e => e.toLowerCase() === emotionName.toLowerCase()
    );
    
    // Don't add duplicates
    if (isAlreadySelected) return;
    
    // Add the emotion to the answer
    const newAnswer = addEmotionToList(answer, emotion.name, bodyPart);
    onSuggestionClick(newAnswer);
  };

  return (
    <div className="mt-4 space-y-4">
      {showEmotionHelp && <EmotionHelp />}
      
      <div>
        <EmotionSuggestionsHeader 
          isSearching={isSearching} 
          toggleSearch={toggleSearch} 
        />

        {isSearching ? (
          <EmotionSearchCommand 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filteredEmotions={filteredEmotions}
            currentEmotions={currentEmotions}
            onEmotionSelect={handleSuggestionClick}
          />
        ) : (
          <EmotionButtons 
            emotions={filteredEmotions.slice(0, 20)}
            currentEmotions={currentEmotions}
            onEmotionSelect={handleSuggestionClick}
            onShowMore={toggleSearch}
            totalEmotions={filteredEmotions.length}
          />
        )}
      </div>
    </div>
  );
}
