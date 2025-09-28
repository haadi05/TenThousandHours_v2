import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "./firebase";

export const firebaseSignIn = async (onSuccess) => {
  const provider = new GoogleAuthProvider(onSuccess);
  try {
    const result = await signInWithPopup(auth, provider);
    onSuccess(result.user);
  } catch (error) {
    console.error(error);
  }
};

export const firebaseSignOut = async (onSuccess) => {
  try {
    await signOut(auth); //auth = Firebase Auth instance (which manages the whole auth system)
    onSuccess(); //return nothing after signout
  } catch (error) {
    console.error(error);
  }
};
