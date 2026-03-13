import { NextResponse } from 'next/server';
import { ai } from '@/ai/genkit';
import { z } from 'zod';

const ChatInputSchema = z.object({
    messages: z.array(
        z.object({
            role: z.enum(['user', 'model', 'system']),
            content: z.array(
                z.object({
                    text: z.string(),
                })
            ),
        })
    ),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { messages } = ChatInputSchema.parse(body);

        // Filter out system messages or reshape them for Genkit if needed, 
        // depending on the exact Genkit version schema.
        const history = messages.slice(0, -1).map(msg => ({
            role: msg.role === 'model' ? 'model' : 'user', // Ensure strict types
            content: msg.content,
        }));

        const latestMessage = messages[messages.length - 1].content[0].text;

        const chat = ai.chat({
            system: "You are CareClarity AI, a helpful and empathetic assistant for caregivers of children with neurodevelopmental conditions like Autism. Provide practical, evidence-based, and compassionate advice.",
            messages: history as any, // Cast to any to bypass strict internal Genkit schema checks if versions mismatched
        });

        const response = await chat.send({ prompt: latestMessage });

        return NextResponse.json({ text: response.text });
    } catch (error) {
        console.error('Chat API Error:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Unknown error occurred' },
            { status: 500 }
        );
    }
}
