
import { useState, useEffect } from "react";
import { TextInput } from "./TextInput";
import { ScrollArea } from "@/components/ui/scroll-area";
import { parseBodySpecificFormat } from "../reference/parseUtils";

interface LocationData {
  location: string;
  shape: string;
  color: string;
  texture: string;
}

interface StructuredLocationInputProps {
  value: string;
  onChange: (value: string) => void;
  locationNames: string[];
  previousShapes: {[location: string]: string};
  previousColors: {[location: string]: string};
  currentQuestionId: number;
}

export function StructuredLocationInput({ 
  value, 
  onChange, 
  locationNames, 
  previousShapes,
  previousColors,
  currentQuestionId
}: StructuredLocationInputProps) {
  const [locations, setLocations] = useState<LocationData[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Parse the current value into structured locations
  useEffect(() => {
    if (!value) {
      // Initialize with empty locations
      const initialLocations = locationNames.map(location => ({
        location,
        shape: previousShapes[location] || '',
        color: previousColors[location] || '',
        texture: ''
      }));
      setLocations(initialLocations);
      
      // Generate initial formatted string
      const formatted = initialLocations.map(loc => {
        const shape = loc.shape ? `${loc.shape}` : '';
        const color = loc.color ? `${loc.color}` : '';
        
        if (currentQuestionId === 5) {
          return `${loc.location}: ${shape ? shape + ': ' : ''}${color ? color + ':' : ''}`;
        } else if (currentQuestionId === 6) {
          return `${loc.location}: ${shape ? shape + ': ' : ''}${color ? color + ': ' : ''}${loc.texture ? loc.texture : ''}`;
        }
        return `${loc.location}: `;
      }).join('\n');
      
      onChange(formatted);
    } else {
      // Parse existing value
      const parsed = parseBodySpecificFormat(value);
      const updatedLocations: LocationData[] = [];
      
      locationNames.forEach(location => {
        const parsedEntry = parsed.find(p => p.location === location);
        const description = parsedEntry?.description || '';
        
        // Split description by colons for shape, color, texture
        const parts = description.split(':').map(p => p.trim());
        
        updatedLocations.push({
          location,
          shape: parts[0] || previousShapes[location] || '',
          color: parts[1] || previousColors[location] || '',
          texture: parts[2] || ''
        });
      });
      
      setLocations(updatedLocations);
    }
  }, [locationNames, previousShapes, previousColors]);

  // Update the value when individual location data changes
  const handleLocationChange = (index: number, field: keyof LocationData, fieldValue: string) => {
    const updatedLocations = [...locations];
    updatedLocations[index] = { ...updatedLocations[index], [field]: fieldValue };
    setLocations(updatedLocations);
    
    // Update the combined text value
    const formatted = updatedLocations.map(loc => {
      const shape = loc.shape ? `${loc.shape}` : '';
      const color = loc.color ? `${loc.color}` : '';
      const texture = loc.texture ? `${loc.texture}` : '';
      
      if (currentQuestionId === 5) {
        return `${loc.location}: ${shape ? shape + ': ' : ''}${color ? color + ':' : ''}`;
      } else if (currentQuestionId === 6) {
        return `${loc.location}: ${shape ? shape + ': ' : ''}${color ? color + ': ' : ''}${texture}`;
      }
      return `${loc.location}: `;
    }).join('\n');
    
    onChange(formatted);
  };

  // Helper function to format placeholder text based on questionId
  const getPlaceholder = (index: number) => {
    const loc = locations[index];
    
    if (currentQuestionId === 5) {
      return `Add color for ${loc.location}${loc.shape ? ' (' + loc.shape + ')' : ''}`;
    } else if (currentQuestionId === 6) {
      return `Add texture for ${loc.location}${loc.shape ? ' (' + loc.shape + ')' : ''}${loc.color ? ' (' + loc.color + ')' : ''}`;
    }
    
    return `Describe ${loc.location}`;
  };

  return (
    <div className="space-y-4">
      <ScrollArea className="h-[240px] pr-4">
        <div className="space-y-3">
          {locations.map((loc, index) => (
            <div 
              key={index} 
              className={`p-3 border rounded-md ${index === activeIndex ? 'border-belief-purple bg-belief-lightpurple/10' : 'border-gray-200'}`}
              onClick={() => setActiveIndex(index)}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-sm text-belief-purple">{loc.location}</span>
              </div>
              
              <TextInput 
                placeholder={getPlaceholder(index)}
                value={currentQuestionId === 5 ? loc.color : loc.texture}
                onChange={(val) => {
                  handleLocationChange(index, 
                    currentQuestionId === 5 ? 'color' : 'texture', 
                    val
                  );
                }}
                className="min-h-[60px]"
              />
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
