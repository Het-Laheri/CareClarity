import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/firebase-admin';
import { getAuthUser } from '@/lib/auth-server';
import { sendEmail } from '@/lib/email';
import { getCancellationEmailHtml } from '@/lib/email-templates';
import { memGetAppointmentById, memCancelAppointment } from '@/lib/in-memory-store';

export const dynamic = 'force-dynamic';

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const user = await getAuthUser(req);
    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    // Try Firestore first, fallback to in-memory
    try {
        const db = getDb();
        const docRef = db.collection('appointments').doc(id);
        const doc = await docRef.get();

        if (!doc.exists) {
            return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
        }

        if (doc.data()?.userId !== user.uid) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        await docRef.update({ status: 'cancelled' });

        // Send cancellation email (best-effort)
        try {
            const data = doc.data()!;
            await sendEmail({
                to: user.email!,
                subject: 'Appointment Cancelled - CareClarity',
                html: getCancellationEmailHtml(
                    user.display_name || 'Patient',
                    data.doctorName,
                    data.date,
                    data.timeSlot
                ),
            });
        } catch (emailError) {
            console.warn('Email sending failed:', emailError);
        }

        return NextResponse.json({ success: true });
    } catch (dbError) {
        console.warn('Firestore unavailable for PATCH appointment, using in-memory store:', (dbError as Error).message);

        const appt = memGetAppointmentById(id);
        if (!appt) {
            return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
        }

        const success = memCancelAppointment(id, user.uid);
        if (!success) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        return NextResponse.json({ success: true });
    }
}
