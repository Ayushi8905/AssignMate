import { useEffect, useState } from "react";
import {
  collection, addDoc, updateDoc, deleteDoc,
  doc, onSnapshot, query, orderBy, serverTimestamp,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuthStore } from "./authStore";

export type Assignment = {
  id: string;
  title: string;
  subject: string;
  dueDate: string; // ISO string
  description?: string;
  completed: boolean;
  createdAt: string;
};

// ── Firestore-backed hook ──────────────────────────────────────────────────────
export function useAssignments() {
  const user = useAuthStore((s) => s.user);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setAssignments([]); setLoading(false); return; }

    const ref = collection(db, "users", user.uid, "assignments");
    const q = query(ref, orderBy("createdAt", "asc"));

    const unsub = onSnapshot(q, (snap) => {
      const data: Assignment[] = snap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<Assignment, "id">),
      }));
      setAssignments(data);
      setLoading(false);
    });

    return unsub;
  }, [user]);

  const addAssignment = async (a: Omit<Assignment, "id" | "createdAt" | "completed">) => {
    if (!user) return;
    const ref = collection(db, "users", user.uid, "assignments");
    await addDoc(ref, {
      ...a,
      completed: false,
      createdAt: new Date().toISOString(),
    });
  };

  const toggleComplete = async (id: string) => {
    if (!user) return;
    const current = assignments.find((a) => a.id === id);
    if (!current) return;
    const ref = doc(db, "users", user.uid, "assignments", id);
    await updateDoc(ref, { completed: !current.completed });
  };

  const deleteAssignment = async (id: string) => {
    if (!user) return;
    const ref = doc(db, "users", user.uid, "assignments", id);
    await deleteDoc(ref);
  };

  return { assignments, loading, addAssignment, toggleComplete, deleteAssignment };
}

// ── Helpers ────────────────────────────────────────────────────────────────────
export function getUrgency(dueDate: string): "overdue" | "urgent" | "soon" | "normal" {
  const diff = new Date(dueDate).getTime() - Date.now();
  const days = diff / (1000 * 60 * 60 * 24);
  if (days < 0) return "overdue";
  if (days < 1) return "urgent";
  if (days < 3) return "soon";
  return "normal";
}

export function urgencyColor(u: ReturnType<typeof getUrgency>) {
  return { overdue: "#EF4444", urgent: "#F97316", soon: "#EAB308", normal: "#22C55E" }[u];
}

export function formatDueDate(dueDate: string) {
  const diff = new Date(dueDate).getTime() - Date.now();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  if (days < 0) return `${Math.abs(days)}d overdue`;
  if (days === 0) return "Due today";
  if (days === 1) return "Due tomorrow";
  return `Due in ${days}d`;
}
