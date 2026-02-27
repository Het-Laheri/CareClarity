import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserNav } from "@/components/dashboard/user-nav";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="md:hidden" aria-label="Toggle sidebar" />
      </div>
      <div className="flex w-full items-center justify-end gap-2">
        <ThemeToggle />
        <UserNav />
      </div>
    </header>
  );
}
