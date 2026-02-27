'use client';

import {
    collection,
    doc,
    getDocs,
    getDoc,
    setDoc,
    addDoc,
    updateDoc,
    query,
    where,
    orderBy,
    Timestamp,
    type Firestore,
} from 'firebase/firestore';
import { doctors } from './doctors';

// Types
export interface DoctorSchedule {
    doctorId: string;
    availableDays: number[]; // 0=Sun, 1=Mon, ..., 6=Sat
    timeSlots: string[];
    slotDuration: number; // minutes
}

export interface Appointment {
    id?: string;
    doctorId: string;
    doctorName: string;
    userId: string;
    userName: string;
    userEmail: string;
    date: string; // YYYY-MM-DD
    timeSlot: string;
    status: 'confirmed' | 'cancelled';
    createdAt: Timestamp;
}

// Default schedule for all doctors
const DEFAULT_SCHEDULE: Omit<DoctorSchedule, 'doctorId'> = {
    availableDays: [1, 2, 3, 4, 5], // Mon-Fri
    timeSlots: [
        '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
        '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM',
    ],
    slotDuration: 30,
};

// Get doctor schedule from Firestore, or return defaults
export async function getDoctorSchedule(
    firestore: Firestore,
    doctorId: string
): Promise<DoctorSchedule> {
    try {
        const docRef = doc(firestore, 'doctorSchedules', doctorId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data() as DoctorSchedule;
        }
    } catch (e) {
        console.error('Error fetching doctor schedule:', e);
    }

    // Return default schedule if not found
    return { doctorId, ...DEFAULT_SCHEDULE };
}

// Get booked slots for a specific doctor and date
export async function getBookedSlots(
    firestore: Firestore,
    doctorId: string,
    date: string
): Promise<string[]> {
    try {
        const q = query(
            collection(firestore, 'appointments'),
            where('doctorId', '==', doctorId),
            where('date', '==', date),
            where('status', '==', 'confirmed')
        );
        const snapshot = await getDocs(q);
        return snapshot.docs.map((doc) => doc.data().timeSlot);
    } catch (e) {
        console.error('Error fetching booked slots:', e);
        return [];
    }
}

// Create a new appointment
export async function createAppointment(
    firestore: Firestore,
    data: Omit<Appointment, 'id' | 'createdAt' | 'status'>
): Promise<string> {
    // First check if the slot is still available
    const bookedSlots = await getBookedSlots(firestore, data.doctorId, data.date);
    if (bookedSlots.includes(data.timeSlot)) {
        throw new Error('This time slot has already been booked. Please select another.');
    }

    const docRef = await addDoc(collection(firestore, 'appointments'), {
        ...data,
        status: 'confirmed',
        createdAt: Timestamp.now(),
    });

    return docRef.id;
}

// Get all appointments for a user
export async function getUserAppointments(
    firestore: Firestore,
    userId: string
): Promise<Appointment[]> {
    try {
        const q = query(
            collection(firestore, 'appointments'),
            where('userId', '==', userId),
            orderBy('createdAt', 'desc')
        );
        const snapshot = await getDocs(q);
        return snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as Appointment[];
    } catch (e) {
        console.error('Error fetching user appointments:', e);
        return [];
    }
}

// Cancel an appointment
export async function cancelAppointment(
    firestore: Firestore,
    appointmentId: string
): Promise<void> {
    const docRef = doc(firestore, 'appointments', appointmentId);
    await updateDoc(docRef, { status: 'cancelled' });
}

// Seed doctor schedules (run once)
export async function seedDoctorSchedules(firestore: Firestore): Promise<void> {
    for (const doctor of doctors) {
        const docRef = doc(firestore, 'doctorSchedules', doctor.id);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
            await setDoc(docRef, {
                doctorId: doctor.id,
                ...DEFAULT_SCHEDULE,
            });
        }
    }
}
