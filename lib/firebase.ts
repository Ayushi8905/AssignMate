import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBp7yhe4ksRh5lligoUQ6yzS8FMh3BYy4s",
  authDomain: "assignmate-7bcad.firebaseapp.com",
  projectId: "assignmate-7bcad",
  storageBucket: "assignmate-7bcad.firebasestorage.app",
  messagingSenderId: "811853557269",
  appId: "1:811853557269:web:f8d53717ed926842cde81c",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);

export const db = getFirestore(app);
