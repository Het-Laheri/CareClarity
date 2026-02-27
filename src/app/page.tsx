import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, Stethoscope, Users, CheckCircle, Shield, Heart } from "lucide-react";
import { Logo } from "@/components/logo";
import { placeHolderImages } from "@/lib/placeholder-images";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/scroll-reveal";
import { AnimatedCard } from "@/components/ui/animated-card";

export default function Home() {
  const heroImage = placeHolderImages.find(p => p.id === "landing-hero");
  const featureAI = placeHolderImages.find(p => p.id === "feature-ai");
  const featureDoctor = placeHolderImages.find(p => p.id === "feature-doctor");
  const featureCommunity = placeHolderImages.find(p => p.id === "feature-community");

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 sm:h-20 items-center justify-between">
            <Logo />
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/signup">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main id="main-content" className="flex-grow">
        {/* Hero Section */}
        <section className="py-12 sm:py-20 md:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-8 sm:gap-12 md:grid-cols-2">
              <ScrollReveal direction="left" duration={0.7}>
                <div className="max-w-xl">
                  <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
                    <Heart className="h-4 w-4" />
                    Trusted by 2,000+ Indian caregivers
                  </div>
                  <h1 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
                    Clarity and support for your child&apos;s journey.
                  </h1>
                  <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-muted-foreground">
                    CareClarity provides medically-grounded information and AI-assisted guidance for parents of children with neurodevelopmental conditions. A safe space to learn and find resources.
                  </p>
                  <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <Button size="lg" asChild className="group w-full sm:w-auto">
                      <Link href="/signup">
                        Sign Up for Free
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Shield className="h-4 w-4 text-green-500" />
                      <span>No credit card required</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
              <ScrollReveal direction="right" delay={0.2} duration={0.7}>
                <div className="flex justify-center">
                  {heroImage && (
                    <div className="relative">
                      <Image
                        src={heroImage.imageUrl}
                        alt={heroImage.description}
                        width={560}
                        height={400}
                        className="rounded-2xl shadow-2xl w-full max-w-lg object-cover aspect-[4/3]"
                        data-ai-hint={heroImage.imageHint}
                        priority
                        unoptimized
                      />
                      {/* Floating trust badge */}
                      <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 rounded-xl bg-background shadow-lg p-3 sm:p-4 border">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <div>
                            <p className="text-xs sm:text-sm font-semibold">Verified Resources</p>
                            <p className="text-xs text-muted-foreground">Medically reviewed</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <ScrollReveal>
          <section className="border-y bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
              <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4 text-center">
                <div>
                  <p className="font-headline text-2xl sm:text-3xl font-bold text-primary">2,000+</p>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">Active Caregivers</p>
                </div>
                <div>
                  <p className="font-headline text-2xl sm:text-3xl font-bold text-primary">50+</p>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">Verified Specialists</p>
                </div>
                <div>
                  <p className="font-headline text-2xl sm:text-3xl font-bold text-primary">500+</p>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">Resources Curated</p>
                </div>
                <div>
                  <p className="font-headline text-2xl sm:text-3xl font-bold text-primary">24/7</p>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">AI Guidance</p>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Features Section */}
        <section className="py-16 sm:py-24 md:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal className="text-center max-w-2xl mx-auto">
              <h2 className="font-headline text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
                How CareClarity Helps
              </h2>
              <p className="mt-4 text-base sm:text-lg text-muted-foreground">
                We provide the tools you need, right when you need them — tailored for Indian families navigating neurodevelopmental care.
              </p>
            </ScrollReveal>
            <StaggerContainer className="mt-12 sm:mt-16 grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">
              <StaggerItem>
                <AnimatedCard className="h-full overflow-hidden">
                  {featureAI && (
                    <div className="relative h-40 sm:h-48 w-full overflow-hidden">
                      <Image
                        src={featureAI.imageUrl}
                        alt={featureAI.description}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                        data-ai-hint={featureAI.imageHint}
                        loading="lazy"
                        unoptimized
                      />
                    </div>
                  )}
                  <div className="p-5 sm:p-6 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 -mt-10 relative z-10 border-4 border-background">
                      <Bot className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-headline text-lg sm:text-xl font-semibold mt-3">AI-Assisted Guidance</h3>
                    <p className="text-sm sm:text-base text-muted-foreground mt-2">Get explainable, safe, and grounded answers to your questions, powered by AI that understands your needs without giving medical advice.</p>
                  </div>
                </AnimatedCard>
              </StaggerItem>
              <StaggerItem>
                <AnimatedCard className="h-full overflow-hidden">
                  {featureDoctor && (
                    <div className="relative h-40 sm:h-48 w-full overflow-hidden">
                      <Image
                        src={featureDoctor.imageUrl}
                        alt={featureDoctor.description}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                        data-ai-hint={featureDoctor.imageHint}
                        loading="lazy"
                        unoptimized
                      />
                    </div>
                  )}
                  <div className="p-5 sm:p-6 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 -mt-10 relative z-10 border-4 border-background">
                      <Stethoscope className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-headline text-lg sm:text-xl font-semibold mt-3">Doctor Discovery</h3>
                    <p className="text-sm sm:text-base text-muted-foreground mt-2">Find and connect with specialists and resources tailored to your child&apos;s needs, location, and condition categories.</p>
                  </div>
                </AnimatedCard>
              </StaggerItem>
              <StaggerItem>
                <AnimatedCard className="h-full overflow-hidden">
                  {featureCommunity && (
                    <div className="relative h-40 sm:h-48 w-full overflow-hidden">
                      <Image
                        src={featureCommunity.imageUrl}
                        alt={featureCommunity.description}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                        data-ai-hint={featureCommunity.imageHint}
                        loading="lazy"
                        unoptimized
                      />
                    </div>
                  )}
                  <div className="p-5 sm:p-6 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 -mt-10 relative z-10 border-4 border-background">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-headline text-lg sm:text-xl font-semibold mt-3">Community & Resources</h3>
                    <p className="text-sm sm:text-base text-muted-foreground mt-2">Access a curated knowledge base and connect with a community that understands your journey. (Feature coming soon)</p>
                  </div>
                </AnimatedCard>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </section>

        {/* CTA Section */}
        <ScrollReveal>
          <section className="bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
              <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl font-bold">
                Ready to start your journey?
              </h2>
              <p className="mt-4 text-base sm:text-lg opacity-90 max-w-2xl mx-auto">
                Join thousands of Indian caregivers who trust CareClarity for guidance, resources, and support.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" variant="secondary" asChild className="group w-full sm:w-auto">
                  <Link href="/signup">
                    Get Started for Free
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="w-full sm:w-auto border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  <Link href="/login">Already have an account?</Link>
                </Button>
              </div>
            </div>
          </section>
        </ScrollReveal>
      </main>

      <footer className="bg-background border-t">
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <Logo />
            <p className="text-xs sm:text-sm text-muted-foreground">
              © {new Date().getFullYear()} CareClarity. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
