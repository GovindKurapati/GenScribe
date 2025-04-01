"use client";

import { Button, Avatar, Menu, Portal, Text, Box } from "@chakra-ui/react";
import { auth } from "@/lib/firebase/config";
import { useEffect } from "react";
import useAuthStore from "../store/authStore";
import { useRouter } from "next/navigation";

export default function AuthButton() {
  const setUser = useAuthStore((state) => state.setUser);
  const { user, login, logout, getUser } = useAuthStore();
  const router = useRouter();

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
    <>
      <Menu.Root>
        <Menu.Trigger asChild>
          <Button variant="ghost" size="sm" outline={"none"} w="40px" h="40px">
            <Avatar.Root>
              <Avatar.Fallback name={user.name} />
              <Avatar.Image src={user.photo} />
            </Avatar.Root>
          </Button>
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content>
              <Menu.Item value="name" readOnly disabled>
                <Box>
                  <Text m="0">{user.name}</Text>
                  <Text m="0">{user.email}</Text>
                </Box>
              </Menu.Item>
              <Menu.Item
                value="my-posts"
                onClick={() => router.push("/dashboard")}
              >
                My Blogs
              </Menu.Item>
              <Menu.Item
                value="logout"
                onClick={logout}
                _hover={{
                  cursor: "pointer",
                }}
              >
                Logout
              </Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    </>
  ) : (
    <Button colorScheme="blue" onClick={login}>
      Login with Google
    </Button>
  );
}
