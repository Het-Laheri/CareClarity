'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Logo } from '@/components/logo';

export function MobileNav() {
    const [open, setOpen] = useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex items-center justify-between mb-8">
                    <Logo />
                </div>
                <div className="flex flex-col gap-4 mt-4">
                    <Button variant="outline" asChild>
                        <Link href="/login" onClick={() => setOpen(false)}>Log in</Link>
                    </Button>
                    <Button style={{ backgroundColor: '#2563eb', color: 'white' }} asChild>
                        <Link href="/signup" onClick={() => setOpen(false)}>Check Symptoms</Link>
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
}
