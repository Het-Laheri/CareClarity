import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/firebase-admin';
import { memGetBookedSlots } from '@/lib/in-memory-store';

export const dynamic = 'force-dynamic';

const DEFAULT_SCHEDULE = {
    availableDays: [1, 2, 3, 4, 5],
    timeSlots: [
        '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
        '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM',
    ],
    slotDuration: 30,
};

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id: doctorId } = await params;
    const { searchParams } = new URL(req.url);
    const date = searchParams.get('date');

    // Try Firestore first, fallback to defaults + in-memory booked slots
    try {
        const db = getDb();
        // 1. Get schedule config
        const scheduleSnap = await db.collection('doctorSchedules').doc(doctorId).get();
        const schedule = scheduleSnap.exists
            ? { doctorId, ...scheduleSnap.data() }
            : { doctorId, ...DEFAULT_SCHEDULE };

        // 2. Get booked slots if date is provided
        let bookedSlots: string[] = [];
        if (date) {
            const bookedSnap = await db.collection('appointments')
                .where('doctorId', '==', doctorId)
                .where('date', '==', date)
                .where('status', '==', 'confirmed')
                .get();

            bookedSlots = bookedSnap.docs.map(doc => doc.data().timeSlot);
        }

        return NextResponse.json({
            schedule,
            bookedSlots,
        });
    } catch (error) {
        console.warn('Firestore unavailable for doctor schedule, using defaults + in-memory:', (error as Error).message);

        const schedule = { doctorId, ...DEFAULT_SCHEDULE };
        const bookedSlots = date ? memGetBookedSlots(doctorId, date) : [];

        return NextResponse.json({
            schedule,
            bookedSlots,
        });
    }
}
