import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/logo";

export default function TermsPage() {
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
        <h1 className="text-4xl font-extrabold text-slate-900 mb-8">Terms of Service</h1>
        <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-6">
          <p><strong>Effective Date: {new Date().toLocaleDateString()}</strong></p>
          <p>
            By accessing or using CareClarity, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the service.
          </p>
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Not Medical Advice</h2>
          <p>
            The content on CareClarity, including text, graphics, interactions with AI models, and other material is for informational purposes only. The Content is not intended to be a substitute for professional medical advice, diagnosis, or treatment. 
          </p>
          <p>
            Always seek the advice of your physician, pediatrician, or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read on CareClarity.
          </p>
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">User Accounts</h2>
          <p>
            When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
          </p>
        </div>
      </main>
    </div>
  );
}
