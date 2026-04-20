import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Stethoscope, Users, Shield, Heart, FileText, MapPin, CheckCircle, Clock } from "lucide-react";
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
              <Button size="sm" className="rounded-full font-semibold px-6 shadow-sm bg-blue-600 hover:bg-blue-700 text-white" asChild>
                <Link href="/signup">Check Symptoms</Link>
              </Button>
            </div>
            <MobileNav />
          </div>
        </div>
      </header>

      <main id="main-content" className="flex-grow">
        
        {/* ── 1. Hero Section ── */}
        <section className="relative py-20 sm:py-28 lg:py-32 bg-gradient-to-b from-blue-50/50 to-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">
              
              <ScrollReveal direction="up" duration={0.8} className="max-w-2xl lg:max-w-none">
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/50 px-4 py-1.5 text-sm font-semibold text-blue-800 mb-6 shadow-sm">
                  <Shield className="h-4 w-4" />
                  Private, Secure, & Clinically Grounded
                </div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
                  Worried about your child's development?<br />
                  <span className="text-blue-600">Get clarity in minutes.</span>
                </h1>
                
                <p className="mt-6 text-lg sm:text-xl leading-relaxed text-slate-600 max-w-lg">
                  An AI-powered platform that helps Indian parents understand their child's symptoms and connects them to the right specialists, faster.
                </p>
                
                <div className="mt-10 flex flex-col sm:flex-row items-center gap-5">
                  <Button size="lg" className="rounded-full w-full sm:w-auto h-14 px-8 text-base font-bold shadow-lg shadow-blue-500/20 bg-blue-600 hover:bg-blue-700 hover:shadow-xl transition-all" asChild>
                    <Link href="/signup">
                      Check your child's symptoms
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
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
                  <Users className="h-5 w-5 text-blue-500" />
                  <p className="font-semibold text-slate-700">Trusted by <span className="font-bold text-slate-900">2,000+</span> parents</p>
                </div>
                <div className="hidden md:block w-px h-6 bg-slate-200" />
                <div className="flex items-center gap-2">
                  <Stethoscope className="h-5 w-5 text-blue-500" />
                  <p className="font-semibold text-slate-700"><span className="font-bold text-slate-900">140+</span> verified pediatric specialists</p>
                </div>
                <div className="hidden md:block w-px h-6 bg-slate-200" />
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-emerald-500" />
                  <p className="font-semibold text-slate-700">Clinically reviewed pathways</p>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* ── 3. Problem Section (Emotional Hook) ── */}
        <section className="py-20 lg:py-28 bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                You shouldn't have to navigate this alone.
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Finding out your child might be struggling is overwhelming. The internet makes it worse.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <ScrollReveal delay={0.1} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <div className="h-12 w-12 bg-red-50 rounded-full flex items-center justify-center mb-6">
                  <Heart className="h-6 w-6 text-red-400" />
                </div>
                <p className="text-xl font-bold text-slate-900 italic">"My child isn't speaking yet."</p>
                <p className="mt-4 text-slate-600 leading-relaxed">
                  Every child develops differently, but the anxiety of not knowing if something is wrong keeps you awake at night.
                </p>
              </ScrollReveal>
              
              <ScrollReveal delay={0.2} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <div className="h-12 w-12 bg-amber-50 rounded-full flex items-center justify-center mb-6">
                  <FileText className="h-6 w-6 text-amber-500" />
                </div>
                <p className="text-xl font-bold text-slate-900 italic">"Google is terrifying."</p>
                <p className="mt-4 text-slate-600 leading-relaxed">
                  Searching for symptoms gives you a thousand conflicting, terrifying answers that don't apply to your situation.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.3} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <div className="h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                  <Clock className="h-6 w-6 text-blue-500" />
                </div>
                <p className="text-xl font-bold text-slate-900 italic">"The waiting lists are months long."</p>
                <p className="mt-4 text-slate-600 leading-relaxed">
                  You finally decide to see a specialist, only to find out there is a 6-month wait just for an initial consultation.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ── 4. Solution (How it works) ── */}
        <section className="py-20 lg:py-28 bg-white">
           <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                A clear path forward in 3 simple steps
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto relative">
              <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-slate-100 -z-10" />
              
              <div className="text-center bg-white">
                <div className="mx-auto h-24 w-24 rounded-full bg-blue-50 flex items-center justify-center text-3xl font-extrabold text-blue-600 mb-6 shadow-sm border border-blue-100">1</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Guided Questions</h3>
                <p className="text-slate-600">Answer a few simple, conversational questions about your child's behaviors in a safe, private space.</p>
              </div>

              <div className="text-center bg-white">
                <div className="mx-auto h-24 w-24 rounded-full bg-blue-50 flex items-center justify-center text-3xl font-extrabold text-blue-600 mb-6 shadow-sm border border-blue-100">2</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Understand Symptoms</h3>
                <p className="text-slate-600">Get warm, intelligent insights mapping your concerns to clinical frameworks, instantly.</p>
              </div>

              <div className="text-center bg-white">
                <div className="mx-auto h-24 w-24 rounded-full bg-blue-50 flex items-center justify-center text-3xl font-extrabold text-blue-600 mb-6 shadow-sm border border-blue-100">3</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Connect Locally</h3>
                <p className="text-slate-600">We match you with verified, available speech therapists and occupational experts in your city.</p>
              </div>
            </div>
           </div>
        </section>

        {/* ── 6. Features -> Benefits ── */}
        <section className="py-20 lg:py-28 bg-slate-50 border-t border-slate-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
              <ScrollReveal>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 mt-1 h-12 w-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
                    <Heart className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Understand symptoms clearly</h3>
                    <p className="text-slate-600 leading-relaxed">Stop guessing. We translate complex medical jargon into simple, supportive language so you know exactly what is happening with your child's development.</p>
                  </div>
                </div>
              </ScrollReveal>
              
              <ScrollReveal delay={0.1}>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 mt-1 h-12 w-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Fast access, no waiting months</h3>
                    <p className="text-slate-600 leading-relaxed">Don't wait six months for an initial diagnostic appointment. Our directory connects you with available, highly-rated specialists who can see you sooner.</p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 mt-1 h-12 w-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">India-specific guidance</h3>
                    <p className="text-slate-600 leading-relaxed">The healthcare system here is unique. We provide specific guidance on your legal rights under the RPWD Act and navigate you through standard Indian schooling boards.</p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 mt-1 h-12 w-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
                    <Shield className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Verified, trustworthy specialists</h3>
                    <p className="text-slate-600 leading-relaxed">Every professional on our platform is strictly verified. You connect only with RCI-registered clinical psychologists, certified therapists, and established pediatricians.</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ── 7. Social Proof ── */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                Families finding peace of mind
              </h2>
            </ScrollReveal>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-sm">
                <div className="flex text-amber-400 mb-4">{'★'.repeat(5)}</div>
                <p className="text-slate-700 italic mb-6">"I was panicking because my son wouldn't make eye contact. CareClarity explained Sensory Processing gently without scaring me, and matched me with an amazing OT in my area within 48 hours."</p>
                <div className="font-semibold text-slate-900">— Priya S., Mumbai</div>
              </div>
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-sm">
                <div className="flex text-amber-400 mb-4">{'★'.repeat(5)}</div>
                <p className="text-slate-700 italic mb-6">"The sheer amount of information on the internet is paralyzing. Using the Chat feature felt like finally talking to a doctor who had time to sit down and just listen to me."</p>
                <div className="font-semibold text-slate-900">— Amit K., Bengaluru</div>
              </div>
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-sm">
                <div className="flex text-amber-400 mb-4">{'★'.repeat(5)}</div>
                <p className="text-slate-700 italic mb-6">"I didn't know anything about my rights under the RPWD Act until this platform guided me. Highly recommend for any parent who feels completely lost."</p>
                <div className="font-semibold text-slate-900">— Anjali R., Delhi</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 8. Final CTA ── */}
        <ScrollReveal>
          <section className="py-20 lg:py-28">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="rounded-[2.5rem] bg-blue-600 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-opacity-50 px-6 py-16 sm:px-12 sm:py-24 text-center shadow-xl max-w-5xl mx-auto relative overflow-hidden">
                <div className="relative z-10">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white max-w-3xl mx-auto leading-tight">
                    Early intervention changes lives.
                  </h2>
                  <p className="mt-6 text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto font-medium">
                    The sooner you understand what your child needs, the faster they can start thriving. Don't wait and worry.
                  </p>
                  <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button size="lg" className="rounded-full h-14 px-10 text-lg font-bold bg-white text-blue-600 hover:bg-slate-50 w-full sm:w-auto shadow-lg" asChild>
                      <Link href="/signup">Check your child's symptoms now</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>
        
      </main>

      {/* ── 9. Footer ── */}
      <footer className="bg-slate-50 border-t border-slate-200 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-1">
              <Logo />
              <p className="mt-4 text-sm text-slate-500">
                Supporting Indian families through clarity, community, and clinical connection.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Platform</h4>
              <ul className="space-y-3 text-sm text-slate-600">
                <li><Link href="/signup" className="hover:text-blue-600 transition-colors">Start Assessment</Link></li>
                <li><Link href="/login" className="hover:text-blue-600 transition-colors">Parent Login</Link></li>
                <li><Link href="/#specialists" className="hover:text-blue-600 transition-colors">For Providers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Legal & Privacy</h4>
              <ul className="space-y-3 text-sm text-slate-600">
                <li><Link href="/#privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
                <li><Link href="/#terms" className="hover:text-blue-600 transition-colors">Terms of Service</Link></li>
                <li><Link href="/#data" className="hover:text-blue-600 transition-colors">Data Security</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Medical Disclaimer</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                CareClarity provides informational guidance powered by verified clinical frameworks. We do not provide medical diagnoses. Always consult directly with a qualified healthcare professional regarding any medical concerns about your child.
              </p>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-slate-200 text-center text-sm text-slate-500 font-medium">
            <p>© {new Date().getFullYear()} CareClarity. Proudly built for India.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
