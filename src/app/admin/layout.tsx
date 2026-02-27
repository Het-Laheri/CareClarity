'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth, useUser } from '@/firebase';
import { Logo } from '@/components/logo';
import {
    LayoutDashboard,
    Users,
    Stethoscope,
    Calendar,
    BookOpen,
    LogOut,
    Menu,
    X,
    ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { signOut } from 'firebase/auth';

const ADMIN_EMAILS = [
    'admin@careclarity.app',
    'hetlaheri16@gmail.com',
    'hetlaheri1@gmail.com',
    'manojrampal16@gmail.com',
    'het@careclarity.app'
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { user, loading } = useUser();
    const auth = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        } else if (!loading && user && !ADMIN_EMAILS.includes(user.email || '')) {
            console.warn(`Admin access denied for: ${user.email}. Please add this email to ADMIN_EMAILS in src/app/admin/layout.tsx`);
            router.push('/dashboard');
        }
    }, [user, loading, router]);

    if (loading || !user || !ADMIN_EMAILS.includes(user.email || '')) {
        return (
            <div className="flex h-screen items-center justify-center bg-background">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    const navigation = [
        { name: 'Overview', href: '/admin', icon: LayoutDashboard },
        { name: 'Specialists', href: '/admin/specialists', icon: Stethoscope },
        { name: 'Appointments', href: '/admin/appointments', icon: Calendar },
        { name: 'Cureted Resources', href: '/admin/resources', icon: BookOpen },
        { name: 'Users', href: '/admin/users', icon: Users },
    ];

    const handleSignOut = async () => {
        if (auth) {
            await signOut(auth);
            router.push('/login');
        }
    };

    return (
        <div className="flex h-screen bg-secondary/30">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={cn(
                "fixed inset-y-0 left-0 z-50 w-64 bg-background border-r transform transition-transform duration-300 lg:relative lg:translate-x-0 outline-none",
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="flex flex-col h-full">
                    <div className="p-6 border-b flex items-center justify-between">
                        <Logo />
                        <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsSidebarOpen(false)}>
                            <X className="h-5 w-5" />
                        </Button>
                    </div>

                    <div className="px-6 py-4 flex items-center gap-2 text-xs font-semibold text-primary/70 uppercase tracking-widest">
                        <ShieldCheck className="h-4 w-4" />
                        Admin Hub
                    </div>

                    <ScrollArea className="flex-1 px-4">
                        <nav className="space-y-1 py-4">
                            {navigation.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={cn(
                                            "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                                            isActive
                                                ? "bg-primary text-primary-foreground"
                                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                        )}
                                    >
                                        <item.icon className="h-4 w-4" />
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </nav>
                    </ScrollArea>

                    <div className="p-4 border-t mt-auto">
                        <div className="flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground border border-dashed rounded-lg mb-4">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                {user.email?.charAt(0).toUpperCase()}
                            </div>
                            <div className="overflow-hidden">
                                <p className="truncate font-medium text-foreground">{user.displayName || 'Admin'}</p>
                                <p className="truncate text-[10px]">{user.email}</p>
                            </div>
                        </div>
                        <Button
                            variant="outline"
                            className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={handleSignOut}
                        >
                            <LogOut className="h-4 w-4" />
                            Sign Out
                        </Button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <header className="h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 bg-background border-b lg:hidden">
                    <Logo />
                    <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(true)}>
                        <Menu className="h-6 w-6" />
                    </Button>
                </header>

                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                    <div className="max-w-7xl mx-auto h-full">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
