import { useRouter } from "expo-router";
import { ArrowRight, Play } from "lucide-react-native";
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

interface Video {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
}

const videos: Video[] = [
  {
    id: 1,
    title: "Transformation Stories",
    description: "See real results from our dedicated clients",
    thumbnail: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80",
  },
  {
    id: 2,
    title: "Training Excellence",
    description: "Professional guidance and technique mastery",
    thumbnail: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
  },
  {
    id: 3,
    title: "Nutrition Mastery",
    description: "Fuel your body for maximum performance",
    thumbnail: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80",
  },
];

export default function VideosScreen() {
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
            <Text style={styles.title}>See Our Work</Text>
            <Text style={styles.subtitle}>
              Watch how we transform lives through dedication and expertise
            </Text>
          </Animated.View>

          <View style={styles.videosContainer}>
            {videos.map((video, index) => (
              <Animated.View
                key={video.id}
                style={[
                  {
                    opacity: fadeAnim,
                    transform: [
                      {
                        translateY: Animated.multiply(
                          slideAnim,
                          new Animated.Value(1 + index * 0.2)
                        ),
                      },
                    ],
                  },
                ]}
              >
                <TouchableOpacity
                  style={styles.videoCard}
                  activeOpacity={0.9}
                >
                  <LinearGradient
                    colors={["rgba(255, 107, 53, 0.3)", "rgba(255, 69, 0, 0.1)"]}
                    style={styles.videoCardGradient}
                  >
                    <View style={styles.playIconContainer}>
                      <View style={styles.playIconBg}>
                        <Play size={32} color="#FFFFFF" fill="#FFFFFF" />
                      </View>
                    </View>
                    <View style={styles.videoInfo}>
                      <Text style={styles.videoTitle}>{video.title}</Text>
                      <Text style={styles.videoDescription}>
                        {video.description}
                      </Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Ready to start your own transformation?
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push("/planning")}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={["#FF6B35", "#FF4500"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>CONTINUE</Text>
                <ArrowRight size={24} color="#FFFFFF" strokeWidth={3} />
              </LinearGradient>
            </TouchableOpacity>
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
    paddingHorizontal: 20,
  },
  videosContainer: {
    paddingHorizontal: 24,
    gap: 20,
  },
  videoCard: {
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 107, 53, 0.3)",
  },
  videoCardGradient: {
    padding: 24,
    minHeight: 160,
    justifyContent: "space-between",
  },
  playIconContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  playIconBg: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#FF6B35",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#FF6B35",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  videoInfo: {
    gap: 8,
  },
  videoTitle: {
    fontSize: 22,
    fontWeight: "800" as const,
    color: "#FFFFFF",
    textAlign: "center",
  },
  videoDescription: {
    fontSize: 14,
    fontWeight: "400" as const,
    color: "#CCCCCC",
    textAlign: "center",
    lineHeight: 20,
  },
  footer: {
    paddingHorizontal: 24,
    paddingTop: 40,
    gap: 20,
  },
  footerText: {
    fontSize: 18,
    fontWeight: "600" as const,
    color: "#FFFFFF",
    textAlign: "center",
  },
  button: {
    borderRadius: 16,
    overflow: "hidden",
    elevation: 8,
    shadowColor: "#FF6B35",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  buttonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    paddingHorizontal: 32,
    gap: 12,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "800" as const,
    color: "#FFFFFF",
    letterSpacing: 2,
  },
});
