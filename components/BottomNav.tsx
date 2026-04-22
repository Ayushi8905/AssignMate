import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { useRouter } from "expo-router";
import { Home, Calendar, BarChart2 } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

type Tab = "home" | "calendar" | "stats";

const tabs: { key: Tab; icon: any; label: string; route: string }[] = [
  { key: "home", icon: Home, label: "Home", route: "/home" },
  { key: "calendar", icon: Calendar, label: "Calendar", route: "/calendar" },
  { key: "stats", icon: BarChart2, label: "Stats", route: "/stats" },
];

export default function BottomNav({ active }: { active: Tab }) {
  const router = useRouter();

  return (
    <View style={styles.wrapper}>
      <BlurView intensity={60} tint="dark" style={styles.blur}>
        <View style={styles.bar}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = active === tab.key;
            return (
              <TouchableOpacity
                key={tab.key}
                style={styles.tab}
                onPress={() => !isActive && router.replace(tab.route as any)}
                activeOpacity={0.7}
              >
                {isActive ? (
                  <LinearGradient colors={["#4F8EF7", "#7C5CBF"]} style={styles.activeIconWrap}>
                    <Icon size={22} color="#FFF" strokeWidth={2} />
                  </LinearGradient>
                ) : (
                  <View style={styles.iconWrap}>
                    <Icon size={22} color="#4A5568" strokeWidth={2} />
                  </View>
                )}
                <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>{tab.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute", bottom: 24, left: 24, right: 24,
    borderRadius: 28, overflow: "hidden",
    shadowColor: "#4F8EF7", shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3, shadowRadius: 20, elevation: 20,
  },
  blur: { borderRadius: 28 },
  bar: {
    flexDirection: "row", justifyContent: "space-around", alignItems: "center",
    paddingVertical: 12, paddingHorizontal: 16,
    backgroundColor: "rgba(15, 17, 23, 0.85)",
    borderRadius: 28, borderWidth: 1,
    borderColor: "rgba(79, 142, 247, 0.2)",
  },
  tab: { alignItems: "center", gap: 4, flex: 1 },
  iconWrap: { width: 44, height: 44, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  activeIconWrap: { width: 44, height: 44, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  tabLabel: { fontSize: 11, color: "#4A5568", fontWeight: "600" },
  tabLabelActive: { color: "#4F8EF7" },
});
