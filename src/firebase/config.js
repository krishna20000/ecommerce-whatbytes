// src/firebase/config.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBDmX3_utQhp7VamaFORymsMSujLaPd7zo",
  authDomain: "gigtasker-68b5b.firebaseapp.com",
  projectId: "gigtasker-68b5b",
  storageBucket: "gigtasker-68b5b.firebasestorage.app",
  messagingSenderId: "596804021347",
  appId: "1:596804021347:web:e224c4ea9ec337cb8c1c56"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app; 