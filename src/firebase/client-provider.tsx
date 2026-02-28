'use client';

import { useState, useEffect } from 'react';
import { initializeFirebase } from '.';
import { FirebaseProvider } from './provider';
import { firebaseConfig } from './config';
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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
        throw new Error('Firebase configuration is missing. Please check your environment variables (NEXT_PUBLIC_FIREBASE_API_KEY, etc).');
      }
      const { app, auth, firestore } = initializeFirebase();
      if (!app || !auth || !firestore) {
        throw new Error('Firebase services failed to initialize.');
      }
      setServices({ app, auth, firestore });
    } catch (e: any) {
      console.error('Firebase initialization error:', e);
      setError(e.message || 'Unknown Firebase initialization error');
    } finally {
      setReady(true);
    }
  }, []);

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-secondary p-4 text-center">
        <Logo />
        <div className="mt-8 max-w-md rounded-lg border border-destructive bg-destructive/10 p-6 text-destructive">
          <h2 className="mb-2 font-headline text-lg font-bold">Configuration Error</h2>
          <p className="text-sm">{error}</p>
          <p className="mt-4 text-xs font-medium">
            If you just deployed to Vercel, ensure you have added all <b>NEXT_PUBLIC_FIREBASE_*</b> environment variables in your Vercel Project Settings and triggered a redeployment.
          </p>
        </div>
      </div>
    );
  }

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
