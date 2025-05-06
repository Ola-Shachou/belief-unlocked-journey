
import { LayersIcon, DropletIcon, UserIcon } from "lucide-react";
import { AttributeBadge } from "./AttributeBadge";

interface AttributeData {
  location: string;
  shape: string;
  color: string;
  texture: string;
  dimension: string;
  backgroundColor: string;
}

interface LocationAttributesProps {
  attribute: AttributeData;
}

export function LocationAttributes({ attribute }: LocationAttributesProps) {
  return (
    <div>
      <div className="mt-2 grid grid-cols-3 gap-2">
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
  );
}
