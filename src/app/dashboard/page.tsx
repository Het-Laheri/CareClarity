import AskAiForm from "@/components/dashboard/ask-ai-form";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          AI-Assisted Guidance
        </h1>
        <p className="text-muted-foreground">
          Ask questions and get safe, explainable guidance.
        </p>
      </div>
      <AskAiForm />
    </div>
  );
}
