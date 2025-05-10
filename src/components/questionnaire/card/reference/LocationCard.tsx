
import { MapPinIcon } from "lucide-react";
import { AttributeBadge } from "./AttributeBadge";
import { LayersIcon, DropletIcon, UserIcon } from "lucide-react";

interface AttributeData {
  location: string;
  shape: string;
  color: string;
  texture: string;
  dimension: string;
  backgroundColor: string;
}

interface LocationCardProps {
  attribute: AttributeData;
}

export function LocationCard({ attribute }: LocationCardProps) {
  return (
    <div className="rounded-md border bg-background">
      <div className="p-3">
        <div className="flex items-center justify-between">
          <h5 className="text-sm font-medium flex items-center">
            <MapPinIcon className="h-3.5 w-3.5 mr-1.5 text-belief-purple" />
            {attribute.location}
          </h5>
        </div>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {/* Show pills for each attribute with hover details */}
          {attribute.shape && (
            <AttributeBadge 
              label="Shape" 
              value={attribute.shape}
              icon={<LayersIcon className="h-3 w-3" />}
            />
          )}
          {attribute.color && (
            <AttributeBadge 
              label="Color" 
              value={attribute.color}
              icon={<DropletIcon className="h-3 w-3" />}
            />
          )}
          {attribute.texture && (
            <AttributeBadge 
              label="Texture" 
              value={attribute.texture}
              icon={<UserIcon className="h-3 w-3" />}
            />
          )}
        </div>
        
        {/* Second row for additional attributes */}
        {(attribute.dimension || attribute.backgroundColor) && (
          <div className="mt-2 grid grid-cols-3 gap-2">
            {attribute.dimension && (
              <AttributeBadge 
                label="Dimension" 
                value={attribute.dimension}
                icon={<LayersIcon className="h-3 w-3" />}
              />
            )}
            {attribute.backgroundColor && (
              <AttributeBadge 
                label="Background" 
                value={attribute.backgroundColor}
                icon={<DropletIcon className="h-3 w-3" />}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
