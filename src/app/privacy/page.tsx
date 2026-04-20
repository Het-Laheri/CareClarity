import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/logo";

export default function PrivacyPage() {
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
        <h1 className="text-4xl font-extrabold text-slate-900 mb-8">Privacy Policy</h1>
        <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-6">
          <p><strong>Last Updated: {new Date().toLocaleDateString()}</strong></p>
          <p>
            At CareClarity, we understand that information regarding your child's health and development is deeply sensitive. We are committed to maintaining the highest standard of data privacy and security.
          </p>
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. Data Security</h2>
          <p>
            All information processed through our assessment chats, symptom checkers, and platform interfaces is encrypted. We do not sell user data to advertising third parties.
          </p>
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. Firebase Authentication</h2>
          <p>
            We use Firebase Authentication to securely manage parent accounts. Your password and secure credentials are encrypted and stored directly with Google Cloud servers; CareClarity administrators do not have access to your passwords.
          </p>
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. Medical Information</h2>
          <p>
            Any guidance derived from our systems is educational. Information provided does not constitute a formal diagnosis, and we do not maintain HIPAA-compliant permanent electronic medical records (EMR). Always consult a doctor directly.
          </p>
        </div>
      </main>
    </div>
  );
}
