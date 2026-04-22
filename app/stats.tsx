import React from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { CheckCircle, Clock, AlertTriangle, BookOpen } from "lucide-react-native";
import { useAssignments, getUrgency, urgencyColor } from "../store/assignments";
import BottomNav from "../components/BottomNav";

const { width } = Dimensions.get("window");

export default function StatsScreen() {
  const { assignments } = useAssignments();

  const total = assignments.length;
  const completed = assignments.filter((a) => a.completed).length;
  const pending = assignments.filter((a) => !a.completed).length;
  const overdue = assignments.filter((a) => !a.completed && getUrgency(a.dueDate) === "overdue").length;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  // Subject breakdown
  const subjectMap: Record<string, { total: number; done: number }> = {};
  assignments.forEach((a) => {
    if (!subjectMap[a.subject]) subjectMap[a.subject] = { total: 0, done: 0 };
    subjectMap[a.subject].total++;
    if (a.completed) subjectMap[a.subject].done++;
  });
  const subjects = Object.entries(subjectMap).sort((a, b) => b[1].total - a[1].total);

  // Urgency breakdown (pending only)
  const urgencyMap = { overdue: 0, urgent: 0, soon: 0, normal: 0 };
  assignments.filter((a) => !a.completed).forEach((a) => { urgencyMap[getUrgency(a.dueDate)]++; });

  const subjectColors = ["#4F8EF7", "#7C5CBF", "#22C55E", "#F97316", "#EAB308", "#EF4444", "#06B6D4", "#EC4899"];

  return (
    <LinearGradient colors={["#0F1117", "#1A1D2E", "#0F1117"]} style={styles.container}>
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Statistics</Text>
            <Text style={styles.headerSub}>Track your academic progress</Text>
          </View>

          {/* Summary cards */}
          <View style={styles.summaryGrid}>
            {[
              { label: "Total", value: total, icon: BookOpen, color: "#4F8EF7" },
              { label: "Completed", value: completed, icon: CheckCircle, color: "#22C55E" },
              { label: "Pending", value: pending, icon: Clock, color: "#EAB308" },
              { label: "Overdue", value: overdue, icon: AlertTriangle, color: "#EF4444" },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <View key={s.label} style={[styles.summaryCard, { borderColor: s.color + "33" }]}>
                  <View style={[styles.summaryIcon, { backgroundColor: s.color + "22" }]}>
                    <Icon size={20} color={s.color} strokeWidth={2} />
                  </View>
                  <Text style={[styles.summaryValue, { color: s.color }]}>{s.value}</Text>
                  <Text style={styles.summaryLabel}>{s.label}</Text>
                </View>
              );
            })}
          </View>

          {/* Completion ring */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Overall Completion</Text>
            <View style={styles.ringCard}>
              <View style={styles.ringWrap}>
                <View style={styles.ringOuter}>
                  <LinearGradient colors={["#4F8EF7", "#7C5CBF"]} style={styles.ringFill}>
                    <View style={styles.ringInner}>
                      <Text style={styles.ringPercent}>{completionRate}%</Text>
                      <Text style={styles.ringLabel}>done</Text>
                    </View>
                  </LinearGradient>
                </View>
              </View>
              <View style={styles.ringStats}>
                <View style={styles.ringStat}>
                  <View style={[styles.ringDot, { backgroundColor: "#22C55E" }]} />
                  <Text style={styles.ringStatText}>{completed} completed</Text>
                </View>
                <View style={styles.ringStat}>
                  <View style={[styles.ringDot, { backgroundColor: "#4A5568" }]} />
                  <Text style={styles.ringStatText}>{pending} remaining</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Urgency breakdown */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pending by Urgency</Text>
            <View style={styles.urgencyCard}>
              {(["overdue", "urgent", "soon", "normal"] as const).map((u) => {
                const count = urgencyMap[u];
                const color = urgencyColor(u);
                const barW = pending > 0 ? (count / pending) * (width - 96) : 0;
                return (
                  <View key={u} style={styles.urgencyRow}>
                    <View style={[styles.urgencyDot, { backgroundColor: color }]} />
                    <Text style={styles.urgencyLabel}>{u.charAt(0).toUpperCase() + u.slice(1)}</Text>
                    <View style={styles.urgencyBarBg}>
                      <View style={[styles.urgencyBar, { width: barW, backgroundColor: color }]} />
                    </View>
                    <Text style={[styles.urgencyCount, { color }]}>{count}</Text>
                  </View>
                );
              })}
            </View>
          </View>

          {/* Subject breakdown */}
          <View style={[styles.section, { paddingBottom: 160 }]}>
            <Text style={styles.sectionTitle}>By Subject</Text>
            {subjects.map(([subject, data], i) => {
              const pct = data.total > 0 ? data.done / data.total : 0;
              const color = subjectColors[i % subjectColors.length];
              return (
                <View key={subject} style={styles.subjectCard}>
                  <View style={styles.subjectTop}>
                    <View style={[styles.subjectDot, { backgroundColor: color }]} />
                    <Text style={styles.subjectName}>{subject}</Text>
                    <Text style={styles.subjectCount}>{data.done}/{data.total}</Text>
                  </View>
                  <View style={styles.subjectBarBg}>
                    <View style={[styles.subjectBar, { width: `${pct * 100}%` as any, backgroundColor: color }]} />
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>

        <BottomNav active="stats" />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safe: { flex: 1 },
  scroll: { paddingHorizontal: 24 },
  header: { paddingTop: 16, paddingBottom: 20 },
  headerTitle: { fontSize: 24, fontWeight: "800", color: "#FFF" },
  headerSub: { fontSize: 13, color: "#A0AEC0", marginTop: 2 },
  summaryGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginBottom: 24 },
  summaryCard: {
    width: (width - 60) / 2, backgroundColor: "rgba(26,29,46,0.95)",
    borderRadius: 16, padding: 16, borderWidth: 1, alignItems: "center", gap: 6,
  },
  summaryIcon: { width: 40, height: 40, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  summaryValue: { fontSize: 28, fontWeight: "800" },
  summaryLabel: { fontSize: 12, color: "#A0AEC0", fontWeight: "600" },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 16, fontWeight: "700", color: "#FFF", marginBottom: 12 },
  ringCard: {
    backgroundColor: "rgba(26,29,46,0.95)", borderRadius: 20, padding: 24,
    borderWidth: 1, borderColor: "rgba(79,142,247,0.15)",
    flexDirection: "row", alignItems: "center", gap: 24,
  },
  ringWrap: { alignItems: "center" },
  ringOuter: { width: 100, height: 100, borderRadius: 50, padding: 4, backgroundColor: "rgba(79,142,247,0.1)" },
  ringFill: { flex: 1, borderRadius: 46, alignItems: "center", justifyContent: "center" },
  ringInner: { width: 72, height: 72, borderRadius: 36, backgroundColor: "#1A1D2E", alignItems: "center", justifyContent: "center" },
  ringPercent: { fontSize: 22, fontWeight: "800", color: "#FFF" },
  ringLabel: { fontSize: 11, color: "#A0AEC0" },
  ringStats: { flex: 1, gap: 12 },
  ringStat: { flexDirection: "row", alignItems: "center", gap: 8 },
  ringDot: { width: 10, height: 10, borderRadius: 5 },
  ringStatText: { fontSize: 14, color: "#A0AEC0" },
  urgencyCard: {
    backgroundColor: "rgba(26,29,46,0.95)", borderRadius: 20, padding: 20,
    borderWidth: 1, borderColor: "rgba(79,142,247,0.15)", gap: 14,
  },
  urgencyRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  urgencyDot: { width: 8, height: 8, borderRadius: 4 },
  urgencyLabel: { fontSize: 13, color: "#A0AEC0", width: 60 },
  urgencyBarBg: { flex: 1, height: 8, backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 4, overflow: "hidden" },
  urgencyBar: { height: "100%", borderRadius: 4 },
  urgencyCount: { fontSize: 13, fontWeight: "700", width: 20, textAlign: "right" },
  subjectCard: {
    backgroundColor: "rgba(26,29,46,0.95)", borderRadius: 14, padding: 14,
    borderWidth: 1, borderColor: "rgba(255,255,255,0.06)", marginBottom: 10,
  },
  subjectTop: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 10 },
  subjectDot: { width: 10, height: 10, borderRadius: 5 },
  subjectName: { flex: 1, fontSize: 14, fontWeight: "600", color: "#FFF" },
  subjectCount: { fontSize: 13, color: "#A0AEC0" },
  subjectBarBg: { height: 6, backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 3, overflow: "hidden" },
  subjectBar: { height: "100%", borderRadius: 3 },
});
