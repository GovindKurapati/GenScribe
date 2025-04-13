"use client";

import { useEffect, useState } from "react";
import useBlogStore from "@/store/blogStore";
import { useParams } from "next/navigation";
import useAuthStore from "@/store/authStore";
import {
  Box,
  Container,
  Text,
  HStack,
  Avatar,
  VStack,
  Separator,
  SkeletonCircle,
  SkeletonText,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import Head from "next/head";
import { motion } from "framer-motion";
import { BlogEditor } from "@/components/BlogEditor";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { Toaster, toaster } from "@/components/ui/toaster";

export default function Blog() {
  const { slug } = useParams();
  const { getBlogById, updateLikes, loading } = useBlogStore();
  const { getUser } = useAuthStore();
  const { email, name, photo } = getUser() || "";
  const [blogData, setBlogData] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  useEffect(() => {
    if (!slug) return;
    const fetchData = async () => {
      const data = await getBlogById(slug);
      setBlogData(data[0]);
    };
    fetchData();
  }, [slug]);

  const handleLike = async (userEmail) => {
    if (!userEmail) {
      toaster.create({
        title: "Login Required",
        description: "Please log in to like this blog.",
        type: "error",
        duration: 2000,
        action: {
          label: "Close",
        },
      });
      return;
    }
    if (!blogData) return;
    try {
      await updateLikes(slug, userEmail);
      setBlogData((prevData) => {
        const alreadyLiked = prevData.likedBy?.includes(userEmail);
        return {
          ...prevData,
          likes: alreadyLiked
            ? (prevData.likes || 0) - 1
            : (prevData.likes || 0) + 1,
          likedBy: alreadyLiked
            ? prevData.likedBy.filter((email) => email !== userEmail)
            : [...(prevData.likedBy || []), userEmail],
        };
      });
    } catch (error) {
      console.error("Error liking blog:", error);
    }
  };

  if (!blogData)
    return (
      <Box minH="100vh" py={12}>
        <Container maxW="4xl" gap={4}>
          <VStack spacing={2} gap={4} alignItems={"flex-start"}>
            <SkeletonCircle size="10" />
            <SkeletonText noOfLines={2}></SkeletonText>
          </VStack>
        </Container>
      </Box>
    );

  return (
    <>
      <Head>
        <title>{blogData.title || "Blog"}</title>
        <meta name="description" content={blogData.content} />
      </Head>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Toaster />
        <Box minH="100vh" py={12} minHeight="calc(100vh - 164px)">
          <Container maxW="4xl">
            <VStack spacing={8} align="start">
              {/* Author and date */}
              <HStack spacing={2} gap={4}>
                <Avatar.Root size={"md"} key={"size"}>
                  <Avatar.Fallback name={blogData?.userName} />
                  {blogData?.userPhoto ? (
                    <Avatar.Image src={blogData.userPhoto} />
                  ) : (
                    <Avatar.Image
                      src={`https://ui-avatars.com/api/?name=${blogData.userEmail}`}
                    />
                  )}
                </Avatar.Root>
                <VStack align="start" spacing={"0px"} gap={"0px"}>
                  <Text m="0px" fontWeight="medium">
                    {blogData?.userName
                      ? blogData?.userName
                      : blogData.userEmail}
                  </Text>
                  <Text m="0px" fontSize="sm" color="gray.500">
                    {formatDate(blogData.createdAt)}
                  </Text>
                </VStack>
              </HStack>

              <Separator w={"100%"} />

              {/* Main content */}
              <Box w="full" fontSize="lg" className="blog-content">
                <BlogEditor
                  initialContent={blogData.content}
                  isEditable={false}
                />
              </Box>
              <Flex alignItems="center" gap={1} _hover={{ cursor: "default" }}>
                <IconButton
                  variant={"ghost"}
                  size="md"
                  onClick={() => handleLike(email)}
                >
                  {blogData.likedBy?.includes(email) ? (
                    <FaHeart color="red" />
                  ) : (
                    <FaRegHeart />
                  )}
                </IconButton>
                <Text m={0} fontSize={"18px"}>
                  {blogData.likes || 0}
                </Text>
              </Flex>
            </VStack>
          </Container>
        </Box>
      </motion.div>
    </>
  );
}
