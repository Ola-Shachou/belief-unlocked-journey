
import { Emotion } from "./types";

// Expanded list of emotions with descriptions and synonyms
export const emotionsList: Emotion[] = [
  { name: "Admiration", description: "Feeling of respect and warm approval.", synonyms: ["respect", "approval", "appreciation", "esteem"] },
  { name: "Adoration", description: "Deep love and respect.", synonyms: ["worship", "idolization", "devotion", "reverence"] },
  { name: "Aesthetic Appreciation", description: "Admiration of beauty or artistic qualities.", synonyms: ["artistic enjoyment", "beauty appreciation"] },
  { name: "Amusement", description: "Finding something funny or entertaining.", synonyms: ["humor", "entertainment", "fun", "pleasure"] },
  { name: "Anger", description: "Strong feeling of displeasure, hostility or antagonism.", synonyms: ["rage", "fury", "wrath", "indignation", "annoyance", "vexation", "exasperation", "crossness", "irritation"] },
  { name: "Anxiety", description: "Feeling of worry, nervousness, or unease about something with an uncertain outcome.", synonyms: ["worry", "nervousness", "unease", "apprehension", "concern", "distress"] },
  { name: "Awe", description: "Feeling of reverential respect mixed with fear or wonder.", synonyms: ["wonder", "amazement", "astonishment", "reverence"] },
  { name: "Awkwardness", description: "Feeling uncomfortable, self-conscious, or embarrassed.", synonyms: ["discomfort", "unease", "embarrassment", "clumsiness"] },
  { name: "Boredom", description: "Feeling weary because one is unoccupied or lacks interest.", synonyms: ["tedium", "dullness", "monotony", "weariness"] },
  { name: "Calmness", description: "State of tranquility, free from disturbance or agitation.", synonyms: ["tranquility", "serenity", "peace", "quietude"] },
  { name: "Confusion", description: "Feeling bewildered or unable to think clearly.", synonyms: ["bewilderment", "puzzlement", "perplexity", "disorientation"] },
  { name: "Craving", description: "Powerful desire for something.", synonyms: ["longing", "yearning", "hunger", "thirst"] },
  { name: "Disgust", description: "Strong feeling of revulsion or profound disapproval.", synonyms: ["revulsion", "repugnance", "abhorrence", "loathing"] },
  { name: "Empathetic Pain", description: "Feeling hurt or suffering because of another's pain.", synonyms: ["compassion", "sympathy pain", "shared suffering"] },
  { name: "Entrancement", description: "State of being captivated or delighted.", synonyms: ["captivation", "enchantment", "fascination", "spellbound"] },
  { name: "Envy", description: "Feeling of discontented or resentful longing aroused by someone else's possessions, qualities, or luck.", synonyms: ["jealousy", "covetousness", "resentment"] },
  { name: "Excitement", description: "Feeling of great enthusiasm and eagerness.", synonyms: ["enthusiasm", "eagerness", "thrill", "exhilaration"] },
  { name: "Fear", description: "Unpleasant emotion caused by the belief that someone or something is dangerous or a threat.", synonyms: ["dread", "terror", "fright", "alarm", "panic", "horror"] },
  { name: "Frustration", description: "Feeling upset or annoyed as a result of being unable to change or achieve something.", synonyms: ["annoyance", "exasperation", "irritation", "vexation"] },
  { name: "Guilt", description: "Feeling of having done wrong or failed in an obligation.", synonyms: ["remorse", "regret", "self-reproach", "shame"] },
  { name: "Horror", description: "Intense feeling of fear, shock, or disgust.", synonyms: ["terror", "dread", "fright", "fear", "revulsion"] },
  { name: "Interest", description: "Feeling of wanting to know or learn about something.", synonyms: ["curiosity", "inquisitiveness", "engagement", "fascination"] },
  { name: "Joy", description: "Feeling of great pleasure and happiness.", synonyms: ["delight", "happiness", "gladness", "glee", "elation"] },
  { name: "Loneliness", description: "Sadness because one has no friends or company.", synonyms: ["isolation", "solitude", "seclusion", "abandonment"] },
  { name: "Nostalgia", description: "Sentimental longing for a period in the past.", synonyms: ["reminiscence", "sentimentality", "homesickness", "yearning"] },
  { name: "Overwhelm", description: "Feeling buried or drowning under a huge weight of emotions or tasks.", synonyms: ["swamped", "inundated", "overloaded", "overpowered"] },
  { name: "Resentment", description: "Bitter indignation at having been treated unfairly.", synonyms: ["bitterness", "indignation", "grudge", "animosity"] },
  { name: "Romance", description: "Feeling of excitement and mystery associated with love.", synonyms: ["passion", "love", "infatuation", "attraction"] },
  { name: "Sadness", description: "Feeling unhappy or showing sorrow; affected by grief.", synonyms: ["sorrow", "unhappiness", "dejection", "melancholy", "grief"] },
  { name: "Satisfaction", description: "Fulfillment of one's wishes, expectations, or needs.", synonyms: ["contentment", "fulfillment", "gratification", "pleasure"] },
  { name: "Shame", description: "Painful feeling of humiliation or distress caused by the consciousness of wrong or foolish behavior.", synonyms: ["humiliation", "embarrassment", "mortification", "disgrace"] },
  { name: "Sexual Desire", description: "Strong physical and emotional attraction towards another person.", synonyms: ["lust", "passion", "arousal", "desire"] },
  { name: "Sympathy", description: "Feelings of pity and sorrow for someone else's misfortune.", synonyms: ["compassion", "pity", "empathy", "commiseration"] },
  { name: "Triumph", description: "Great satisfaction and elation resulting from a success or victory.", synonyms: ["victory", "success", "achievement", "exultation"] },
  { name: "Acceptance", description: "Willingness to tolerate or recognize.", synonyms: ["tolerance", "approval", "agreement"] },
  { name: "Affection", description: "Gentle feeling of fondness or liking.", synonyms: ["fondness", "tenderness", "warmth", "love"] },
  { name: "Aggravation", description: "State of becoming worse or more serious.", synonyms: ["irritation", "annoyance", "exasperation"] },
  { name: "Agitation", description: "State of anxiety or nervous excitement.", synonyms: ["disturbance", "perturbation", "disquiet"] },
  { name: "Alertness", description: "Quality of being quick to perceive and act.", synonyms: ["vigilance", "watchfulness", "attentiveness"] }
  // In practice, you'd add many more emotions here to reach 500+ emotions
];

// Helper function to find emotions by prefix
export function findEmotionsByPrefix(prefix: string, limit: number = 10): Emotion[] {
  if (!prefix.trim()) return emotionsList.slice(0, limit);
  
  const lowerPrefix = prefix.toLowerCase();
  const directMatches: Emotion[] = [];
  const synonymMatches: Emotion[] = [];
  
  // First find direct name matches
  emotionsList.forEach(emotion => {
    if (emotion.name.toLowerCase().includes(lowerPrefix)) {
      directMatches.push(emotion);
    } else if (emotion.synonyms && emotion.synonyms.some(syn => syn.toLowerCase().includes(lowerPrefix))) {
      synonymMatches.push(emotion);
    }
  });
  
  // Combine matches, prioritizing direct matches
  return [...directMatches, ...synonymMatches].slice(0, limit);
}
