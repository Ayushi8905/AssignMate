import { useRouter } from "expo-router";
import { Calendar, FileText } from "lucide-react-native";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PlanningScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

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
            <Text style={styles.title}>Ready to Organize?</Text>
            <Text style={styles.subtitle}>
              Choose how you want to begin managing your school work with AssignMate
            </Text>
          </View>

          <View style={styles.cardsContainer}>
            <TouchableOpacity
              style={styles.card}
              onPress={() => router.push("/plans")}
              activeOpacity={0.85}
            >
              <LinearGradient
                colors={["#FF6B35", "#FF4500"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.cardGradient}
              >
                <View style={styles.iconContainer}>
                  <Calendar size={48} color="#FFFFFF" strokeWidth={2} />
                </View>
                <Text style={styles.cardTitle}>View Subjects</Text>
                <Text style={styles.cardDescription}>
                  Explore and set up your active subjects and track your pending
                  assignments
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.card}
              onPress={() => router.push("/demo-form")}
              activeOpacity={0.85}
            >
              <LinearGradient
                colors={["rgba(255, 107, 53, 0.2)", "rgba(255, 69, 0, 0.1)"]}
                style={[styles.cardGradient, styles.outlineCard]}
              >
                <View style={styles.iconContainer}>
                  <FileText size={48} color="#FF6B35" strokeWidth={2} />
                </View>
                <Text style={styles.cardTitle}>Set Reminders</Text>
                <Text style={styles.cardDescription}>
                  Configure custom notifications to never miss an impending deadline again
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Not sure which option to choose? Start by adding your first subject and 
              gradually organize your schedule.
            </Text>
          </View>
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
  title: {
    fontSize: 42,
    fontWeight: "900" as const,
    color: "#FFFFFF",
    letterSpacing: 1,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "400" as const,
    color: "#AAAAAA",
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 10,
  },
  cardsContainer: {
    gap: 24,
  },
  card: {
    borderRadius: 24,
    overflow: "hidden",
    elevation: 8,
    shadowColor: "#FF6B35",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  cardGradient: {
    padding: 32,
    alignItems: "center",
    gap: 16,
    minHeight: 240,
    justifyContent: "center",
  },
  outlineCard: {
    borderWidth: 2,
    borderColor: "#FF6B35",
  },
  iconContainer: {
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 28,
    fontWeight: "800" as const,
    color: "#FFFFFF",
    textAlign: "center",
  },
  cardDescription: {
    fontSize: 15,
    fontWeight: "400" as const,
    color: "#CCCCCC",
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  footer: {
    paddingHorizontal: 10,
  },
  footerText: {
    fontSize: 14,
    fontWeight: "400" as const,
    color: "#888888",
    textAlign: "center",
    lineHeight: 20,
  },
});
