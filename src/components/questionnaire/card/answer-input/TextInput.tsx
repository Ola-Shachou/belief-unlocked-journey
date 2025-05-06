
import { Textarea } from "@/components/ui/textarea";

interface TextInputProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

export function TextInput({ placeholder, value, onChange }: TextInputProps) {
  return (
    <Textarea
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="min-h-[100px]"
    />
  );
}
