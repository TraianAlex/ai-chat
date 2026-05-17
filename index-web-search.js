import OpenAI from 'openai';
import { checkEnvironment } from './utils.js';

const openai = new OpenAI({
  apiKey: process.env.AI_KEY,
  baseURL: process.env.AI_URL,
  dangerouslyAllowBrowser: true,
});

checkEnvironment();

/**
 * Web Search Preview
 *
 * The Responses API can use tools Chat Completions can't.
 * web_search_preview grounds responses in live web data.
 */

// Make a request that requires current information
const response = await openai.responses.create({
  model: process.env.AI_MODEL,
  input: 'Best coffee machines available right now under 300 euros.',
  tools: [{ type: 'web_search' }],
});

// Full output
console.log(response);

// The model's response
console.log(response.output_text);
