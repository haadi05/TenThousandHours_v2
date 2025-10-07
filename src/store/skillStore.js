import { create } from "zustand";

const useSkillStore = create((set) => ({
  skills: [],
  addSkill: (newSkill) =>
    set((state) => ({ skills: [...state.skills, newSkill] })),
  updateSkill: (id, updates) =>
    set((state) => ({
      skills: state.skills.map((s) => (s.id === id ? { ...s, ...updates } : s)),
    })),
}));

export default useSkillStore;
