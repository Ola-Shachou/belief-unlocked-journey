
export interface Question {
  id: number;
  text: string;
  type: 'text' | 'emotion' | 'scale' | 'color' | 'shape' | 'texture' | 'bodyLocation';
  placeholder?: string;
  description?: string;
  options?: string[];
}

export const questions: Question[] = [
  {
    id: 1,
    text: "What is currently causing you pain or difficulty in any area of your life?",
    type: "text",
    placeholder: "Describe what's troubling you...",
    description: "Be as specific as possible about the situation or thought that's creating difficulty for you."
  },
  {
    id: 2,
    text: "What negative emotions are associated with this?",
    type: "emotion",
    placeholder: "e.g., shame, fear, sadness, anger...",
    description: "List all the emotions you feel when thinking about your previous answer. Click on suggestions below for ideas."
  },
  {
    id: 3,
    text: "Where do you physically experience these emotions in your body?",
    type: "bodyLocation",
    placeholder: "e.g., chest tightness, stomach knots, shoulder tension...",
    description: "Notice where in your body you feel sensations when these emotions arise. You can list multiple locations."
  },
  {
    id: 4,
    text: "Please describe the shape or form of 'it'.",
    type: "shape",
    placeholder: "e.g., spiral, knot, cloud, sharp edges...",
    description: "For each body location you identified, describe what shape or form your difficulty takes there."
  },
  {
    id: 5,
    text: "What color(s) is it?",
    type: "color",
    placeholder: "e.g., dark blue, fiery red, murky green...",
    description: "For each shape you described, what colors do you associate with it?"
  },
  {
    id: 6,
    text: "What texture(s) can you see or feel when you think about it?",
    type: "texture",
    placeholder: "e.g., rough, sticky, sharp, heavy...",
    description: "How would the shapes you described feel if you could touch them? Consider each location separately."
  },
  {
    id: 7,
    text: "Is it two or three-dimensional? Describe its shape in more detail.",
    type: "text",
    placeholder: "e.g., flat like a shadow, has depth like a sculpture...",
    description: "Feel free to be as detailed as you want, there are no wrong answers."
  },
  {
    id: 8,
    text: "What is the color(s) in the background?",
    type: "color",
    placeholder: "e.g., white space, gradient of colors, darkness...",
    description: "What colors surround or are behind your difficulty?"
  },
  {
    id: 9,
    text: "On a scale of 0-10, what is the intensity of emotion(s)?",
    type: "scale",
    description: "0 means no intensity at all, 10 means extremely intense."
  },
  {
    id: 10,
    text: "Think of your earliest memory of experiencing this. When was it?",
    type: "text",
    placeholder: "e.g., childhood, teenage years, a specific event...",
    description: "If you can't recall, could this be something passed down through your family?"
  },
  {
    id: 11,
    text: "Give a title to this memory or experience.",
    type: "text",
    placeholder: "e.g., The Rejection, Invisible Child, The Breaking Point...",
    description: "Create a title that captures the most intense moment or feeling."
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

// Expanded list of emotions with descriptions
export const emotionsList = [
  { name: "Admiration", description: "Feeling of respect and warm approval." },
  { name: "Adoration", description: "Deep love and respect." },
  { name: "Aesthetic Appreciation", description: "Admiration of beauty or artistic qualities." },
  { name: "Amusement", description: "Finding something funny or entertaining." },
  { name: "Anger", description: "Strong feeling of displeasure, hostility or antagonism." },
  { name: "Anxiety", description: "Feeling of worry, nervousness, or unease about something with an uncertain outcome." },
  { name: "Awe", description: "Feeling of reverential respect mixed with fear or wonder." },
  { name: "Awkwardness", description: "Feeling uncomfortable, self-conscious, or embarrassed." },
  { name: "Boredom", description: "Feeling weary because one is unoccupied or lacks interest." },
  { name: "Calmness", description: "State of tranquility, free from disturbance or agitation." },
  { name: "Confusion", description: "Feeling bewildered or unable to think clearly." },
  { name: "Craving", description: "Powerful desire for something." },
  { name: "Disgust", description: "Strong feeling of revulsion or profound disapproval." },
  { name: "Empathetic Pain", description: "Feeling hurt or suffering because of another's pain." },
  { name: "Entrancement", description: "State of being captivated or delighted." },
  { name: "Envy", description: "Feeling of discontented or resentful longing aroused by someone else's possessions, qualities, or luck." },
  { name: "Excitement", description: "Feeling of great enthusiasm and eagerness." },
  { name: "Fear", description: "Unpleasant emotion caused by the belief that someone or something is dangerous or a threat." },
  { name: "Frustration", description: "Feeling upset or annoyed as a result of being unable to change or achieve something." },
  { name: "Guilt", description: "Feeling of having done wrong or failed in an obligation." },
  { name: "Horror", description: "Intense feeling of fear, shock, or disgust." },
  { name: "Interest", description: "Feeling of wanting to know or learn about something." },
  { name: "Joy", description: "Feeling of great pleasure and happiness." },
  { name: "Loneliness", description: "Sadness because one has no friends or company." },
  { name: "Nostalgia", description: "Sentimental longing for a period in the past." },
  { name: "Overwhelm", description: "Feeling buried or drowning under a huge weight of emotions or tasks." },
  { name: "Resentment", description: "Bitter indignation at having been treated unfairly." },
  { name: "Romance", description: "Feeling of excitement and mystery associated with love." },
  { name: "Sadness", description: "Feeling unhappy or showing sorrow; affected by grief." },
  { name: "Satisfaction", description: "Fulfillment of one's wishes, expectations, or needs." },
  { name: "Shame", description: "Painful feeling of humiliation or distress caused by the consciousness of wrong or foolish behavior." },
  { name: "Sexual Desire", description: "Strong physical and emotional attraction towards another person." },
  { name: "Sympathy", description: "Feelings of pity and sorrow for someone else's misfortune." },
  { name: "Triumph", description: "Great satisfaction and elation resulting from a success or victory." }
];

// Extended body location suggestions with more detail
export const bodyLocationsList = [
  { name: "Chest/Heart area", description: "Center of emotional feelings, often associated with love, grief, or anxiety" },
  { name: "Stomach/Gut", description: "Often referred to as our 'second brain', associated with intuition and basic emotions" },
  { name: "Throat", description: "Related to expression, communication, and speaking your truth" },
  { name: "Head/Temples", description: "Associated with thoughts, beliefs, and overthinking" },
  { name: "Shoulders/Upper back", description: "Common place to hold stress, responsibility, and burden" },
  { name: "Jaw/Face", description: "Often holds tension related to unexpressed words or emotions" },
  { name: "Hands", description: "Connected to our ability to create, give, and receive" },
  { name: "Legs", description: "Related to support, movement forward, and stability" },
  { name: "Around the body", description: "Energy or sensation felt outside the physical body" },
  { name: "Lower back", description: "Often associated with feeling unsupported or financial stress" },
  { name: "Neck", description: "Flexibility, stubbornness, or resistance to change" },
  { name: "Eyes", description: "Related to how we see ourselves and the world" },
  { name: "Entire body", description: "Full-body sensations that cannot be localized" }
];

export function generateSummaryTitle(answers: {[key: number]: string | number}): string {
  // If there's an answer to question 11 (title), use that
  if (answers[11] && typeof answers[11] === 'string') {
    return answers[11];
  }
  
  // Otherwise, extract from question 1 (the difficulty/pain)
  const difficulty = typeof answers[1] === 'string' ? answers[1] : '';
  const shortenedDifficulty = difficulty.length > 30 
    ? difficulty.substring(0, 30) + '...' 
    : difficulty;
    
  return shortenedDifficulty || 'Untitled Session';
}
