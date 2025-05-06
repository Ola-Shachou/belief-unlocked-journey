
import { InfoIcon } from "lucide-react";

interface FormatHintProps {
  type: string;
}

export function FormatHint({ type }: FormatHintProps) {
  return (
    <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-100 rounded-md mb-4">
      <InfoIcon className="h-5 w-5 text-blue-500 mt-0.5" />
      <div className="text-sm text-blue-700">
        <p className="font-medium">How to format your answer:</p>
        <p>Use <strong>body part: description</strong> format to be specific about each body location.</p>
        <p className="mt-1 italic text-blue-600">Example: "Throat: tight, constricted"</p>
      </div>
    </div>
  );
}
