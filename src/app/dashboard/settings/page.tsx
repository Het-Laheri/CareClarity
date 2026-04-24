'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth, useUser } from "@/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { AlertTriangle, LogOut, Moon, Bell, Shield, Palette } from "lucide-react";

export default function SettingsPage() {
    const { user, loading } = useUser();
    const auth = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        if (auth) {
            await fetch('/api/auth/session', { method: 'DELETE' });
            await signOut(auth);
            router.push('/login');
        }
    };

    if (loading) {
        return (
            <div className="flex-1 overflow-y-auto">
                <div className="flex flex-col gap-8 p-4 md:p-6 w-full">
                    <div>
                        <Skeleton className="h-8 w-48" />
                        <Skeleton className="mt-2 h-4 w-72" />
                    </div>
                    <div className="grid gap-6 md:grid-cols-2">
                        <Skeleton className="h-64" />
                        <Skeleton className="h-64" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-y-auto">
            <div className="flex flex-col gap-8 p-4 md:p-6 w-full">
                <div>
                    <h1 className="font-headline text-3xl font-bold tracking-tight">
                        Settings
                    </h1>
                    <p className="text-muted-foreground">
                        Manage your app preferences and account settings.
                    </p>
                </div>

                <div className="grid gap-6">
                    {/* Appearance */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Palette className="h-5 w-5 text-primary" />
                                <CardTitle className="font-headline text-xl">Appearance</CardTitle>
                            </div>
                            <CardDescription>
                                Customize how CareClarity looks on your device.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Dark Mode</Label>
                                    <p className="text-sm text-muted-foreground">Adjust the interface for low-light environments.</p>
                                </div>
                                <Switch disabled />
                            </div>
                            <Separator />
                            <div className="space-y-2">
                                <Label>Font Size</Label>
                                <Select defaultValue="medium">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select size" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="small">Small</SelectItem>
                                        <SelectItem value="medium">Medium</SelectItem>
                                        <SelectItem value="large">Large</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Notifications */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Bell className="h-5 w-5 text-primary" />
                                <CardTitle className="font-headline text-xl">Notifications</CardTitle>
                            </div>
                            <CardDescription>
                                Control how and when you receive updates.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Email Notifications</Label>
                                    <p className="text-sm text-muted-foreground">Receive weekly resource summaries.</p>
                                </div>
                                <Switch defaultChecked disabled />
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Care Alerts</Label>
                                    <p className="text-sm text-muted-foreground">Real-time alerts for scheduled appointments.</p>
                                </div>
                                <Switch defaultChecked disabled />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Privacy & Security */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Shield className="h-5 w-5 text-primary" />
                                <CardTitle className="font-headline text-xl">Privacy & Security</CardTitle>
                            </div>
                            <CardDescription>
                                Manage your data and account security.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Two-Factor Authentication</Label>
                                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account.</p>
                                </div>
                                <Button variant="outline" size="sm" disabled>Enable</Button>
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Data Usage</Label>
                                    <p className="text-sm text-muted-foreground">Anonymized sharing to improve AI clinical models.</p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Danger Zone */}
                    <Card className="border-destructive/50">
                        <CardHeader>
                            <div className="flex items-center gap-2 text-destructive">
                                <AlertTriangle className="h-5 w-5" />
                                <CardTitle className="font-headline text-xl">Danger Zone</CardTitle>
                            </div>
                            <CardDescription>
                                Actions that cannot be undone.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Sign Out</Label>
                                    <p className="text-sm text-muted-foreground">Logout of your current session.</p>
                                </div>
                                <Button variant="outline" onClick={handleLogout}>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Sign Out
                                </Button>
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Delete Account</Label>
                                    <p className="text-sm text-muted-foreground">Permanently delete your account and all associated data.</p>
                                </div>
                                <Button variant="destructive" disabled>
                                    Delete Account
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
