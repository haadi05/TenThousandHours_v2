import { create } from "zustand";

const useSkillStore = create((set) => ({
  skills: [],
  setSkill: (newSkill) =>
    set((state) => ({
      skills: [
        ...state.skills,
        { ...newSkill, history: newSkill.history || [] },
      ],
    })),

  updateSkill: (id, updates) =>
    set((state) => ({
      skills: state.skills.map((s) => (s.id === id ? { ...s, ...updates } : s)),
    })),

  logHours: (id, hours) =>
    set((state) => ({
      skills: state.skills.map((s) =>
        s.id === id
          ? {
              ...s,
              loggedHours: (s.loggedHours || 0) + hours,
              history: [
                ...(s.history || []),
                { date: new Date().toLocaleDateString(), hours },
              ],
            }
          : s
      ),
    })),
}));

export default useSkillStore;
