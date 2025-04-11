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
  Spinner,
  Center,
} from "@chakra-ui/react";
import { FaRegEdit } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";

import { useRouter } from "next/navigation";
import useBlogStore from "@/store/blogStore";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import useAuthStore from "@/store/authStore";
// import { toaster, Toaster } from "@/components/ui/toaster";

export default function Dashboard() {
  const { blogs, fetchBlogs, deleteBlog, loading } = useBlogStore();
  const { getUser } = useAuthStore();
  const { email } = getUser() || "";
  const router = useRouter();

  useEffect(() => {
    if (!email) router.push("/");
    fetchBlogs(email);
  }, [email]);

  const handleDelete = async (id) => {
    await deleteBlog(id);
    // toaster.create({
    //   title: "Blog Deleted",
    //   description: "Your blog has been deleted successfully.",
    //   type: "success",
    //   duration: 1000,
    //   action: {
    //     label: "Close",
    //   },
    // });
  };

  const handleEdit = (id) => {
    router.push(`/editor/${id}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <Container maxW="container.xl" py={10} minHeight="calc(100vh - 164px)">
      {/* <Spinner /> */}
      {/* <Toaster /> */}

      <VStack spacing={6} align="stretch">
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
        {loading && (
          <Center>
            <Spinner size="lg" />
          </Center>
        )}
        {!loading && blogs.length > 0
          ? blogs.map((blog) => (
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
                      <Flex
                        position="absolute"
                        right={4}
                        bottom={4}
                        zIndex={"100"}
                        gap={2}
                      >
                        <Button
                          colorScheme="red"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent parent card click
                            handleEdit(blog.id);
                          }}
                          leftIcon={<i className="fas fa-trash-alt"></i>}
                          zIndex={10}
                        >
                          <FaRegEdit />
                          Edit
                        </Button>
                        <Button
                          colorScheme="red"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent parent card click
                            router.push(`/blog/${blog.id}`);
                          }}
                          leftIcon={<i className="fas fa-trash-alt"></i>}
                          zIndex={10}
                        >
                          <FaRegEye />
                          View
                        </Button>
                      </Flex>
                    </HStack>
                  </Flex>
                </Card.Body>
              </Card.Root>
            ))
          : null}

        {!loading && blogs.length === 0 ? (
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
        ) : null}
      </VStack>
    </Container>
  );
}
