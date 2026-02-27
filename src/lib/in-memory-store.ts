/**
 * In-memory appointment store — used as a fallback when Firebase Admin SDK
 * cannot reach Google's servers (e.g., dev environment clock issues).
 *
 * Data lives only for the lifetime of the server process.
 */

export interface InMemoryAppointment {
    id: string;
    doctorId: string;
    doctorName: string;
    userId: string;
    userName: string;
    userEmail: string;
    date: string; // YYYY-MM-DD
    timeSlot: string;
    status: 'confirmed' | 'cancelled';
    createdAt: string; // ISO string
}

let counter = 0;
const appointments = new Map<string, InMemoryAppointment>();

// Pre-seed with sample appointments
const today = new Date();
const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
const tomorrowStr = `${tomorrow.getFullYear()}-${String(tomorrow.getMonth() + 1).padStart(2, '0')}-${String(tomorrow.getDate()).padStart(2, '0')}`;

const seed: Omit<InMemoryAppointment, 'id' | 'createdAt'>[] = [
    {
        doctorId: 'doc1',
        doctorName: 'Dr. Priya Sharma',
        userId: '__seed__',
        userName: 'Seed User',
        userEmail: 'seed@example.com',
        date: tomorrowStr,
        timeSlot: '10:00 AM',
        status: 'confirmed',
    },
    {
        doctorId: 'doc2',
        doctorName: 'Dr. Arjun Mehta',
        userId: '__seed__',
        userName: 'Seed User',
        userEmail: 'seed@example.com',
        date: tomorrowStr,
        timeSlot: '2:00 PM',
        status: 'confirmed',
    },
];

for (const s of seed) {
    const id = `mem-${++counter}`;
    appointments.set(id, { ...s, id, createdAt: new Date().toISOString() });
}

// ─── Public API ──────────────────────────────────────────────

export function memGetAppointments(userId: string): InMemoryAppointment[] {
    return Array.from(appointments.values())
        .filter((a) => a.userId === userId)
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function memGetAppointmentById(id: string): InMemoryAppointment | undefined {
    return appointments.get(id);
}

export function memAddAppointment(
    data: Omit<InMemoryAppointment, 'id' | 'createdAt' | 'status'>
): string {
    const id = `mem-${++counter}`;
    appointments.set(id, {
        ...data,
        id,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
    });
    return id;
}

export function memCancelAppointment(id: string, userId: string): boolean {
    const appt = appointments.get(id);
    if (!appt) return false;
    if (appt.userId !== userId) return false;
    appt.status = 'cancelled';
    return true;
}

export function memGetBookedSlots(doctorId: string, date: string): string[] {
    return Array.from(appointments.values())
        .filter((a) => a.doctorId === doctorId && a.date === date && a.status === 'confirmed')
        .map((a) => a.timeSlot);
}

export function memIsSlotBooked(doctorId: string, date: string, timeSlot: string): boolean {
    return Array.from(appointments.values()).some(
        (a) => a.doctorId === doctorId && a.date === date && a.timeSlot === timeSlot && a.status === 'confirmed'
    );
}

export function memGetAllAppointments(): InMemoryAppointment[] {
    return Array.from(appointments.values())
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function memDeleteAppointment(id: string): boolean {
    return appointments.delete(id);
}
