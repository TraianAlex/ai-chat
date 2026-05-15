import OpenAI from 'openai';
import { autoResizeTextarea, checkEnvironment, setLoading } from './utils.js';
checkEnvironment();

const openai = new OpenAI({
  apiKey: process.env.AI_KEY,
  baseURL: process.env.AI_URL,
  dangerouslyAllowBrowser: true,
});

const giftForm = document.getElementById('gift-form');
const userInput = document.getElementById('user-input');
const outputContent = document.getElementById('output-content');

function start() {
  userInput.addEventListener('input', () => autoResizeTextarea(userInput));
  giftForm.addEventListener('submit', handleGiftRequest);
}

const messages = [
  {
    role: 'system',
    content: `You are the Gift Genie!
    Make your gift suggestions thoughtful and practical.
    Your response must be under 100 words. 
    Skip intros and conclusions. 
    Only output gift suggestions.`,
  },
];

async function handleGiftRequest(e) {
  e.preventDefault();

  const userPrompt = userInput.value.trim();
  if (!userPrompt) return;

  setLoading(true);

  messages.push({
    role: 'user',
    content: userPrompt,
  });

  try {
    const response = await openai.chat.completions.create({
      model: process.env.AI_MODEL,
      messages,
    });
    console.log(response);
    const responseSuggestions = response.choices[0].message.content;
    outputContent.textContent = responseSuggestions;
  } catch (error) {
    console.error(error);
    outputContent.textContent = "Sorry, I can't access what I need right now. Please try again.";
  } finally {
    setLoading(false);
  }
}

start();
