import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BookOpen } from "lucide-react-native";

const { width } = Dimensions.get("window");

export default function SplashScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.7)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const textFade = useRef(new Animated.Value(0)).current;
  const dotAnims = useRef([0, 1, 2].map(() => new Animated.Value(0))).current;

  useEffect(() => {
    // Logo entrance
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, tension: 18, friction: 6, useNativeDriver: true }),
    ]).start(() => {
      // Text fade in
      Animated.timing(textFade, { toValue: 1, duration: 600, useNativeDriver: true }).start();

      // Pulse logo
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.08, duration: 900, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 900, useNativeDriver: true }),
        ])
      ).start();

      // Loading dots
      const animateDots = () => {
        dotAnims.forEach((dot, i) => {
          Animated.loop(
            Animated.sequence([
              Animated.delay(i * 200),
              Animated.timing(dot, { toValue: 1, duration: 400, useNativeDriver: true }),
              Animated.timing(dot, { toValue: 0.3, duration: 400, useNativeDriver: true }),
            ])
          ).start();
        });
      };
      animateDots();

      // Navigate after 2.5s
      setTimeout(() => router.replace("/auth"), 2500);
    });
  }, []);

  return (
    <LinearGradient colors={["#0F1117", "#1A1D2E", "#0F1117"]} style={styles.container}>
      {/* Background circles */}
      <View style={styles.bgCircle1} />
      <View style={styles.bgCircle2} />

      <Animated.View style={[styles.logoWrap, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
        <Animated.View style={[styles.logoOuter, { transform: [{ scale: pulseAnim }] }]}>
          <View style={styles.glowRing} />
          <LinearGradient colors={["#4F8EF7", "#7C5CBF"]} style={styles.logoCircle}>
            <BookOpen size={52} color="#FFFFFF" strokeWidth={1.5} />
          </LinearGradient>
        </Animated.View>
      </Animated.View>

      <Animated.View style={[styles.textWrap, { opacity: textFade }]}>
        <Text style={styles.appName}>AssignMate</Text>
        <View style={styles.underline} />
        <Text style={styles.tagline}>Stay on top of every deadline.</Text>
      </Animated.View>

      <Animated.View style={[styles.dotsRow, { opacity: textFade }]}>
        {dotAnims.map((dot, i) => (
          <Animated.View key={i} style={[styles.dot, { opacity: dot }]} />
        ))}
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  bgCircle1: {
    position: "absolute", width: 400, height: 400, borderRadius: 200,
    backgroundColor: "rgba(79, 142, 247, 0.06)", top: -80, right: -100,
  },
  bgCircle2: {
    position: "absolute", width: 300, height: 300, borderRadius: 150,
    backgroundColor: "rgba(124, 92, 191, 0.06)", bottom: -60, left: -80,
  },
  logoWrap: { alignItems: "center", marginBottom: 32 },
  logoOuter: { alignItems: "center", justifyContent: "center" },
  glowRing: {
    position: "absolute", width: 160, height: 160, borderRadius: 80,
    backgroundColor: "rgba(79, 142, 247, 0.15)",
    shadowColor: "#4F8EF7", shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8, shadowRadius: 40,
  },
  logoCircle: {
    width: 120, height: 120, borderRadius: 60,
    alignItems: "center", justifyContent: "center",
    shadowColor: "#4F8EF7", shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5, shadowRadius: 20, elevation: 20,
  },
  textWrap: { alignItems: "center", marginBottom: 60 },
  appName: {
    fontSize: 42, fontWeight: "800", color: "#FFFFFF",
    letterSpacing: 1, marginBottom: 10,
  },
  underline: {
    width: 60, height: 3, borderRadius: 2,
    backgroundColor: "#4F8EF7", marginBottom: 14,
  },
  tagline: { fontSize: 15, color: "#A0AEC0", fontWeight: "500", letterSpacing: 0.5 },
  dotsRow: { flexDirection: "row", gap: 10, position: "absolute", bottom: 80 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#4F8EF7" },
});
