import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY
    ? new Resend(process.env.RESEND_API_KEY)
    : null;

export const sendEmail = async ({
    to,
    subject,
    html,
}: {
    to: string;
    subject: string;
    html: string;
}) => {
    if (!resend) {
        console.log('Skipping email send: RESEND_API_KEY not set.');
        console.log('Recipient:', to);
        console.log('Subject:', subject);
        return;
    }

    try {
        const { data, error } = await resend.emails.send({
            from: 'CareClarity <notifications@careclarity.app>',
            to,
            subject,
            html,
        });

        if (error) {
            console.error('Resend error:', error);
        }

        return data;
    } catch (error) {
        console.error('Failed to send email:', error);
    }
};
