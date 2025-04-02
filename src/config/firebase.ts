import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Debug: Log environment variables status
console.log('Firebase Environment Variables Status:', {
  API_KEY: import.meta.env.VITE_FIREBASE_API_KEY ? 'Exists' : 'Missing',
  AUTH_DOMAIN: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ? 'Exists' : 'Missing',
  PROJECT_ID: import.meta.env.VITE_FIREBASE_PROJECT_ID ? 'Exists' : 'Missing',
  STORAGE_BUCKET: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ? 'Exists' : 'Missing',
  MESSAGING_SENDER_ID: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ? 'Exists' : 'Missing',
  APP_ID: import.meta.env.VITE_FIREBASE_APP_ID ? 'Exists' : 'Missing',
  MEASUREMENT_ID: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID ? 'Exists' : 'Missing',
});

// Your web app's Firebase configuration using environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || ''
};

// Log partial config for debugging (hiding sensitive values)
console.log('Firebase Config Being Used:', {
  apiKey: firebaseConfig.apiKey ? firebaseConfig.apiKey.substring(0, 3) + '...' : 'Missing',
  authDomain: firebaseConfig.authDomain || 'Missing',
  projectId: firebaseConfig.projectId || 'Missing',
  storageBucket: firebaseConfig.storageBucket || 'Missing',
  messagingSenderId: firebaseConfig.messagingSenderId ? '...' + firebaseConfig.messagingSenderId.substring(firebaseConfig.messagingSenderId.length - 3) : 'Missing',
  appId: firebaseConfig.appId ? '...' + firebaseConfig.appId.substring(firebaseConfig.appId.length - 3) : 'Missing',
  measurementId: firebaseConfig.measurementId || 'Missing'
});

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const firestore = getFirestore(app);

// Initialize Analytics in browser environment only
let analytics = null;
if (typeof window !== 'undefined') {
  try {
    analytics = getAnalytics(app);
  } catch (error) {
    console.error('Error initializing Firebase Analytics:', error);
  }
}

export { storage, analytics, firestore };
