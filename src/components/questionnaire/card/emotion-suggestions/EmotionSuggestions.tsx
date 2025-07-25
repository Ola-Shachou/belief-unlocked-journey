
import { useState, useEffect } from "react";
import { findEmotionsByPrefix, getCommonEmotions, Emotion, emotionsList } from "@/data";
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
  const [commonEmotions, setCommonEmotions] = useState<Emotion[]>([]);
  
  // Initialize common emotions
  useEffect(() => {
    setCommonEmotions(getCommonEmotions(20));
  }, []);

  // Update filtered emotions when search term changes
  useEffect(() => {
    if (isSearching) {
      // When searching, show all emotions that match the search term
      setFilteredEmotions(findEmotionsByPrefix(searchTerm, emotionsList.length));
    } else {
      // When not searching, show common emotions
      setFilteredEmotions(commonEmotions);
    }
  }, [searchTerm, isSearching, commonEmotions]);
  
  // Get the current emotions from answer
  const currentEmotions = parseEmotions(answer);
  
  // Extract body part if there's a colon in the current answer
  useEffect(() => {
    setSelectedBody(extractBodyPart(answer));
  }, [answer]);
  
  // Toggle search interface
  const toggleSearch = () => {
    setIsSearching(prev => !prev);
    setSearchTerm("");
    
    // When coming back from search, reset to common emotions
    if (isSearching) {
      setFilteredEmotions(commonEmotions);
    }
  };

  // Handle emotion suggestion click with multiple emotion support
  const handleSuggestionClick = (emotion: Emotion) => {
    // Check if the emotion is already selected
    const emotionName = emotion.name.trim();
    const isAlreadySelected = currentEmotions.some(
      e => e.toLowerCase() === emotionName.toLowerCase()
    );
    
    // Don't add duplicates
    if (isAlreadySelected) return;
    
    // Add the emotion to the answer
    const newAnswer = addEmotionToList(answer, emotion.name, selectedBody);
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
            totalEmotions={emotionsList.length}
          />
        )}
      </div>
    </div>
  );
}
