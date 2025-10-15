import { db } from "./firebase";
import {
  setDoc,
  doc,
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export const setData = async (UserId, SkillData, skillId) => {
  try {
    const skillRef = doc(db, "users", UserId, "skills", skillId);
    await setDoc(skillRef, SkillData);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getData = async (uid) => {
  const skillCol = collection(db, "users", uid, "skills");
  const snapshot = await getDocs(skillCol);
  return snapshot.docs.map((doc) => doc.data());
};

export const updateData = async (userId, skillId, updates) => {
  // Sanitize Firestore update payload
  if (updates.loggedHoursVault && Array.isArray(updates.loggedHoursVault)) {
    updates.loggedHoursVault = updates.loggedHoursVault
      .flat(Infinity) // fully flatten any nested arrays
      .filter(
        (v) =>
          v &&
          typeof v === "object" &&
          "date" in v &&
          "count" in v &&
          !Array.isArray(v)
      )
      .map((v) => ({
        date: String(v.date),
        count: Number(v.count) || 0,
      }));
  }

  if (updates.history && Array.isArray(updates.history)) {
    updates.history = updates.history
      .filter((h) => h && typeof h === "object")
      .map((h) => ({
        date: String(h.date),
        hours: Number(h.hours) || 0,
      }));
  }

  try {
    const skillRef = doc(db, "users", userId, "skills", skillId);
    if (updates.loggedHoursVault) {
      updates.loggedHoursVault = updates.loggedHoursVault.flat();
    }
    await updateDoc(skillRef, updates);

    await updateDoc(skillRef, updates);
  } catch (error) {
    console.error("Error updating skill:", error);
    throw error;
  }
};

export const deleteData = async (userId, skillId) => {
  try {
    const skillRef = doc(db, "users", userId, "skills", skillId);
    await deleteDoc(skillRef);
  } catch (error) {
    console.error("Error deleting skill:", error);
    throw error;
  }
};
