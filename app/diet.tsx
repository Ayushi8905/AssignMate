import { useRouter } from "expo-router";
import { ArrowLeft, Check, X, Plus } from "lucide-react-native";
import React, { useState, useRef, useEffect } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";

interface Meal {
  id: string;
  time: string;
  name: string;
  icon: string;
  foods: { name: string; portion: string; completed: boolean }[];
}

const mealsData: Meal[] = [
  {
    id: "breakfast",
    time: "08:00 AM",
    name: "Breakfast",
    icon: "🍳",
    foods: [
      { name: "Oatmeal with berries", portion: "1 cup", completed: true },
      { name: "Scrambled eggs", portion: "3 eggs", completed: true },
      { name: "Banana", portion: "1 medium", completed: true },
    ],
  },
  {
    id: "lunch",
    time: "01:00 PM",
    name: "Lunch",
    icon: "🍗",
    foods: [
      { name: "Grilled chicken breast", portion: "200g", completed: true },
      { name: "Brown rice", portion: "1 cup", completed: false },
      { name: "Mixed vegetables", portion: "150g", completed: false },
    ],
  },
  {
    id: "snack",
    time: "04:00 PM",
    name: "Snacks",
    icon: "🥗",
    foods: [
      { name: "Protein shake", portion: "1 scoop", completed: false },
      { name: "Almonds", portion: "30g", completed: false },
    ],
  },
  {
    id: "dinner",
    time: "08:00 PM",
    name: "Dinner",
    icon: "🐟",
    foods: [
      { name: "Salmon fillet", portion: "180g", completed: false },
      { name: "Sweet potato", portion: "1 medium", completed: false },
      { name: "Broccoli", portion: "100g", completed: false },
    ],
  },
];

export default function DietScreen() {
  const router = useRouter();
  const [meals, setMeals] = useState(mealsData);
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

  const toggleFood = (mealId: string, foodIndex: number) => {
    setMeals((prevMeals) =>
      prevMeals.map((meal) =>
        meal.id === mealId
          ? {
              ...meal,
              foods: meal.foods.map((food, index) =>
                index === foodIndex
                  ? { ...food, completed: !food.completed }
                  : food
              ),
            }
          : meal
      )
    );
  };

  const allCompleted = meals.every((meal) =>
    meal.foods.every((food) => food.completed)
  );

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
            <Text style={styles.headerTitle}>DIET TRACKING</Text>
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
              {/* Macro Rings */}
              <View style={styles.macroSection}>
                <View style={styles.macroRings}>
                  <View style={styles.macroRing}>
                    <View style={[styles.ring, styles.calorieRing]}>
                      <Text style={styles.ringValue}>2,240</Text>
                      <Text style={styles.ringLabel}>Cal</Text>
                    </View>
                  </View>
                  <View style={styles.macroRing}>
                    <View style={[styles.ring, styles.proteinRing]}>
                      <Text style={styles.ringValue}>180g</Text>
                      <Text style={styles.ringLabel}>Protein</Text>
                    </View>
                  </View>
                  <View style={styles.macroRing}>
                    <View style={[styles.ring, styles.carbsRing]}>
                      <Text style={styles.ringValue}>250g</Text>
                      <Text style={styles.ringLabel}>Carbs</Text>
                    </View>
                  </View>
                  <View style={styles.macroRing}>
                    <View style={[styles.ring, styles.fatsRing]}>
                      <Text style={styles.ringValue}>65g</Text>
                      <Text style={styles.ringLabel}>Fats</Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Meal Timeline */}
              <View style={styles.mealsContainer}>
                {meals.map((meal, mealIndex) => (
                  <View key={meal.id} style={styles.mealCard}>
                    <BlurView intensity={20} style={styles.mealBlur}>
                      <View style={styles.mealContent}>
                        <View style={styles.mealHeader}>
                          <View style={styles.mealInfo}>
                            <Text style={styles.mealIcon}>{meal.icon}</Text>
                            <View>
                              <Text style={styles.mealName}>{meal.name}</Text>
                              <Text style={styles.mealTime}>{meal.time}</Text>
                            </View>
                          </View>
                        </View>

                        <View style={styles.foodsList}>
                          {meal.foods.map((food, foodIndex) => (
                            <TouchableOpacity
                              key={foodIndex}
                              style={styles.foodItem}
                              onPress={() => toggleFood(meal.id, foodIndex)}
                              activeOpacity={0.7}
                            >
                              <View style={styles.foodInfo}>
                                <Text
                                  style={[
                                    styles.foodName,
                                    food.completed && styles.foodCompleted,
                                  ]}
                                >
                                  {food.name}
                                </Text>
                                <Text style={styles.foodPortion}>
                                  {food.portion}
                                </Text>
                              </View>
                              <View
                                style={[
                                  styles.checkbox,
                                  food.completed && styles.checkboxCompleted,
                                ]}
                              >
                                {food.completed && (
                                  <Check size={16} color="#FFFFFF" strokeWidth={3} />
                                )}
                              </View>
                            </TouchableOpacity>
                          ))}
                        </View>
                      </View>
                    </BlurView>
                  </View>
                ))}
              </View>

              {/* Complete Button */}
              {allCompleted && (
                <View style={styles.completionContainer}>
                  <View style={styles.completionCard}>
                    <LinearGradient
                      colors={["#22C55E", "#16A34A"]}
                      style={styles.completionGradient}
                    >
                      <Text style={styles.completionIcon}>🎉</Text>
                      <Text style={styles.completionTitle}>
                        DIET COMPLETED!
                      </Text>
                      <Text style={styles.completionText}>
                        Great job staying consistent with your nutrition!
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
  macroSection: {
    marginBottom: 32,
  },
  macroRings: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  macroRing: {
    flex: 1,
  },
  ring: {
    aspectRatio: 1,
    borderRadius: 1000,
    borderWidth: 6,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  calorieRing: {
    borderColor: "#FF6B35",
  },
  proteinRing: {
    borderColor: "#8B5CF6",
  },
  carbsRing: {
    borderColor: "#3B82F6",
  },
  fatsRing: {
    borderColor: "#F59E0B",
  },
  ringValue: {
    fontSize: 16,
    fontWeight: "900",
    color: "#FFFFFF",
  },
  ringLabel: {
    fontSize: 10,
    fontWeight: "600",
    color: "#999",
    marginTop: 2,
  },
  mealsContainer: {
    gap: 16,
  },
  mealCard: {
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  mealBlur: {
    backgroundColor: "rgba(26, 26, 26, 0.8)",
  },
  mealContent: {
    padding: 20,
  },
  mealHeader: {
    marginBottom: 16,
  },
  mealInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  mealIcon: {
    fontSize: 32,
  },
  mealName: {
    fontSize: 20,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  mealTime: {
    fontSize: 13,
    fontWeight: "600",
    color: "#999",
    marginTop: 2,
  },
  foodsList: {
    gap: 12,
  },
  foodItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  foodInfo: {
    flex: 1,
  },
  foodName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  foodCompleted: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  foodPortion: {
    fontSize: 13,
    fontWeight: "500",
    color: "#999",
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxCompleted: {
    backgroundColor: "#22C55E",
    borderColor: "#22C55E",
  },
  completionContainer: {
    marginTop: 24,
  },
  completionCard: {
    borderRadius: 20,
    overflow: "hidden",
  },
  completionGradient: {
    padding: 32,
    alignItems: "center",
  },
  completionIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  completionTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 1,
    marginBottom: 8,
  },
  completionText: {
    fontSize: 14,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
  },
});
