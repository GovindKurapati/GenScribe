"use client";
import { useEffect, useState } from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Heading,
  Flex,
  Spacer,
  Container,
  Card,
  CardBody,
  CardHeader,
  Tooltip,
  useToast,
  Popover,
} from "@chakra-ui/react";
import { FaEye, FaTrash, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRouter } from "next/navigation";
import useBlogStore from "@/store/blogStore";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import useAuthStore from "@/store/authStore";

export default function Dashboard() {
  const { blogs, fetchBlogs, deleteBlog } = useBlogStore();
  const { getUser } = useAuthStore();
  const { email } = getUser() || "";
  const router = useRouter();

  useEffect(() => {
    if (!email) router.push("/");
    fetchBlogs(email);
  }, [email]);

  const handleDelete = async (id) => {
    // Add your delete logic here
    console.log(`Deleting blog with id: ${id}`);

    await deleteBlog(id);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };
  // const [blogs, setBlogs] = useState([
  //   {
  //     id: 1,
  //     title:
  //       "NuxtJS: Your Fast Track to Building Universal Vue.js Applications",
  //     summary:
  //       "A comprehensive guide to NuxtJS, exploring its powerful features for building universal Vue.js applications.",
  //     createdAt: "March 15, 2024",
  //     wordCount: 1245,
  //   },
  //   {
  //     id: 2,
  //     title: "Understanding Data in the Digital Age",
  //     summary:
  //       "Exploring how data drives decision-making in modern technology and business landscapes.",
  //     createdAt: "February 28, 2024",
  //     wordCount: 987,
  //   },
  //   {
  //     id: 3,
  //     title: "Java: Still Brewing Strong After All These Years",
  //     summary:
  //       "An in-depth look at Java's enduring relevance in enterprise software development.",
  //     createdAt: "January 10, 2024",
  //     wordCount: 1532,
  //   },
  // ]);

  return (
    <Container maxW="container.xl" py={10} minHeight="calc(100vh - 164px)">
      <VStack spacing={6} align="stretch">
        {blogs.length > 0 ? (
          <VStack spacing={4} align="stretch">
            <Flex alignItems="center" mb={4}>
              <Heading size="xl">My Blogs</Heading>
              <Spacer />
              <Button
                colorScheme="blue"
                size="md"
                onClick={() => router.push("/editor")}
              >
                Generate New Blog
              </Button>
            </Flex>
            {blogs.map((blog) => (
              <Card.Root
                key={blog.id}
                variant="outline"
                w="full"
                transition="all 0.2s"
                _hover={{
                  transform: "scale(1.01)",
                  boxShadow: "lg",
                  cursor: "pointer",
                }}
                onClick={() => router.push(`/blog/${blog.id}`)}
              >
                <Card.Body>
                  <Flex alignItems="center">
                    <VStack align="start" spacing={2} flex={1}>
                      <Heading size="md">{blog.title}</Heading>
                      <Markdown
                        children={blog.content.substring(0, 99) + "..."}
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
                      ></Markdown>
                      <HStack color="gray.400" fontSize="sm">
                        <Text>{formatDate(blog.createdAt)}</Text>
                      </HStack>
                    </VStack>
                    <HStack ml={4}>
                      <Box
                        position="absolute"
                        right={4}
                        bottom={4}
                        zIndex={"100"}
                      >
                        <Button
                          colorScheme="red"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent parent card click
                            handleDelete(blog.id);
                          }}
                          leftIcon={<i className="fas fa-trash-alt"></i>}
                          zIndex={10}
                        >
                          Delete
                        </Button>
                      </Box>
                    </HStack>
                  </Flex>
                </Card.Body>
              </Card.Root>
            ))}
          </VStack>
        ) : (
          <Box textAlign="center" py={10} px={6}>
            <Heading size="lg" mb={4}>
              No Blogs Found
            </Heading>
            <Text color="gray.500" mb={6}>
              You haven't created any blogs yet. Start by generating a new blog!
            </Text>
            <Button
              colorScheme="blue"
              size="lg"
              onClick={() => router.push("/editor")}
            >
              Generate New Blog
            </Button>
          </Box>
        )}
      </VStack>
    </Container>
  );
}
