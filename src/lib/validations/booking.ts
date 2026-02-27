import { z } from 'zod';

export const createAppointmentSchema = z.object({
    doctorId: z.string().min(1, 'Doctor ID is required'),
    doctorName: z.string().min(1, 'Doctor Name is required'),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),
    timeSlot: z.string().min(1, 'Time slot is required'),
});

export const cancelAppointmentSchema = z.object({
    id: z.string().min(1, 'Appointment ID is required'),
});

export type CreateAppointmentInput = z.infer<typeof createAppointmentSchema>;
export type CancelAppointmentInput = z.infer<typeof cancelAppointmentSchema>;
