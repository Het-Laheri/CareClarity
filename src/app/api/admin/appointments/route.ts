import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/firebase-admin';
import { getAuthUser } from '@/lib/auth-server';
import { memGetAllAppointments } from '@/lib/in-memory-store';

export const dynamic = 'force-dynamic';

const ADMIN_EMAILS = [
    'admin@careclarity.app',
    'hetlaheri16@gmail.com',
    'hetlaheri1@gmail.com',
    'manojrampal16@gmail.com'
];

export async function GET(req: NextRequest) {
    const user = await getAuthUser(req);

    // Auth Check
    if (!user || !ADMIN_EMAILS.includes(user.email || '')) {
        return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 403 });
    }

    // Try Firestore first, fallback to in-memory
    try {
        const db = getDb();
        const snapshot = await db.collection('appointments')
            .orderBy('createdAt', 'desc')
            .get();

        const appointments = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        return NextResponse.json(appointments);
    } catch (error) {
        console.warn('Firestore unavailable for admin GET, using in-memory store:', (error as Error).message);
        const appointments = memGetAllAppointments();
        return NextResponse.json(appointments);
    }
}

// DELETE /api/admin/appointments?id=<id>
export async function DELETE(req: NextRequest) {
    const user = await getAuthUser(req);
    if (!user || !ADMIN_EMAILS.includes(user.email || '')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const id = req.nextUrl.searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    try {
        const db = getDb();
        await db.collection('appointments').doc(id).delete();
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
    }
}
