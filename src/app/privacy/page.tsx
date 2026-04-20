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
          
          <p>CareClarity (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) respects your privacy and is committed to protecting it through our compliance with this Privacy Policy. This policy describes the types of information we may collect from you or that you may provide when you visit the website careclarity.in (our &quot;Website&quot;) and our practices for collecting, using, maintaining, protecting, and disclosing that information, in accordance with applicable Indian laws including the Information Technology Act, 2000.</p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. Information We Collect About You</h2>
          <p>We collect several types of information from and about users of our Website, including:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Personal Information:</strong> Name, email address (e.g. hetlaheri1@gmail.com), phone number (e.g. +91 9137344080), and account authentication details via Google Firebase Auth.</li>
            <li><strong>Health Data (Informational):</strong> Inputs you provide regarding your child&apos;s age, behaviors, and developmental milestones to operate the AI symptom guidance tool. This data is strictly used to provide localized informational mapping.</li>
            <li><strong>Usage Details:</strong> IP addresses, browser types, operating systems, and details of your visits to our Website including location data and communication data.</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. How We Use Your Information</h2>
          <p>We use information that we collect about you or that you provide to us, including any personal information:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>To present our Website and its educational content to you.</li>
            <li>To match symptoms and developmental inputs to locally relevant clinical pathways and specialists.</li>
            <li>To carry out our obligations and enforce our rights arising from any contracts entered into between you and us.</li>
            <li>To notify you about changes to our Website or any products or services we offer or provide though it.</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. Data Security and Third Parties</h2>
          <p>
            We implement measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure. All information you provide to us is stored on secure cloud servers behind firewalls managed by Google Firebase.
          </p>
          <p>
            We <strong>do not sell</strong> your personal or health data to third-party marketers or advertisers. We process AI queries securely, and conversational data is explicitly segregated from identifiable contact information where technically feasible.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">4. Compliance and Disclaimers</h2>
          <p>
            The tools provide informational frameworks based on established pediatric guidelines. This data is expressly not recorded as a legally binding Electronic Medical Record (EMR).
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">5. Contact Information</h2>
          <p>To ask questions or comment about this privacy policy and our privacy practices, contact us at:</p>
          <div className="bg-slate-50 p-6 rounded-xl mt-4">
            <p><strong>Email:</strong> hetlaheri1@gmail.com</p>
            <p><strong>Phone:</strong> +91 91373 44080</p>
            <p><strong>Location:</strong> Mumbai, India</p>
          </div>
        </div>
      </main>
    </div>
  );
}
