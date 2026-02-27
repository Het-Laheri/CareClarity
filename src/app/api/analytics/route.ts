import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth-server';

/**
 * Anonymous Analytics & Feedback API
 * Ideally, this would write to BigQuery, Mixpanel, or Firestore.
 */

let analyticsEvents: any[] = [];

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { type, event, metadata, feedback } = body;

        const timestamp = new Date().toISOString();
        const user = await getAuthUser(req);
        const userId = user?.uid || 'anonymous';

        const entry = {
            timestamp,
            userId,
            type, // 'click', 'feedback', 'search'
            event, // e.g. 'resource_click', 'ai_helpful'
            metadata,
            feedback, // 1 for helpful, -1 for not helpful
        };

        analyticsEvents.push(entry);

        // In a real app, we'd limit the in-memory log or flush to DB
        if (analyticsEvents.length > 500) analyticsEvents.shift();

        console.log(`[Analytics] ${type}:${event} from ${userId}`);
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }
}

// Admin-only: GET all events (demo purposes)
export async function GET() {
    return NextResponse.json(analyticsEvents);
}
