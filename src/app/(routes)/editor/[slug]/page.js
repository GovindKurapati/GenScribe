"use client";
import { useState, useEffect } from "react";
import { Box, Button, Input, Flex, Textarea, Heading } from "@chakra-ui/react";
import useAuthStore from "@/store/authStore";
import useBlogStore from "@/store/blogStore";
import { useRouter } from "next/navigation";
import { BlogGenerator } from "@/components/BlogGenerator";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { BlogEditor } from "@/components/BlogEditor";
// import { toaster, Toaster } from "@/components/ui/toaster";
import { useParams } from "next/navigation";
import { FaRegTrashCan, FaRegSave } from "react-icons/fa6";

export default function Editor() {
  const { slug } = useParams();
  const { user } = useAuthStore();
  const { getUser } = useAuthStore();
  const { email } = getUser() || "";
  const { addBlog, getBlogById, loading, updateBlog } = useBlogStore();
  const router = useRouter();
  const [content, setContent] = useState("");

  useEffect(() => {
    if (!email) router.push("/");
  }, [email]);

  useEffect(() => {
    if (!slug) return;
    const fetchData = async () => {
      const data = await getBlogById(slug);
      console.log(data[0]?.content);
      setContent(data[0]?.content);
    };
    fetchData();
  }, [slug]);

  const handleSaveBlog = async (data) => {
    // if (!user) return alert("Please log in first!");
    // toaster.create({
    //   title: "Saving Blog",
    //   description: "Saving your blog data...",
    //   type: "info",
    //   duration: 5000,
    //   action: {
    //     label: "Close",
    //   },
    // });
    await updateBlog(data, slug, user);
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
          <Box position={"relative"}>
            <BlogEditor
              key={content} // Force re-render when content changes
              initialContent={content}
              onSave={handleSaveBlog}
            />
            <Button
              position={"absolute"}
              right={0}
              bottom={"20px"}
              variant={"outline"}
              borderColor={"red.500"}
              color={"red.500"}
              w="130px"
              size="sm"
              onClick={(e) => {
                e.stopPropagation(); // Prevent parent card click
                handleDelete(blog.id);
              }}
              _hover={{
                bg: "red.500",
                color: "white",
              }}
            >
              <FaRegTrashCan />
              Delete
            </Button>
          </Box>
        )}
      </Flex>

      {/* <Toaster /> */}
    </Box>
  );
}
