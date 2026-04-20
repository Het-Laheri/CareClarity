import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/logo";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <Logo />
          <Link href="/" className="flex items-center text-sm font-medium text-slate-600 hover:text-blue-600">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Link>
        </div>
      </header>
      <main className="container mx-auto px-4 py-20 flex-grow max-w-4xl">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-8">About CareClarity</h1>
        <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-6">
          <p>
            CareClarity was built with a simple mission: to empower Indian parents with accessible, clinically-reviewed insights regarding pediatric neurodevelopment.
          </p>
          <p>
            The gap between recognizing symptoms and starting early intervention is often filled with anxiety, contradictory Google searches, and months-long clinic waitlists. We aim to collapse that timeline from months into minutes.
          </p>
          <p>
            By bridging the gap between parental intuition and clinical frameworks, we provide a structured, safe, and private environment to understand what your child needs and exactly how to proceed.
          </p>
        </div>
      </main>
    </div>
  );
}
