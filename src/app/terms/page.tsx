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
          
          <p>Welcome to CareClarity! These terms and conditions outline the rules and regulations for the use of CareClarity's Website, located at CareClarity.in.</p>
          <p>By accessing this website, we assume you accept these terms and conditions. Do not continue to use CareClarity if you do not agree to take all of the terms and conditions stated on this page.</p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. Not Medical Advice (Crucial Disclaimer)</h2>
          <p className="p-4 bg-blue-50 text-blue-900 rounded-xl border border-blue-100 font-medium">
            The Content on CareClarity, including text, graphics, AI interactions, and other materials is for informational, educational, and pathway-mapping purposes only. The Content is NOT intended to be a substitute for professional medical advice, formal diagnosis, or direct clinical treatment.
          </p>
          <p>
            Always seek the advice of your physician, pediatrician, developmental specialist, or other qualified health provider in India with any questions you may have regarding a medical condition. In a medical emergency, call emergency services immediately.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. Artificial Intelligence</h2>
          <p>
            CareClarity utilizes advanced language models (AI) to process user queries and map symptoms to established pediatric pathways. While we strive to ensure models are clinically-grounded, AI responses can generate inaccuracies (hallucinations). You agree to independently verify any guidance regarding your child's legal rights (e.g. under the RPWD Act) or developmental therapies.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. User Conduct</h2>
          <p>By registering, you agree that you are accessing CareClarity for lawful purposes relating to understanding pediatric care. You will not:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Submit malicious code, spam, or abusive inputs into the Chatbot.</li>
            <li>Attempt to reverse-engineer or steal the proprietary assessment frameworks.</li>
            <li>Represent yourself as a verified medical specialist if you are not licensed.</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">4. Limitation of Liability</h2>
          <p>
            In no event shall CareClarity, nor its developers or partners, be held liable for any health outcomes, delays in treatment, or indirect consequences arising out of or in any way connected with your use of this software platform.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">5. Contact</h2>
          <p>If you have any questions about these Terms, you can contact us:</p>
          <ul className="list-none space-y-2">
            <li>By email: hetlaheri1@gmail.com</li>
            <li>By phone: +91 91373 44080</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
