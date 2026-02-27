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
import { useAuth } from '@/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Mail } from "lucide-react";

const formSchema = z.object({
    email: z.string().email({ message: "Invalid email address." }),
});

export default function ForgotPasswordPage() {
    const auth = useAuth();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });

    const { isSubmitting, isSubmitSuccessful } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        if (!auth) return;

        try {
            await sendPasswordResetEmail(auth, values.email);
            toast({
                title: "Email sent",
                description: "If an account exists with that email, you'll receive a password reset link.",
            });
        } catch (error) {
            // Don't reveal whether the email exists for security
            toast({
                title: "Email sent",
                description: "If an account exists with that email, you'll receive a password reset link.",
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
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                            <Mail className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="font-headline text-2xl">Reset Password</CardTitle>
                        <CardDescription>
                            Enter your email address and we&apos;ll send you a link to reset your password.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isSubmitSuccessful ? (
                            <div className="text-center space-y-4">
                                <p className="text-sm text-muted-foreground">
                                    Check your inbox for a password reset link. It may take a few minutes to arrive.
                                </p>
                                <Button asChild variant="outline" className="w-full">
                                    <Link href="/login">
                                        <ArrowLeft className="mr-2 h-4 w-4" />
                                        Back to Login
                                    </Link>
                                </Button>
                            </div>
                        ) : (
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                                        {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                                    </Button>
                                </form>
                            </Form>
                        )}
                        <div className="mt-4 text-center text-sm">
                            <Link href="/login" className="underline">
                                <ArrowLeft className="mr-1 inline h-3 w-3" />
                                Back to Login
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}
