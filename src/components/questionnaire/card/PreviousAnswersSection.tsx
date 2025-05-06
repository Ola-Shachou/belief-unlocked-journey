
import { useState } from "react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { UserIcon, HeartIcon, LayersIcon, DropletIcon, AlertCircleIcon, MapPinIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";

interface PreviousAnswersSectionProps {
  questionId: number;
  previousAnswers: {[key: number]: string | number};
}

// Helper function to parse "body part: description" format
const parseBodySpecificFormat = (text: string): { location: string, description: string }[] => {
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

// Helper functions
const getBodyLocations = (previousAnswers: {[key: number]: string | number}): string[] => {
  if (!previousAnswers[3] || typeof previousAnswers[3] !== 'string') return [];
  const parsed = parseBodySpecificFormat(previousAnswers[3] as string);
  return parsed.map(p => p.location).filter(l => l !== 'General');
};

const getLocationAttributes = (previousAnswers: {[key: number]: string | number}) => {
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

export function PreviousAnswersSection({ questionId, previousAnswers }: PreviousAnswersSectionProps) {
  const [expandedLocations, setExpandedLocations] = useState<boolean>(true);
  
  if (questionId <= 1) return null;

  const relevantPreviousQuestions = [];
  
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
  
  if (relevantPreviousQuestions.length === 0) return null;
  
  // For questions after body locations, show detailed location-based attributes
  const showDetailedAttributes = questionId > 4 && previousAnswers[3];
  const locationAttributes = showDetailedAttributes ? getLocationAttributes(previousAnswers) : [];
  
  const toggleAllLocations = () => {
    setExpandedLocations(!expandedLocations);
  };
  
  return (
    <div className="mt-4 p-4 bg-belief-lightpurple/10 rounded-lg border border-belief-lightpurple/30">
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-sm font-medium text-belief-purple flex items-center">
          <AlertCircleIcon className="h-4 w-4 mr-2" />
          Reference Information
        </h4>
        
        {showDetailedAttributes && locationAttributes.length > 1 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleAllLocations} 
            className="h-7 px-2 text-xs"
          >
            {expandedLocations ? "Collapse all" : "Expand all"}
          </Button>
        )}
      </div>

      {showDetailedAttributes && locationAttributes.length > 0 ? (
        <div className="space-y-3">
          {locationAttributes.map((attr, index) => (
            <div key={index} className="rounded-md border bg-background">
              <div className="p-3">
                <div className="flex items-center justify-between">
                  <h5 className="text-sm font-medium flex items-center">
                    <MapPinIcon className="h-3.5 w-3.5 mr-1.5 text-belief-purple" />
                    {attr.location}
                  </h5>
                </div>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {/* Show pills for each attribute with hover details */}
                  {attr.shape && (
                    <AttributeBadge 
                      label="Shape" 
                      value={attr.shape}
                      icon={<LayersIcon className="h-3 w-3" />}
                    />
                  )}
                  {attr.color && (
                    <AttributeBadge 
                      label="Color" 
                      value={attr.color}
                      icon={<DropletIcon className="h-3 w-3" />}
                    />
                  )}
                  {attr.texture && (
                    <AttributeBadge 
                      label="Texture" 
                      value={attr.texture}
                      icon={<UserIcon className="h-3 w-3" />}
                    />
                  )}
                </div>
                
                {/* Second row for additional attributes */}
                {(attr.dimension || attr.backgroundColor) && (
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {attr.dimension && (
                      <AttributeBadge 
                        label="Dimension" 
                        value={attr.dimension}
                        icon={<LayersIcon className="h-3 w-3" />}
                      />
                    )}
                    {attr.backgroundColor && (
                      <AttributeBadge 
                        label="Background" 
                        value={attr.backgroundColor}
                        icon={<DropletIcon className="h-3 w-3" />}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
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
      )}
    </div>
  );
}

// Badge component for attributes with hover details
function AttributeBadge({ 
  label, 
  value,
  icon
}: { 
  label: string; 
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Badge 
          variant="outline" 
          className={cn(
            "flex items-center gap-1 px-2 py-0.5 text-xs cursor-help",
            "hover:bg-muted whitespace-nowrap overflow-hidden"
          )}
        >
          {icon}
          <span className="truncate">{label}</span>
        </Badge>
      </HoverCardTrigger>
      <HoverCardContent className="w-64 p-3">
        <div className="text-sm">
          <div className="font-medium mb-1">{label}:</div>
          <div className="text-muted-foreground">{value}</div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
