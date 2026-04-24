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

    // Combine booked slots from Firestore and in-memory
    let bookedSlots: string[] = [];
    let schedule = { doctorId, ...DEFAULT_SCHEDULE };

    try {
        const db = getDb();
        // 1. Get schedule config
        const scheduleSnap = await db.collection('doctorSchedules').doc(doctorId).get();
        if (scheduleSnap.exists) {
            schedule = { doctorId, ...scheduleSnap.data() as any };
        }

        // 2. Get booked slots from Firestore
        if (date) {
            const bookedSnap = await db.collection('appointments')
                .where('doctorId', '==', doctorId)
                .where('date', '==', date)
                .where('status', '==', 'confirmed')
                .get();

            bookedSlots = bookedSnap.docs.map(doc => doc.data().timeSlot);
        }
    } catch (error) {
        console.warn('Firestore error for doctor schedule:', (error as Error).message);
    }

    // 3. Always merge with in-memory booked slots as well
    if (date) {
        const memorySlots = memGetBookedSlots(doctorId, date);
        // De-duplicate slots
        bookedSlots = Array.from(new Set([...bookedSlots, ...memorySlots]));
    }

    return NextResponse.json({
        schedule,
        bookedSlots,
    });
}
