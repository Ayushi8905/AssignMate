import { useRouter } from "expo-router";
import { ArrowLeft, Play, Check } from "lucide-react-native";
import React, { useState, useRef, useEffect } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  lastWeight: string;
  completed: boolean;
}

const exercisesData: Exercise[] = [
  {
    id: "1",
    name: "Barbell Bench Press",
    sets: 4,
    reps: "8-10",
    lastWeight: "80 kg",
    completed: false,
  },
  {
    id: "2",
    name: "Incline Dumbbell Press",
    sets: 3,
    reps: "10-12",
    lastWeight: "30 kg",
    completed: false,
  },
  {
    id: "3",
    name: "Cable Flyes",
    sets: 3,
    reps: "12-15",
    lastWeight: "20 kg",
    completed: false,
  },
  {
    id: "4",
    name: "Tricep Pushdowns",
    sets: 3,
    reps: "12-15",
    lastWeight: "25 kg",
    completed: false,
  },
  {
    id: "5",
    name: "Overhead Tricep Extension",
    sets: 3,
    reps: "10-12",
    lastWeight: "15 kg",
    completed: false,
  },
  {
    id: "6",
    name: "Diamond Push-ups",
    sets: 3,
    reps: "15-20",
    lastWeight: "Bodyweight",
    completed: false,
  },
];

export default function WorkoutScreen() {
  const router = useRouter();
  const [exercises, setExercises] = useState(exercisesData);
  const [showCompletion, setShowCompletion] = useState(false);
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

  const toggleExercise = (id: string) => {
    setExercises((prev) =>
      prev.map((ex) =>
        ex.id === id ? { ...ex, completed: !ex.completed } : ex
      )
    );
  };

  const completedCount = exercises.filter((ex) => ex.completed).length;
  const allCompleted = completedCount === exercises.length;

  const handleComplete = () => {
    setShowCompletion(true);
    setTimeout(() => {
      router.back();
    }, 2500);
  };

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
            <View style={styles.headerCenter}>
              <Text style={styles.headerTitle}>CHEST & TRICEPS</Text>
              <Text style={styles.headerSubtitle}>
                {completedCount} of {exercises.length} exercises
              </Text>
            </View>
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
              {/* Muscle Group Illustration */}
              <View style={styles.illustrationContainer}>
                <View style={styles.muscleOutline}>
                  <Text style={styles.muscleText}>💪</Text>
                  <Text style={styles.muscleLabel}>Chest & Triceps</Text>
                </View>
              </View>

              {/* Exercise List */}
              <View style={styles.exercisesContainer}>
                {exercises.map((exercise, index) => (
                  <View key={exercise.id} style={styles.exerciseCard}>
                    <BlurView intensity={20} style={styles.exerciseBlur}>
                      <View
                        style={[
                          styles.exerciseContent,
                          exercise.completed && styles.exerciseCompleted,
                        ]}
                      >
                        <View style={styles.exerciseHeader}>
                          <View style={styles.exerciseNumber}>
                            <Text style={styles.exerciseNumberText}>
                              {index + 1}
                            </Text>
                          </View>
                          <View style={styles.exerciseInfo}>
                            <Text
                              style={[
                                styles.exerciseName,
                                exercise.completed && styles.exerciseNameCompleted,
                              ]}
                            >
                              {exercise.name}
                            </Text>
                            <Text style={styles.exerciseDetails}>
                              {exercise.sets} sets × {exercise.reps} reps
                            </Text>
                            <Text style={styles.lastWeight}>
                              Last: {exercise.lastWeight}
                            </Text>
                          </View>
                        </View>

                        <View style={styles.exerciseActions}>
                          <TouchableOpacity style={styles.playButton}>
                            <Play size={20} color="#8B5CF6" fill="#8B5CF6" />
                          </TouchableOpacity>
                          
                          <TouchableOpacity
                            style={[
                              styles.completeButton,
                              exercise.completed && styles.completeButtonActive,
                            ]}
                            onPress={() => toggleExercise(exercise.id)}
                          >
                            {exercise.completed && (
                              <Check size={20} color="#FFFFFF" strokeWidth={3} />
                            )}
                          </TouchableOpacity>
                        </View>
                      </View>
                    </BlurView>
                  </View>
                ))}
              </View>

              {/* Complete Workout Button */}
              {allCompleted && !showCompletion && (
                <TouchableOpacity
                  style={styles.finishButton}
                  onPress={handleComplete}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={["#22C55E", "#16A34A"]}
                    style={styles.finishGradient}
                  >
                    <Text style={styles.finishText}>
                      MARK WORKOUT COMPLETE
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              )}

              {/* Completion Popup */}
              {showCompletion && (
                <View style={styles.completionOverlay}>
                  <View style={styles.completionCard}>
                    <LinearGradient
                      colors={["#8B5CF6", "#6B21A8"]}
                      style={styles.completionGradient}
                    >
                      <Text style={styles.completionIcon}>🎉</Text>
                      <Text style={styles.completionTitle}>
                        GREAT WORK!
                      </Text>
                      <Text style={styles.completionText}>
                        Recovery builds strength.
                      </Text>
                    </LinearGradient>
                  </View>
                </View>
              )}
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
  headerCenter: {
    flex: 1,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 1,
  },
  headerSubtitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#999",
    marginTop: 4,
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
  illustrationContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  muscleOutline: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(139, 92, 246, 0.1)",
    borderWidth: 2,
    borderColor: "#8B5CF6",
    alignItems: "center",
    justifyContent: "center",
  },
  muscleText: {
    fontSize: 48,
  },
  muscleLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#8B5CF6",
    marginTop: 8,
    position: "absolute",
    bottom: -24,
  },
  exercisesContainer: {
    gap: 16,
  },
  exerciseCard: {
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  exerciseBlur: {
    backgroundColor: "rgba(26, 26, 26, 0.8)",
  },
  exerciseContent: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  exerciseCompleted: {
    opacity: 0.6,
  },
  exerciseHeader: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 16,
  },
  exerciseNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(139, 92, 246, 0.2)",
    borderWidth: 2,
    borderColor: "#8B5CF6",
    alignItems: "center",
    justifyContent: "center",
  },
  exerciseNumberText: {
    fontSize: 16,
    fontWeight: "900",
    color: "#8B5CF6",
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  exerciseNameCompleted: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  exerciseDetails: {
    fontSize: 13,
    fontWeight: "600",
    color: "#999",
    marginBottom: 2,
  },
  lastWeight: {
    fontSize: 12,
    fontWeight: "600",
    color: "#8B5CF6",
  },
  exerciseActions: {
    flexDirection: "row",
    gap: 12,
  },
  playButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(139, 92, 246, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  completeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  completeButtonActive: {
    backgroundColor: "#22C55E",
    borderColor: "#22C55E",
  },
  finishButton: {
    marginTop: 32,
    borderRadius: 16,
    overflow: "hidden",
  },
  finishGradient: {
    paddingVertical: 20,
    alignItems: "center",
  },
  finishText: {
    fontSize: 16,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 1,
  },
  completionOverlay: {
    marginTop: 32,
  },
  completionCard: {
    borderRadius: 20,
    overflow: "hidden",
  },
  completionGradient: {
    padding: 40,
    alignItems: "center",
  },
  completionIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  completionTitle: {
    fontSize: 32,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 2,
    marginBottom: 12,
  },
  completionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
  },
});
