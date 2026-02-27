'use client';

import { useState, useEffect } from 'react';
import { initializeFirebase } from '.';
import { FirebaseProvider } from './provider';
import type { FirebaseApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';
import { Logo } from '@/components/logo';

export function FirebaseClientProvider({ children }: { children: React.ReactNode }) {
  const [services, setServices] = useState<{
    app: FirebaseApp | null;
    auth: Auth | null;
    firestore: Firestore | null;
  }>({ app: null, auth: null, firestore: null });

  const [ready, setReady] = useState(false);

  useEffect(() => {
    const { app, auth, firestore } = initializeFirebase();
    setServices({ app, auth, firestore });
    setReady(true);
  }, []);

  if (!ready || !services.app || !services.auth || !services.firestore) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-secondary">
        <Logo />
        <p className="mt-4 text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <FirebaseProvider app={services.app} auth={services.auth} firestore={services.firestore}>
      {children}
    </FirebaseProvider>
  );
}
