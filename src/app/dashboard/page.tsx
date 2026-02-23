import AskAiForm from "@/components/dashboard/ask-ai-form";

export default function DashboardPage() {
  return (
    <div className="flex h-full flex-col gap-4">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          AI-Assisted Guidance
        </h1>
        <p className="text-muted-foreground">
          Ask questions and get safe, explainable guidance.
        </p>
      </div>
      <div className="flex-1 min-h-0">
        <AskAiForm />
      </div>
    </div>
  );
}
