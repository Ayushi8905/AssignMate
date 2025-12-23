import { useRouter } from "expo-router";
import { Mail, Lock, User, ArrowRight } from "lucide-react-native";
import React, { useState, useRef, useEffect } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";

const goals = [
  { id: "muscle", icon: "💪", label: "Muscle Gain" },
  { id: "fat", icon: "🔥", label: "Fat Loss" },
  { id: "strength", icon: "🏋", label: "Strength" },
  { id: "maintenance", icon: "⚖️", label: "Maintenance" },
];

export default function AuthScreen() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState("");
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
  }, []);

  const handleSubmit = () => {
    router.replace("/home");
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#0B0F14", "#121820", "#0B0F14"]}
        style={styles.gradient}
      >
        <SafeAreaView style={styles.safeArea}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardView}
          >
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              <Animated.View
                style={[
                  styles.content,
                  {
                    opacity: fadeAnim,
                    transform: [{ translateY: slideAnim }],
                  },
                ]}
              >
                {/* Glass Card */}
                <View style={styles.card}>
                  <BlurView intensity={20} style={styles.blurCard}>
                    <Text style={styles.title}>
                      {isSignUp ? "START YOUR JOURNEY" : "WELCOME BACK"}
                    </Text>

                    {/* Input Fields */}
                    <View style={styles.inputsContainer}>
                      {isSignUp && (
                        <View style={styles.inputWrapper}>
                          <User size={20} color="#FF6B35" style={styles.inputIcon} />
                          <TextInput
                            style={styles.input}
                            placeholder="Full Name"
                            placeholderTextColor="#666"
                          />
                        </View>
                      )}

                      <View style={styles.inputWrapper}>
                        <Mail size={20} color="#FF6B35" style={styles.inputIcon} />
                        <TextInput
                          style={styles.input}
                          placeholder="Email / Username"
                          placeholderTextColor="#666"
                          keyboardType="email-address"
                          autoCapitalize="none"
                        />
                      </View>

                      <View style={styles.inputWrapper}>
                        <Lock size={20} color="#FF6B35" style={styles.inputIcon} />
                        <TextInput
                          style={styles.input}
                          placeholder="Password"
                          placeholderTextColor="#666"
                          secureTextEntry
                        />
                      </View>
                    </View>

                    {/* Goal Selector for Sign Up */}
                    {isSignUp && (
                      <View style={styles.goalsContainer}>
                        <Text style={styles.goalsTitle}>SELECT YOUR GOAL</Text>
                        <View style={styles.goalsGrid}>
                          {goals.map((goal) => (
                            <TouchableOpacity
                              key={goal.id}
                              style={[
                                styles.goalCard,
                                selectedGoal === goal.id && styles.goalCardSelected,
                              ]}
                              onPress={() => setSelectedGoal(goal.id)}
                              activeOpacity={0.7}
                            >
                              <Text style={styles.goalIcon}>{goal.icon}</Text>
                              <Text style={styles.goalLabel}>{goal.label}</Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                      </View>
                    )}

                    {/* Submit Button */}
                    <TouchableOpacity
                      style={styles.submitButton}
                      onPress={handleSubmit}
                      activeOpacity={0.8}
                    >
                      <LinearGradient
                        colors={["#00FF88", "#00D9FF"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.buttonGradient}
                      >
                        <View style={styles.buttonContent}>
                          <Text style={styles.buttonText}>
                            {isSignUp ? "START MY TRANSFORMATION" : "SIGN IN"}
                          </Text>
                          <ArrowRight size={20} color="#0B0F14" strokeWidth={3} />
                        </View>
                      </LinearGradient>
                    </TouchableOpacity>

                    {/* Motivation Text */}
                    <Text style={styles.motivationText}>
                      Consistency beats motivation.
                    </Text>

                    {/* Toggle Sign In/Sign Up */}
                    <TouchableOpacity
                      onPress={() => setIsSignUp(!isSignUp)}
                      style={styles.toggleButton}
                    >
                      <Text style={styles.toggleText}>
                        {isSignUp
                          ? "Already have an account? Sign In"
                          : "New to Bulkkmate? Start your journey"}
                      </Text>
                    </TouchableOpacity>
                  </BlurView>
                </View>
              </Animated.View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: 40,
  },
  content: {
    paddingHorizontal: 24,
  },
  card: {
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(0, 255, 136, 0.3)",
    shadowColor: "#00FF88",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  blurCard: {
    padding: 32,
    backgroundColor: "rgba(26, 26, 26, 0.8)",
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#FFFFFF",
    textAlign: "center",
    letterSpacing: 2,
    marginBottom: 32,
  },
  inputsContainer: {
    gap: 16,
    marginBottom: 24,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(0, 255, 136, 0.3)",
    paddingHorizontal: 16,
    height: 56,
  },
  inputIcon: {
    marginRight: 12,
    color: "#00FF88",
  },
  input: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
  goalsContainer: {
    marginBottom: 24,
  },
  goalsTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#00FF88",
    letterSpacing: 1,
    marginBottom: 16,
    textAlign: "center",
  },
  goalsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  goalCard: {
    flex: 1,
    minWidth: "45%",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "rgba(0, 255, 136, 0.2)",
    padding: 16,
    alignItems: "center",
    gap: 8,
  },
  goalCardSelected: {
    backgroundColor: "rgba(0, 255, 136, 0.2)",
    borderColor: "#00FF88",
  },
  goalIcon: {
    fontSize: 32,
  },
  goalLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#FFFFFF",
    textAlign: "center",
  },
  submitButton: {
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
    shadowColor: "#00FF88",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  buttonGradient: {
    paddingVertical: 18,
    paddingHorizontal: 24,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0B0F14",
    letterSpacing: 1,
  },
  motivationText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#999",
    textAlign: "center",
    fontStyle: "italic",
    marginBottom: 16,
  },
  toggleButton: {
    paddingVertical: 8,
  },
  toggleText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#00FF88",
    textAlign: "center",
  },
});
