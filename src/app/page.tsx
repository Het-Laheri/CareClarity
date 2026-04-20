import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, Stethoscope, Users, Shield, Sparkles } from "lucide-react";
import { Logo } from "@/components/logo";
import { MobileNav } from "@/components/mobile-nav";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { MockAgentChat } from "@/components/ui/mock-agent-chat";
import { AnimatedBento } from "@/components/ui/animated-bento";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-primary/20 selection:text-primary relative overflow-hidden">
      
      {/* ── Ambient Hero Gradients (Glassmorphic vibe) ── */}
      <div className="absolute top-0 -left-1/4 w-[150%] h-[800px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100/40 via-background to-background -z-10" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-100/30 to-transparent -z-10 blur-3xl opacity-60" />

      <header className="sticky top-0 z-50 bg-background/60 backdrop-blur-2xl border-b border-border/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 sm:h-20 items-center justify-between">
            <Logo />
            <div className="hidden md:flex items-center space-x-6">
              <Button variant="ghost" size="sm" className="font-semibold" asChild>
                <Link href="/login">Log in</Link>
              </Button>
              <Button size="sm" className="rounded-full font-semibold px-6 shadow-sm" asChild>
                <Link href="/signup">Get Started</Link>
              </Button>
            </div>
            <MobileNav />
          </div>
        </div>
      </header>

      <main id="main-content" className="flex-grow">
        
        {/* ── Hero Section ── */}
        <section className="py-20 sm:py-28 lg:py-36">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">
              
              <ScrollReveal direction="up" duration={0.8} className="max-w-2xl lg:max-w-none">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/50 backdrop-blur max-w-fit px-4 py-1.5 text-sm font-semibold text-primary mb-6 shadow-sm">
                  <Sparkles className="h-4 w-4" />
                  Next-Generation Caregiver Copilot
                </div>
                
                <h1 className="font-headline text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter text-foreground leading-[1.1]">
                  Clarity for your <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">child's journey.</span>
                </h1>
                
                <p className="mt-6 text-lg sm:text-xl leading-relaxed text-muted-foreground opacity-90 max-w-lg">
                  A highly intelligent, empathetic platform connecting Indian families navigating neurodevelopmental conditions with clinically-backed answers and verified specialists.
                </p>
                
                <div className="mt-10 flex flex-col sm:flex-row items-center gap-5">
                  <Button size="lg" className="rounded-full w-full sm:w-auto h-14 px-8 text-base shadow-lg shadow-primary/20 hover:shadow-xl transition-shadow group" asChild>
                    <Link href="/signup">
                      Start your journey
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium w-full sm:w-auto justify-center">
                    <Shield className="h-4 w-4 text-emerald-500" />
                    Medical-grade privacy
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.2} duration={0.8}>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent blur-3xl opacity-50 group-hover:opacity-70 transition-opacity" />
                  <MockAgentChat />
                </div>
              </ScrollReveal>
              
            </div>
          </div>
        </section>

        {/* ── Stats Section ── */}
        <ScrollReveal duration={0.8}>
          <section className="relative z-10 py-10 bg-gradient-to-b from-background to-muted/30 border-y border-border/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-border/50">
                <div className="px-4">
                  <p className="text-4xl font-bold tracking-tighter text-foreground">2.4k+</p>
                  <p className="text-sm font-semibold text-muted-foreground mt-2 tracking-wide uppercase">Active Caregivers</p>
                </div>
                <div className="px-4">
                  <p className="text-4xl font-bold tracking-tighter text-foreground">0ms</p>
                  <p className="text-sm font-semibold text-muted-foreground mt-2 tracking-wide uppercase">Edge Latency</p>
                </div>
                <div className="px-4">
                  <p className="text-4xl font-bold tracking-tighter text-foreground">140+</p>
                  <p className="text-sm font-semibold text-muted-foreground mt-2 tracking-wide uppercase">Verified Doctors</p>
                </div>
                <div className="px-4">
                  <p className="text-4xl font-bold tracking-tighter text-foreground">24/7</p>
                  <p className="text-sm font-semibold text-muted-foreground mt-2 tracking-wide uppercase">Always Online</p>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* ── Asymmetrical Bento Features ── */}
        <section className="py-24 lg:py-32 relative">
          {/* subtle mesh */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none -z-10" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
              <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter text-foreground">
                Engineered for specialized care.
              </h2>
              <p className="mt-5 text-lg text-muted-foreground">
                Ditch the generic parenting blogs. CareClarity was architected from the ground up to solve the actual bottlenecks families face.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-6 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
              
              {/* Box 1 (Large left) */}
              <AnimatedBento delay={0.1} className="md:col-span-4 md:row-span-2 bg-gradient-to-br from-background to-indigo-50/30">
                <div className="h-14 w-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 mb-6 group-hover:scale-110 transition-transform">
                  <Bot className="h-7 w-7 text-indigo-600" />
                </div>
                <h3 className="text-2xl font-bold tracking-tight mb-3">Self-Healing Agentic AI</h3>
                <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
                  Powered by Llama 3.3 and a deterministic Lexical Information Retrieval (IR) graph. The Wellness Hub analyzes complex symptoms using strict clinical parameters before ever generating a letter.
                </p>
                <div className="mt-auto pt-10">
                  <div className="p-4 rounded-xl bg-background border shadow-sm flex items-center gap-4 w-fit">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                    <span className="text-sm font-semibold">Native Cloud Search Operational</span>
                  </div>
                </div>
              </AnimatedBento>

              {/* Box 2 (Top right) */}
              <AnimatedBento delay={0.2} className="md:col-span-2 md:row-span-1 border-t-4 border-t-purple-400">
                <div className="h-12 w-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4 group-hover:-rotate-12 transition-transform">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold tracking-tight mb-2">Resource Ecosystem</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Thousands of structured articles specifically matching Indian local laws, therapy rights (RPWD Act), and early intervention tactics.
                </p>
              </AnimatedBento>

              {/* Box 3 (Bottom right) */}
              <AnimatedBento delay={0.3} className="md:col-span-2 md:row-span-1 border-t-4 border-t-blue-400">
                <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform">
                  <Stethoscope className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold tracking-tight mb-2">Verified Specialists</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  A high-speed recommendation flow. No more relying on word of mouth; connect with local clinics structured dynamically around availability.
                </p>
              </AnimatedBento>

            </div>
          </div>
        </section>

        {/* ── CTA Banner ── */}
        <ScrollReveal>
          <section className="py-20 lg:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative rounded-3xl overflow-hidden bg-primary px-6 py-16 sm:px-12 sm:py-24 text-center shadow-2xl">
                {/* Decorative radial gradients on CTA */}
                <div className="absolute top-0 -left-1/4 w-[150%] h-[150%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/20 to-transparent blur-3xl pointer-events-none" />
                
                <h2 className="relative font-headline text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter text-primary-foreground max-w-3xl mx-auto leading-tight">
                  Start your journey into transparent pediatric care today.
                </h2>
                <p className="relative mt-6 text-lg sm:text-xl text-primary-foreground/80 max-w-2xl mx-auto">
                  Sign up in seconds to access the Wellness Hub and connect with local specialists tailored to your precise demographic.
                </p>
                <div className="relative mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button size="lg" variant="secondary" className="rounded-full h-14 px-8 text-base font-bold shadow-xl w-full sm:w-auto" asChild>
                    <Link href="/signup">Create Free Profile</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="rounded-full h-14 px-8 text-base font-bold border-primary-foreground/30 text-primary-foreground hover:bg-white/10 w-full sm:w-auto backdrop-blur-sm" asChild>
                    <Link href="/login">Sign In</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>
        
      </main>

      <footer className="bg-background border-t py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground font-medium">
          <p>© {new Date().getFullYear()} CareClarity Systems. Developed for India.</p>
        </div>
      </footer>
    </div>
  );
}
