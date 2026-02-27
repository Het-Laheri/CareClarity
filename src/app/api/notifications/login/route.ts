import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';
import { getLoginNotificationEmailHtml } from '@/lib/email-templates';

export async function POST(req: NextRequest) {
    try {
        const { email, name, browser } = await req.json();

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        const time = new Date().toLocaleString('en-IN', {
            timeZone: 'Asia/Kolkata',
            dateStyle: 'full',
            timeStyle: 'short',
        });

        await sendEmail({
            to: email,
            subject: 'Security Alert: New Login to CareClarity',
            html: getLoginNotificationEmailHtml(name || 'User', browser || 'Unknown Device', time),
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Login notification error:', error);
        return NextResponse.json({ error: 'Failed to send notification' }, { status: 500 });
    }
}
