import { useRouter } from "expo-router";
import { Check, Crown, Star, Zap } from "lucide-react-native";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

interface Plan {
  id: number;
  name: string;
  price: string;
  duration: string;
  icon: React.ReactNode;
  features: string[];
  isPopular?: boolean;
  gradient: readonly [string, string, ...string[]];
}

const plans: Plan[] = [
  {
    id: 1,
    name: "Starter",
    price: "$49",
    duration: "per month",
    icon: <Zap size={32} color="#FFFFFF" />,
    features: [
      "3 training sessions/week",
      "Basic nutrition guide",
      "Progress tracking",
      "Email support",
    ],
    gradient: ["rgba(255, 107, 53, 0.2)", "rgba(255, 69, 0, 0.1)"],
  },
  {
    id: 2,
    name: "Pro",
    price: "$99",
    duration: "per month",
    icon: <Star size={32} color="#FFFFFF" fill="#FFFFFF" />,
    features: [
      "5 training sessions/week",
      "Custom meal plans",
      "Weekly check-ins",
      "Priority support",
      "Supplement guidance",
    ],
    isPopular: true,
    gradient: ["#FF6B35", "#FF4500"],
  },
  {
    id: 3,
    name: "Elite",
    price: "$149",
    duration: "per month",
    icon: <Crown size={32} color="#FFFFFF" fill="#FFFFFF" />,
    features: [
      "Unlimited training sessions",
      "Personalized nutrition",
      "Daily check-ins",
      "24/7 support access",
      "Competition prep",
      "Recovery protocols",
    ],
    gradient: ["#FFD700", "#FFA500"],
  },
  {
    id: 4,
    name: "Transform",
    price: "$399",
    duration: "3 months",
    icon: <Crown size={32} color="#FFFFFF" fill="#FFFFFF" />,
    features: [
      "12-week transformation",
      "Complete lifestyle overhaul",
      "Daily coaching calls",
      "Home workout setup",
      "Results guarantee",
      "Lifetime support group",
    ],
    gradient: ["#8B5CF6", "#6B21A8"],
  },
];

export default function PlansScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
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
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View
            style={[
              styles.header,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Text style={styles.title}>Choose Your Plan</Text>
            <Text style={styles.subtitle}>
              Select the perfect training package for your fitness goals
            </Text>
          </Animated.View>

          <View style={styles.plansContainer}>
            {plans.map((plan, index) => (
              <Animated.View
                key={plan.id}
                style={[
                  {
                    opacity: fadeAnim,
                    transform: [
                      {
                        translateY: Animated.multiply(
                          slideAnim,
                          new Animated.Value(1 + index * 0.15)
                        ),
                      },
                    ],
                  },
                ]}
              >
                <TouchableOpacity
                  style={styles.planCard}
                  activeOpacity={0.9}
                >
                  {plan.isPopular && (
                    <View style={styles.popularBadge}>
                      <Text style={styles.popularText}>MOST POPULAR</Text>
                    </View>
                  )}
                  <LinearGradient
                    colors={plan.gradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={[
                      styles.planCardGradient,
                      !plan.isPopular && styles.outlinePlan,
                    ]}
                  >
                    <View style={styles.planHeader}>
                      <View style={styles.planIcon}>{plan.icon}</View>
                      <Text style={styles.planName}>{plan.name}</Text>
                      <View style={styles.priceContainer}>
                        <Text style={styles.price}>{plan.price}</Text>
                        <Text style={styles.duration}>{plan.duration}</Text>
                      </View>
                    </View>

                    <View style={styles.featuresContainer}>
                      {plan.features.map((feature, idx) => (
                        <View key={idx} style={styles.featureItem}>
                          <View style={styles.checkIcon}>
                            <Check size={16} color="#FFFFFF" strokeWidth={3} />
                          </View>
                          <Text style={styles.featureText}>{feature}</Text>
                        </View>
                      ))}
                    </View>

                    <TouchableOpacity
                      style={[
                        styles.selectButton,
                        plan.isPopular && styles.selectButtonOutline,
                      ]}
                      onPress={() => router.push("/demo-form")}
                    >
                      <Text
                        style={[
                          styles.selectButtonText,
                          plan.isPopular && styles.selectButtonTextAlt,
                        ]}
                      >
                        SELECT PLAN
                      </Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              All plans include progress tracking and access to our exclusive
              community
            </Text>
          </View>
        </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 30,
    alignItems: "center",
  },
  title: {
    fontSize: 42,
    fontWeight: "900" as const,
    color: "#FFFFFF",
    letterSpacing: 1,
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "400" as const,
    color: "#AAAAAA",
    textAlign: "center",
    lineHeight: 24,
  },
  plansContainer: {
    paddingHorizontal: 24,
    gap: 24,
  },
  planCard: {
    borderRadius: 24,
    overflow: "hidden",
  },
  popularBadge: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    zIndex: 10,
  },
  popularText: {
    fontSize: 10,
    fontWeight: "800" as const,
    color: "#FF6B35",
    letterSpacing: 1,
  },
  planCardGradient: {
    padding: 24,
    gap: 24,
  },
  outlinePlan: {
    borderWidth: 2,
    borderColor: "#FF6B35",
  },
  planHeader: {
    alignItems: "center",
    gap: 12,
  },
  planIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  planName: {
    fontSize: 28,
    fontWeight: "800" as const,
    color: "#FFFFFF",
    textTransform: "uppercase" as const,
  },
  priceContainer: {
    alignItems: "center",
    gap: 4,
  },
  price: {
    fontSize: 48,
    fontWeight: "900" as const,
    color: "#FFFFFF",
  },
  duration: {
    fontSize: 14,
    fontWeight: "500" as const,
    color: "rgba(255, 255, 255, 0.8)",
  },
  featuresContainer: {
    gap: 12,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  checkIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  featureText: {
    fontSize: 15,
    fontWeight: "500" as const,
    color: "#FFFFFF",
    flex: 1,
  },
  selectButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },
  selectButtonOutline: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  selectButtonText: {
    fontSize: 16,
    fontWeight: "800" as const,
    color: "#FF6B35",
    letterSpacing: 1,
  },
  selectButtonTextAlt: {
    color: "#FFFFFF",
  },
  footer: {
    paddingHorizontal: 24,
    paddingTop: 30,
  },
  footerText: {
    fontSize: 14,
    fontWeight: "400" as const,
    color: "#888888",
    textAlign: "center",
    lineHeight: 20,
  },
});
