import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Gemini API Key is not configured in .env.local' },
        { status: 500 }
      );
    }

    const { message } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Use Gemini 1.5 Flash for fast, conversational responses
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Provide a system prompt for the emergency responder persona
    const prompt = `You are LifeBridge AI, an expert emergency response assistant built for India. 
Your goal is to provide calm, clear, and actionable advice to people during natural disasters (floods, cyclones, earthquakes) or medical emergencies.
Keep responses concise, easy to read, and avoid unnecessary jargon. Prioritize safety and immediate action.
Always provide relevant Indian emergency numbers if applicable: 112 (National Emergency), 100 (Police), 101 (Fire), 102/108 (Ambulance), 1078 (Disaster Management/NDRF).
You can understand and respond in Indian languages if the user asks.
User Message: ${message}`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    return NextResponse.json({ reply: responseText });
  } catch (error) {
    console.error('Error generating AI response:', error);
    return NextResponse.json(
      { error: 'Failed to generate response. Please try again later.' },
      { status: 500 }
    );
  }
}
