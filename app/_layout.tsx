import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useAuthStore } from "../store/authStore";

SplashScreen.preventAutoHideAsync().catch(() => { });

const queryClient = new QueryClient();

function RootLayoutNav() {
  const { user, setUser } = useAuthStore();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      SplashScreen.hideAsync().catch(() => { });
    });
    return unsub;
  }, []);

  useEffect(() => {
    const inAuthGroup = (segments[0] as string) === "auth";
    const inIndex = !segments[0] || (segments[0] as string) === "index";

    if (user && (inAuthGroup || inIndex)) {
      router.replace("/home");
    } else if (!user && !inAuthGroup && !inIndex) {
      router.replace("/auth");
    }
  }, [user, segments]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="auth" />
      <Stack.Screen name="home" />
      <Stack.Screen name="calendar" />
      <Stack.Screen name="stats" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* @ts-ignore */}
      <GestureHandlerRootView style={styles.container}>
        <RootLayoutNav />
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
