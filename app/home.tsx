import { useRouter } from "expo-router";
import {
  Menu,
  Flame,
  Dumbbell,
  Scale,
  TrendingUp,
  ChevronRight,
  Award,
} from "lucide-react-native";
import React, { useRef, useEffect } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";

const { width } = Dimensions.get("window");

const motivationalQuotes = [
  "Pain is temporary. Gains are forever.",
  "Strong body, disciplined mind.",
  "No shortcuts. Just work.",
  "Discipline creates legends.",
];

export default function HomeScreen() {
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
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../public/images/istockphoto-1956798859-612x612.jpg")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <LinearGradient
          colors={["rgba(11, 15, 20, 0.92)", "rgba(18, 24, 32, 0.88)", "rgba(11, 15, 20, 0.92)"]}
          style={styles.gradient}
        >
        <SafeAreaView style={styles.safeArea}>
          <ScrollView
            style={styles.scrollView}
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
              {/* Decorative graphics */}
              <View style={styles.decorativeElements}>
                <View style={styles.decorCircle1} />
                <View style={styles.decorCircle2} />
                <View style={styles.decorLine1} />
                <View style={styles.decorLine2} />
              </View>

              {/* Header */}
              <View style={styles.header}>
                <TouchableOpacity style={styles.menuButton}>
                  <Menu size={28} color="#FFFFFF" />
                </TouchableOpacity>
                
                <View style={styles.profileSection}>
                  <View style={styles.avatarContainer}>
                    <LinearGradient
                      colors={["#FF6B35", "#FF4500"]}
                      style={styles.avatarGlow}
                    >
                      <View style={styles.avatar}>
                        <Text style={styles.avatarText}>R</Text>
                      </View>
                    </LinearGradient>
                  </View>
                  
                  <View style={styles.greetingContainer}>
                    <Text style={styles.greeting}>Welcome back, Riya 💪</Text>
                    <Text style={styles.subtitle}>Day 23 of your transformation</Text>
                  </View>
                </View>
              </View>

              {/* Progress Strip */}
              <View style={styles.progressStrip}>
                <View style={styles.progressInfo}>
                  <Text style={styles.progressLabel}>Plan Completion</Text>
                  <Text style={styles.progressPercent}>68%</Text>
                </View>
                <View style={styles.progressBarContainer}>
                  <View style={styles.progressBar}>
                    <LinearGradient
                      colors={["#FF6B35", "#FF4500"]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={[styles.progressFill, { width: "68%" }]}
                    />
                  </View>
                  <View style={styles.streakContainer}>
                    <Flame size={16} color="#00FF88" fill="#00FF88" />
                    <Text style={styles.streakText}>23 day streak</Text>
                  </View>
                </View>
              </View>

              {/* Main Action Cards */}
              <View style={styles.cardsContainer}>
                {/* Diet Card */}
                <TouchableOpacity
                  style={styles.actionCard}
                  onPress={() => router.push("/diet")}
                  activeOpacity={0.85}
                >
                  <BlurView intensity={20} style={styles.cardBlur}>
                    <LinearGradient
                      colors={["rgba(0, 255, 136, 0.2)", "rgba(0, 217, 255, 0.1)"]}
                      style={styles.cardGradient}
                    >
                      <View style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>DIET</Text>
                        <ChevronRight size={24} color="#00FF88" />
                      </View>
                      
                      <View style={styles.calorieRing}>
                        <View style={styles.ringOuter}>
                          <View style={styles.ringInner}>
                            <Text style={styles.calorieNumber}>1,240</Text>
                            <Text style={styles.calorieLabel}>remaining</Text>
                          </View>
                        </View>
                      </View>
                      
                      <View style={styles.macrosRow}>
                        <View style={styles.macroItem}>
                          <Text style={styles.macroValue}>120g</Text>
                          <Text style={styles.macroLabel}>Protein</Text>
                        </View>
                        <View style={styles.macroItem}>
                          <Text style={styles.macroValue}>180g</Text>
                          <Text style={styles.macroLabel}>Carbs</Text>
                        </View>
                        <View style={styles.macroItem}>
                          <Text style={styles.macroValue}>45g</Text>
                          <Text style={styles.macroLabel}>Fats</Text>
                        </View>
                      </View>
                    </LinearGradient>
                  </BlurView>
                </TouchableOpacity>

                {/* Workout Card */}
                <TouchableOpacity
                  style={styles.actionCard}
                  onPress={() => router.push("/workout")}
                  activeOpacity={0.85}
                >
                  <BlurView intensity={20} style={styles.cardBlur}>
                    <LinearGradient
                      colors={["rgba(139, 92, 246, 0.2)", "rgba(107, 33, 168, 0.1)"]}
                      style={styles.cardGradient}
                    >
                      <View style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>TODAY'S WORKOUT</Text>
                        <Dumbbell size={24} color="#8B5CF6" />
                      </View>
                      
                      <Text style={styles.workoutSplit}>Chest & Triceps</Text>
                      
                      <View style={styles.exerciseProgress}>
                        <View style={styles.progressDots}>
                          {[1, 2, 3, 4, 5, 6].map((dot, index) => (
                            <View
                              key={dot}
                              style={[
                                styles.dot,
                                index < 3 && styles.dotCompleted,
                              ]}
                            />
                          ))}
                        </View>
                        <Text style={styles.exerciseCount}>3 of 6 exercises</Text>
                      </View>
                      
                      <TouchableOpacity style={styles.startButton}>
                        <LinearGradient
                          colors={["#8B5CF6", "#6B21A8"]}
                          style={styles.startButtonGradient}
                        >
                          <Text style={styles.startButtonText}>START WORKOUT</Text>
                        </LinearGradient>
                      </TouchableOpacity>
                    </LinearGradient>
                  </BlurView>
                </TouchableOpacity>

                {/* Weight Tracker Card */}
                <TouchableOpacity
                  style={[styles.actionCard, styles.smallCard]}
                  activeOpacity={0.85}
                >
                  <BlurView intensity={20} style={styles.cardBlur}>
                    <LinearGradient
                      colors={["rgba(34, 197, 94, 0.2)", "rgba(21, 128, 61, 0.1)"]}
                      style={styles.cardGradient}
                    >
                      <View style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>WEIGHT TRACKER</Text>
                        <Scale size={24} color="#22C55E" />
                      </View>
                      
                      <Text style={styles.weightValue}>78.5 kg</Text>
                      <View style={styles.weightChange}>
                        <TrendingUp size={16} color="#22C55E" />
                        <Text style={styles.weightChangeText}>+2.3 kg this week</Text>
                      </View>
                    </LinearGradient>
                  </BlurView>
                </TouchableOpacity>

                {/* Reports Card */}
                <TouchableOpacity
                  style={[styles.actionCard, styles.smallCard]}
                  onPress={() => router.push("/reports")}
                  activeOpacity={0.85}
                >
                  <BlurView intensity={20} style={styles.cardBlur}>
                    <LinearGradient
                      colors={["rgba(59, 130, 246, 0.2)", "rgba(29, 78, 216, 0.1)"]}
                      style={styles.cardGradient}
                    >
                      <View style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>WORKOUT REPORTS</Text>
                        <Award size={24} color="#3B82F6" />
                      </View>
                      
                      <Text style={styles.reportsText}>Track your strength growth</Text>
                      <View style={styles.graphPreview}>
                        {[40, 60, 45, 70, 55, 80].map((height, index) => (
                          <View
                            key={index}
                            style={[styles.graphBar, { height: `${height}%` }]}
                          />
                        ))}
                      </View>
                    </LinearGradient>
                  </BlurView>
                </TouchableOpacity>
              </View>

              {/* Motivation Strip */}
              <View style={styles.motivationSection}>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.motivationScroll}
                >
                  {motivationalQuotes.map((quote, index) => (
                    <View key={index} style={styles.motivationCard}>
                      <LinearGradient
                        colors={["#1a1a1a", "#0a0a0a"]}
                        style={styles.motivationGradient}
                      >
                        <Text style={styles.motivationQuote}>"{quote}"</Text>
                      </LinearGradient>
                    </View>
                  ))}
                </ScrollView>
              </View>
            </Animated.View>
          </ScrollView>
        </SafeAreaView>
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
  gradient: {
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
  content: {
    paddingTop: 20,
  },
  header: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  menuButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  avatarContainer: {
    padding: 3,
  },
  avatarGlow: {
    borderRadius: 30,
    padding: 3,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#121820",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 24,
    fontWeight: "900",
    color: "#00FF88",
  },
  greetingContainer: {
    flex: 1,
  },
  greeting: {
    fontSize: 20,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#999",
  },
  progressStrip: {
    marginHorizontal: 24,
    marginBottom: 24,
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(0, 255, 136, 0.2)",
  },
  progressInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#CCCCCC",
  },
  progressPercent: {
    fontSize: 24,
    fontWeight: "900",
    color: "#00FF88",
  },
  progressBarContainer: {
    gap: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  streakContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  streakText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#00FF88",
  },
  cardsContainer: {
    paddingHorizontal: 24,
    gap: 16,
  },
  actionCard: {
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  smallCard: {
    height: 180,
  },
  cardBlur: {
    overflow: "hidden",
  },
  cardGradient: {
    padding: 20,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 1,
  },
  calorieRing: {
    alignItems: "center",
    marginVertical: 20,
  },
  ringOuter: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 8,
    borderColor: "#00FF88",
    alignItems: "center",
    justifyContent: "center",
  },
  ringInner: {
    alignItems: "center",
  },
  calorieNumber: {
    fontSize: 28,
    fontWeight: "900",
    color: "#FFFFFF",
  },
  calorieLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#999",
  },
  macrosRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  macroItem: {
    alignItems: "center",
  },
  macroValue: {
    fontSize: 18,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  macroLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#999",
    marginTop: 4,
  },
  workoutSplit: {
    fontSize: 24,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 16,
  },
  exerciseProgress: {
    marginBottom: 16,
  },
  progressDots: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 8,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  dotCompleted: {
    backgroundColor: "#8B5CF6",
  },
  exerciseCount: {
    fontSize: 13,
    fontWeight: "600",
    color: "#999",
  },
  startButton: {
    borderRadius: 12,
    overflow: "hidden",
  },
  startButtonGradient: {
    paddingVertical: 14,
    alignItems: "center",
  },
  startButtonText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 1,
  },
  weightValue: {
    fontSize: 36,
    fontWeight: "900",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  weightChange: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  weightChangeText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#22C55E",
  },
  reportsText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#CCCCCC",
    marginBottom: 16,
  },
  graphPreview: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
    height: 60,
  },
  graphBar: {
    flex: 1,
    backgroundColor: "#3B82F6",
    borderRadius: 4,
  },
  motivationSection: {
    marginTop: 24,
  },
  motivationScroll: {
    paddingHorizontal: 24,
    gap: 16,
  },
  motivationCard: {
    width: width - 100,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(0, 255, 136, 0.3)",
  },
  motivationGradient: {
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 100,
  },
  motivationQuote: {
    fontSize: 16,
    fontWeight: "700",
    color: "#00FF88",
    textAlign: "center",
    fontStyle: "italic",
  },
  decorativeElements: {
    ...StyleSheet.absoluteFillObject,
    pointerEvents: "none",
  },
  decorCircle1: {
    position: "absolute",
    top: 100,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "rgba(0, 255, 136, 0.2)",
  },
  decorCircle2: {
    position: "absolute",
    bottom: 200,
    left: 30,
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "rgba(0, 217, 255, 0.2)",
  },
  decorLine1: {
    position: "absolute",
    top: 250,
    left: -20,
    width: 100,
    height: 2,
    backgroundColor: "rgba(0, 255, 136, 0.15)",
    transform: [{ rotate: "45deg" }],
  },
  decorLine2: {
    position: "absolute",
    bottom: 350,
    right: -10,
    width: 80,
    height: 2,
    backgroundColor: "rgba(0, 217, 255, 0.15)",
    transform: [{ rotate: "-45deg" }],
  },
});
