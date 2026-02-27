'use client';

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Logo } from "@/components/logo";
import { useRouter } from 'next/navigation';
import { useAuth } from '@/firebase';
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

export default function SignupPage() {
  const router = useRouter();
  const auth = useAuth();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onGoogleSignup = async () => {
    if (!auth) return;
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const idToken = await user.getIdToken();

      await fetch('/api/auth/session', {
        method: 'POST',
        body: JSON.stringify({ idToken }),
        headers: { 'Content-Type': 'application/json' },
      });

      router.push('/onboarding');
    } catch (error) {
      console.error('Google signup error:', error);
      toast({
        variant: "destructive",
        title: "Google Signup failed",
        description: "Could not sign up with Google. Please try again.",
      });
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!auth) return;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: values.name,
        });

        const idToken = await userCredential.user.getIdToken();

        // Best-effort session cookie — don't block signup if it fails
        try {
          const sessionRes = await fetch('/api/auth/session', {
            method: 'POST',
            body: JSON.stringify({ idToken }),
            headers: { 'Content-Type': 'application/json' },
          });
          if (!sessionRes.ok) {
            console.warn('Session cookie creation failed, proceeding with client-side auth');
          }
        } catch (sessionError) {
          console.warn('Session cookie creation failed:', sessionError);
        }
      }
      router.push('/onboarding');
    } catch (error) {
      let description = error instanceof Error
        ? error.message
        : "An unexpected error occurred. Please try again.";

      if (error instanceof Error && 'code' in error) {
        const code = (error as { code: string }).code;
        switch (code) {
          case 'auth/email-already-in-use':
            description = "An account with this email already exists.";
            break;
          case 'auth/weak-password':
            description = "Password is too weak. Please use a stronger password.";
            break;
          case 'auth/invalid-email':
            description = "Please enter a valid email address.";
            break;
        }
      }
      toast({
        variant: "destructive",
        title: "Signup failed",
        description,
      });
    }
  };

  return (
    <main id="main-content" className="flex min-h-screen flex-col items-center justify-center bg-secondary p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-2xl">Create an Account</CardTitle>
            <CardDescription>Join our community of caregivers.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <Button
                variant="outline"
                className="w-full py-6 flex items-center justify-center gap-3 border-muted-foreground/20 hover:bg-muted/50 transition-colors"
                onClick={onGoogleSignup}
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                <span className="font-medium text-foreground">Sign up with Google</span>
              </Button>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] flex-1 bg-border" />
              <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider whitespace-nowrap">
                Or continue with email
              </span>
              <div className="h-[1px] flex-1 bg-border" />
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Jane Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="m@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Creating Account...' : 'Create Account'}
                </Button>
              </form>
            </Form>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="underline">
                Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
