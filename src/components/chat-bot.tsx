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
        <div className="flex-1 flex flex-col bg-[#F9FAFB] dark:bg-background selection:bg-primary/10 h-full w-full overflow-hidden">
            {/* Top Bar Header */}
            <div className="flex-none flex items-center justify-between p-4 bg-white/80 dark:bg-background/80 backdrop-blur-md border-b border-border/30 z-10">
                <div className="flex items-center justify-between w-full max-w-5xl mx-auto">
                    <div className="flex items-center gap-2">
                        <div className="bg-primary/10 p-1.5 rounded-lg">
                            <Sparkles className="h-5 w-5 text-primary" />
                        </div>
                        <h2 className="font-headline font-bold text-lg tracking-tight">CareClarity AI</h2>
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
                        <Feedback contentId="chat-interface" contentType="ai_response" />
                    </div>
                </div>
            </div>

            <div ref={chatContainerRef} className="flex-1 overflow-y-auto w-full scroll-smooth relative">
                <div className="max-w-3xl mx-auto flex flex-col p-4 md:p-8 space-y-8">
                    {messages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center text-center w-full py-12 md:py-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <Logo className="scale-125 mb-8" />
                            <h1 className="font-headline text-3xl md:text-5xl font-bold tracking-tight text-foreground/90 px-2 leading-tight">
                                How can I support your <br className="hidden md:block" /> caregiving journey today?
                            </h1>
                            <p className="mt-4 text-muted-foreground max-w-md mx-auto">
                                Ask about neurodevelopmental conditions, rights, therapies, or daily management.
                            </p>
                            <div className="mt-12 w-full grid grid-cols-1 gap-3">
                                {suggestions.map((prompt) => (
                                    <button
                                        type="button"
                                        key={prompt}
                                        className="p-4 rounded-2xl bg-white dark:bg-card border border-border/60 hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer text-left shadow-sm hover:shadow-md flex items-center justify-between group outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                        onClick={() => handleSubmit(undefined, prompt)}
                                    >
                                        <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground leading-relaxed">{prompt}</p>
                                        <Send className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        messages.map((msg, i) => (
                            <div key={i} className={`flex items-start gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                                <div className={`flex flex-col space-y-2 max-w-[85%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                                    <div className={`rounded-2xl px-5 py-3 shadow-sm ${
                                        msg.role === 'user' 
                                            ? 'bg-blue-600 text-white rounded-tr-sm' 
                                            : 'bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 rounded-tl-sm'
                                    }`}>
                                        {msg.role === 'user' ? (
                                            <p className="whitespace-pre-wrap leading-relaxed text-[15px]">{msg.text}</p>
                                        ) : (
                                            <div className="prose prose-sm max-w-none dark:prose-invert prose-p:my-1 prose-ul:my-1 prose-li:my-0.5 prose-headings:font-semibold prose-a:text-primary prose-a:no-underline hover:prose-a:underline text-[15px]">
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
                                    <span className="text-[10px] text-muted-foreground/60 font-medium uppercase tracking-tighter px-1">
                                        {msg.role === 'user' ? 'You' : 'CareClarity AI'}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}

                    {isLoading && (
                        <div className="flex items-start gap-4 animate-in fade-in duration-300">
                            <div className="flex flex-col space-y-2 max-w-[85%]">
                                <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl rounded-tl-sm px-5 py-4 min-w-[120px]">
                                    <div className="flex gap-1">
                                        <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                        <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                        <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {error && (
                        <Alert variant="destructive" className="mx-auto max-w-md border-destructive/20 text-destructive bg-destructive/5 shadow-lg rounded-2xl">
                            <Terminal className="h-4 w-4" />
                            <div className="flex flex-col gap-3 w-full">
                                <div>
                                    <AlertTitle className="font-bold">System Alert</AlertTitle>
                                    <AlertDescription className="text-sm opacity-90">{error}</AlertDescription>
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleRetry}
                                    className="w-fit bg-white dark:bg-background text-foreground hover:bg-muted border-destructive/30 rounded-xl"
                                >
                                    Retry Connection
                                </Button>
                            </div>
                        </Alert>
                    )}
                </div>
            </div>

            <div className="flex-none w-full px-4 pt-2 pb-6 md:pb-10 bg-white/50 dark:bg-background/50 backdrop-blur-sm border-t border-border/20">
                <div className="max-w-3xl mx-auto relative">
                    <form onSubmit={handleSubmit} className="relative flex items-end gap-2 bg-white dark:bg-card border border-border/80 shadow-xl rounded-full p-2 pr-4 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                        <Textarea
                            ref={textareaRef}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Type your message here..."
                            rows={1}
                            className="text-[15px] resize-none py-3 px-6 min-h-[56px] max-h-48 bg-transparent border-none focus-visible:ring-0 shadow-none scrollbar-none disabled:opacity-50 overflow-y-auto w-full"
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
                            className="rounded-full h-11 w-11 shrink-0 shadow-lg transition-all active:scale-95 mb-1"
                        >
                            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                        </Button>
                    </form>
                    <p className="text-[10px] text-center text-muted-foreground/60 mt-4 font-bold uppercase tracking-widest">
                        CareClarity Assistant • AI-Powered Guidance • Not Medical Advice
                    </p>
                </div>
            </div>
        </div>
    );
}