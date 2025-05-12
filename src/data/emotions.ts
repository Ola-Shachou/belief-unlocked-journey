
import { Emotion } from "./types";

// Expanded list of emotions with descriptions and synonyms
export const emotionsList: Emotion[] = [
  // Common emotions visible by default
  { name: "Happy", description: "Feeling or showing pleasure or contentment.", synonyms: ["glad", "cheerful", "delighted", "joyful", "pleased"] },
  { name: "Sad", description: "Feeling unhappy or showing sorrow.", synonyms: ["unhappy", "sorrowful", "dejected", "downcast", "blue"] },
  { name: "Angry", description: "Strong feeling of displeasure, hostility or antagonism.", synonyms: ["furious", "enraged", "outraged", "indignant", "irritated"] },
  { name: "Afraid", description: "Feeling fear or anxiety.", synonyms: ["fearful", "scared", "frightened", "terrified", "apprehensive"] },
  { name: "Anxious", description: "Feeling worry, nervousness, or unease about something.", synonyms: ["worried", "nervous", "uneasy", "apprehensive", "concerned"] },
  { name: "Confused", description: "Unable to think clearly or understand.", synonyms: ["bewildered", "puzzled", "perplexed", "baffled", "disoriented"] },
  { name: "Hurt", description: "Emotionally wounded or suffering.", synonyms: ["wounded", "pained", "injured", "distressed", "aching"] },
  { name: "Lonely", description: "Sad due to emotional or social isolation.", synonyms: ["isolated", "alone", "abandoned", "solitary", "forsaken"] },

  // Happiness emotions
  { name: "Delighted", description: "Very pleased and joyful.", synonyms: ["happy", "pleased", "joyful", "thrilled"] },
  { name: "Ebullient", description: "Overflowing with enthusiasm or excitement.", synonyms: ["exuberant", "bubbly", "enthusiastic"] },
  { name: "Ecstatic", description: "Feeling extreme, overwhelming happiness.", synonyms: ["elated", "overjoyed", "thrilled", "euphoric"] },
  { name: "Elated", description: "Joyfully excited and uplifted.", synonyms: ["overjoyed", "thrilled", "jubilant", "delighted"] },
  { name: "Energetic", description: "Full of vitality and liveliness.", synonyms: ["lively", "vigorous", "dynamic", "spirited"] },
  { name: "Enthusiastic", description: "Showing intense interest or enjoyment.", synonyms: ["eager", "keen", "passionate", "fervent"] },
  { name: "Euphoric", description: "Intensely joyful or blissful.", synonyms: ["elated", "ecstatic", "rapturous", "blissful"] },
  { name: "Excited", description: "Thrilled with anticipation or delight.", synonyms: ["thrilled", "enthusiastic", "eager", "animated"] },
  { name: "Exhilarated", description: "Energized by happiness or joy.", synonyms: ["thrilled", "elated", "stimulated", "invigorated"] },
  { name: "Overjoyed", description: "Extremely and visibly happy.", synonyms: ["ecstatic", "elated", "thrilled", "delighted"] },
  { name: "Thrilled", description: "Deeply excited and pleased.", synonyms: ["delighted", "ecstatic", "overjoyed", "elated"] },
  { name: "Vibrant", description: "Bright, full of life and excitement.", synonyms: ["radiant", "energetic", "lively", "dynamic"] },
  { name: "Cheerful", description: "Openly happy and light-hearted.", synonyms: ["happy", "joyful", "upbeat", "bright"] },
  { name: "Gleeful", description: "Full of joyful delight.", synonyms: ["joyful", "merry", "jubilant", "happy"] },
  { name: "Jovial", description: "Friendly and good-humored.", synonyms: ["cheerful", "jolly", "merry", "genial"] },
  { name: "Merry", description: "Jolly and full of fun.", synonyms: ["cheerful", "jolly", "jovial", "lighthearted"] },
  { name: "Contented", description: "Peacefully satisfied and at ease.", synonyms: ["satisfied", "pleased", "gratified", "fulfilled"] },
  { name: "Serene", description: "Calm, peaceful, and untroubled.", synonyms: ["peaceful", "calm", "tranquil", "placid"] },

  // Caring emotions
  { name: "Adoring", description: "Loving someone deeply and reverently.", synonyms: ["loving", "devoted", "fond", "doting"] },
  { name: "Compassionate", description: "Concerned for others' pain with a desire to help.", synonyms: ["empathetic", "sympathetic", "caring", "kind"] },
  { name: "Devoted", description: "Deeply loyal and committed.", synonyms: ["dedicated", "faithful", "loyal", "steadfast"] },
  { name: "Passionate", description: "Driven by strong emotions or love.", synonyms: ["ardent", "fervent", "intense", "zealous"] },
  { name: "Affectionate", description: "Expressing love openly.", synonyms: ["loving", "fond", "tender", "warm"] },
  { name: "Kind", description: "Considerate and caring in action.", synonyms: ["benevolent", "considerate", "thoughtful", "gentle"] },
  { name: "Tender", description: "Gentle and caring emotionally.", synonyms: ["soft", "gentle", "loving", "affectionate"] },
  { name: "Sympathetic", description: "Feeling and expressing concern.", synonyms: ["compassionate", "understanding", "caring", "supportive"] },

  // Depression emotions
  { name: "Depressed", description: "Deep, lasting sadness and hopelessness.", synonyms: ["dejected", "miserable", "downcast", "despondent"] },
  { name: "Dejected", description: "Downcast, dispirited, and sad.", synonyms: ["downhearted", "disheartened", "discouraged", "low"] },
  { name: "Despondent", description: "Without hope or optimism.", synonyms: ["hopeless", "desperate", "forlorn", "inconsolable"] },
  { name: "Desolate", description: "Isolated and filled with grief.", synonyms: ["abandoned", "forsaken", "deserted", "bereft"] },
  { name: "Empty", description: "Hollow and emotionally void.", synonyms: ["vacant", "hollow", "unfulfilled", "numb"] },
  { name: "Hopeless", description: "Without any expectation of improvement.", synonyms: ["despairing", "desperate", "pessimistic", "forlorn"] },
  { name: "Melancholy", description: "Deep, pensive sadness.", synonyms: ["somber", "gloomy", "wistful", "sorrowful"] },
  { name: "Miserable", description: "Very unhappy and in discomfort.", synonyms: ["wretched", "dejected", "despondent", "downcast"] },

  // Inadequacy emotions
  { name: "Inadequate", description: "Not good enough or not meeting expectations.", synonyms: ["insufficient", "deficient", "lacking", "incapable"] },
  { name: "Helpless", description: "Unable to act or protect oneself.", synonyms: ["powerless", "vulnerable", "defenseless", "weak"] },
  { name: "Inferior", description: "Feeling less than others in value or ability.", synonyms: ["lesser", "substandard", "second-rate", "unworthy"] },
  { name: "Worthless", description: "Feeling of having no value or significance.", synonyms: ["useless", "insignificant", "valueless", "unimportant"] },
  { name: "Overwhelmed", description: "Crushed or overpowered by demands or emotions.", synonyms: ["swamped", "inundated", "overloaded", "overpowered"] },
  { name: "Insecure", description: "Feeling uncertain or anxious about oneself.", synonyms: ["unsure", "self-conscious", "unconfident", "doubtful"] },

  // Fear emotions
  { name: "Terrified", description: "Extremely frightened.", synonyms: ["petrified", "horrified", "scared", "panic-stricken"] },
  { name: "Horrified", description: "Experiencing terror or disgust.", synonyms: ["appalled", "shocked", "aghast", "revolted"] },
  { name: "Panicky", description: "Overcome by sudden, irrational fear.", synonyms: ["frantic", "frenzied", "hysterical", "alarmed"] },
  { name: "Petrified", description: "Frozen in terror.", synonyms: ["terrified", "paralyzed", "stunned", "scared stiff"] },
  { name: "Nervous", description: "Tense or uneasy about an upcoming event.", synonyms: ["anxious", "apprehensive", "jittery", "edgy"] },
  { name: "Scared", description: "Afraid or frightened.", synonyms: ["frightened", "fearful", "terrified", "alarmed"] },
  { name: "Uneasy", description: "Slightly fearful or uncomfortable.", synonyms: ["worried", "anxious", "concerned", "troubled"] },

  // Confusion emotions
  { name: "Baffled", description: "Utterly confused or perplexed.", synonyms: ["puzzled", "confused", "perplexed", "mystified"] },
  { name: "Befuddled", description: "Mentally muddled or dazed.", synonyms: ["confused", "muddled", "bewildered", "perplexed"] },
  { name: "Stunned", description: "Dazed or overwhelmed by sudden input.", synonyms: ["shocked", "dazed", "astonished", "astounded"] },
  { name: "Perplexed", description: "Completely baffled or puzzled.", synonyms: ["puzzled", "confused", "bewildered", "baffled"] },
  { name: "Uncertain", description: "Unsure or hesitant.", synonyms: ["doubtful", "unsure", "indecisive", "hesitant"] },

  // Hurt emotions
  { name: "Anguished", description: "In deep pain or despair, often from loss or betrayal.", synonyms: ["distressed", "tormented", "suffering", "grief-stricken"] },
  { name: "Crushed", description: "Emotionally broken or devastated.", synonyms: ["devastated", "destroyed", "shattered", "heartbroken"] },
  { name: "Devastated", description: "Overwhelmed by grief or emotional shock.", synonyms: ["shattered", "crushed", "heartbroken", "destroyed"] },
  { name: "Rejected", description: "Turned away or dismissed, often painfully.", synonyms: ["spurned", "rebuffed", "snubbed", "shunned"] },
  { name: "Wounded", description: "Deeply emotionally injured.", synonyms: ["hurt", "injured", "pained", "damaged"] },

  // Anger emotions
  { name: "Furious", description: "Extremely angry, often visibly.", synonyms: ["enraged", "irate", "livid", "infuriated"] },
  { name: "Enraged", description: "Full of violent or uncontrollable anger.", synonyms: ["furious", "infuriated", "livid", "seething"] },
  { name: "Outraged", description: "Shocked and deeply angry, often due to injustice.", synonyms: ["incensed", "infuriated", "furious", "indignant"] },
  { name: "Irritated", description: "Bothered or impatient.", synonyms: ["annoyed", "aggravated", "exasperated", "vexed"] },
  { name: "Annoyed", description: "Mildly irritated.", synonyms: ["bothered", "irked", "peeved", "displeased"] },

  // Loneliness emotions
  { name: "Abandoned", description: "Left completely alone or emotionally deserted.", synonyms: ["deserted", "forsaken", "rejected", "stranded"] },
  { name: "Isolated", description: "Separated from meaningful contact.", synonyms: ["secluded", "cut off", "detached", "segregated"] },
  { name: "Rejected", description: "Denied acceptance or affection.", synonyms: ["spurned", "unwanted", "excluded", "dismissed"] },
  { name: "Excluded", description: "Left out or pushed away.", synonyms: ["ostracized", "shunned", "marginalized", "rejected"] },

  // Remorse emotions
  { name: "Guilty", description: "Aware of and remorseful for having committed a wrong.", synonyms: ["remorseful", "culpable", "blameworthy", "sorry"] },
  { name: "Ashamed", description: "Feeling deep guilt or embarrassment about one's actions.", synonyms: ["embarrassed", "humiliated", "mortified", "disgraced"] },
  { name: "Remorseful", description: "Deeply regretful for one's actions and their impact.", synonyms: ["regretful", "sorry", "contrite", "apologetic"] },
  { name: "Regretful", description: "Wishing one had made a different choice; feeling remorseful.", synonyms: ["sorry", "apologetic", "remorseful", "contrite"] },
  { name: "Embarrassed", description: "Feeling awkward or ashamed about one's actions.", synonyms: ["self-conscious", "uncomfortable", "mortified", "sheepish"] },
  
  // Additional important emotions from the original list
  { name: "Awe", description: "Feeling of reverential respect mixed with fear or wonder.", synonyms: ["wonder", "amazement", "astonishment", "reverence"] },
  { name: "Joy", description: "Feeling of great pleasure and happiness.", synonyms: ["delight", "happiness", "gladness", "glee", "elation"] },
  { name: "Disgust", description: "Strong feeling of revulsion or profound disapproval.", synonyms: ["revulsion", "repugnance", "abhorrence", "loathing"] },
  { name: "Interest", description: "Feeling of wanting to know or learn about something.", synonyms: ["curiosity", "inquisitiveness", "engagement", "fascination"] },
  { name: "Pride", description: "Deep pleasure derived from one's own achievements.", synonyms: ["satisfaction", "self-esteem", "dignity", "self-respect"] },
  { name: "Surprise", description: "Feeling caused by something unexpected.", synonyms: ["amazement", "astonishment", "wonder", "shock"] },
  { name: "Gratitude", description: "Feeling of appreciation or thankfulness.", synonyms: ["thankfulness", "appreciation", "gratefulness", "recognition"] },
  { name: "Jealousy", description: "Envious resentment of someone or their achievements.", synonyms: ["envy", "covetousness", "resentment", "bitterness"] },
  { name: "Shame", description: "Painful feeling of humiliation or distress caused by wrongdoing.", synonyms: ["humiliation", "embarrassment", "mortification", "disgrace"] },
  { name: "Hope", description: "Feeling of expectation and desire for something to happen.", synonyms: ["optimism", "expectation", "anticipation", "confidence"] },
  { name: "Nostalgia", description: "Sentimental longing for a period in the past.", synonyms: ["reminiscence", "sentimentality", "homesickness", "yearning"] }
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

// Get common emotions for default display
export function getCommonEmotions(limit: number = 20): Emotion[] {
  // Return the first 20 emotions from the list as common emotions
  return emotionsList.slice(0, limit);
}
