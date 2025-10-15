import { create } from "zustand";
import useAuthStore from "../store/authStore";
import { getData, updateData, deleteData } from "../firebase/db";

const useSkillStore = create((set, get) => ({
  skills: [],
  spinner: false,

  fetchSkills: async () => {
    const { user } = useAuthStore.getState();
    const uid = user?.uid;

    if (!uid) return;

    set({ spinner: true });
    try {
      const data = await getData(uid);
      set({ skills: data });
    } catch (err) {
      console.error("Error fetching skills:", err);
    } finally {
      set({ spinner: false });
    }
  },

  setSkill: (newSkill) =>
    set((state) => ({
      skills: [
        ...state.skills,
        { ...newSkill, history: newSkill.history || [] },
      ],
    })),

  updateSkill: async (id, updates) => {
    const { user } = useAuthStore.getState();
    const uid = user?.uid;
    if (!uid) return;

    set((state) => ({
      skills: state.skills.map((s) => (s.id === id ? { ...s, ...updates } : s)),
    }));
    try {
      await updateData(String(uid), String(id), updates);
    } catch (err) {
      console.error("Error updating skill:", err);
    }
  },

  deleteSkill: async (id) => {
    const { user } = useAuthStore.getState();
    const uid = user?.uid;
    if (!uid) return;

    set((state) => ({ skills: state.skills.filter((s) => s.id !== id) }));

    try {
      await deleteData(String(uid), String(id));
    } catch (err) {
      console.error("Error deleting skill from Firestore:", err);
    }
  },

  // 🔹 Log hours (local + Firestore)
  logHours: async (id, hours) => {
    const { user } = useAuthStore.getState();
    const uid = user?.uid;
    if (!uid) return;

    const date = new Date().toLocaleDateString();

    // compute new skill state
    const currentSkill = get().skills.find((s) => s.id === id);
    if (!currentSkill) return;

    const history = [...(currentSkill.history || []), { date, hours }];

    // normalize vault
    const rawVault = currentSkill.loggedHoursVault || [];
    const flat = [];
    rawVault.forEach((item) => {
      if (Array.isArray(item)) {
        item.forEach((sub) => {
          if (sub && typeof sub === "object" && "date" in sub) flat.push(sub);
        });
      } else if (item && typeof item === "object" && "date" in item) {
        flat.push(item);
      }
    });

    const map = {};
    flat.forEach((v) => {
      const d = v.date;
      const c = Number(v.count || 0);
      map[d] = (map[d] || 0) + c;
    });
    map[date] = (map[date] || 0) + hours;

    const vault = Object.keys(map).map((d) => ({ date: d, count: map[d] }));

    const updates = {
      loggedHours: (currentSkill.loggedHours || 0) + hours,
      history,
      loggedHoursVault: vault,
    };

    // 1️⃣ Local update
    set((state) => ({
      skills: state.skills.map((s) => (s.id === id ? { ...s, ...updates } : s)),
    }));

    // 2️⃣ Firestore sync
    try {
      await updateData(String(uid), String(id), updates);
    } catch (err) {
      console.error("Error logging hours:", err);
    }
  },
}));

export default useSkillStore;
