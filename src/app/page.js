"use client";
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Flex,
  VStack,
  Grid,
  GridItem,
  Icon,
} from "@chakra-ui/react";
import { createStandaloneToast } from "@chakra-ui/toast";
import { toaster, Toaster } from "../components/ui/toaster";

import { motion } from "framer-motion";
import { ThemeProvider, useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";

const MotionBox = motion(Box);
const toast = createStandaloneToast();

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

export default function Home() {
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === "light" ? "dark" : "light";
  const blogTopics = [
    "Tech Innovations",
    "AI & Machine Learning",
    "Web Development",
    "Digital Marketing",
    "Personal Growth",
    "Business Strategy",
  ];
  const router = useRouter();
  const { user } = useAuthStore();

  const handleGetStarted = () => {
    // Logic to handle "Get Started" button click
    if (!user) {
      toaster.create({
        title: "Login Required",
        description: "Please login to continue.",
        type: "warning",
        duration: 5000,
        action: {
          label: "Close",
        },
      });
    } else {
      router.push("/dashboard");
    }
  };
  return (
    <Box minHeight="calc(100vh - 220px)">
      <Box
        _before={{
          background:
            "linear-gradient(180deg, rgba(23, 25, 35, 0.6) 0%, rgba(23, 25, 35, 0.8) 100%)",
          padding: "16",
        }}
      >
        <Toaster />

        <Container maxW="container.xl" mt={"50px"}>
          <Grid
            templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
            gap={8}
            alignItems="center"
          >
            <GridItem>
              <VStack spacing={6} align="flex-start">
                <Heading
                  as="h1"
                  fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
                  lineHeight="1.1"
                  fontWeight="extrabold"
                >
                  Create Stunning <Text as="span">AI-Generated</Text> Blog
                  Content
                </Heading>

                <Text fontSize="xl" maxW="560px">
                  Craft engaging, high-quality blog posts in seconds. Save time,
                  boost your content strategy, and never worry about writer's
                  block again.
                </Text>

                <MotionBox
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  {user ? (
                    <Button
                      size="lg"
                      fontSize="lg"
                      height="60px"
                      width="200px"
                      onClick={handleGetStarted}
                    >
                      Get Started
                    </Button>
                  ) : (
                    <Button
                      size="lg"
                      fontSize="lg"
                      height="60px"
                      width="200px"
                      onClick={handleGetStarted}
                    >
                      Get Started
                    </Button>
                  )}
                </MotionBox>
              </VStack>
            </GridItem>

            <GridItem display={{ base: "none", md: "block" }}>
              <Flex justifyContent="center" alignItems="center" height="100%">
                <MotionBox initial={{ y: 10 }} animate={{ y: -10 }}>
                  <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                    <GridItem>
                      <Box
                        borderRadius="lg"
                        overflow="hidden"
                        p={6}
                        backgroundColor="secondary"
                      >
                        <Icon as={DocumentIcon} mb={4} />
                        <Text fontWeight="bold" fontSize="lg">
                          Professional Blogs
                        </Text>
                        <Text fontSize="sm">
                          Tailored content for your business
                        </Text>
                      </Box>
                    </GridItem>
                    <GridItem pt={12}>
                      <Box
                        borderRadius="lg"
                        overflow="hidden"
                        p={6}
                        backgroundColor="secondary"
                      >
                        <Icon as={RocketIcon} mb={4} />
                        <Text fontWeight="bold" fontSize="lg">
                          Instant Creation
                        </Text>
                        <Text fontSize="sm">Generate content in seconds</Text>
                      </Box>
                    </GridItem>
                  </Grid>
                </MotionBox>
              </Flex>
            </GridItem>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box pt={16}>
        <Container maxW="container.xl">
          <VStack>
            <VStack spacing={2} textAlign="center" mb={2}>
              <Heading as="h2" fontSize="3xl" mb={2}>
                What You Can Create
              </Heading>
              <Text fontSize="lg" maxW="container.md" mx="auto">
                Choose from a variety of blog types and topics to instantly
                generate engaging content
              </Text>
            </VStack>

            <Grid
              templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
              gap={8}
            >
              {blogTopics.map((topic, index) => (
                <GridItem key={index}>
                  <MotionBox
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Box
                      borderRadius="lg"
                      p={6}
                      height="100%"
                      backgroundColor="secondary"
                      borderWidth="1px"
                      borderColor="border.subtle"
                    >
                      <Text fontWeight="bold" fontSize="lg" mb={2}>
                        {topic}
                      </Text>
                    </Box>
                  </MotionBox>
                </GridItem>
              ))}
            </Grid>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
}

const StatCard = ({ title, value }) => {
  return (
    <Box borderRadius="lg" p={6}>
      <Text fontSize="sm" fontWeight="medium" mb={1} color="fg.muted">
        {title}
      </Text>
      <Heading fontSize="3xl">{value}</Heading>
    </Box>
  );
};
