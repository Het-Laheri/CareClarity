import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/firebase-admin';
import { getAuthUser } from '@/lib/auth-server';
import { createAppointmentSchema } from '@/lib/validations/booking';
import * as admin from 'firebase-admin';
import { sendEmail } from '@/lib/email';
import { getConfirmationEmailHtml } from '@/lib/email-templates';
import {
    memGetAppointments,
    memAddAppointment,
    memIsSlotBooked,
} from '@/lib/in-memory-store';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    const user = await getAuthUser(req);
    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Try Firestore first, fallback to in-memory
    try {
        const db = getDb();
        const snapshot = await db.collection('appointments')
            .where('userId', '==', user.uid)
            .orderBy('createdAt', 'desc')
            .get();

        const appointments = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        return NextResponse.json(appointments);
    } catch (error) {
        console.warn('Firestore unavailable for GET appointments, using in-memory store:', (error as Error).message);
        const appointments = memGetAppointments(user.uid);
        return NextResponse.json(appointments);
    }
}

export async function POST(req: NextRequest) {
    const user = await getAuthUser(req);
    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await req.json();
        const result = createAppointmentSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json({ error: result.error.format() }, { status: 400 });
        }

        const { doctorId, doctorName, date, timeSlot } = result.data;

        // Try Firestore first, fallback to in-memory
        try {
            const db = getDb();
            const bookedSnapshot = await db.collection('appointments')
                .where('doctorId', '==', doctorId)
                .where('date', '==', date)
                .where('timeSlot', '==', timeSlot)
                .where('status', '==', 'confirmed')
                .limit(1)
                .get();

            if (!bookedSnapshot.empty) {
                return NextResponse.json({ error: 'This time slot is already booked' }, { status: 409 });
            }

            const docRef = await db.collection('appointments').add({
                doctorId,
                doctorName,
                userId: user.uid,
                userName: user.name || user.email || 'User',
                userEmail: user.email || '',
                date,
                timeSlot,
                status: 'confirmed',
                createdAt: admin.firestore.Timestamp.now(),
            });

            // Send confirmation email (best-effort)
            try {
                await sendEmail({
                    to: user.email || '',
                    subject: 'Appointment Confirmed - CareClarity',
                    html: getConfirmationEmailHtml(
                        user.name || 'Patient',
                        doctorName,
                        date,
                        timeSlot
                    ),
                });
            } catch (emailError) {
                console.warn('Email sending failed:', emailError);
            }

            return NextResponse.json({ id: docRef.id }, { status: 201 });
        } catch (dbError) {
            console.warn('Firestore unavailable for POST appointment, using in-memory store:', (dbError as Error).message);

            if (memIsSlotBooked(doctorId, date, timeSlot)) {
                return NextResponse.json({ error: 'This time slot is already booked' }, { status: 409 });
            }

            const id = memAddAppointment({
                doctorId,
                doctorName,
                userId: user.uid,
                userName: user.name || user.email || 'User',
                userEmail: user.email || '',
                date,
                timeSlot,
            });

            return NextResponse.json({ id }, { status: 201 });
        }
    } catch (error) {
        console.error('Error creating appointment:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
