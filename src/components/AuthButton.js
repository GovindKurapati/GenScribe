"use client";

import { Button } from "@chakra-ui/react";
import { auth } from "@/lib/firebase/config";
import { useEffect } from "react";
import useAuthStore from "../store/authStore";

export default function AuthButton() {
  const setUser = useAuthStore((state) => state.setUser);
  const { user, login, logout, getUser } = useAuthStore();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser({
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        });
        console.log("User:", getUser());
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [setUser]);

  return user ? (
    <Button colorScheme="red" onClick={logout}>
      Logout
    </Button>
  ) : (
    <Button colorScheme="blue" onClick={login}>
      Login with Google
    </Button>
  );
}
