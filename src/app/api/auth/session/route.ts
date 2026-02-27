import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@/lib/firebase-admin';

export async function POST(req: NextRequest) {
    try {
        const { idToken } = await req.json();
        const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

        const auth = getAuth();
        const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });

        const response = NextResponse.json({ success: true });
        response.cookies.set('session', sessionCookie, {
            maxAge: expiresIn / 1000,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
        });

        return response;
    } catch (error) {
        console.error('Session creation error details:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}

export async function DELETE() {
    const response = NextResponse.json({ success: true });
    response.cookies.delete('session');
    return response;
}
