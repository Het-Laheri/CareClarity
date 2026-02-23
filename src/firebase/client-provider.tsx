'use client';

import { initializeFirebase } from '.';
import { FirebaseProvider } from './provider';

// This ensures that Firebase is initialized only once on the client.
const { app, auth, firestore } = initializeFirebase();

export function FirebaseClientProvider({ children }: { children: React.ReactNode }) {
  // The FirebaseProvider will not re-render because the props are stable.
  return (
    <FirebaseProvider app={app} auth={auth} firestore={firestore}>
      {children}
    </FirebaseProvider>
  );
}
