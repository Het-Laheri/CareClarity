import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Login',
    description: 'Log in to your CareClarity account to access AI-assisted guidance, doctor appointments, and resources for your child.',
    alternates: { canonical: '/login' },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
