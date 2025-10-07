import { create } from "zustand";

const useSkillStore = create((set) => ({
  skills: [],
  setSkill: (newSkill) =>
    set((state) => ({ skills: [...state.skills, newSkill] })),
}));
export default useSkillStore;
