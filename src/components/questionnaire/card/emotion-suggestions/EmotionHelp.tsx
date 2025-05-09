
import { InfoIcon } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function EmotionHelp() {
  return (
    <Alert className="bg-yellow-50 border-yellow-200">
      <InfoIcon className="h-4 w-4 text-yellow-800" />
      <AlertDescription className="text-yellow-700">
        <p className="font-medium text-yellow-800 mb-1">
          What you've entered doesn't seem to be an emotion.
        </p>
        <p>
          Try thinking about how this situation makes you feel inside. Some common emotions are: fear, anger, sadness, joy, disgust, surprise, etc.
        </p>
        <p className="mt-2 text-sm">
          <strong>Tip:</strong> Use format "body part: emotion" (e.g., "chest: anxiety, fear") to specify emotions for specific body locations.
        </p>
      </AlertDescription>
    </Alert>
  );
}
