import { useRouter } from "expo-router";
import { Mail, Lock, User, BookOpen, ArrowRight } from "lucide-react-native";
import React, { useState, useRef, useEffect } from "react";
import {
  Animated, StyleSheet, Text, TextInput, TouchableOpacity,
  View, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../lib/firebase";

export default function AuthScreen() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 700, useNativeDriver: true }),
    ]).start();
  }, []);

  const handleSubmit = async () => {
    setError("");
    if (!email.trim() || !password.trim()) { setError("Email and password are required."); return; }
    setLoading(true);
    try {
      if (isSignUp) {
        const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
        if (name.trim()) await updateProfile(cred.user, { displayName: name.trim() });
      } else {
        await signInWithEmailAndPassword(auth, email.trim(), password);
      }
      router.replace("/home");
    } catch (e: any) {
      const msg = e?.code?.replace("auth/", "").replace(/-/g, " ") ?? "Something went wrong";
      setError(msg.charAt(0).toUpperCase() + msg.slice(1));
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={["#0F1117", "#1A1D2E", "#0F1117"]} style={styles.container}>
      <View style={styles.bgCircle1} />
      <View style={styles.bgCircle2} />
      <SafeAreaView style={styles.safe}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
            <Animated.View style={[styles.inner, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
              {/* Logo */}
              <View style={styles.logoRow}>
                <LinearGradient colors={["#4F8EF7", "#7C5CBF"]} style={styles.logoCircle}>
                  <BookOpen size={28} color="#FFF" strokeWidth={1.5} />
                </LinearGradient>
                <Text style={styles.logoText}>AssignMate</Text>
              </View>

              {/* Card */}
              <View style={styles.card}>
                <Text style={styles.title}>{isSignUp ? "Create Account" : "Welcome Back"}</Text>
                <Text style={styles.subtitle}>
                  {isSignUp ? "Start managing your assignments" : "Sign in to your account"}
                </Text>

                <View style={styles.inputs}>
                  {isSignUp && (
                    <View style={styles.inputRow}>
                      <User size={18} color="#4F8EF7" />
                      <TextInput style={styles.input} placeholder="Full Name" placeholderTextColor="#4A5568"
                        value={name} onChangeText={setName} />
                    </View>
                  )}
                  <View style={styles.inputRow}>
                    <Mail size={18} color="#4F8EF7" />
                    <TextInput style={styles.input} placeholder="Email address" placeholderTextColor="#4A5568"
                      keyboardType="email-address" autoCapitalize="none"
                      value={email} onChangeText={setEmail} />
                  </View>
                  <View style={styles.inputRow}>
                    <Lock size={18} color="#4F8EF7" />
                    <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#4A5568"
                      secureTextEntry value={password} onChangeText={setPassword} />
                  </View>
                </View>

                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                <TouchableOpacity onPress={handleSubmit} activeOpacity={0.85} disabled={loading}>
                  <LinearGradient colors={["#4F8EF7", "#7C5CBF"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.btn}>
                    {loading
                      ? <ActivityIndicator color="#FFF" />
                      : <>
                          <Text style={styles.btnText}>{isSignUp ? "Get Started" : "Sign In"}</Text>
                          <ArrowRight size={18} color="#FFF" strokeWidth={2.5} />
                        </>
                    }
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { setIsSignUp(!isSignUp); setError(""); }} style={styles.toggle}>
                  <Text style={styles.toggleText}>
                    {isSignUp ? "Already have an account? " : "Don't have an account? "}
                    <Text style={styles.toggleLink}>{isSignUp ? "Sign In" : "Register"}</Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safe: { flex: 1 },
  scroll: { flexGrow: 1, justifyContent: "center", padding: 24 },
  inner: { alignItems: "center" },
  bgCircle1: {
    position: "absolute", width: 350, height: 350, borderRadius: 175,
    backgroundColor: "rgba(79, 142, 247, 0.07)", top: -60, right: -80,
  },
  bgCircle2: {
    position: "absolute", width: 280, height: 280, borderRadius: 140,
    backgroundColor: "rgba(124, 92, 191, 0.07)", bottom: -40, left: -60,
  },
  logoRow: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 36 },
  logoCircle: { width: 48, height: 48, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  logoText: { fontSize: 26, fontWeight: "800", color: "#FFF", letterSpacing: 0.5 },
  card: {
    width: "100%", backgroundColor: "rgba(26, 29, 46, 0.95)",
    borderRadius: 24, padding: 28, borderWidth: 1,
    borderColor: "rgba(79, 142, 247, 0.2)",
  },
  title: { fontSize: 24, fontWeight: "800", color: "#FFF", marginBottom: 6 },
  subtitle: { fontSize: 14, color: "#A0AEC0", marginBottom: 28 },
  inputs: { gap: 14, marginBottom: 16 },
  inputRow: {
    flexDirection: "row", alignItems: "center", gap: 12,
    backgroundColor: "rgba(255,255,255,0.04)", borderRadius: 12,
    borderWidth: 1, borderColor: "rgba(79, 142, 247, 0.2)",
    paddingHorizontal: 16, height: 52,
  },
  input: { flex: 1, color: "#FFF", fontSize: 15 },
  errorText: { fontSize: 13, color: "#EF4444", marginBottom: 12, textAlign: "center" },
  btn: {
    flexDirection: "row", alignItems: "center", justifyContent: "center",
    gap: 8, borderRadius: 14, paddingVertical: 16, marginBottom: 4,
  },
  btnText: { fontSize: 16, fontWeight: "700", color: "#FFF" },
  toggle: { marginTop: 20, alignItems: "center" },
  toggleText: { fontSize: 14, color: "#A0AEC0" },
  toggleLink: { color: "#4F8EF7", fontWeight: "700" },
});
