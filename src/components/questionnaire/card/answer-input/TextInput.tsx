
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

interface TextInputProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function TextInput({ placeholder, value, onChange, className }: TextInputProps) {
  // For questions 5 and 6, we need to support location: shape: color: texture format
  const [isStructuredFormat, setIsStructuredFormat] = useState(false);

  // Check if the value looks like a structured format (has multiple lines with colons)
  useEffect(() => {
    const hasMultipleLines = value.includes('\n');
    const hasColons = value.includes(':');
    setIsStructuredFormat(hasMultipleLines && hasColons);
  }, [value]);

  // Determine appropriate height based on content
  const getTextareaHeight = () => {
    if (!value) return "min-h-[100px]";
    
    // Count number of lines
    const lineCount = (value.match(/\n/g) || []).length + 1;
    
    // Increase height for more lines
    if (lineCount > 5) return "min-h-[200px]";
    if (lineCount > 3) return "min-h-[150px]";
    return "min-h-[100px]";
  };

  return (
    <Textarea
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        getTextareaHeight(), 
        isStructuredFormat ? "font-mono text-sm" : "",
        className
      )}
    />
  );
}
