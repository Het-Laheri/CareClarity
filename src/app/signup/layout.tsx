import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Sign Up',
    description: 'Create your free CareClarity account. Get AI-assisted guidance, find specialists, and access resources for your child with neurodevelopmental conditions.',
    alternates: { canonical: '/signup' },
};

export default function SignupLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
