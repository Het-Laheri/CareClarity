import * as admin from 'firebase-admin';

const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY;

if (!admin.apps.length && projectId && clientEmail && privateKey) {
  try {
    let processedPrivateKey = privateKey.replace(/"/g, '').replace(/\\n/g, '\n').replace(/\r/g, '');
    if (processedPrivateKey && !processedPrivateKey.includes('\n')) {
      // Fallback for badly parsed env strings - insert newlines
      processedPrivateKey = processedPrivateKey
        .replace('-----BEGIN PRIVATE KEY-----', '-----BEGIN PRIVATE KEY-----\n')
        .replace('-----END PRIVATE KEY-----', '\n-----END PRIVATE KEY-----\n');
    }

    // Attempt to extract base64 lines and join with newlines if missing
    if (processedPrivateKey && processedPrivateKey.includes('BEGIN PRIVATE KEY')) {
      const match = processedPrivateKey.match(/-----BEGIN PRIVATE KEY-----\s*([\s\S]*?)\s*-----END PRIVATE KEY-----/);
      if (match) {
        const body = match[1].replace(/\s+/g, '');
        const formattedBody = body.match(/.{1,64}/g)?.join('\n') || body;
        processedPrivateKey = `-----BEGIN PRIVATE KEY-----\n${formattedBody}\n-----END PRIVATE KEY-----\n`;
      }
    }
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey: processedPrivateKey,
      }),
    });
  } catch (error) {
    console.error('Firebase admin initialization error', error);
  }
}

export const getDb = () => {
  if (!admin.apps.length) throw new Error('Firebase Admin SDK not initialized. Check your environment variables.');
  return admin.firestore();
};

export const getAuth = () => {
  if (!admin.apps.length) throw new Error('Firebase Admin SDK not initialized. Check your environment variables.');
  return admin.auth();
};
