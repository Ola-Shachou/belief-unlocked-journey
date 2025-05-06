
import { Button } from "@/components/ui/button";

interface CardNavigationProps {
  onNext: () => void;
  onBack?: () => void;
  isFirst: boolean;
  isLast: boolean;
  isNextDisabled: boolean;
}

export function CardNavigation({ 
  onNext, 
  onBack, 
  isFirst, 
  isLast, 
  isNextDisabled 
}: CardNavigationProps) {
  const handleBack = () => {
    if (onBack) onBack();
  };

  return (
    <div className="flex justify-between">
      <Button 
        variant="outline" 
        onClick={handleBack} 
        disabled={isFirst}
      >
        Back
      </Button>
      <Button 
        onClick={onNext} 
        disabled={isNextDisabled}
      >
        {isLast ? "Complete" : "Next"}
      </Button>
    </div>
  );
}
