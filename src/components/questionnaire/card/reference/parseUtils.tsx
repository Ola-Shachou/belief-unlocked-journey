
import React from "react";
import { HeartIcon, UserIcon } from "lucide-react";

// Helper function to parse "body part: description" format
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
    // Simple format - treat as general
    result.push({ location: 'General', description: text.trim() });
  }
  
  return result;
};

// Helper functions for getting body locations
export const getBodyLocations = (previousAnswers: {[key: number]: string | number}): string[] => {
  if (!previousAnswers[3] || typeof previousAnswers[3] !== 'string') return [];
  const parsed = parseBodySpecificFormat(previousAnswers[3] as string);
  return parsed.map(p => p.location).filter(l => l !== 'General');
};

// Helper function to get location attributes
export const getLocationAttributes = (previousAnswers: {[key: number]: string | number}) => {
  const bodyLocations = getBodyLocations(previousAnswers);
  
  if (bodyLocations.length === 0) return [];
  
  return bodyLocations.map(location => {
    // For each location, extract its specific attributes from questions 4-8
    const shapeData = typeof previousAnswers[4] === 'string' ? 
      parseBodySpecificFormat(previousAnswers[4]) : [];
    const colorData = typeof previousAnswers[5] === 'string' ? 
      parseBodySpecificFormat(previousAnswers[5]) : [];
    const textureData = typeof previousAnswers[6] === 'string' ? 
      parseBodySpecificFormat(previousAnswers[6]) : [];
    const dimensionData = typeof previousAnswers[7] === 'string' ? 
      parseBodySpecificFormat(previousAnswers[7]) : [];
    const backgroundColorData = typeof previousAnswers[8] === 'string' ? 
      parseBodySpecificFormat(previousAnswers[8]) : [];
    
    // Find attributes specific to this location
    const shape = shapeData.find(d => d.location === location)?.description || '';
    const color = colorData.find(d => d.location === location)?.description || '';
    const texture = textureData.find(d => d.location === location)?.description || '';
    const dimension = dimensionData.find(d => d.location === location)?.description || '';
    const backgroundColor = backgroundColorData.find(d => d.location === location)?.description || '';
    
    return {
      location,
      shape,
      color,
      texture,
      dimension,
      backgroundColor
    };
  });
};

// Helper function to get relevant questions
export const getRelevantQuestions = (questionId: number, previousAnswers: {[key: number]: string | number}) => {
  const relevantPreviousQuestions: Array<{
    id: number;
    text: string;
    answer: string | number;
    icon?: React.ReactNode;
  }> = [];
  
  // Always show the main problem (question 1)
  if (questionId !== 1 && previousAnswers[1]) {
    relevantPreviousQuestions.push({
      id: 1,
      text: "Your current challenge:",
      answer: previousAnswers[1]
    });
  }
  
  // Show emotions for shape/color/texture questions
  if ((questionId >= 4 && questionId <= 8) && previousAnswers[2]) {
    relevantPreviousQuestions.push({
      id: 2,
      text: "Associated emotions:",
      answer: previousAnswers[2],
      icon: <HeartIcon className="h-3 w-3 mr-1" />
    });
  }
  
  // Show body locations for shape/color/texture questions
  if ((questionId >= 4 && questionId <= 8) && previousAnswers[3]) {
    relevantPreviousQuestions.push({
      id: 3,
      text: "Body locations:",
      answer: previousAnswers[3],
      icon: <UserIcon className="h-3 w-3 mr-1" />
    });
  }
  
  return relevantPreviousQuestions;
};
