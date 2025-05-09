
import { Question } from "./types";

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
