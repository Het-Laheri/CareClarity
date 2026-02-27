import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth-server';

/**
 * Profile update API route.
 * PATCH /api/profile — updates the user's profile fields
 *
 * Currently stores updates in-memory keyed by uid.
 * In production, this would write to Firestore user documents.
 */

interface UserProfile {
    displayName?: string;
    childAgeGroup?: string;
    conditionTags?: string;
    goals?: string;
    role?: string;
}

const profileStore = new Map<string, UserProfile>();

// GET /api/profile — return the user's profile
export async function GET(req: NextRequest) {
    const user = await getAuthUser(req);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const profile = profileStore.get(user.uid) || {};
    return NextResponse.json({
        uid: user.uid,
        email: user.email,
        displayName: user.name || user.display_name || profile.displayName || '',
        ...profile,
    });
}

// PATCH /api/profile — update profile fields
export async function PATCH(req: NextRequest) {
    const user = await getAuthUser(req);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const body = await req.json();
        const existing = profileStore.get(user.uid) || {};
        const updated = { ...existing, ...body };
        profileStore.set(user.uid, updated);

        return NextResponse.json({
            uid: user.uid,
            email: user.email,
            ...updated,
        });
    } catch {
        return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }
}
