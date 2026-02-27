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
            <div className="flex flex-col gap-8 p-4 md:p-6">
                <div>
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="mt-2 h-4 w-72" />
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                    <Skeleton className="h-64" />
                    <Skeleton className="h-64" />
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-8 p-4 md:p-6 max-w-4xl">
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
                            <CardTitle className="font-headline">Appearance</CardTitle>
                        </div>
                        <CardDescription>Customize how CareClarity looks on your device.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>Dark Mode</Label>
                                <p className="text-sm text-muted-foreground">Use the dark theme for reduced eye strain.</p>
                            </div>
                            <Switch />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>Compact View</Label>
                                <p className="text-sm text-muted-foreground">Reduce spacing for a more compact layout.</p>
                            </div>
                            <Switch />
                        </div>
                    </CardContent>
                </Card>

                {/* Notifications */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Bell className="h-5 w-5 text-primary" />
                            <CardTitle className="font-headline">Notifications</CardTitle>
                        </div>
                        <CardDescription>Choose how and when you receive notifications.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>Appointment Reminders</Label>
                                <p className="text-sm text-muted-foreground">Receive reminders before your scheduled appointments.</p>
                            </div>
                            <Switch defaultChecked />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>Resource Recommendations</Label>
                                <p className="text-sm text-muted-foreground">Get notified when new resources match your interests.</p>
                            </div>
                            <Switch defaultChecked />
                        </div>
                        <Separator />
                        <div className="space-y-2">
                            <Label>Reminder Timing</Label>
                            <Select defaultValue="1h">
                                <SelectTrigger className="w-[200px]">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="15m">15 minutes before</SelectItem>
                                    <SelectItem value="30m">30 minutes before</SelectItem>
                                    <SelectItem value="1h">1 hour before</SelectItem>
                                    <SelectItem value="1d">1 day before</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Privacy & Security */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Shield className="h-5 w-5 text-primary" />
                            <CardTitle className="font-headline">Privacy & Security</CardTitle>
                        </div>
                        <CardDescription>Manage your data and security preferences.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>Anonymize Data</Label>
                                <p className="text-sm text-muted-foreground">Anonymize your data in any analytics or usage reports.</p>
                            </div>
                            <Switch defaultChecked />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>Allow AI Learning</Label>
                                <p className="text-sm text-muted-foreground">Allow your anonymized queries to improve AI responses.</p>
                            </div>
                            <Switch />
                        </div>
                    </CardContent>
                </Card>

                {/* Danger Zone */}
                <Card className="border-destructive/50">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-destructive" />
                            <CardTitle className="font-headline text-destructive">Danger Zone</CardTitle>
                        </div>
                        <CardDescription>Irreversible actions for your account.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>Sign Out</Label>
                                <p className="text-sm text-muted-foreground">Sign out of your account on this device.</p>
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
    );
}
