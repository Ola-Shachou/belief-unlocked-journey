
export interface Question {
  id: number;
  text: string;
  type: 'text' | 'emotion' | 'scale' | 'color' | 'shape' | 'texture' | 'bodyLocation';
  placeholder?: string;
  description?: string;
  options?: string[];
}

export interface SessionData {
  id: string;
  userId: string;
  createdAt: Date;
  answers: {
    [key: number]: string | number;
  };
  summaryTitle: string;
}

export interface Emotion {
  name: string;
  description: string;
  synonyms?: string[];
}

export interface BodyLocation {
  name: string;
  description: string;
}
