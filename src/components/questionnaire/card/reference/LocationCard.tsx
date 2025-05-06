
import { MapPinIcon } from "lucide-react";
import { LocationAttributes } from "./LocationAttributes";

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
        <LocationAttributes attribute={attribute} />
      </div>
    </div>
  );
}
