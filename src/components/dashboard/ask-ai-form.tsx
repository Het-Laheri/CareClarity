'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { getAIResponse, type AIResponseState } from '@/app/dashboard/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Loader2, Terminal } from 'lucide-react';

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
    <div className="h-full flex flex-col">
      <form action={formAction} className="space-y-4">
        <Textarea
          name="query"
          placeholder="Ask a question about caregiving for a child with a neurodevelopmental condition... e.g., 'How can I help my non-verbal child express their needs?'"
          rows={5}
          defaultValue={state.form.query}
          required
          className="text-base"
        />
        <div className="flex justify-end">
          <SubmitButton>Get Guidance</SubmitButton>
        </div>
      </form>
      
      <div className="mt-6 flex-1 overflow-y-auto pb-8">
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
    </div>
  );
}

export default function AskAiForm() {
  return <AskQuestionForm />;
}
