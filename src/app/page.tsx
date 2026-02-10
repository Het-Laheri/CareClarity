import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Bot, Stethoscope, Users } from "lucide-react";
import { Logo } from "@/components/logo";
import { placeHolderImages } from "@/lib/placeholder-images";

export default function Home() {
  const heroImage = placeHolderImages.find(p => p.id === "landing-hero");
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Logo />
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-grow">
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
              <div className="max-w-xl">
                <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                  Clarity and support for your child's journey.
                </h1>
                <p className="mt-6 text-lg leading-8 text-muted-foreground">
                  CareClarity provides medically-grounded information and AI-assisted guidance for parents of children with neurodevelopmental conditions. A safe space to learn and find resources.
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  <Button size="lg" asChild>
                    <Link href="/signup">
                      Sign Up for Free
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="flex justify-center">
                {heroImage && (
                  <Image
                    src={heroImage.imageUrl}
                    alt={heroImage.description}
                    width={500}
                    height={500}
                    className="rounded-xl shadow-2xl"
                    data-ai-hint={heroImage.imageHint}
                  />
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-secondary py-24 sm:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                How CareClarity Helps
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                We provide the tools you need, right when you need them.
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                    <Bot className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="font-headline mt-4">AI-Assisted Guidance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Get explainable, safe, and grounded answers to your questions, powered by AI that understands your needs without giving medical advice.</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                    <Stethoscope className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="font-headline mt-4">Doctor Discovery</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Find and connect with specialists and resources tailored to your child’s needs, location, and condition categories.</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="font-headline mt-4">Community & Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Access a curated knowledge base and connect with a community that understands your journey. (Feature coming soon)</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-background">
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground md:mt-0">
              © {new Date().getFullYear()} CareClarity. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
