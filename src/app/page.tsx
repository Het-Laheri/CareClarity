import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, FileText, MapPin, Shield, Clock } from "lucide-react";
import { Logo } from "@/components/logo";
import { MobileNav } from "@/components/mobile-nav";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { MockAgentChat } from "@/components/ui/mock-agent-chat";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white selection:bg-blue-100 selection:text-blue-900 overflow-hidden font-sans">
      
      {/* ── Navbar ── */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 sm:h-20 items-center justify-between">
            <Logo />
            <div className="hidden md:flex items-center space-x-6">
              <Button variant="ghost" size="sm" className="font-semibold text-slate-600 hover:text-slate-900" asChild>
                <Link href="/login">Log in</Link>
              </Button>
              {/* Force explicit inline style to bypass any Tailwind purges/clashes */}
              <Button size="sm" style={{ backgroundColor: '#2563eb', color: 'white' }} className="rounded-full font-semibold px-6 shadow-sm hover:opacity-90 transition-opacity" asChild>
                <Link href="/signup">Check Symptoms</Link>
              </Button>
            </div>
            <MobileNav />
          </div>
        </div>
      </header>

      <main id="main-content" className="flex-grow">
        
        {/* ── 1. Hero Section ── */}
        <section className="relative py-12 lg:py-20 bg-gradient-to-b from-blue-50/50 to-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              <ScrollReveal direction="up" duration={0.8} className="max-w-2xl lg:max-w-none">
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/50 px-4 py-1.5 text-sm font-semibold text-blue-800 mb-6 shadow-sm">
                  <Shield className="h-4 w-4 text-blue-600" />
                  Private, Secure, & AI-Powered
                </div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
                  Worried about your child's development?<br />
                  <span className="text-blue-600">Get clarity in minutes.</span>
                </h1>
                
                <p className="mt-6 text-lg sm:text-xl leading-relaxed text-slate-600 max-w-lg">
                  An intelligent platform to help you understand your child's symptoms and explore clinical pathways without the confusion.
                </p>
                
                <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
                  <div className="flex flex-col items-center sm:items-start w-full sm:w-auto">
                    <Button size="lg" style={{ backgroundColor: '#2563eb', color: 'white' }} className="rounded-full w-full sm:w-auto h-14 px-8 text-base font-bold shadow-lg hover:opacity-90 transition-opacity" asChild>
                      <Link href="/signup">
                        Check your child's symptoms
                      </Link>
                    </Button>
                    <p className="mt-3 text-xs text-slate-500 font-medium">Takes 2–3 minutes. No signup required.</p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.2} duration={0.8} className="lg:pl-10">
                 <MockAgentChat />
              </ScrollReveal>
              
            </div>
          </div>
        </section>

        {/* ── 2. Trust Bar ── */}
        <ScrollReveal duration={0.8}>
          <section className="py-8 bg-white border-y border-slate-100">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 text-center">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-500" />
                  <p className="font-semibold text-slate-700">100% Private & Secure</p>
                </div>
                <div className="hidden md:block w-px h-6 bg-slate-200" />
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-blue-500" />
                  <p className="font-semibold text-slate-700">Built for Indian families</p>
                </div>
                <div className="hidden md:block w-px h-6 bg-slate-200" />
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-emerald-500" />
                  <p className="font-semibold text-slate-700">Clinically reviewed frameworks</p>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* ── 3. Problem Section (Emotional Hook) ── */}
        <section className="py-16 lg:py-20 bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal className="text-center max-w-3xl mx-auto mb-10">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
                You shouldn't have to navigate this alone.
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Finding out your child might be struggling is overwhelming. The internet makes it worse.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <ScrollReveal delay={0.1} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
                <div className="h-10 w-10 bg-red-50 rounded-full flex items-center justify-center mb-4">
                  <Heart className="h-5 w-5 text-red-400" />
                </div>
                <p className="text-lg font-bold text-slate-900 italic">"My child isn't speaking yet."</p>
                <p className="mt-2 text-slate-600 leading-relaxed text-sm">
                  Every child develops differently, but the anxiety of not knowing if something is wrong keeps you awake at night.
                </p>
              </ScrollReveal>
              
              <ScrollReveal delay={0.2} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
                <div className="h-10 w-10 bg-amber-50 rounded-full flex items-center justify-center mb-4">
                  <FileText className="h-5 w-5 text-amber-500" />
                </div>
                <p className="text-lg font-bold text-slate-900 italic">"Google is terrifying."</p>
                <p className="mt-2 text-slate-600 leading-relaxed text-sm">
                  Searching for symptoms gives you a thousand conflicting, terrifying answers that don't apply to your situation.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.3} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
                <div className="h-10 w-10 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                  <Clock className="h-5 w-5 text-blue-500" />
                </div>
                <p className="text-lg font-bold text-slate-900 italic">"The waiting lists are long."</p>
                <p className="mt-2 text-slate-600 leading-relaxed text-sm">
                  You finally decide to seek help, only to find out there is a massive wait just for an initial clinical consultation.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ── 4. Solution (How it works) ── */}
        <section className="py-16 lg:py-20 bg-white">
           <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal className="text-center max-w-3xl mx-auto mb-10">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
                A clear path forward in 3 simple steps
              </h2>
            </ScrollReveal>

            {/* Changed from floating text to structured padded cards to fix white space issues */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              
              <div className="text-center bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-10 shadow-sm transition-all hover:shadow-md">
                <div className="mx-auto h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-extrabold text-blue-600 mb-6 shadow-sm">1</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Guided Questions</h3>
                <p className="text-slate-600 text-sm leading-relaxed">Answer a few simple, conversational questions about your child's behaviors in a safe, private space.</p>
              </div>

              <div className="text-center bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-10 shadow-sm transition-all hover:shadow-md">
                <div className="mx-auto h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-extrabold text-blue-600 mb-6 shadow-sm">2</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Understand Symptoms</h3>
                <p className="text-slate-600 text-sm leading-relaxed">Get warm, intelligent insights mapping your concerns to verified clinical frameworks instantly.</p>
              </div>

              <div className="text-center bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-10 shadow-sm transition-all hover:shadow-md">
                <div className="mx-auto h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-extrabold text-blue-600 mb-6 shadow-sm">3</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Explore Pathways</h3>
                <p className="text-slate-600 text-sm leading-relaxed">Access a highly curated database of localized information, rights, and action plans you can take today.</p>
              </div>
            </div>
           </div>
        </section>

        {/* ── 6. Features -> Benefits ── */}
        <section className="py-16 lg:py-20 bg-slate-50 border-t border-slate-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ScrollReveal className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex gap-4 transition-all hover:shadow-md">
                <div className="flex-shrink-0 h-10 w-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                  <Heart className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">Understand symptoms clearly</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">Stop guessing. We translate complex medical jargon into simple language.</p>
                </div>
              </ScrollReveal>
              
              <ScrollReveal delay={0.1} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex gap-4 transition-all hover:shadow-md">
                <div className="flex-shrink-0 h-10 w-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">Immediate access to info</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">No waitlists. Filter through structured regional advice and local support networks right now.</p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex gap-4 transition-all hover:shadow-md">
                <div className="flex-shrink-0 h-10 w-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">India-specific guidance</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">Get specific guidance on your legal rights under the RPWD Act and Indian schooling boards.</p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.3} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex gap-4 transition-all hover:shadow-md">
                <div className="flex-shrink-0 h-10 w-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">Verified Clinical Logic</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">Our AI models are strictly structured around established pediatric frameworks, ensuring safety.</p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ── 8. Final CTA ── */}
        <ScrollReveal>
          <section className="py-16 lg:py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div 
                style={{ backgroundColor: '#0f172a' }}
                className="rounded-[2rem] px-6 py-12 sm:px-12 sm:py-16 text-center shadow-2xl max-w-4xl mx-auto"
              >
                <div className="relative z-10">
                  <h2 style={{ color: 'white' }} className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
                    Early intervention matters.
                  </h2>
                  <p style={{ color: '#cbd5e1' }} className="text-base sm:text-lg max-w-xl mx-auto mb-8">
                    Delays in action can impact outcomes. The sooner you understand what your child needs, the faster they can start thriving.
                  </p>
                  <div className="flex flex-col items-center justify-center w-full sm:w-auto">
                    <Button size="lg" style={{ backgroundColor: '#2563eb', color: 'white', border: 'none' }} className="rounded-full h-12 px-8 text-base font-bold shadow-lg hover:opacity-90 transition-opacity w-full sm:w-auto" asChild>
                      <Link href="/signup">Check your child's symptoms now</Link>
                    </Button>
                    <p className="mt-4 text-sm text-slate-400 font-medium">Private. Secure. Takes minutes.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>
        
      </main>

      {/* ── 9. Footer ── */}
      <footer className="bg-slate-50 border-t border-slate-200 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
            <div className="md:col-span-1">
              <Logo />
              <p className="mt-4 text-sm text-slate-500 font-medium leading-relaxed">
                Supporting Indian families through clarity.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Platform</h4>
              <ul className="space-y-3 text-sm text-slate-600">
                <li><Link href="/about" className="hover:text-blue-600 transition-colors">About</Link></li>
                <li><Link href="/contact" className="hover:text-blue-600 transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Legal & Privacy</h4>
              <ul className="space-y-3 text-sm text-slate-600">
                <li><Link href="/privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-blue-600 transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-200 pt-6 text-center text-xs sm:text-sm text-slate-500 font-medium">
            <p>CareClarity provides informational guidance powered by verified clinical frameworks. We do not diagnose. Always consult directly with a qualified healthcare professional.</p>
            <p className="mt-2 text-slate-400">© {new Date().getFullYear()} CareClarity. Proudly built for India.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
