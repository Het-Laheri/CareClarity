'use client';

import { useActionState, useRef, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { getAIResponse, type AIResponseState } from '@/app/dashboard/actions';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Loader2, Terminal, Sparkles, Send } from 'lucide-react';
import { Logo } from '@/components/logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="icon" disabled={pending} className="absolute bottom-3 right-3">
      {pending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
    </Button>
  );
}

function PromptSuggestions({ onPromptClick }: { onPromptClick: (prompt: string) => void }) {
    const suggestions = [
        "How can I help my non-verbal child express their needs?",
        "What are some strategies for managing sensory overload in public places?",
        "Can you explain what an IEP is and how to prepare for a meeting?",
        "Suggest some simple social skill activities for a 5-year-old.",
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {suggestions.map((prompt) => (
                <Card key={prompt} className="p-4 hover:bg-accent transition-colors cursor-pointer" onClick={() => onPromptClick(prompt)}>
                    <p className="text-sm">{prompt}</p>
                </Card>
            ))}
        </div>
    )
}

function AskQuestionForm() {
  const initialState: AIResponseState = { form: { query: '' } };
  const [state, formAction] = useActionState(getAIResponse, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handlePromptClick = (prompt: string) => {
    if (textareaRef.current) {
        textareaRef.current.value = prompt;
        formRef.current?.requestSubmit();
    }
  }

  // Scroll to bottom when new messages appear
  useEffect(() => {
    if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [state]);


  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto w-full">
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-8">
        {state.result || state.error ? (
          <div className="space-y-8">
            {/* User Query */}
            <div className="flex items-start gap-4">
               <Avatar className="h-9 w-9">
                 <AvatarImage src="https://picsum.photos/seed/user/200/200" alt="@user" data-ai-hint="user avatar" />
                 <AvatarFallback>CG</AvatarFallback>
               </Avatar>
              <div className="flex-1">
                 <p className="font-semibold">You</p>
                 <p className="mt-1">{state.form.query}</p>
              </div>
            </div>

            {/* AI Response */}
            <div className="flex items-start gap-4">
              <Avatar className="h-9 w-9">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Sparkles className="h-5 w-5"/>
                  </div>
              </Avatar>
              <div className="flex-1">
                 <p className="font-semibold">CareClarity AI</p>
                 <div className="mt-2 space-y-4">
                    {state.error && (
                      <Alert variant="destructive">
                        <Terminal className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{state.error}</AlertDescription>
                      </Alert>
                    )}
                    {state.result && (
                      <div className="space-y-4">
                        <p className="whitespace-pre-wrap">{state.result.response}</p>
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="item-1">
                            <AccordionTrigger>Why this response?</AccordionTrigger>
                            <AccordionContent className="space-y-2">
                              <p className="font-semibold">Explanation:</p>
                              <p className="whitespace-pre-wrap">{state.result.explanation}</p>
                              <p className="text-sm text-muted-foreground pt-2">Source Category: {state.result.sourceCategory}</p>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                        <Alert>
                          <AlertTitle className="font-bold">Disclaimer</AlertTitle>
                          <AlertDescription>
                            {state.result.disclaimer}
                          </AlertDescription>
                        </Alert>
                      </div>
                    )}
                 </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Logo />
            <h1 className="mt-8 font-headline text-4xl font-bold tracking-tight">How can I help today?</h1>
            <div className="mt-12 w-full">
              <PromptSuggestions onPromptClick={handlePromptClick} />
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-background">
        <form ref={formRef} action={formAction} className="relative">
          <Textarea
            ref={textareaRef}
            name="query"
            placeholder="Ask a question about caregiving..."
            rows={1}
            defaultValue={""}
            required
            className="text-base resize-none p-4 pr-16 min-h-[56px]"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                formRef.current?.requestSubmit();
              }
            }}
          />
          <SubmitButton />
        </form>
         <p className="text-xs text-center text-muted-foreground mt-2">
            CareClarity can make mistakes. Consider checking important information. This is not a diagnostic or treatment tool.
        </p>
      </div>
    </div>
  );
}


export default function AskAiForm() {
  return <AskQuestionForm />;
}
