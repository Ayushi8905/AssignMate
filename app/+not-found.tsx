import { Link, Stack } from "expo-router";
import { AlertTriangle } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <LinearGradient
        colors={["#0a0a0a", "#1a1a1a", "#2a2a2a"]}
        style={styles.container}
      >
        <AlertTriangle size={64} color="#FF6B35" strokeWidth={2} />
        <Text style={styles.title}>Page Not Found</Text>
        <Text style={styles.subtitle}>This screen doesn&apos;t exist.</Text>

        <Link href="/" style={styles.link}>
          <View style={styles.linkButton}>
            <Text style={styles.linkText}>RETURN HOME</Text>
          </View>
        </Link>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    gap: 16,
  },
  title: {
    fontSize: 32,
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
  },
  link: {
    marginTop: 20,
  },
  linkButton: {
    backgroundColor: "#FF6B35",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  linkText: {
    fontSize: 16,
    fontWeight: "800" as const,
    color: "#FFFFFF",
    letterSpacing: 1,
  },
});
