"use client";
import { useState } from "react";
import { Box, Button, Input, Flex, Textarea, Heading } from "@chakra-ui/react";
import useAuthStore from "@/store/authStore";
import useBlogStore from "@/store/blogStore";
import { useRouter } from "next/navigation";
import { BlogGenerator } from "@/components/BlogGenerator";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { BlogEditor } from "@/components/BlogEditor";
import ProseMirrorEditor from "@/components/PoseMirrorEditor";

export default function Editor() {
  const { user } = useAuthStore();
  const { addBlog } = useBlogStore();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [summary, setSummary] = useState("");

  const handleSaveBlog = async () => {
    if (!user) return alert("Please log in first!");
    await addBlog(content, user);
    router.push("/dashboard");
  };

  const handleBlogData = (data) => {
    setContent("-");
    const formattedContent = formatMarkdown(data);
    console.log(typeof formattedContent);
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
          // <BlogEditor
          //   key={content} // Force re-render when content changes
          //   initialContent={content}
          //   onContentChange={handleBlogData}
          // />

          <ProseMirrorEditor content={content} onChange={handleBlogData} />
        )}
      </Flex>

      {content && (
        <Button colorScheme="blue" mt={6} mb={"60px"} onClick={handleSaveBlog}>
          Save Blog
        </Button>
      )}
    </Box>
  );
}
