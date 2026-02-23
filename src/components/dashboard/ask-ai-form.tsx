'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { getAIResponse, getActivityIdeas, type AIResponseState, type ActivityIdeasState } from '@/app/dashboard/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Loader2, Sparkles, Terminal } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
}

function AskQuestionForm() {
  const initialState: AIResponseState = { form: { query: '' } };
  const [state, formAction] = useActionState(getAIResponse, initialState);

  return (
    <div className="space-y-6">
      <form action={formAction} className="space-y-4">
        <Textarea
          name="query"
          placeholder="Ask a question about caregiving for a child with a neurodevelopmental condition... e.g., 'How can I help my non-verbal child express their needs?'"
          rows={5}
          defaultValue={state.form.query}
          required
        />
        <div className="flex justify-end">
          <SubmitButton>Get Guidance</SubmitButton>
        </div>
      </form>
      {state.error && (
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}
      {state.result && (
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">AI Generated Response</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
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
          </CardContent>
          <CardFooter>
            <Alert>
              <AlertTitle className="font-bold">Disclaimer</AlertTitle>
              <AlertDescription>
                {state.result.disclaimer}
              </AlertDescription>
            </Alert>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}

function GenerateIdeasForm() {
    const initialState: ActivityIdeasState = { form: { keywords: '' } };
    const [state, formAction] = useActionState(getActivityIdeas, initialState);

    return (
        <div className="space-y-6">
            <form action={formAction} className="space-y-4">
                <Input
                    name="keywords"
                    placeholder="Enter keywords like 'sensory play', 'social skills', 'fine motor skills'..."
                    defaultValue={state.form.keywords}
                    required
                />
                <div className="flex justify-end">
                    <SubmitButton>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Generate Ideas
                    </SubmitButton>
                </div>
            </form>
            {state.error && (
                <Alert variant="destructive">
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{state.error}</AlertDescription>
                </Alert>
            )}
            {state.result && (
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2">
                            <Sparkles className="h-5 w-5 text-primary" />
                            Activity Ideas
                        </CardTitle>
                        <CardDescription>Based on your keywords: "{state.form.keywords}"</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="whitespace-pre-wrap">{state.result.ideas}</p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}

export default function AskAiForm() {
  return (
    <Tabs defaultValue="question" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="question">Ask a Question</TabsTrigger>
        <TabsTrigger value="ideas">Generate Ideas</TabsTrigger>
      </TabsList>
      <TabsContent value="question" className="mt-6">
        <AskQuestionForm />
      </TabsContent>
      <TabsContent value="ideas" className="mt-6">
        <GenerateIdeasForm />
      </TabsContent>
    </Tabs>
  );
}
