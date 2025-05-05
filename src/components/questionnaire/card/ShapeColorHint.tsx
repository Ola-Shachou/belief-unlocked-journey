
interface ShapeColorHintProps {
  questionType: 'shape' | 'color';
  bodyLocations: string[];
}

export function ShapeColorHint({ questionType, bodyLocations }: ShapeColorHintProps) {
  if (bodyLocations.length === 0) return null;
  
  return (
    <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-md">
      <p className="text-sm text-blue-700">
        Try to describe the {questionType === 'shape' ? 'shape' : 'color'} for each body location you identified:
        {bodyLocations.map((location, i) => (
          <span key={i} className="font-medium"> {location}{i < bodyLocations.length - 1 ? ',' : ''}</span>
        ))}
      </p>
    </div>
  );
}
