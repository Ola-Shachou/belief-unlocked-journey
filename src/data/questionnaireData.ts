
export interface Question {
  id: number;
  text: string;
  type: 'text' | 'emotion' | 'scale';
  placeholder?: string;
  description?: string;
}

export const questions: Question[] = [
  {
    id: 1,
    text: "What is your limiting belief? Start with 'I…'",
    type: "text",
    placeholder: "e.g., I am not good enough, I don't deserve success...",
    description: "A limiting belief is a thought or perception that you believe to be absolute truth, but which holds you back in some way."
  },
  {
    id: 2,
    text: "What specific evidence do you have that makes you believe it?",
    type: "text",
    placeholder: "e.g., I failed at my last project, I was rejected...",
    description: "Be specific about real events or experiences that support this belief."
  },
  {
    id: 3,
    text: "When you believe this thought, what emotions come up?",
    type: "emotion",
    placeholder: "e.g., shame, fear, sadness, anger...",
    description: "List all the emotions you feel when this belief is activated."
  },
  {
    id: 4,
    text: "On a scale of 1-10, how strongly do you believe this thought?",
    type: "scale",
    description: "1 means you don't believe it at all, 10 means you're completely convinced it's true."
  },
  {
    id: 5,
    text: "What would your life look like if you didn't believe this thought?",
    type: "text",
    placeholder: "e.g., I would take more risks, I would feel confident...",
    description: "Imagine how your actions, feelings, and relationships might be different."
  }
];

export interface SessionData {
  id: string;
  userId: string;
  createdAt: Date;
  answers: {
    [key: number]: string | number;
  };
  summaryTitle: string;
}

export function generateSummaryTitle(answers: {[key: number]: string | number}): string {
  // Extract the limiting belief from question 1 (shortening if needed)
  const limitingBelief = typeof answers[1] === 'string' ? answers[1] : '';
  const shortenedBelief = limitingBelief.length > 30 
    ? limitingBelief.substring(0, 30) + '...' 
    : limitingBelief;
    
  return shortenedBelief || 'Untitled Session';
}
