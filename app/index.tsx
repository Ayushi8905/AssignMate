import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Platform,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { ArrowRight, Zap } from "lucide-react-native";
import {
  useFonts,
  Montserrat_700Bold,
  Montserrat_900Black,
} from "@expo-google-fonts/montserrat";

const { width, height } = Dimensions.get("window");

const motivationalQuotes = [
  "Your body listens to your habits.",
  "Discipline creates legends.",
  "Pain is temporary. Gains are forever.",
  "Strong body, disciplined mind.",
  "No shortcuts. Just work.",
  "Consistency beats motivation.",
  "Train insane or remain the same.",
  "Sweat is just fat crying.",
  "The only bad workout is the one you didn't do.",
  "Push yourself because no one else will.",
  "Success starts with self-discipline.",
  "Your only limit is you.",
];

export default function WelcomeScreen() {
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    Montserrat_700Bold,
    Montserrat_900Black,
  });
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const quoteAnim = useRef(new Animated.Value(0)).current;
  const buttonAnim = useRef(new Animated.Value(0)).current;
  const particleAnims = useRef(
    [...Array(25)].map(() => ({
      x: new Animated.Value(Math.random() * width),
      y: new Animated.Value(Math.random() * height),
      opacity: new Animated.Value(Math.random() * 0.4),
    }))
  ).current;

  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    // Logo entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Button entrance
    Animated.timing(buttonAnim, {
      toValue: 1,
      duration: 800,
      delay: 1000,
      useNativeDriver: true,
    }).start();

    // Heartbeat pulse animation for logo
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.15,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Particle floating animations
    particleAnims.forEach((particle) => {
      Animated.loop(
        Animated.parallel([
          Animated.sequence([
            Animated.timing(particle.y, {
              toValue: -100,
              duration: 5000 + Math.random() * 3000,
              useNativeDriver: true,
            }),
            Animated.timing(particle.y, {
              toValue: height + 100,
              duration: 0,
              useNativeDriver: true,
            }),
          ]),
          Animated.sequence([
            Animated.timing(particle.opacity, {
              toValue: Math.random() * 0.6 + 0.2,
              duration: 2000,
              useNativeDriver: true,
            }),
            Animated.timing(particle.opacity, {
              toValue: 0.1,
              duration: 2000,
              useNativeDriver: true,
            }),
          ]),
        ])
      ).start();
    });

    // Quote rotation with fade
    Animated.timing(quoteAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    const quoteInterval = setInterval(() => {
      Animated.sequence([
        Animated.timing(quoteAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(quoteAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();

      setCurrentQuote((prev) => (prev + 1) % motivationalQuotes.length);
    }, 4000);

    return () => {
      clearInterval(quoteInterval);
    };
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* Background with Lateral Head Image */}
      <ImageBackground
        source={require("../public/images/Lateral_Head_tricep_exercises.webp")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Dark overlay gradient */}
        <LinearGradient
          colors={["rgba(11, 15, 20, 0.92)", "rgba(18, 24, 32, 0.88)", "rgba(11, 15, 20, 0.92)"]}
          style={styles.overlay}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {/* Subtle grid pattern */}
          <View style={styles.gridPattern}>
            {[...Array(8)].map((_, i) => (
              <View key={`h-${i}`} style={[styles.gridLine, { top: `${i * 12.5}%` }]} />
            ))}
            {[...Array(6)].map((_, i) => (
              <View key={`v-${i}`} style={[styles.gridLineVertical, { left: `${i * 16.6}%` }]} />
            ))}
          </View>

          {/* Animated Particles (minimal and elegant) */}
          <View style={styles.particlesContainer}>
            {particleAnims.map((particle, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.particle,
                  {
                    transform: [
                      { translateX: particle.x },
                      { translateY: particle.y },
                    ],
                    opacity: particle.opacity,
                  },
                ]}
              />
            ))}
          </View>

          {/* Diagonal accent lines */}
          <View style={styles.accentLines}>
            <View style={styles.accentLine1} />
            <View style={styles.accentLine2} />
            <View style={styles.accentLine3} />
          </View>

          {/* Main Content */}
          <View style={styles.contentWrapper}>
            <Animated.View
              style={[
                styles.content,
                {
                  opacity: fadeAnim,
                  transform: [{ scale: scaleAnim }],
                },
              ]}
            >
              {/* Glowing Logo Circle */}
              <Animated.View
                style={[
                  styles.logoContainer,
                  {
                    transform: [{ scale: pulseAnim }],
                  },
                ]}
              >
                {/* Outer glow rings */}
                <View style={styles.glowRing1} />
                <View style={styles.glowRing2} />
                <View style={styles.glowRing3} />

                {/* Logo Circle with Image */}
                <View style={styles.logoCircle}>
                  <LinearGradient
                    colors={["#00FF88", "#00D9FF", "#00FF88"]}
                    style={styles.logoGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <View style={styles.logoInner}>
                      <Image
                        source={require("../public/images/white logo with black background.jpg")}
                        style={styles.logoImage}
                        resizeMode="contain"
                      />
                    </View>
                  </LinearGradient>
                </View>
              </Animated.View>

              {/* Brand Name */}
              <View style={styles.brandContainer}>
                <Text style={styles.brandName}>BULKKMATE</Text>
              </View>

              {/* Neon underline */}
              <View style={styles.underline}>
                <LinearGradient
                  colors={["#00D9FF", "#00FF88", "#00D9FF"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.underlineGradient}
                />
              </View>

              {/* Tagline */}
              <View style={styles.taglineContainer}>
                <Text style={styles.tagline}>Train Smart.</Text>
                <Text style={styles.taglineSecondary}>
                  Stay Consistent. Get Strong.
                </Text>
              </View>

              {/* Rotating Motivational Quote */}
              <Animated.View
                style={[
                  styles.quoteContainer,
                  {
                    opacity: quoteAnim,
                    transform: [
                      {
                        translateY: quoteAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [20, 0],
                        }),
                      },
                      {
                        scale: quoteAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0.9, 1],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <View style={styles.quoteAccent} />
                <Text style={styles.quote}>"{motivationalQuotes[currentQuote]}"</Text>
              </Animated.View>
            </Animated.View>

            {/* Join Bulkkmate Button */}
            <Animated.View
              style={[
                styles.buttonContainer,
                {
                  opacity: buttonAnim,
                  transform: [
                    {
                      translateY: buttonAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [50, 0],
                      }),
                    },
                  ],
                },
              ]}
            >
              <TouchableOpacity
                style={styles.joinButton}
                onPress={() => router.push("/auth")}
                activeOpacity={0.9}
              >
                <LinearGradient
                  colors={["#00FF88", "#00D9FF"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.joinButtonGradient}
                >
                  <View style={styles.joinButtonContent}>
                    <Zap size={24} color="#0B0F14" fill="#0B0F14" />
                    <Text style={styles.joinButtonText}>JOIN BULKKMATE</Text>
                    <ArrowRight size={24} color="#0B0F14" strokeWidth={3} />
                  </View>
                </LinearGradient>
              </TouchableOpacity>

              {/* Decorative elements around button */}
              <View style={styles.buttonDecor1} />
              <View style={styles.buttonDecor2} />
            </Animated.View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
  },
  gridPattern: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.03,
  },
  gridLine: {
    position: "absolute",
    width: "100%",
    height: 1,
    backgroundColor: "#00FF88",
  },
  gridLineVertical: {
    position: "absolute",
    width: 1,
    height: "100%",
    backgroundColor: "#00D9FF",
  },
  particlesContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  particle: {
    position: "absolute",
    width: 2,
    height: 2,
    borderRadius: 1,
    backgroundColor: "#00FF88",
    shadowColor: "#00FF88",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  accentLines: {
    ...StyleSheet.absoluteFillObject,
  },
  accentLine1: {
    position: "absolute",
    width: 200,
    height: 2,
    backgroundColor: "#00FF88",
    opacity: 0.2,
    top: "20%",
    left: -50,
    transform: [{ rotate: "45deg" }],
    shadowColor: "#00FF88",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
  },
  accentLine2: {
    position: "absolute",
    width: 150,
    height: 2,
    backgroundColor: "#00D9FF",
    opacity: 0.2,
    top: "60%",
    right: -30,
    transform: [{ rotate: "-45deg" }],
    shadowColor: "#00D9FF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
  },
  accentLine3: {
    position: "absolute",
    width: 100,
    height: 2,
    backgroundColor: "#00FF88",
    opacity: 0.15,
    bottom: "25%",
    left: 20,
    transform: [{ rotate: "30deg" }],
  },
  contentWrapper: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: 50,
    paddingHorizontal: 10,
    paddingBottom: 30,
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 15,
    width: "100%",
    flex: 1,
    justifyContent: "center",
  },
  logoContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25,
    maxWidth: width - 40,
  },
  glowRing1: {
    position: "absolute",
    width: Math.min(300, width - 80),
    height: Math.min(300, width - 80),
    borderRadius: Math.min(150, (width - 80) / 2),
    backgroundColor: "#00FF88",
    opacity: 0.18,
    shadowColor: "#00FF88",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 40,
  },
  glowRing2: {
    position: "absolute",
    width: Math.min(260, width - 120),
    height: Math.min(260, width - 120),
    borderRadius: Math.min(130, (width - 120) / 2),
    backgroundColor: "#00D9FF",
    opacity: 0.15,
    shadowColor: "#00D9FF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 35,
  },
  glowRing3: {
    position: "absolute",
    width: Math.min(220, width - 160),
    height: Math.min(220, width - 160),
    borderRadius: Math.min(110, (width - 160) / 2),
    backgroundColor: "#00FF88",
    opacity: 0.22,
    shadowColor: "#00FF88",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 25,
  },
  logoCircle: {
    width: Math.min(180, width - 200),
    height: Math.min(180, width - 200),
    borderRadius: Math.min(90, (width - 200) / 2),
    padding: 5,
    shadowColor: "#00FF88",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 40,
    elevation: 35,
  },
  logoGradient: {
    width: "100%",
    height: "100%",
    borderRadius: Math.min(90, (width - 200) / 2),
    padding: 4,
  },
  logoInner: {
    width: "100%",
    height: "100%",
    borderRadius: Math.min(90, (width - 200) / 2),
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  logoImage: {
    width: "90%",
    height: "90%",
  },
  brandContainer: {
    position: "relative",
    alignItems: "center",
  },
  brandName: {
    fontSize: Math.min(40, width * 0.105),
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: Math.min(6, width * 0.015),
    textTransform: "uppercase",
    textShadowColor: "#00FF88",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 30,
    marginBottom: 15,
    fontFamily: "Montserrat_900Black",
    textAlign: "center",
    includeFontPadding: false,
  },
  underline: {
    width: Math.min(160, width - 220),
    height: 4,
    borderRadius: 2,
    marginBottom: 20,
    shadowColor: "#00D9FF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 15,
  },
  underlineGradient: {
    flex: 1,
    borderRadius: 2,
  },
  taglineContainer: {
    paddingHorizontal: 20,
    marginBottom: 25,
    maxWidth: width - 40,
    alignItems: "center",
  },
  tagline: {
    fontSize: Math.min(18, width * 0.045),
    fontWeight: "700",
    color: "#B8C1CC",
    letterSpacing: 1.5,
    textAlign: "center",
    marginBottom: 4,
  },
  taglineSecondary: {
    fontSize: Math.min(16, width * 0.04),
    fontWeight: "600",
    color: "#B8C1CC",
    letterSpacing: 1.2,
    textAlign: "center",
  },
  quoteContainer: {
    alignItems: "center",
    paddingHorizontal: 25,
    maxWidth: width - 50,
    position: "relative",
  },
  quoteAccent: {
    width: 60,
    height: 3,
    backgroundColor: "#00D9FF",
    marginBottom: 12,
    borderRadius: 2,
    shadowColor: "#00D9FF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 12,
  },
  quote: {
    fontSize: Math.min(20, width * 0.051),
    fontWeight: "700",
    color: "#FFFFFF",
    fontStyle: "italic",
    textAlign: "center",
    lineHeight: 30,
    paddingHorizontal: 15,
  },
  quoteGraphicLeft: {
    position: "absolute",
    left: 10,
    top: 30,
    width: 20,
    height: 20,
    borderLeftWidth: 3,
    borderTopWidth: 3,
    borderColor: "#00FF88",
    opacity: 0.6,
  },
  quoteGraphicRight: {
    position: "absolute",
    right: 10,
    bottom: 5,
    width: 20,
    height: 20,
    borderRightWidth: 3,
    borderBottomWidth: 3,
    borderColor: "#00D9FF",
    opacity: 0.6,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 25,
    position: "relative",
  },
  joinButton: {
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#00FF88",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 15,
  },
  joinButtonGradient: {
    paddingVertical: 22,
    paddingHorizontal: 28,
  },
  joinButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  joinButtonText: {
    fontSize: Math.min(19, width * 0.048),
    fontWeight: "900",
    color: "#0B0F14",
    letterSpacing: 2,
  },
  buttonDecor1: {
    position: "absolute",
    top: -10,
    left: 10,
    width: 60,
    height: 2,
    backgroundColor: "#00FF88",
    opacity: 0.4,
    borderRadius: 1,
  },
  buttonDecor2: {
    position: "absolute",
    bottom: 10,
    right: 10,
    width: 80,
    height: 2,
    backgroundColor: "#00D9FF",
    opacity: 0.4,
    borderRadius: 1,
  },
});
