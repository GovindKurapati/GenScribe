"use client";
import { useState, useEffect } from "react";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import useAuthStore from "@/store/authStore";
import useBlogStore from "@/store/blogStore";
import { useRouter } from "next/navigation";
import { BlogGenerator } from "@/components/BlogGenerator";
import { BlogEditor } from "@/components/BlogEditor";
import { toaster, Toaster } from "@/components/ui/toaster";
import { useParams } from "next/navigation";
import { FaRegTrashCan } from "react-icons/fa6";
import { CustomDialog } from "@/components/ui/dialog";

export default function Editor() {
  const { slug } = useParams();
  const { user } = useAuthStore();
  const { getUser } = useAuthStore();
  const { email } = getUser() || "";
  const { getBlogById, loading, updateBlog, deleteBlog } = useBlogStore();
  const router = useRouter();
  const [content, setContent] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (!email) router.push("/");
  }, [email]);

  useEffect(() => {
    if (!slug) return;
    const fetchData = async () => {
      const data = await getBlogById(slug);
      setContent(data[0]?.content);
    };
    fetchData();
  }, [slug]);

  const handleSaveBlog = async (data) => {
    // if (!user) return alert("Please log in first!");
    toaster.create({
      id: "edit-saving",
      title: "Saving Blog",
      description: "Saving your blog data...",
      type: "info",
      duration: 1000,
      action: {
        label: "Close",
      },
    });
    await updateBlog(data, slug, user);
    router.push("/dashboard");
  };

  const handleDelete = async (id) => {
    await deleteBlog(id);
    router.push("/dashboard");
    toaster.create({
      title: "Blog Deleted",
      description: "Your blog has been deleted successfully.",
      type: "success",
      duration: 1000,
      action: {
        label: "Close",
      },
    });
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
          <Box position={"relative"} w={"100%"}>
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
                setOpenDialog(true);
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
      <CustomDialog
        isOpen={openDialog}
        onClose={() => setOpenDialog(false)}
        header={"Are you sure?"}
        body={"This blog will be deleted permanently."}
        successAction={() => {
          handleDelete(slug);
          setOpenDialog(false);
        }}
      />

      <Toaster />
    </Box>
  );
}
