"use client";

import { useEffect, useState } from "react";
import useBlogStore from "@/store/blogStore";
import { useParams } from "next/navigation";
import useAuthStore from "@/store/authStore";
import {
  Box,
  Container,
  Heading,
  Text,
  HStack,
  Avatar,
  VStack,
  Badge,
  Separator,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import Head from "next/head";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { motion } from "framer-motion";

export default function Blog() {
  const { slug } = useParams();
  const { filterBlogs } = useBlogStore();
  const { getUser } = useAuthStore();
  const { email, name } = getUser() || "";
  const [blogData, setBlogData] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  useEffect(() => {
    if (!slug || !email) return;
    const fetchData = async () => {
      const data = await filterBlogs(email, slug);
      setBlogData(data[0]);
    };
    fetchData();
  }, [slug, filterBlogs, email]);

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
        <title>{"title"}</title>
        <meta name="description" content={blogData.content} />
      </Head>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Box minH="100vh" py={12} minHeight="calc(100vh - 164px)">
          <Container maxW="4xl">
            <VStack spacing={8} align="start">
              {/* Header */}
              <Box w="full">
                <Badge bgColor={"secondary"} mb={3}>
                  Blog
                </Badge>
              </Box>

              {/* Author and date */}
              <HStack spacing={2} gap={4}>
                <Avatar.Root size={"md"} key={"size"}>
                  <Avatar.Fallback name="Segun Adebayo" />
                  <Avatar.Image
                    src={`https://ui-avatars.com/api/?name=${name}`}
                  />
                </Avatar.Root>
                <VStack align="start" spacing={"0px"} gap={"0px"}>
                  <Text m="0px" fontWeight="medium">
                    {name}
                  </Text>
                  <Text m="0px" fontSize="sm" color="gray.500">
                    {formatDate(blogData.createdAt)}
                  </Text>
                </VStack>
              </HStack>

              <Separator w={"100%"} />

              {/* Summary */}
              <Text
                fontSize="xl"
                fontWeight="medium"
                color={"red"}
                fontStyle="italic"
              >
                {/* {post.summary} */}
              </Text>

              {/* Main content */}
              <Box
                w="full"
                fontSize="lg"
                lineHeight="tall"
                className="blog-content"
              >
                <Markdown
                  children={blogData.content}
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                ></Markdown>
              </Box>
            </VStack>
          </Container>
        </Box>
      </motion.div>
    </>
  );
}
