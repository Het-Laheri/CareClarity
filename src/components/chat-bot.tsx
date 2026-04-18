'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Terminal, Sparkles, Send } from 'lucide-react';
import { Logo } from '@/components/logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Feedback } from '@/components/feedback';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { languages } from '@/lib/languages';
import { Globe } from 'lucide-react';

export default function ChatBot() {
    const [messages, setMessages] = useState<Array<{ role: 'user' | 'model'; text: string }>>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [language, setLanguage] = useState('English');

    const chatContainerRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    // Auto-resize textarea as content grows
    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }, [inputValue]);

    // FIX 1: Unified send function. Accepts an optional promptOverride for suggestion
    // clicks so the user message always appears in the UI — no setTimeout race condition.
    const handleSubmit = async (e?: React.FormEvent, promptOverride?: string) => {
        if (e) e.preventDefault();

        const query = (promptOverride ?? inputValue).trim();
        if (!query || isLoading) return;

        setInputValue('');
        setError(null);
        setIsLoading(true);

        // Always append the user message to the visible chat
        const newMessages = [...messages, { role: 'user' as const, text: query }];
        setMessages(newMessages);

        await sendToApi(newMessages);
    };

    // FIX 2: Separate retry handler — re-sends existing history without duplicating
    // the user message that is already in state.
    const handleRetry = async () => {
        const lastUserMsg = [...messages].reverse().find(m => m.role === 'user');
        if (!lastUserMsg || isLoading) return;

        setError(null);
        setIsLoading(true);
        await sendToApi(messages);
    };

    // Shared fetch logic extracted to avoid duplication between submit and retry
    const sendToApi = async (history: Array<{ role: 'user' | 'model'; text: string }>) => {
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: history.map(m => ({
                        role: m.role === 'model' ? 'assistant' : 'user',
                        content: m.text,
                    })),
                    language,
                }),
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error || 'Failed to fetch response');
            }

            const data = await response.json();
            setMessages([...history, { role: 'model', text: data.text }]);
        } catch (err: any) {
            if (err.message.includes('429')) {
                setError('Our AI assistant is currently over capacity. Please try again later.');
            } else {
                setError(err.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const suggestions = [
        "How can I help my non-verbal child express their needs?",
        "What are some strategies for managing sensory overload in public places?",
        "Suggest some simple social skill activities for a 5-year-old.",
    ];

    return (
        <div className="fixed inset-0 flex flex-col bg-background selection:bg-primary/10 z-50">
            {/* Top Bar Header */}
            <div className="flex-none flex items-center justify-between p-4 bg-background/95 backdrop-blur-md border-b border-border/30 z-10">
                <div className="flex items-center justify-between w-full max-w-3xl mx-auto">
                    <div className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-primary" />
                        <h2 className="font-semibold text-lg tracking-tight">CareClarity AI</h2>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-muted/40 px-3 py-1.5 rounded-full hover:bg-muted/60 transition-all border border-border/50">
                            <Globe className="h-4 w-4 text-muted-foreground" />
                            <Select value={language} onValueChange={setLanguage}>
                                <SelectTrigger className="h-7 w-[110px] bg-transparent border-none text-xs font-medium focus:ring-0 focus:ring-offset-0 p-0 shadow-none">
                                    <SelectValue placeholder="Language" />
                                </SelectTrigger>
                                <SelectContent side="bottom" align="end" className="w-[180px]">
                                    {languages.map((lang) => (
                                        <SelectItem key={lang.code} value={lang.name} className="flex justify-between">
                                            <span>{lang.name}</span>
                                            <span className="text-[10px] text-muted-foreground ml-2">({lang.nativeName})</span>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        {/* Heart / Feedback button moved to top-right */}
                        <Feedback contentId="chat-interface" contentType="ai_response" />
                    </div>
                </div>
            </div>

            <div ref={chatContainerRef} className="flex-1 overflow-y-auto w-full scroll-smooth flex flex-col relative">
                <div className="max-w-3xl mx-auto flex flex-col flex-1 p-4 w-full space-y-8 min-h-max justify-center">
                    {messages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center text-center w-full min-h-[40vh] py-6">
                            <Logo />
                            <h1 className="mt-8 font-headline text-2xl md:text-4xl font-bold tracking-tight text-foreground/90 px-2">How can I help you today?</h1>
                            <div className="mt-8 w-full grid grid-cols-1 gap-3 pb-8">
                                {suggestions.map((prompt) => (
                                    <button
                                        type="button"
                                        key={prompt}
                                        className="p-4 rounded-2xl bg-card border-2 border-border/40 hover:border-primary/50 hover:bg-muted/50 transition-all cursor-pointer text-left shadow-sm hover:shadow-md flex flex-col justify-center min-h-[80px] outline-none focus-visible:ring-2 focus-visible:ring-primary group"
                                        // FIX 3: Pass prompt directly — no setTimeout race condition,
                                        // no broken handlePromptClick that skipped showing the user message.
                                        onClick={() => handleSubmit(undefined, prompt)}
                                    >
                                        <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground leading-relaxed">{prompt}</p>
                                    </button>
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
                                    {msg.role === 'user' ? (
                                        <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                                    ) : (
                                        <div className="prose prose-sm max-w-none dark:prose-invert prose-p:my-1 prose-ul:my-1 prose-li:my-0.5 prose-headings:font-semibold prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
                                            <ReactMarkdown
                                                components={{
                                                    a: ({ href, children }) => {
                                                        if (href?.startsWith('/')) {
                                                            return <Link href={href} className="text-primary font-medium hover:underline">{children}</Link>;
                                                        }
                                                        return <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline">{children}</a>;
                                                    },
                                                }}
                                            >
                                                {msg.text}
                                            </ReactMarkdown>
                                        </div>
                                    )}
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
                        <Alert variant="destructive" className="mt-4 max-w-[85%] border-destructive text-destructive bg-destructive/5 shadow-sm">
                            <Terminal className="h-4 w-4" />
                            <div className="flex flex-col gap-3 w-full">
                                <div>
                                    <AlertTitle className="font-bold">AI Assistant Error</AlertTitle>
                                    <AlertDescription className="text-sm opacity-90">{error}</AlertDescription>
                                </div>
                                {/* FIX 4: Use the dedicated handleRetry instead of the broken retryText path */}
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleRetry}
                                    className="w-fit bg-background text-foreground hover:bg-background/90 border-destructive/30"
                                >
                                    Try asking again
                                </Button>
                            </div>
                        </Alert>
                    )}
                </div>
            </div>

            <div className="flex-none w-full px-4 pt-2 pb-6 md:pb-8 bg-background">
                <div className="max-w-3xl mx-auto w-full">
                    <form onSubmit={handleSubmit} className="relative flex items-end gap-2 bg-muted/40 border shadow-sm rounded-2xl backdrop-blur-xl p-1 focus-within:ring-2 focus-within:ring-primary/50 transition-all">
                        <Textarea
                            ref={textareaRef}  // FIX 5: ref is now wired up; auto-resize useEffect uses it
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Ask a question about Caregiving..."
                            rows={1}
                            className="text-base resize-none py-3 px-4 min-h-[52px] max-h-48 bg-transparent border-none focus-visible:ring-0 shadow-none scrollbar-none disabled:opacity-50 overflow-y-auto"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSubmit();
                                }
                            }}
                        />
                        <div className="absolute bottom-2 right-2 flex items-center gap-2">
                            <Button
                                type="submit"
                                size="icon"
                                disabled={!inputValue.trim() || isLoading}
                                className="rounded-xl h-10 w-10 shrink-0 shadow-sm transition-transform active:scale-95"
                            >
                                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                            </Button>
                        </div>
                    </form>
                    <p className="text-xs text-center text-muted-foreground mt-3 font-medium">
                        CareClarity can make mistakes. Consider verifying important medical information.
                    </p>
                </div>
            </div>
        </div>
    );
}