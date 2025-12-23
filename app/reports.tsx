import { useRouter } from "expo-router";
import { ArrowLeft, TrendingUp, Award, Zap } from "lucide-react-native";
import React, { useRef, useEffect } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";

const { width } = Dimensions.get("window");

const strengthData = [
  { week: "W1", bench: 60, squat: 80, deadlift: 100 },
  { week: "W2", bench: 65, squat: 85, deadlift: 105 },
  { week: "W3", bench: 67, squat: 87, deadlift: 110 },
  { week: "W4", bench: 70, squat: 90, deadlift: 115 },
  { week: "W5", bench: 75, squat: 95, deadlift: 120 },
  { week: "W6", bench: 80, squat: 100, deadlift: 125 },
];

const volumeData = [12000, 14500, 13800, 16200, 15500, 18000];

const personalRecords = [
  { exercise: "Bench Press", weight: "80 kg", date: "2 days ago", icon: "🏋️" },
  { exercise: "Squat", weight: "100 kg", date: "1 week ago", icon: "💪" },
  { exercise: "Deadlift", weight: "125 kg", date: "3 days ago", icon: "🔥" },
];

export default function ReportsScreen() {
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

  const maxVolume = Math.max(...volumeData);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#0a0a0a", "#1a0a0a", "#0a0a0a"]}
        style={styles.gradient}
      >
        <SafeAreaView style={styles.safeArea}>
          <Animated.View
            style={[
              styles.header,
              {
                opacity: fadeAnim,
              },
            ]}
          >
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <ArrowLeft size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>WORKOUT REPORTS</Text>
            <View style={styles.placeholder} />
          </Animated.View>

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
              {/* Stats Overview */}
              <View style={styles.statsContainer}>
                <View style={styles.statCard}>
                  <BlurView intensity={20} style={styles.statBlur}>
                    <LinearGradient
                      colors={["rgba(255, 107, 53, 0.2)", "rgba(255, 69, 0, 0.1)"]}
                      style={styles.statGradient}
                    >
                      <TrendingUp size={32} color="#FF6B35" />
                      <Text style={styles.statValue}>+15%</Text>
                      <Text style={styles.statLabel}>Strength Gain</Text>
                    </LinearGradient>
                  </BlurView>
                </View>

                <View style={styles.statCard}>
                  <BlurView intensity={20} style={styles.statBlur}>
                    <LinearGradient
                      colors={["rgba(139, 92, 246, 0.2)", "rgba(107, 33, 168, 0.1)"]}
                      style={styles.statGradient}
                    >
                      <Zap size={32} color="#8B5CF6" fill="#8B5CF6" />
                      <Text style={styles.statValue}>23</Text>
                      <Text style={styles.statLabel}>Workouts</Text>
                    </LinearGradient>
                  </BlurView>
                </View>

                <View style={styles.statCard}>
                  <BlurView intensity={20} style={styles.statBlur}>
                    <LinearGradient
                      colors={["rgba(34, 197, 94, 0.2)", "rgba(21, 128, 61, 0.1)"]}
                      style={styles.statGradient}
                    >
                      <Award size={32} color="#22C55E" />
                      <Text style={styles.statValue}>3</Text>
                      <Text style={styles.statLabel}>New PRs</Text>
                    </LinearGradient>
                  </BlurView>
                </View>
              </View>

              {/* Strength Progress Graph */}
              <View style={styles.chartCard}>
                <BlurView intensity={20} style={styles.chartBlur}>
                  <View style={styles.chartContent}>
                    <Text style={styles.chartTitle}>STRENGTH PROGRESS</Text>
                    <Text style={styles.chartSubtitle}>Last 6 weeks</Text>

                    <View style={styles.chart}>
                      <View style={styles.chartGrid}>
                        {[100, 75, 50, 25, 0].map((value) => (
                          <View key={value} style={styles.gridLine}>
                            <Text style={styles.gridLabel}>{value}</Text>
                            <View style={styles.gridDash} />
                          </View>
                        ))}
                      </View>

                      <View style={styles.chartBars}>
                        {strengthData.map((data, index) => {
                          const maxValue = 125;
                          return (
                            <View key={data.week} style={styles.barGroup}>
                              <View style={styles.bars}>
                                <View
                                  style={[
                                    styles.bar,
                                    styles.benchBar,
                                    { height: `${(data.bench / maxValue) * 100}%` },
                                  ]}
                                />
                                <View
                                  style={[
                                    styles.bar,
                                    styles.squatBar,
                                    { height: `${(data.squat / maxValue) * 100}%` },
                                  ]}
                                />
                                <View
                                  style={[
                                    styles.bar,
                                    styles.deadliftBar,
                                    { height: `${(data.deadlift / maxValue) * 100}%` },
                                  ]}
                                />
                              </View>
                              <Text style={styles.weekLabel}>{data.week}</Text>
                            </View>
                          );
                        })}
                      </View>
                    </View>

                    <View style={styles.legend}>
                      <View style={styles.legendItem}>
                        <View style={[styles.legendDot, { backgroundColor: "#FF6B35" }]} />
                        <Text style={styles.legendText}>Bench</Text>
                      </View>
                      <View style={styles.legendItem}>
                        <View style={[styles.legendDot, { backgroundColor: "#8B5CF6" }]} />
                        <Text style={styles.legendText}>Squat</Text>
                      </View>
                      <View style={styles.legendItem}>
                        <View style={[styles.legendDot, { backgroundColor: "#22C55E" }]} />
                        <Text style={styles.legendText}>Deadlift</Text>
                      </View>
                    </View>
                  </View>
                </BlurView>
              </View>

              {/* Weekly Volume Chart */}
              <View style={styles.chartCard}>
                <BlurView intensity={20} style={styles.chartBlur}>
                  <View style={styles.chartContent}>
                    <Text style={styles.chartTitle}>WEEKLY VOLUME</Text>
                    <Text style={styles.chartSubtitle}>Total kg lifted</Text>

                    <View style={styles.volumeChart}>
                      {volumeData.map((volume, index) => (
                        <View key={index} style={styles.volumeBarContainer}>
                          <View
                            style={[
                              styles.volumeBar,
                              { height: `${(volume / maxVolume) * 100}%` },
                            ]}
                          >
                            <LinearGradient
                              colors={["#3B82F6", "#1D4ED8"]}
                              style={styles.volumeBarGradient}
                            />
                          </View>
                          <Text style={styles.volumeLabel}>W{index + 1}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                </BlurView>
              </View>

              {/* Personal Records */}
              <View style={styles.prSection}>
                <Text style={styles.sectionTitle}>PERSONAL RECORDS</Text>
                {personalRecords.map((pr, index) => (
                  <View key={index} style={styles.prCard}>
                    <BlurView intensity={20} style={styles.prBlur}>
                      <View style={styles.prContent}>
                        <Text style={styles.prIcon}>{pr.icon}</Text>
                        <View style={styles.prInfo}>
                          <Text style={styles.prExercise}>{pr.exercise}</Text>
                          <Text style={styles.prDate}>{pr.date}</Text>
                        </View>
                        <View style={styles.prBadge}>
                          <LinearGradient
                            colors={["#FFD700", "#FFA500"]}
                            style={styles.prBadgeGradient}
                          >
                            <Text style={styles.prWeight}>{pr.weight}</Text>
                            <Text style={styles.prLabel}>NEW PR!</Text>
                          </LinearGradient>
                        </View>
                      </View>
                    </BlurView>
                  </View>
                ))}
              </View>
            </Animated.View>
          </ScrollView>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 1,
  },
  placeholder: {
    width: 44,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  content: {
    paddingHorizontal: 24,
  },
  statsContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  statBlur: {
    backgroundColor: "rgba(26, 26, 26, 0.8)",
  },
  statGradient: {
    padding: 16,
    alignItems: "center",
    gap: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "900",
    color: "#FFFFFF",
  },
  statLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#999",
    textAlign: "center",
  },
  chartCard: {
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    marginBottom: 24,
  },
  chartBlur: {
    backgroundColor: "rgba(26, 26, 26, 0.8)",
  },
  chartContent: {
    padding: 20,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 1,
    marginBottom: 4,
  },
  chartSubtitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#999",
    marginBottom: 24,
  },
  chart: {
    height: 200,
    position: "relative",
  },
  chartGrid: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "space-between",
  },
  gridLine: {
    flexDirection: "row",
    alignItems: "center",
  },
  gridLabel: {
    fontSize: 10,
    fontWeight: "600",
    color: "#666",
    width: 30,
  },
  gridDash: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  chartBars: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-around",
    height: "100%",
    paddingLeft: 40,
  },
  barGroup: {
    alignItems: "center",
    flex: 1,
  },
  bars: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 2,
    height: "85%",
  },
  bar: {
    width: 8,
    borderRadius: 4,
  },
  benchBar: {
    backgroundColor: "#FF6B35",
  },
  squatBar: {
    backgroundColor: "#8B5CF6",
  },
  deadliftBar: {
    backgroundColor: "#22C55E",
  },
  weekLabel: {
    fontSize: 10,
    fontWeight: "600",
    color: "#999",
    marginTop: 8,
  },
  legend: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginTop: 20,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#CCCCCC",
  },
  volumeChart: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-around",
    height: 150,
    gap: 8,
  },
  volumeBarContainer: {
    flex: 1,
    alignItems: "center",
    height: "100%",
  },
  volumeBar: {
    width: "100%",
    borderRadius: 8,
    overflow: "hidden",
  },
  volumeBarGradient: {
    flex: 1,
  },
  volumeLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#999",
    marginTop: 8,
  },
  prSection: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 1,
    marginBottom: 8,
  },
  prCard: {
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 215, 0, 0.3)",
  },
  prBlur: {
    backgroundColor: "rgba(26, 26, 26, 0.8)",
  },
  prContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 16,
  },
  prIcon: {
    fontSize: 40,
  },
  prInfo: {
    flex: 1,
  },
  prExercise: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  prDate: {
    fontSize: 12,
    fontWeight: "600",
    color: "#999",
  },
  prBadge: {
    borderRadius: 12,
    overflow: "hidden",
  },
  prBadgeGradient: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: "center",
  },
  prWeight: {
    fontSize: 18,
    fontWeight: "900",
    color: "#000000",
  },
  prLabel: {
    fontSize: 9,
    fontWeight: "800",
    color: "#000000",
    letterSpacing: 1,
  },
});
