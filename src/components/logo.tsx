import { BrainCircuit } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  /** Where the logo links to. Defaults to "/" */
  href?: string;
}

export function Logo({ className, href = "/" }: LogoProps) {
  return (
    <Link href={href} className={cn("flex items-center gap-2 text-foreground", className)}>
      <BrainCircuit className="h-7 w-7 text-primary" />
      <span className="font-headline text-2xl font-bold">CareClarity</span>
    </Link>
  );
}
