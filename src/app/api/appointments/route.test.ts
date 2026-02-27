import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET } from '@/app/api/appointments/route';
import { NextRequest } from 'next/server';
import { getAuthUser } from '@/lib/auth-server';
import { getDb } from '@/lib/firebase-admin';

vi.mock('@/lib/auth-server', () => ({
    getAuthUser: vi.fn(),
}));

vi.mock('@/lib/firebase-admin', () => ({
    getDb: vi.fn(),
    getAuth: vi.fn(),
}));

describe('GET /api/appointments', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should return 401 if unauthorized', async () => {
        (getAuthUser as any).mockResolvedValue(null);
        const req = new NextRequest('http://localhost/api/appointments');

        const res = await GET(req);
        expect(res.status).toBe(401);
    });

    it('should return appointments for authorized user', async () => {
        const mockUser = { uid: 'user-123' };
        (getAuthUser as any).mockResolvedValue(mockUser);

        const mockDocs = [
            { id: '1', data: () => ({ doctorName: 'Dr. Smith' }) },
        ];
        const mockSnapshot = {
            docs: mockDocs,
        };
        const mockCollection = {
            where: vi.fn().mockReturnThis(),
            orderBy: vi.fn().mockReturnThis(),
            get: vi.fn().mockResolvedValue(mockSnapshot),
        };
        (getDb as any).mockReturnValue({
            collection: () => mockCollection,
        });

        const req = new NextRequest('http://localhost/api/appointments');
        const res = await GET(req);

        expect(res.status).toBe(200);
        const data = await res.json();
        expect(data[0].doctorName).toBe('Dr. Smith');
    });
});
