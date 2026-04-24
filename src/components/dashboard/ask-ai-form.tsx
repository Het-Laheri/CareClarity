'use client';

import { useActionState, useRef, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { getAIResponse, type AIResponseState } from '@/app/dashboard/actions';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Loader2, Terminal, Sparkles, Send, Plus, User } from 'lucide-react';
import { Logo } from '@/components/logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Feedback } from '@/components/feedback';

// Helper to handle the submit button state
function SubmitButton({ isDisabled }: { isDisabled: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      size="icon"
      disabled={pending || isDisabled}
      className="absolute bottom-3 right-3 rounded-full transition-all"
    >
      {pending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
    </Button>
  );
}

export default function AskAiForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // useActionState handles the server communication
  const [state, formAction] = useActionState(getAIResponse, { form: { query: '' } });

  // Local state to maintain a list of messages for the UI
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: any }[]>([]);

  // Sync server response to message history
  useEffect(() => {
    if (state.result) {
      setMessages(prev => [...prev, { role: 'assistant', content: state.result }]);
      formRef.current?.reset();
      adjustTextareaHeight();
    }
  }, [state]);

  // Handle auto-scrolling
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, state]);

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleFormAction = (formData: FormData) => {
    const query = formData.get('query') as string;
    if (!query.trim()) return;

    setMessages(prev => [...prev, { role: 'user', content: { query } }]);
    formAction(formData);
  };

  const handlePromptClick = (prompt: string) => {
    if (textareaRef.current) {
      textareaRef.current.value = prompt;
      const formData = new FormData();
      formData.append('query', prompt);
      handleFormAction(formData);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#F9FAFB] dark:bg-background overflow-hidden">
      {/* Header / New Chat */}
      <div className="flex items-center justify-between p-4 bg-white/80 dark:bg-background/80 backdrop-blur-md border-b border-border/30 z-10">
        <div className="flex items-center justify-between w-full max-w-5xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-1.5 rounded-lg">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <span className="font-headline font-bold text-lg tracking-tight">CareClarity Assistant</span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setMessages([])} className="gap-2 rounded-xl">
            <Plus className="h-4 w-4" /> New Chat
          </Button>
        </div>
      </div>

      {/* Chat Area */}
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto w-full scroll-smooth relative">
        <div className="max-w-3xl mx-auto flex flex-col p-4 md:p-8 space-y-8">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-8 py-12 md:py-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Logo className="scale-125 mb-8" />
              <div>
                <h1 className="font-headline text-3xl md:text-5xl font-bold tracking-tight text-foreground/90 px-2 leading-tight">How can I support your <br className="hidden md:block" /> caregiving journey today?</h1>
                <p className="text-muted-foreground mt-4 max-w-md mx-auto">Ask about neurodevelopmental conditions, rights, or sensory strategies.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
                {[
                  "Strategies for sensory overload in India",
                  "Rights under the RPWD Act 2016",
                  "Social skill activities for a 5-year-old",
                  "Help for non-verbal communication"
                ].map((prompt) => (
                  <Card
                    key={prompt}
                    className="p-4 text-left hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer bg-white dark:bg-card shadow-sm"
                    onClick={() => handlePromptClick(prompt)}
                  >
                    <p className="text-sm font-medium">{prompt}</p>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {messages.map((msg, i) => (
                <div key={i} className={`flex items-start gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                  <div className={`flex flex-col space-y-2 max-w-[85%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`rounded-2xl px-5 py-3 shadow-sm ${
                      msg.role === 'user' 
                        ? 'bg-blue-600 text-white rounded-tr-sm' 
                        : 'bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 rounded-tl-sm'
                    }`}>
                      {msg.role === 'user' ? (
                        <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{msg.content.query}</p>
                      ) : (
                        <div className="space-y-6">
                          <div className="prose prose-sm max-w-none dark:prose-invert prose-p:my-1 text-[15px]">
                            <p className="whitespace-pre-wrap leading-relaxed">{msg.content.response}</p>
                          </div>

                          <Accordion type="single" collapsible className="w-full bg-white/50 dark:bg-black/20 rounded-xl px-4 border border-slate-200/50 dark:border-slate-800/50">
                            <AccordionItem value="explanation" className="border-none">
                              <AccordionTrigger className="text-xs font-semibold py-3">VIEW REASONING & SOURCES</AccordionTrigger>
                              <AccordionContent className="text-muted-foreground space-y-3 pb-4">
                                <p className="text-sm">{msg.content.explanation}</p>
                                <div className="pt-2 flex items-center gap-2">
                                  <span className="text-[10px] font-bold uppercase tracking-widest bg-primary/10 text-primary px-2 py-1 rounded">
                                    SOURCE: {msg.content.sourceCategory}
                                  </span>
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>

                          <Feedback contentId={msg.content.query} contentType="ai_response" />

                          <Alert className="bg-yellow-500/5 border-yellow-500/20 text-yellow-700 dark:text-yellow-200 rounded-xl">
                            <AlertDescription className="text-[10px] uppercase tracking-wider font-bold opacity-70">
                              {msg.content.disclaimer}
                            </AlertDescription>
                          </Alert>
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] text-muted-foreground/60 font-bold uppercase tracking-tighter px-1">
                      {msg.role === 'assistant' ? 'CareClarity Assistant' : 'You'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="flex-none w-full px-4 pt-2 pb-6 md:pb-10 bg-white/50 dark:bg-background/50 backdrop-blur-sm border-t border-border/20">
        <form ref={formRef} action={handleFormAction} className="relative max-w-3xl mx-auto flex items-end gap-2 bg-white dark:bg-card border border-border/80 shadow-xl rounded-full p-2 pr-4 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
          <Textarea
            ref={textareaRef}
            name="query"
            placeholder="Type your situation or question..."
            rows={1}
            className="text-[15px] resize-none py-3 px-6 min-h-[56px] max-h-48 bg-transparent border-none focus-visible:ring-0 shadow-none scrollbar-none disabled:opacity-50 overflow-y-auto w-full"
            onChange={adjustTextareaHeight}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                formRef.current?.requestSubmit();
              }
            }}
          />
          <SubmitButton isDisabled={false} />
        </form>
        <p className="text-[10px] text-center text-muted-foreground/60 mt-4 font-bold uppercase tracking-widest">
          AI-generated Support • Not Medical Advice
        </p>
      </div>
    </div>
  );
}