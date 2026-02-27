import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const session = request.cookies.get('session')?.value;
    const isAuthPage = request.nextUrl.pathname.startsWith('/login') ||
        request.nextUrl.pathname.startsWith('/signup');

    // If user has a session cookie and tries to visit auth pages, redirect to dashboard
    if (isAuthPage && session) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // Dashboard/onboarding access is handled by the client-side AuthGuard component
    // which checks Firebase auth state directly
    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/onboarding', '/login', '/signup'],
};
