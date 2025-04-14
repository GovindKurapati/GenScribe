"use client";
import { useState, useEffect } from "react";
import { Box, Button, Input, Flex, Textarea, Heading } from "@chakra-ui/react";
import useAuthStore from "@/store/authStore";
import useBlogStore from "@/store/blogStore";
import { useRouter } from "next/navigation";
import { BlogGenerator } from "@/components/BlogGenerator";
import { BlogEditor } from "@/components/BlogEditor";
import { toaster, Toaster } from "@/components/ui/toaster";

export default function Editor() {
  const { user } = useAuthStore();
  const { getUser } = useAuthStore();
  const { email } = getUser() || "";
  const { addBlog, loading } = useBlogStore();
  const router = useRouter();
  const [content, setContent] = useState("");

  useEffect(() => {
    if (!email) router.push("/");
  }, [email]);

  const handleSaveBlog = async (data) => {
    // if (!user) return alert("Please log in first!");
    toaster.create({
      id: "saving",
      title: "Saving Blog",
      description: "Saving your blog data...",
      type: "info",
      duration: 1000,
      action: {
        label: "Close",
      },
    });
    await addBlog(data, user);
    router.push("/dashboard");
  };

  const handleBlogData = (data) => {
    setContent("-");
    const formattedContent = formatMarkdown(data);
    setContent(formattedContent);
  };
  const formatMarkdown = (text) => {
    return text
      .replace(/\n\s*\n/g, "\n\n") // Ensure proper paragraph spacing
      .replace(/\\n/g, "\n") // Fix escaped newlines
      .trim();
  };

  return (
    <Box
      maxW="700px"
      mx="auto"
      mt={10}
      textAlign="center"
      minHeight="calc(100vh - 205px)"
    >
      <Heading my="40px">Blog Editor</Heading>
      <BlogGenerator blogData={handleBlogData} />
      <Flex maxW="700px" mx="auto" mt={6} textAlign="left" wrap="wrap">
        {content && (
          <BlogEditor
            key={content} // Force re-render when content changes
            initialContent={content}
            onSave={handleSaveBlog}
            isEditable={true}
          />
        )}
      </Flex>

      <Toaster />
    </Box>
  );
}
