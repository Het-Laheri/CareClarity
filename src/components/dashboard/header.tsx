import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserNav } from "@/components/dashboard/user-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { Feedback } from "@/components/feedback";
import { Sparkles } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="md:hidden" aria-label="Toggle sidebar" />
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 p-1.5 rounded-lg">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <h2 className="font-headline font-semibold text-lg tracking-tight hidden sm:block">CareClarity AI</h2>
        </div>
      </div>
      <div className="flex w-full items-center justify-end gap-2">
        <Feedback contentId="dashboard-header" contentType="page" />
        <ThemeToggle />
        <UserNav />
      </div>
    </header>
  );
}
