import { SessionData } from "./types";

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
