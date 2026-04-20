import Link from "next/link";
import { ArrowLeft, Mail, MapPin } from "lucide-react";
import { Logo } from "@/components/logo";

export default function ContactPage() {
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
      <main className="container mx-auto px-4 py-20 flex-grow max-w-3xl">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-8">Contact Us</h1>
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-8 mb-8 space-y-6 text-slate-600">
          <p>
            If you are a parent seeking support, a clinical specialist wanting to join our platform, or a researcher, we would love to hear from you.
          </p>
          
          <div className="flex items-center gap-4 text-slate-900 font-medium">
            <div className="h-10 w-10 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full">
              <Mail className="h-5 w-5" />
            </div>
            <span>support@careclarity.in</span>
          </div>

          <div className="flex items-center gap-4 text-slate-900 font-medium">
            <div className="h-10 w-10 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full">
              <MapPin className="h-5 w-5" />
            </div>
            <span>Mumbai, India</span>
          </div>
        </div>
      </main>
    </div>
  );
}
