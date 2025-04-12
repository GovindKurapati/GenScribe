"use client";

import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Flex,
  VStack,
  HStack,
  Grid,
  Icon,
  keyframes,
  Spacer,
} from "@chakra-ui/react";
import { ColorModeButton } from "./ColorMode";
import useAuthStore from "@/store/authStore";
import Link from "next/link";
import AuthButton from "./AuthButton";
import { motion } from "framer-motion";

const MoonIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const SunIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const DocumentIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="64"
    height="64"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const RocketIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="64"
    height="64"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);

const BrainIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="64"
    height="64"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44A2.5 2.5 0 0 1 4.5 17v-2.31a2.5 2.5 0 0 1-.44-4.06A2.5 2.5 0 0 1 4.5 7v-2A2.5 2.5 0 0 1 7 2.5h2.5Z" />
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44A2.5 2.5 0 0 0 19.5 17v-2.31a2.5 2.5 0 0 0 .44-4.06A2.5 2.5 0 0 0 19.5 7v-2A2.5 2.5 0 0 0 17 2.5h-2.5Z" />
  </svg>
);

// Animated components
const MotionBox = motion(Box);

export const Navbar = () => {
  const { getUser } = useAuthStore();
  const user = getUser();
  return (
    // <Box maxW="container.xl" bg="secondary" px={4} w="full" py={4}>
    //   <Flex
    //     maxW="container.lg"
    //     py={4}
    //     h={16}
    //     alignItems="center"
    //     justifyContent="space-between"
    //   >
    //     <Heading size="md">
    //       <Link href="/">AI Blog Generator</Link>
    //     </Heading>
    //     <Spacer />
    //     {user?.name ? (
    //       <>
    //         <Box mr={4}>Hello, {user.name}</Box>
    //       </>
    //     ) : null}

    //     <AuthButton />
    //     <ColorModeButton />
    //   </Flex>
    // </Box>

    <Box
      as="nav"
      style={{
        width: "100%",
        position: "sticky",
        top: 0,
        zIndex: 10,
        backdropFilter: "blur(10px)",
        borderColor: "border.subtle",
        backgroundColor: "secondary",
      }}
    >
      <Container maxW="container.xl">
        <Flex py={4} justify="space-between" align="center">
          <Flex align="center">
            {/* <Icon as={BrainIcon} boxSize={6} mr={2} color="accent.default" /> */}

            <Heading size="xl" fontWeight="bold">
              <Link href="/">GenScribe</Link>
            </Heading>
          </Flex>

          <HStack spacing={4}>
            <ColorModeButton />
            <AuthButton />
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};
