
import { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";

interface AttributeBadgeProps {
  label: string;
  value: string;
  icon: ReactNode;
}

export function AttributeBadge({ label, value, icon }: AttributeBadgeProps) {
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
