import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error('VITE_GEMINI_API_KEY is not defined in environment variables');
}

const genAI = new GoogleGenerativeAI(API_KEY);

// Rate limiting
let requestCount = 0;
let resetTime = Date.now() + 60000; // Reset every minute

const checkRateLimit = () => {
  const now = Date.now();
  if (now > resetTime) {
    requestCount = 0;
    resetTime = now + 60000;
  }
  
  if (requestCount >= 60) { // 60 requests per minute limit
    throw new Error('Rate limit exceeded. Please wait a moment before trying again.');
  }
  
  requestCount++;
};

export const searchWithGemini = async (query: string): Promise<{
  response: string;
  sources: Array<{
    title: string;
    url: string;
    snippet: string;
    domain: string;
  }>;
  followUpQuestions: string[];
}> => {
  checkRateLimit();

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    const enhancedPrompt = `
You are an AI research assistant like Perplexity AI. Please provide a comprehensive answer to the following query: "${query}"

{
      "url": "https://example.com",
      "snippet": "Brief excerpt from the source",
      "domain": "example.com"
    }
  ],
  "followUpQuestions": [
    "Follow-up question 1?",
    "Follow-up question 2?"
  ]
}

Make sure the response is informative, accurate, and cites the sources naturally within the text.
`;

    const result = await model.generateContent(enhancedPrompt);
    const response = await result.response;
    const text = response.text();

    try {
      // Try to parse as JSON first
      const parsed = JSON.parse(text);
      return {
        response: parsed.response,
        sources: parsed.sources || [],
        followUpQuestions: parsed.followUpQuestions || []
      };
    } catch {
      // Fallback if not valid JSON
      return {
        response: text,
        sources: [
          {
            title: "AI Generated Response",
            url: "https://ai.google.dev/gemini",
            snippet: "Response generated using Gemini AI",
            domain: "ai.google.dev"
          }
        ],
        followUpQuestions: [
          "Can you provide more details about this topic?",
          "What are the latest developments in this area?",
          "How does this compare to alternatives?"
        ]
      };
    }
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to get AI response');
  }
};