import { useRouter } from "expo-router";
import { Dumbbell } from "lucide-react-native";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function SplashScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      router.replace("/welcome");
    }, 3000);

    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim, router]);

  return (
    <LinearGradient
      colors={["#0a0a0a", "#1a1a1a", "#2a2a2a"]}
      style={styles.container}
    >
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.iconWrapper}>
          <Dumbbell size={80} color="#FF6B35" strokeWidth={2.5} />
        </View>
        <Text style={styles.logoText}>BulkkMate</Text>
        <View style={styles.divider} />
        <Text style={styles.slogan}>FORGE YOUR STRENGTH</Text>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
    gap: 20,
  },
  iconWrapper: {
    backgroundColor: "rgba(255, 107, 53, 0.1)",
    padding: 30,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: "#FF6B35",
  },
  logoText: {
    fontSize: 48,
    fontWeight: "900" as const,
    color: "#FFFFFF",
    letterSpacing: 2,
    textTransform: "uppercase" as const,
  },
  divider: {
    width: 60,
    height: 4,
    backgroundColor: "#FF6B35",
    borderRadius: 2,
  },
  slogan: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: "#999999",
    letterSpacing: 4,
    textTransform: "uppercase" as const,
  },
});
