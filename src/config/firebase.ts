// This is a placeholder Firebase configuration file with no real credentials
// The actual credentials should be stored in firebase.credentials.ts (which is gitignored)

import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// Firebase configuration placeholder
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY || 'placeholder-api-key',
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || 'placeholder-project-id.firebaseapp.com',
  projectId: process.env.VITE_FIREBASE_PROJECT_ID || 'placeholder-project-id',
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET || 'placeholder-project-id.appspot.com',
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '000000000000',
  appId: process.env.VITE_FIREBASE_APP_ID || '1:000000000000:web:0000000000000000000000'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);

// Export the app instance
export default app;
