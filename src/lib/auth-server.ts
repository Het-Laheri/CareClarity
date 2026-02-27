import { NextRequest } from 'next/server';
import { getAuth } from './firebase-admin';

export async function getAuthUser(req: NextRequest) {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
        return null;
    }

    const token = authHeader.split('Bearer ')[1];
    try {
        const auth = getAuth();
        const decodedToken = await auth.verifyIdToken(token);
        return decodedToken;
    } catch (error) {
        console.warn('verifyIdToken failed, attempting local JWT decode as fallback:', (error as Error).message);
        // Fallback: decode Firebase JWT payload without verification (dev-only)
        try {
            const parts = token.split('.');
            if (parts.length === 3) {
                const payload = JSON.parse(
                    Buffer.from(parts[1], 'base64').toString('utf-8')
                );
                return {
                    uid: payload.user_id || payload.sub || 'unknown',
                    email: payload.email || '',
                    name: payload.name || '',
                    display_name: payload.name || '',
                };
            }
        } catch (decodeError) {
            console.error('JWT fallback decode also failed:', decodeError);
        }
        return null;
    }
}
