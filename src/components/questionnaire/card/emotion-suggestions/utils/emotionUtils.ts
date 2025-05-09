
/**
 * Extract emotions from a comma-separated string
 */
export function parseEmotions(input: string): string[] {
  if (typeof input !== 'string' || !input.trim()) return [];
  // Split by commas and filter out empty items after trimming
  return input.split(',').map(e => e.trim()).filter(Boolean);
}

/**
 * Process emotion to add to existing emotions list
 */
export function addEmotionToList(
  currentAnswer: string,
  newEmotion: string,
  bodyPart: string | null = null
): string {
  if (!newEmotion.trim()) return currentAnswer;
  
  const trimmedAnswer = currentAnswer.trim();

  // If there's a body part specified
  if (bodyPart) {
    const colonIndex = trimmedAnswer.indexOf(':');
    
    if (colonIndex !== -1) {
      // Check if there's already content after the colon
      const beforeColon = trimmedAnswer.substring(0, colonIndex).trim();
      const afterColon = trimmedAnswer.substring(colonIndex + 1).trim();
      
      if (afterColon) {
        // Add to existing emotions for this body part
        return `${beforeColon}: ${afterColon}, ${newEmotion}`;
      } else {
        // First emotion after colon
        return `${beforeColon}: ${newEmotion}`;
      }
    } else {
      // No colon yet, add one with the body part
      return `${bodyPart}: ${newEmotion}`;
    }
  } else {
    // No body part, handle as simple comma-separated list
    if (!trimmedAnswer) {
      return newEmotion;
    } else {
      return `${trimmedAnswer}, ${newEmotion}`;
    }
  }
}

/**
 * Extract body part from an answer with colon format
 */
export function extractBodyPart(input: string): string | null {
  if (typeof input !== 'string') return null;
  
  const colonIndex = input.indexOf(':');
  if (colonIndex !== -1) {
    return input.substring(0, colonIndex).trim();
  }
  
  return null;
}
