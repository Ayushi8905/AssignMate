import { initializeApp, getApps } from "firebase/app";
import { initializeAuth, getReactNativePersistence, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { Platform } from "react-native";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBp7yhe4ksRh5lligoUQ6yzS8FMh3BYy4s",
  authDomain: "assignmate-7bcad.firebaseapp.com",
  projectId: "assignmate-7bcad",
  storageBucket: "assignmate-7bcad.firebasestorage.app",
  messagingSenderId: "811853557269",
  appId: "1:811853557269:web:f8d53717ed926842cde81c",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// On native: persist auth with AsyncStorage. On web: use default (localStorage).
export const auth =
  getApps().length === 1 && Platform.OS !== "web"
    ? initializeAuth(app, {
        persistence: getReactNativePersistence(ReactNativeAsyncStorage),
      })
    : getAuth(app);

export const db = getFirestore(app);
