import { describe, it, expect } from 'vitest';
import { createAppointmentSchema } from '@/lib/validations/booking';

describe('createAppointmentSchema', () => {
    it('should validate correct booking data', () => {
        const data = {
            doctorId: 'doc-123',
            doctorName: 'Dr. Smith',
            date: '2026-03-01',
            timeSlot: '10:00 AM',
        };
        const result = createAppointmentSchema.safeParse(data);
        expect(result.success).toBe(true);
    });

    it('should fail if doctorId is missing', () => {
        const data = {
            doctorName: 'Dr. Smith',
            date: '2026-03-01',
            timeSlot: '10:00 AM',
        };
        const result = createAppointmentSchema.safeParse(data);
        expect(result.success).toBe(false);
    });

    it('should fail if date is invalid format', () => {
        const data = {
            doctorId: 'doc-123',
            doctorName: 'Dr. Smith',
            date: '01-03-2026', // Wrong format
            timeSlot: '10:00 AM',
        };
        const result = createAppointmentSchema.safeParse(data);
        expect(result.success).toBe(false);
    });

    it('should fail if timeSlot is missing', () => {
        const data = {
            doctorId: 'doc-123',
            doctorName: 'Dr. Smith',
            date: '2026-03-01',
        };
        const result = createAppointmentSchema.safeParse(data);
        expect(result.success).toBe(false);
    });
});
