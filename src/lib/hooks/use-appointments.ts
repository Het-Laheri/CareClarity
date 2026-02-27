'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useUser } from '@/firebase';
import { CreateAppointmentInput } from '../validations/booking';

async function fetchWithAuth(url: string, user: any, options: RequestInit = {}) {
    if (!user) throw new Error('Unauthorized');
    const token = await user.getIdToken();
    const res = await fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.error || 'Request failed');
    }
    return res.json();
}

export function useAppointments() {
    const { user } = useUser();

    return useQuery({
        queryKey: ['appointments', user?.uid],
        queryFn: () => fetchWithAuth('/api/appointments', user),
        enabled: !!user,
    });
}

export function useBookSlot() {
    const { user } = useUser();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateAppointmentInput) =>
            fetchWithAuth('/api/appointments', user, {
                method: 'POST',
                body: JSON.stringify(data),
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['appointments', user?.uid] });
            queryClient.invalidateQueries({ queryKey: ['doctor-schedule'] });
        },
    });
}

export function useCancelAppointment() {
    const { user } = useUser();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) =>
            fetchWithAuth(`/api/appointments/${id}`, user, {
                method: 'PATCH',
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['appointments', user?.uid] });
        },
    });
}

export function useDoctorSlots(doctorId: string, date?: string) {
    return useQuery({
        queryKey: ['doctor-schedule', doctorId, date],
        queryFn: async () => {
            const url = `/api/doctors/${doctorId}/schedule${date ? `?date=${date}` : ''}`;
            const res = await fetch(url);
            if (!res.ok) throw new Error('Failed to fetch schedule');
            return res.json();
        },
        enabled: !!doctorId,
    });
}
