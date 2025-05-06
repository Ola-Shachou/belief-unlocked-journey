
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LocationCard } from "./LocationCard";

interface AttributeData {
  location: string;
  shape: string;
  color: string;
  texture: string;
  dimension: string;
  backgroundColor: string;
}

interface LocationsPanelProps {
  locationAttributes: AttributeData[];
}

export function LocationsPanel({ locationAttributes }: LocationsPanelProps) {
  const [expandedLocations, setExpandedLocations] = useState<boolean>(true);
  
  const toggleAllLocations = () => {
    setExpandedLocations(!expandedLocations);
  };

  return (
    <div>
      {locationAttributes.length > 1 && (
        <div className="flex justify-end mb-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleAllLocations} 
            className="h-7 px-2 text-xs"
          >
            {expandedLocations ? "Collapse all" : "Expand all"}
          </Button>
        </div>
      )}

      <div className="space-y-3">
        {locationAttributes.map((attr, index) => (
          <LocationCard key={index} attribute={attr} />
        ))}
      </div>
    </div>
  );
}
