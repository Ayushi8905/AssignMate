import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { useAssignments, getUrgency, urgencyColor } from "../store/assignments";
import BottomNav from "../components/BottomNav";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

export default function CalendarScreen() {
  const { assignments } = useAssignments();
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selected, setSelected] = useState<number | null>(today.getDate());

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => { if (month === 0) { setMonth(11); setYear(y => y - 1); } else setMonth(m => m - 1); };
  const nextMonth = () => { if (month === 11) { setMonth(0); setYear(y => y + 1); } else setMonth(m => m + 1); };

  // Map assignments to day numbers for this month/year
  const assignmentsByDay: Record<number, typeof assignments> = {};
  assignments.forEach((a) => {
    const d = new Date(a.dueDate);
    if (d.getFullYear() === year && d.getMonth() === month) {
      const day = d.getDate();
      if (!assignmentsByDay[day]) assignmentsByDay[day] = [];
      assignmentsByDay[day].push(a);
    }
  });

  const selectedAssignments = selected ? (assignmentsByDay[selected] || []) : [];

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <LinearGradient colors={["#0F1117", "#1A1D2E", "#0F1117"]} style={styles.container}>
      <SafeAreaView style={styles.safe}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Calendar</Text>
        </View>

        {/* Month nav */}
        <View style={styles.monthNav}>
          <TouchableOpacity onPress={prevMonth} style={styles.navBtn}>
            <ChevronLeft size={22} color="#4F8EF7" />
          </TouchableOpacity>
          <Text style={styles.monthLabel}>{MONTHS[month]} {year}</Text>
          <TouchableOpacity onPress={nextMonth} style={styles.navBtn}>
            <ChevronRight size={22} color="#4F8EF7" />
          </TouchableOpacity>
        </View>

        {/* Day headers */}
        <View style={styles.dayHeaders}>
          {DAYS.map((d) => <Text key={d} style={styles.dayHeader}>{d}</Text>)}
        </View>

        {/* Grid */}
        <View style={styles.grid}>
          {cells.map((day, i) => {
            if (!day) return <View key={`e-${i}`} style={styles.cell} />;
            const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
            const isSelected = day === selected;
            const dots = assignmentsByDay[day] || [];
            return (
              <TouchableOpacity key={day} style={styles.cell} onPress={() => setSelected(day)} activeOpacity={0.7}>
                {isSelected ? (
                  <LinearGradient colors={["#4F8EF7", "#7C5CBF"]} style={styles.dayCircle}>
                    <Text style={styles.dayTextSelected}>{day}</Text>
                  </LinearGradient>
                ) : (
                  <View style={[styles.dayCircle, isToday && styles.todayCircle]}>
                    <Text style={[styles.dayText, isToday && styles.todayText]}>{day}</Text>
                  </View>
                )}
                {/* Urgency dots */}
                <View style={styles.dotsRow}>
                  {dots.slice(0, 3).map((a, idx) => (
                    <View key={idx} style={[styles.dot, { backgroundColor: urgencyColor(getUrgency(a.dueDate)) }]} />
                  ))}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Selected day assignments */}
        <ScrollView style={styles.dayList} contentContainerStyle={{ paddingBottom: 160, paddingHorizontal: 24 }}>
          {selected && (
            <Text style={styles.dayListTitle}>
              {MONTHS[month]} {selected} — {selectedAssignments.length} assignment{selectedAssignments.length !== 1 ? "s" : ""}
            </Text>
          )}
          {selectedAssignments.map((a) => {
            const color = urgencyColor(getUrgency(a.dueDate));
            return (
              <View key={a.id} style={[styles.listCard, { borderLeftColor: color }]}>
                <Text style={styles.listTitle}>{a.title}</Text>
                <Text style={styles.listSubject}>{a.subject}</Text>
                {a.completed && <Text style={styles.completedBadge}>✓ Completed</Text>}
              </View>
            );
          })}
          {selected && selectedAssignments.length === 0 && (
            <Text style={styles.noAssign}>No assignments due this day.</Text>
          )}
        </ScrollView>

        <BottomNav active="calendar" />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safe: { flex: 1 },
  header: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 8 },
  headerTitle: { fontSize: 24, fontWeight: "800", color: "#FFF" },
  monthNav: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 24, marginBottom: 16 },
  navBtn: { width: 36, height: 36, borderRadius: 10, backgroundColor: "rgba(79,142,247,0.1)", alignItems: "center", justifyContent: "center" },
  monthLabel: { fontSize: 18, fontWeight: "700", color: "#FFF" },
  dayHeaders: { flexDirection: "row", paddingHorizontal: 12, marginBottom: 4 },
  dayHeader: { flex: 1, textAlign: "center", fontSize: 11, color: "#4A5568", fontWeight: "700", letterSpacing: 0.5 },
  grid: { flexDirection: "row", flexWrap: "wrap", paddingHorizontal: 12, marginBottom: 16 },
  cell: { width: "14.28%", alignItems: "center", paddingVertical: 4 },
  dayCircle: { width: 34, height: 34, borderRadius: 17, alignItems: "center", justifyContent: "center" },
  todayCircle: { backgroundColor: "rgba(79,142,247,0.15)", borderWidth: 1, borderColor: "#4F8EF7" },
  dayText: { fontSize: 14, color: "#A0AEC0", fontWeight: "500" },
  todayText: { color: "#4F8EF7", fontWeight: "700" },
  dayTextSelected: { fontSize: 14, color: "#FFF", fontWeight: "700" },
  dotsRow: { flexDirection: "row", gap: 2, marginTop: 2, height: 6 },
  dot: { width: 5, height: 5, borderRadius: 3 },
  dayList: { flex: 1 },
  dayListTitle: { fontSize: 15, fontWeight: "700", color: "#A0AEC0", marginBottom: 12, marginTop: 4 },
  listCard: {
    backgroundColor: "rgba(26,29,46,0.95)", borderRadius: 14, padding: 14,
    borderLeftWidth: 4, borderWidth: 1, borderColor: "rgba(255,255,255,0.06)", marginBottom: 10,
  },
  listTitle: { fontSize: 15, fontWeight: "700", color: "#FFF", marginBottom: 2 },
  listSubject: { fontSize: 12, color: "#A0AEC0" },
  completedBadge: { fontSize: 11, color: "#22C55E", marginTop: 4, fontWeight: "600" },
  noAssign: { fontSize: 14, color: "#4A5568", textAlign: "center", marginTop: 20 },
});
