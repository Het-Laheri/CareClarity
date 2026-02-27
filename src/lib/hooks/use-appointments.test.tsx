import { renderHook, waitFor } from '@testing-library/react';
import { useAppointments } from '@/lib/hooks/use-appointments';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import { useUser } from '@/firebase';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
});

vi.mock('@/firebase', () => ({
    useUser: vi.fn(),
}));

const mockUser = {
    uid: 'user-123',
    getIdToken: vi.fn().mockResolvedValue('fake-token'),
};

const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useAppointments', () => {
    beforeEach(() => {
        vi.stubGlobal('fetch', vi.fn());
        (useUser as any).mockReturnValue({ user: mockUser, loading: false });
        queryClient.clear();
    });

    it('should fetch appointments successfully', async () => {
        const mockAppointments = [
            { id: '1', doctorName: 'Dr. Smith', date: '2026-03-01', status: 'confirmed' },
        ];

        (fetch as any).mockResolvedValue({
            ok: true,
            json: async () => mockAppointments,
        });

        const { result } = renderHook(() => useAppointments(), { wrapper });

        expect(result.current.isLoading).toBe(true);

        await waitFor(() => expect(result.current.isSuccess).toBe(true));

        expect(result.current.data).toEqual(mockAppointments);
    });

    it('should handle fetch error', async () => {
        (fetch as any).mockResolvedValue({
            ok: false,
            status: 500,
        });

        const { result } = renderHook(() => useAppointments(), { wrapper });

        await waitFor(() => expect(result.current.isError).toBe(true));
    });
});
