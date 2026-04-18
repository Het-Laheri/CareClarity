import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import { resources } from '@/lib/resources-data';

const MODEL = 'llama-3.3-70b-versatile';

const SYSTEM_PROMPT = `You are CareClarity AI — a specialised assistant for caregivers of children with neurodevelopmental conditions in India.

## CORE RULES
1. ALWAYS use the search_resources tool for questions about clinical topics (meltdowns, diagnosis, IEPs, therapy, etc.).
2. Respond in the user's preferred language, but keep tool calls in standard English.
3. Use empathetic, non-judgmental language.
4. Add a medication disclaimer: "Discuss with a psychiatrist/paediatrician before making medication decisions."

## CLINICAL CONTEXT
Knowledge drawn from DSM-5, NIMHANS, IAP guidelines, and the RPWD Act 2016.
- ASD, ADHD, SPD, ID, DCD, SLD, and communication disorders.
- Evidence-based: ABA (NAT), SLT, OT (ASI), DIR/Floortime, PEERS®, Social Stories, CBT-mod.
- Navigation: NIMHANS, AIIMS, RBSK, National Trust (Niramaya), RCI registration.
- Rights: RPWD Act 2016, 25% extra time in exams, NIOS flexibility.
- AAC: Avaz (India-focused), PECS.`;


// ── Agentic Tool Definition ──────────────────────────────────────────────────

function searchResources(query: string): string {
    const q = query.toLowerCase().trim();
    const scored = resources.map(resource => {
        let score = 0;
        const searchFields = [
            resource.title.toLowerCase(),
            resource.description.toLowerCase(),
            resource.category.toLowerCase(),
            ...resource.tags.map(t => t.toLowerCase()),
        ];
        for (const field of searchFields) {
            if (field.includes(q)) score += 3;
            const qWords = q.split(' ');
            for (const word of qWords) {
                if (word.length > 3 && field.includes(word)) score += 1;
            }
        }
        return { resource, score };
    });

    const results = scored
        .filter(s => s.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 3)
        .map(s => ({
            id: s.resource.id,
            title: s.resource.title,
            category: s.resource.category,
            ageGroup: s.resource.ageGroup,
            description: s.resource.description,
            url: `/dashboard/resources/${s.resource.id}`,
        }));

    if (results.length === 0) {
        return JSON.stringify({ message: 'No matching resources found in the library for this query.' });
    }
    return JSON.stringify({ results });
}

const tools: Groq.Chat.ChatCompletionTool[] = [
    {
        type: 'function',
        function: {
            name: 'search_resources',
            description: 'Search the curated library for articles on meltdowns, communication, therapy, rights, etc.',
            parameters: {
                type: 'object',
                properties: {
                    query: {
                        type: 'string',
                        description: 'Medical or search term in English.',
                    },
                },
                required: ['query'],
            },
        },
    },
];

// ── Route Handler ────────────────────────────────────────────────────────────

export async function POST(req: Request) {
    try {
        if (!process.env.GROQ_API_KEY) {
            return NextResponse.json(
                { error: 'GROQ_API_KEY is not configured.' },
                { status: 503 }
            );
        }

        const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
        const body = await req.json();
        const { messages, language = 'English' } = body;

        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return NextResponse.json({ error: 'messages array is required.' }, { status: 400 });
        }

        const groqMessages: Groq.Chat.ChatCompletionMessageParam[] = [
            { 
                role: 'system', 
                content: `${SYSTEM_PROMPT}\n\nUSER LANGUAGE: ${language}\nRespond entirely in ${language}. Use the English resources as your source.`
            },
            ...messages.map((msg: any) => ({
                role: (msg.role === 'model' ? 'assistant' : msg.role) as any,
                content: Array.isArray(msg.content)
                    ? msg.content.map((c: any) => c.text).join('\n')
                    : msg.content,
            })),
        ];

        let loopMessages = [...groqMessages];

        for (let round = 0; round < 3; round++) {
            let response;
            try {
                response = await groq.chat.completions.create({
                    model: MODEL,
                    messages: loopMessages,
                    tools,
                    tool_choice: 'auto',
                    temperature: 0.2,
                    max_tokens: 1024,
                });
            } catch (err: any) {
                const errStr = err?.message || '';
                if (errStr.includes('tool_use_failed')) {
                    try {
                        const jsonPartStr = errStr.substring(errStr.indexOf('{'));
                        const parsedErr = JSON.parse(jsonPartStr);
                        const failedGen = parsedErr?.error?.failed_generation || '';
                        const jsonMatch = failedGen.match(/\{.*\}/s);
                        if (jsonMatch) {
                            const args = JSON.parse(jsonMatch[0]);
                            const toolResult = searchResources(args.query);
                            loopMessages.push({
                                role: 'system',
                                content: `System automatically executed search_resources. Context found: ${toolResult}`
                            });
                            continue;
                        }
                    } catch (e) {
                        // Pass through to manual retry prompt
                    }

                    if (round < 2) {
                        loopMessages.push({
                            role: 'system',
                            content: `Observation: Your tool call failed due to syntax. Output valid JSON if you use a tool.`
                        });
                        continue;
                    }
                }
                throw err;
            }

            const choice = response.choices[0];
            const assistantMessage = choice.message;
            loopMessages.push(assistantMessage as Groq.Chat.ChatCompletionMessageParam);

            if (!assistantMessage.tool_calls || assistantMessage.tool_calls.length === 0) {
                return NextResponse.json({ text: assistantMessage.content });
            }

            for (const toolCall of assistantMessage.tool_calls) {
                if (toolCall.function.name === 'search_resources') {
                    const args = JSON.parse(toolCall.function.arguments);
                    const toolResult = searchResources(args.query);

                    loopMessages.push({
                        role: 'tool',
                        tool_call_id: toolCall.id,
                        content: toolResult,
                    });
                }
            }
        }

        const finalResponse = await groq.chat.completions.create({
            model: MODEL,
            messages: loopMessages,
            temperature: 0.5,
            max_tokens: 1024,
        });

        return NextResponse.json({ text: finalResponse.choices[0].message.content });

    } catch (error: any) {
        console.error('CareClarity Chat API Error:', error);
        return NextResponse.json({ error: error?.message || 'Unknown error' }, { status: error?.status || 500 });
    }
}
