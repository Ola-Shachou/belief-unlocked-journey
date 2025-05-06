
import { Slider } from "@/components/ui/slider";

interface ScaleInputProps {
  value: number;
  onChange: (value: number) => void;
}

export function ScaleInput({ value, onChange }: ScaleInputProps) {
  return (
    <div className="space-y-6">
      <Slider
        value={[value]}
        min={0}
        max={10}
        step={1}
        onValueChange={(values) => onChange(values[0])}
      />
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>0 - None</span>
        <span>10 - Extreme</span>
      </div>
      <div className="text-center text-xl font-semibold">
        {value}
      </div>
    </div>
  );
}
