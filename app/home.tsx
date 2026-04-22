import React, { useRef, useEffect, useState } from "react";
import {
  Animated, StyleSheet, Text, TouchableOpacity, View,
  ScrollView, Dimensions, Modal, TextInput, Platform,
  KeyboardAvoidingView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { Plus, BookOpen, X, Calendar as CalIcon, AlignLeft, LogOut } from "lucide-react-native";
import { useAssignments, getUrgency, urgencyColor, formatDueDate, Assignment } from "../store/assignments";
import { useAuthStore } from "../store/authStore";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import BottomNav from "../components/BottomNav";

const { width } = Dimensions.get("window");

const SUBJECTS = [
  "MES",
  "GDD",
  "DT",
  "Gen AI & PE",
  "PPM",
  "MAD",
  "Research Seminar",
  "QC",
];

export default function HomeScreen() {
  const { assignments, addAssignment, toggleComplete, deleteAssignment } = useAssignments();
  const user = useAuthStore((s) => s.user);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }).start();
  }, []);

  const sorted = [...assignments]
    .filter((a) => !a.completed)
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

  const handleAdd = () => {
    if (!title.trim() || !dueDate.trim()) return;
    const parts = dueDate.split("/");
    let iso = dueDate;
    if (parts.length === 3) {
      iso = new Date(`${parts[2]}-${parts[1].padStart(2, "0")}-${parts[0].padStart(2, "0")}`).toISOString();
    }
    addAssignment({ title, subject, dueDate: iso, description });
    setTitle(""); setSubject(SUBJECTS[0]); setDueDate(""); setDescription("");
    setShowModal(false);
  };

  return (
    <LinearGradient colors={["#0F1117", "#1A1D2E", "#0F1117"]} style={styles.container}>
      <SafeAreaView style={styles.safe}>
        <Animated.View style={[{ flex: 1 }, { opacity: fadeAnim }]}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.greeting}>Good day 👋</Text>
              <Text style={styles.headerTitle}>{user?.displayName || user?.email?.split("@")[0] || "Student"}</Text>
            </View>
            <TouchableOpacity onPress={() => signOut(auth)} style={styles.avatarCircleWrap}>
              <LinearGradient colors={["#4F8EF7", "#7C5CBF"]} style={styles.avatarCircle}>
                <LogOut size={18} color="#FFF" strokeWidth={2} />
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Summary chips */}
          <View style={styles.chips}>
            {[
              { label: "Pending", count: assignments.filter(a => !a.completed).length, color: "#4F8EF7" },
              { label: "Overdue", count: assignments.filter(a => !a.completed && getUrgency(a.dueDate) === "overdue").length, color: "#EF4444" },
              { label: "Done", count: assignments.filter(a => a.completed).length, color: "#22C55E" },
            ].map((c) => (
              <View key={c.label} style={[styles.chip, { borderColor: c.color + "44" }]}>
                <Text style={[styles.chipCount, { color: c.color }]}>{c.count}</Text>
                <Text style={styles.chipLabel}>{c.label}</Text>
              </View>
            ))}
          </View>

          <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            {sorted.length === 0 && (
              <View style={styles.empty}>
                <Text style={styles.emptyText}>No pending assignments 🎉</Text>
              </View>
            )}
            {sorted.map((item) => <AssignmentCard key={item.id} item={item} onToggle={toggleComplete} onDelete={deleteAssignment} />)}
          </ScrollView>
        </Animated.View>

        {/* FAB */}
        <TouchableOpacity style={styles.fab} onPress={() => setShowModal(true)} activeOpacity={0.85}>
          <LinearGradient colors={["#4F8EF7", "#7C5CBF"]} style={styles.fabGradient}>
            <Plus size={28} color="#FFF" strokeWidth={2.5} />
          </LinearGradient>
        </TouchableOpacity>

        <BottomNav active="home" />
      </SafeAreaView>

      {/* Add Modal */}
      <Modal visible={showModal} transparent animationType="slide">
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>New Assignment</Text>
                <TouchableOpacity onPress={() => setShowModal(false)}>
                  <X size={22} color="#A0AEC0" />
                </TouchableOpacity>
              </View>

              <Text style={styles.label}>Title *</Text>
              <TextInput style={styles.modalInput} placeholder="e.g. Math Problem Set" placeholderTextColor="#4A5568"
                value={title} onChangeText={setTitle} />

              <Text style={styles.label}>Subject</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.subjectScroll}>
                {SUBJECTS.map((s) => (
                  <TouchableOpacity key={s} onPress={() => setSubject(s)}
                    style={[styles.subjectChip, subject === s && styles.subjectChipActive]}>
                    <Text style={[styles.subjectChipText, subject === s && styles.subjectChipTextActive]}>{s}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <Text style={styles.label}>Due Date * (DD/MM/YYYY)</Text>
              <View style={styles.modalInputRow}>
                <CalIcon size={16} color="#4F8EF7" />
                <TextInput style={[styles.modalInput, { flex: 1, marginBottom: 0 }]} placeholder="25/12/2025"
                  placeholderTextColor="#4A5568" value={dueDate} onChangeText={setDueDate} />
              </View>

              <Text style={styles.label}>Description</Text>
              <View style={styles.modalInputRow}>
                <AlignLeft size={16} color="#4F8EF7" />
                <TextInput style={[styles.modalInput, { flex: 1, marginBottom: 0 }]} placeholder="Optional notes..."
                  placeholderTextColor="#4A5568" value={description} onChangeText={setDescription} multiline />
              </View>

              <TouchableOpacity onPress={handleAdd} activeOpacity={0.85} style={{ marginTop: 8 }}>
                <LinearGradient colors={["#4F8EF7", "#7C5CBF"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.addBtn}>
                  <Text style={styles.addBtnText}>Add Assignment</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </LinearGradient>
  );
}

function AssignmentCard({ item, onToggle, onDelete }: { item: Assignment; onToggle: (id: string) => void; onDelete: (id: string) => void }) {
  const urgency = getUrgency(item.dueDate);
  const color = urgencyColor(urgency);
  const label = formatDueDate(item.dueDate);

  return (
    <View style={[styles.card, { borderLeftColor: color }]}>
      <View style={styles.cardTop}>
        <View style={styles.cardLeft}>
          <View style={[styles.urgencyDot, { backgroundColor: color }]} />
          <View>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardSubject}>{item.subject}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => onDelete(item.id)} style={styles.deleteBtn}>
          <X size={14} color="#4A5568" />
        </TouchableOpacity>
      </View>

      {item.description ? <Text style={styles.cardDesc}>{item.description}</Text> : null}

      <View style={styles.cardBottom}>
        <View style={[styles.dueBadge, { backgroundColor: color + "22" }]}>
          <CalIcon size={12} color={color} />
          <Text style={[styles.dueText, { color }]}>{label}</Text>
        </View>
        <TouchableOpacity onPress={() => onToggle(item.id)} style={[styles.doneBtn, { borderColor: color }]}>
          <Text style={[styles.doneBtnText, { color }]}>Mark Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safe: { flex: 1 },
  header: {
    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
    paddingHorizontal: 24, paddingTop: 16, paddingBottom: 12,
  },
  greeting: { fontSize: 13, color: "#A0AEC0", marginBottom: 2 },
  headerTitle: { fontSize: 24, fontWeight: "800", color: "#FFF" },
  avatarCircleWrap: {},
  avatarCircle: { width: 44, height: 44, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  chips: { flexDirection: "row", gap: 10, paddingHorizontal: 24, marginBottom: 16 },
  chip: {
    flex: 1, backgroundColor: "rgba(255,255,255,0.04)", borderRadius: 12,
    borderWidth: 1, padding: 12, alignItems: "center",
  },
  chipCount: { fontSize: 22, fontWeight: "800" },
  chipLabel: { fontSize: 11, color: "#A0AEC0", marginTop: 2 },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 24, paddingBottom: 160, gap: 12 },
  empty: { alignItems: "center", paddingTop: 60 },
  emptyText: { fontSize: 16, color: "#A0AEC0" },
  card: {
    backgroundColor: "rgba(26, 29, 46, 0.95)", borderRadius: 16,
    padding: 16, borderLeftWidth: 4, borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    shadowColor: "#000", shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 8, elevation: 6,
  },
  cardTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 },
  cardLeft: { flexDirection: "row", alignItems: "center", gap: 10, flex: 1 },
  urgencyDot: { width: 10, height: 10, borderRadius: 5, marginTop: 2 },
  cardTitle: { fontSize: 16, fontWeight: "700", color: "#FFF", marginBottom: 2 },
  cardSubject: { fontSize: 12, color: "#A0AEC0" },
  deleteBtn: { padding: 4 },
  cardDesc: { fontSize: 13, color: "#718096", marginBottom: 10, marginLeft: 20 },
  cardBottom: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginLeft: 20 },
  dueBadge: { flexDirection: "row", alignItems: "center", gap: 4, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  dueText: { fontSize: 12, fontWeight: "600" },
  doneBtn: { borderWidth: 1, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 4 },
  doneBtnText: { fontSize: 12, fontWeight: "600" },
  fab: {
    position: "absolute", bottom: 100, right: 24,
    borderRadius: 20, overflow: "hidden",
    shadowColor: "#4F8EF7", shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5, shadowRadius: 16, elevation: 12,
  },
  fabGradient: { width: 60, height: 60, alignItems: "center", justifyContent: "center" },
  // Modal
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.7)", justifyContent: "flex-end" },
  modalCard: {
    backgroundColor: "#1A1D2E", borderTopLeftRadius: 28, borderTopRightRadius: 28,
    padding: 28, borderTopWidth: 1, borderColor: "rgba(79,142,247,0.2)",
  },
  modalHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  modalTitle: { fontSize: 20, fontWeight: "800", color: "#FFF" },
  label: { fontSize: 12, color: "#A0AEC0", fontWeight: "600", marginBottom: 6, marginTop: 14, letterSpacing: 0.5 },
  modalInput: {
    backgroundColor: "rgba(255,255,255,0.05)", borderRadius: 12,
    borderWidth: 1, borderColor: "rgba(79,142,247,0.2)",
    paddingHorizontal: 14, paddingVertical: 12, color: "#FFF", fontSize: 15, marginBottom: 4,
  },
  modalInputRow: {
    flexDirection: "row", alignItems: "center", gap: 10,
    backgroundColor: "rgba(255,255,255,0.05)", borderRadius: 12,
    borderWidth: 1, borderColor: "rgba(79,142,247,0.2)",
    paddingHorizontal: 14, paddingVertical: 12,
  },
  subjectScroll: { marginBottom: 4 },
  subjectChip: {
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20,
    borderWidth: 1, borderColor: "rgba(79,142,247,0.3)",
    marginRight: 8, backgroundColor: "rgba(255,255,255,0.03)",
  },
  subjectChipActive: { backgroundColor: "rgba(79,142,247,0.2)", borderColor: "#4F8EF7" },
  subjectChipText: { fontSize: 13, color: "#A0AEC0" },
  subjectChipTextActive: { color: "#4F8EF7", fontWeight: "700" },
  addBtn: { borderRadius: 14, paddingVertical: 16, alignItems: "center" },
  addBtnText: { fontSize: 16, fontWeight: "700", color: "#FFF" },
});
