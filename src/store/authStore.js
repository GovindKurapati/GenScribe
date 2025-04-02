import { create } from "zustand";
import { auth, provider } from "@/lib/firebase/config";
import { signInWithPopup, signOut } from "firebase/auth";

const useAuthStore = create((set) => ({
  user: null,

  login: async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      set({
        user: {
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        },
      });
      console.log("Login successful");
    } catch (error) {
      console.error("Login failed:", error);
    }
  },

  logout: async () => {
    try {
      await signOut(auth);
      set({ user: null });
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  },

  setUser: (userData) => set({ user: userData }),
  getUser: () => useAuthStore.getState().user,
}));

export default useAuthStore;
