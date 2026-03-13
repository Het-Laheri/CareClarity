'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Terminal, Sparkles, Send } from 'lucide-react';
import { Logo } from '@/components/logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Feedback } from '@/components/feedback';

export default function ChatBot() {
    const [messages, setMessages] = useState<Array<{ role: 'user' | 'model'; text: string }>>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const chatContainerRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!inputValue.trim() || isLoading) return;

        const query = inputValue.trim();
        setInputValue('');
        setError(null);
        setIsLoading(true);

        const newMessages = [...messages, { role: 'user' as const, text: query }];
        setMessages(newMessages);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: newMessages.map(m => ({
                        role: m.role,
                        content: [{ text: m.text }]
                    }))
                }),
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error || 'Failed to fetch response');
            }

            const data = await response.json();
            setMessages([...newMessages, { role: 'model', text: data.text }]);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePromptClick = (prompt: string) => {
        setInputValue(prompt);
        // Use a timeout to ensure state update before submission
        setTimeout(() => {
            if (textareaRef.current) {
                textareaRef.current.dispatchEvent(
                    new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })
                );
            }
        }, 50);
    };

    const suggestions = [
        "How can I help my non-verbal child express their needs?",
        "What are some strategies for managing sensory overload in public places?",
        "Suggest some simple social skill activities for a 5-year-old.",
    ];

    return (
        <div className="flex flex-col h-full max-w-4xl mx-auto w-full border-x bg-background/50 shadow-sm">
            <div className="border-b p-4 flex items-center justify-between bg-card text-card-foreground">
                <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <h2 className="font-semibold text-lg">CareClarity AI Assistant</h2>
                </div>
            </div>

            <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
                {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center py-20">
                        <Logo />
                        <h1 className="mt-8 font-headline text-3xl font-bold tracking-tight">How can I help today?</h1>
                        <div className="mt-12 w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                            {suggestions.map((prompt) => (
                                <Card
                                    key={prompt}
                                    className="p-4 hover:bg-accent transition-colors cursor-pointer border-muted"
                                    onClick={() => {
                                        setInputValue(prompt);
                                        setTimeout(() => handleSubmit(), 50);
                                    }}>
                                    <p className="text-sm font-medium">{prompt}</p>
                                </Card>
                            ))}
                        </div>
                    </div>
                ) : (
                    messages.map((msg, i) => (
                        <div key={i} className={`flex items-start gap-4 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                            {msg.role === 'model' && (
                                <Avatar className="h-9 w-9 border hidden sm:flex">
                                    <div className="flex h-full w-full items-center justify-center rounded-full bg-primary/10 text-primary">
                                        <Sparkles className="h-5 w-5" />
                                    </div>
                                </Avatar>
                            )}

                            <div className={`flex-1 max-w-[85%] rounded-2xl p-4 ${msg.role === 'user' ? 'bg-primary text-primary-foreground ml-auto rounded-tr-sm' : 'bg-muted text-foreground rounded-tl-sm'}`}>
                                <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                            </div>

                            {msg.role === 'user' && (
                                <Avatar className="h-9 w-9 border hidden sm:flex">
                                    <AvatarImage src="https://picsum.photos/seed/user/200/200" alt="@user" />
                                    <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                            )}
                        </div>
                    ))
                )}

                {isLoading && (
                    <div className="flex items-start gap-4">
                        <Avatar className="h-9 w-9 border hidden sm:flex">
                            <div className="flex h-full w-full items-center justify-center rounded-full bg-primary/10 text-primary">
                                <Sparkles className="h-5 w-5" />
                            </div>
                        </Avatar>
                        <div className="flex-1 max-w-[85%] rounded-2xl p-4 bg-muted animate-pulse">
                            <div className="h-4 w-24 bg-primary/20 rounded"></div>
                        </div>
                    </div>
                )}

                {error && (
                    <Alert variant="destructive" className="mt-4 max-w-[85%] border-destructive text-destructive">
                        <Terminal className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
            </div>

            <div className="p-4 bg-background border-t">
                <form onSubmit={handleSubmit} className="relative max-w-3xl mx-auto flex items-end gap-2">
                    <Textarea
                        ref={textareaRef}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Ask a question about Caregiving..."
                        rows={1}
                        className="text-base resize-none py-4 pr-12 min-h-[56px] rounded-xl bg-muted/50 border-transparent focus-visible:ring-1 focus-visible:ring-primary shadow-inner"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSubmit();
                            }
                        }}
                    />
                    <Button
                        type="submit"
                        size="icon"
                        disabled={!inputValue.trim() || isLoading}
                        className="absolute bottom-2 right-2 rounded-lg h-10 w-10 shrink-0 shadow-md"
                    >
                        {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                    </Button>
                </form>
                <p className="text-[11px] text-center text-muted-foreground mt-3 font-medium">
                    CareClarity AI can make mistakes. Consider verifying important medical information with a professional.
                </p>
            </div>
        </div>
    );
}
