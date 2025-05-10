
// Helper function to check if a text input might be an emotion
export const mightBeEmotion = (text: string): boolean => {
  if (!text || typeof text !== 'string') return false;
  
  // Common emotions for basic validation
  const commonEmotions = [
    'happy', 'sad', 'angry', 'afraid', 'scared', 'anxious', 'joy', 'fear',
    'disgust', 'surprise', 'trust', 'anticipation', 'love', 'hate',
    'grief', 'guilt', 'shame', 'envy', 'jealousy', 'hope', 'despair',
    'content', 'frustrated', 'excited', 'bored', 'confused', 'proud',
    'lonely', 'grateful', 'nostalgic', 'relieved', 'stressed'
  ];
  
  const lowerText = text.toLowerCase();
  
  // Check for common emotions
  for (const emotion of commonEmotions) {
    if (lowerText.includes(emotion)) {
      return true;
    }
  }
  
  // If the text is very short (1-2 words), it's more likely an emotion
  const words = lowerText.split(/\s+/).filter(Boolean);
  if (words.length <= 2 && words[0].length > 2) {
    return true;
  }
  
  return false;
};

// Parse "body part: description" format from text
export const parseBodySpecificFormat = (text: string): { location: string, description: string }[] => {
  if (!text || typeof text !== 'string') return [];
  
  // Split by commas outside of "location: description" pairs
  const result: { location: string, description: string }[] = [];
  
  // Check if the format includes colons
  if (text.includes(':')) {
    // Complex parsing for "location: description" format
    const lines = text.split('\n');
    
    for (const line of lines) {
      const colonIndex = line.indexOf(':');
      
      if (colonIndex !== -1) {
        const location = line.substring(0, colonIndex).trim();
        const description = line.substring(colonIndex + 1).trim();
        
        if (location && description) {
          result.push({ location, description });
        } else if (location) {
          // Handle case where there's a location with no description yet
          result.push({ location, description: '' });
        }
      } else if (line.trim()) {
        // Line without colon - treat as a general description
        result.push({ location: 'General', description: line.trim() });
      }
    }
    
    // If nothing was parsed properly but there was text, add as general
    if (result.length === 0 && text.trim()) {
      result.push({ location: 'General', description: text.trim() });
    }
  } else {
    // Simple format - treat as general description
    const parts = text.split(',').map(part => part.trim()).filter(Boolean);
    if (parts.length > 0) {
      // Each comma-separated value is treated as a separate body location
      parts.forEach(part => {
        result.push({ location: part, description: '' });
      });
    } else if (text.trim()) {
      result.push({ location: text.trim(), description: '' });
    }
  }
  
  return result;
};

// Extract body locations from previous answers
export const getBodyLocations = (previousAnswers: {[key: number]: string | number}): string[] => {
  if (!previousAnswers[3] || typeof previousAnswers[3] !== 'string') return [];
  const locationText = previousAnswers[3] as string;
  
  // If the answer has colons, parse it as structured data
  if (locationText.includes(':')) {
    const parsed = parseBodySpecificFormat(locationText);
    return parsed.map(p => p.location).filter(l => l !== 'General');
  } else {
    // Otherwise, treat comma-separated values as body locations
    return locationText.split(',').map(loc => loc.trim()).filter(Boolean);
  }
};

// Process question text with previous answers
export const processQuestionText = (questionId: number, text: string, previousAnswers: {[key: number]: string | number}): string => {
  // Simple template replacement using previous answers
  let processedText = text;
  
  // Replace placeholders like {previous:1} with the answer to question 1
  const placeholderRegex = /\{previous:(\d+)\}/g;
  processedText = processedText.replace(placeholderRegex, (match, questionNum) => {
    const num = parseInt(questionNum, 10);
    if (previousAnswers[num] !== undefined) {
      return String(previousAnswers[num]);
    }
    return match; // Keep the placeholder if no answer found
  });
  
  return processedText;
};
