import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@/lib/firebase-admin';
import { getAuthUser } from '@/lib/auth-server';

export const dynamic = 'force-dynamic';

const ADMIN_EMAILS = [
    'admin@careclarity.app',
    'hetlaheri16@gmail.com',
    'hetlaheri1@gmail.com',
    'manojrampal16@gmail.com'
];

export async function GET(req: NextRequest) {
    const user = await getAuthUser(req);

    // Auth Check
    if (!user || !ADMIN_EMAILS.includes(user.email || '')) {
        return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 403 });
    }

    try {
        const auth = getAuth();
        const listUsersResult = await auth.listUsers(1000);
        
        const registeredUsers = listUsersResult.users.map((record) => {
            const joinedDate = new Date(record.metadata.creationTime || Date.now());
            const formattedJoined = joinedDate.toLocaleDateString('en-US', { day: 'short', month: 'short', year: 'numeric' });
            
            return {
                id: record.uid,
                name: record.displayName || 'Anonymous User',
                email: record.email || 'No email provided',
                role: ADMIN_EMAILS.includes(record.email || '') ? 'Admin' : 'Caregiver',
                status: record.disabled ? 'Inactive' : 'Active',
                joined: formattedJoined
            };
        });

        // Ensure current active admins show up even if auth accounts aren't perfectly synced yet in testing
        if (!registeredUsers.some(u => u.email === 'admin@careclarity.app')) {
            registeredUsers.unshift({
                 id: 'admin-seed-1',
                 name: 'System Admin',
                 email: 'admin@careclarity.app',
                 role: 'Admin',
                 status: 'Active',
                 joined: 'Sep 10, 2023'
            });
        }

        return NextResponse.json(registeredUsers);
    } catch (error) {
        console.error('Failed to grab firebase users for Admin UI:', error);
        return NextResponse.json({ error: 'Failed to access authentication registry.' }, { status: 500 });
    }
}
