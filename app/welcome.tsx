import { useRouter } from "expo-router";
import { ArrowRight, Zap } from "lucide-react-native";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WelcomeScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  return (
    <LinearGradient
      colors={["#0a0a0a", "#1a1a1a", "#2a2a2a"]}
      style={styles.container}
    >
      {/* @ts-expect-error - SafeAreaView types are outdated */}
      <SafeAreaView style={styles.safeArea}>
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.header}>
            <View style={styles.iconBadge}>
              <Zap size={40} color="#FF6B35" fill="#FF6B35" />
            </View>
            <Text style={styles.welcomeText}>Welcome to</Text>
            <Text style={styles.brandText}>BulkkMate!</Text>
            <View style={styles.divider} />
            <Text style={styles.tagline}>
              Transform Your Body,{"\n"}Transform Your Life
            </Text>
            <Text style={styles.description}>
              Your personal training companion for building strength, gaining
              muscle, and achieving your fitness goals with expert guidance.
            </Text>
          </View>

          <View style={styles.features}>
            <View style={styles.featureItem}>
              <View style={styles.featureDot} />
              <Text style={styles.featureText}>Professional Training Plans</Text>
            </View>
            <View style={styles.featureItem}>
              <View style={styles.featureDot} />
              <Text style={styles.featureText}>Expert Nutrition Guidance</Text>
            </View>
            <View style={styles.featureItem}>
              <View style={styles.featureDot} />
              <Text style={styles.featureText}>24/7 Support & Motivation</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/videos")}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={["#FF6B35", "#FF4500"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>GET STARTED</Text>
              <ArrowRight size={24} color="#FFFFFF" strokeWidth={3} />
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 40,
    justifyContent: "space-between",
  },
  header: {
    alignItems: "center",
    gap: 16,
  },
  iconBadge: {
    backgroundColor: "rgba(255, 107, 53, 0.15)",
    padding: 20,
    borderRadius: 60,
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "500" as const,
    color: "#999999",
    letterSpacing: 1,
  },
  brandText: {
    fontSize: 56,
    fontWeight: "900" as const,
    color: "#FFFFFF",
    letterSpacing: 1,
    textTransform: "uppercase" as const,
  },
  divider: {
    width: 80,
    height: 4,
    backgroundColor: "#FF6B35",
    borderRadius: 2,
    marginVertical: 8,
  },
  tagline: {
    fontSize: 24,
    fontWeight: "700" as const,
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 32,
    marginTop: 8,
  },
  description: {
    fontSize: 16,
    fontWeight: "400" as const,
    color: "#AAAAAA",
    textAlign: "center",
    lineHeight: 24,
    marginTop: 16,
    paddingHorizontal: 10,
  },
  features: {
    gap: 20,
    paddingHorizontal: 10,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  featureDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#FF6B35",
  },
  featureText: {
    fontSize: 18,
    fontWeight: "600" as const,
    color: "#FFFFFF",
  },
  button: {
    borderRadius: 16,
    overflow: "hidden",
    elevation: 8,
    shadowColor: "#FF6B35",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  buttonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    paddingHorizontal: 32,
    gap: 12,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "800" as const,
    color: "#FFFFFF",
    letterSpacing: 2,
  },
});
