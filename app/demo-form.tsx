import { useRouter } from "expo-router";
import { CheckCircle, Mail, Phone, User } from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DemoFormScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    goals: "",
  });

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

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      Alert.alert("Missing Information", "Please fill in all required fields");
      return;
    }

    Alert.alert(
      "Request Submitted!",
      "Thank you for your interest! Our trainer will contact you within 24 hours.",
      [
        {
          text: "OK",
          onPress: () => router.push("/"),
        },
      ]
    );
  };

  return (
    <LinearGradient
      colors={["#0a0a0a", "#1a1a1a", "#2a2a2a"]}
      style={styles.container}
    >
      {/* @ts-expect-error - SafeAreaView types are outdated */}
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardView}
        >
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
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
              <Text style={styles.title}>Request a Demo</Text>
              <Text style={styles.subtitle}>
                Fill in your details and we&apos;ll get back to you with a
                personalized training plan
              </Text>
            </Animated.View>

            <Animated.View
              style={[
                styles.formContainer,
                {
                  opacity: fadeAnim,
                },
              ]}
            >
              <View style={styles.inputGroup}>
                <View style={styles.inputLabelContainer}>
                  <User size={20} color="#FF6B35" />
                  <Text style={styles.inputLabel}>Full Name *</Text>
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your name"
                  placeholderTextColor="#666666"
                  value={formData.name}
                  onChangeText={(text: string) =>
                    setFormData({ ...formData, name: text })
                  }
                />
              </View>

              <View style={styles.inputGroup}>
                <View style={styles.inputLabelContainer}>
                  <Mail size={20} color="#FF6B35" />
                  <Text style={styles.inputLabel}>Email Address *</Text>
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="your@email.com"
                  placeholderTextColor="#666666"
                  value={formData.email}
                  onChangeText={(text: string) =>
                    setFormData({ ...formData, email: text })
                  }
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputGroup}>
                <View style={styles.inputLabelContainer}>
                  <Phone size={20} color="#FF6B35" />
                  <Text style={styles.inputLabel}>Phone Number *</Text>
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="+1 (555) 000-0000"
                  placeholderTextColor="#666666"
                  value={formData.phone}
                  onChangeText={(text: string) =>
                    setFormData({ ...formData, phone: text })
                  }
                  keyboardType="phone-pad"
                />
              </View>

              <View style={styles.inputGroup}>
                <View style={styles.inputLabelContainer}>
                  <CheckCircle size={20} color="#FF6B35" />
                  <Text style={styles.inputLabel}>Fitness Goals (Optional)</Text>
                </View>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Tell us about your fitness goals..."
                  placeholderTextColor="#666666"
                  value={formData.goals}
                  onChangeText={(text: string) =>
                    setFormData({ ...formData, goals: text })
                  }
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </View>

              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={["#FF6B35", "#FF4500"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.submitButtonGradient}
                >
                  <Text style={styles.submitButtonText}>SUBMIT REQUEST</Text>
                </LinearGradient>
              </TouchableOpacity>

              <Text style={styles.footerText}>
                By submitting, you agree to be contacted by our trainers
              </Text>
            </Animated.View>
          </ScrollView>
        </KeyboardAvoidingView>
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
  keyboardView: {
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
    paddingHorizontal: 10,
  },
  formContainer: {
    paddingHorizontal: 24,
    gap: 24,
  },
  inputGroup: {
    gap: 12,
  },
  inputLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: "#FFFFFF",
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(255, 107, 53, 0.3)",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "500" as const,
  },
  textArea: {
    minHeight: 120,
    paddingTop: 16,
  },
  submitButton: {
    borderRadius: 16,
    overflow: "hidden",
    marginTop: 16,
    elevation: 8,
    shadowColor: "#FF6B35",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  submitButtonGradient: {
    paddingVertical: 20,
    paddingHorizontal: 32,
    alignItems: "center",
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: "800" as const,
    color: "#FFFFFF",
    letterSpacing: 2,
  },
  footerText: {
    fontSize: 13,
    fontWeight: "400" as const,
    color: "#888888",
    textAlign: "center",
    lineHeight: 18,
    paddingHorizontal: 20,
  },
});
