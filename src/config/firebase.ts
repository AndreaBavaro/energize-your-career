import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBM_5JTb5fD46LHNS3UApNem5Hq4Xp3YzI",
  authDomain: "voltify-c2a99.firebaseapp.com",
  projectId: "voltify-c2a99",
  storageBucket: "voltify-c2a99.firebasestorage.app",
  messagingSenderId: "877367525401",
  appId: "1:877367525401:web:b26d02c8fd9bdb0689aa88",
  measurementId: "G-S7469GDBQN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// Initialize Analytics in browser environment only
let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { storage, analytics };
