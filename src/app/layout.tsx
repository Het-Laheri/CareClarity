import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { ErrorBoundary } from '@/components/error-boundary';
import { ReactQueryProvider } from '@/components/providers/react-query-provider';
import { DoctorJsonLd } from '@/components/seo/doctor-json-ld';
import { OrganizationJsonLd } from '@/components/seo/organization-json-ld';

export const viewport = {
  themeColor: '#6366f1',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: {
    default: 'CareClarity',
    template: '%s | CareClarity',
  },
  description: 'AI-assisted guidance for caregivers of children with ASD and neurodevelopmental conditions. Find doctors, book appointments, and access curated resources.',
  keywords: ['ASD', 'autism', 'caregiver', 'neurodevelopmental', 'AI guidance', 'child development', 'pediatric neurology', 'special needs', 'India'],
  manifest: '/manifest.json',
  metadataBase: new URL('https://careclarity.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'CareClarity',
    title: 'CareClarity – AI Guidance for Caregivers',
    description: 'Medically-grounded information and AI-assisted guidance for parents of children with neurodevelopmental conditions.',
    url: 'https://careclarity.vercel.app',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CareClarity – AI Guidance for Caregivers',
    description: 'Medically-grounded information and AI-assisted guidance for parents of children with neurodevelopmental conditions.',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'CareClarity',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      {/* ADDED: h-screen, overflow-hidden, and flex flex-col to enable internal scrolling */}
      <body className="font-body antialiased h-screen overflow-hidden flex flex-col">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground">
          Skip to content
        </a>
        <ErrorBoundary>
          <FirebaseClientProvider>
            <ReactQueryProvider>
              <DoctorJsonLd />
              <OrganizationJsonLd />
              {/* Wrapped children in a flex container to ensure it fills the height */}
              <div id="main-content" className="flex-1 flex flex-col min-h-0 overflow-y-auto">
                {children}
              </div>
            </ReactQueryProvider>
            <Toaster />
          </FirebaseClientProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}