"use client";

import { useEffect, useState } from "react";
import {
  Flex,
  Heading,
  Text,
  IconButton,
  Container,
  VStack,
  HStack,
  Avatar,
  Menu,
  Portal,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import useBlogStore from "@/store/blogStore";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import {
  FaCircle,
  FaRegHeart,
  FaEllipsisV,
  FaLink,
  FaTrashAlt,
} from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { toaster, Toaster } from "@/components/ui/toaster";
import useAuthStore from "@/store/authStore";
import { CustomDialog } from "@/components/ui/dialog";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const router = useRouter();
  const { fetchPublicBlogs, deleteBlog, loading } = useBlogStore();
  const { user } = useAuthStore();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPublicBlogs();
      setBlogs(data);
    };
    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const handleShare = (e, id) => {
    e.stopPropagation();
    const url = `${window.location.origin}/blog/${id}`;
    navigator.clipboard.writeText(url).then(() => {
      toaster.create({
        title: "Link copied!",
        description: "The blog link has been copied to your clipboard.",
        type: "success",
        duration: 2000,
        isClosable: true,
      });
    });
  };

  const handleDelete = async (id) => {
    await deleteBlog(id);
    setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
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

  return (
    <Container maxW="container.xl" py={10} minHeight="calc(100vh - 164px)">
      <Heading mb={4}>All Blogs</Heading>
      <Toaster />
      <Flex direction="column" gap={4}>
        {blogs.map((blog) => (
          <Flex
            key={blog.id}
            p={8}
            shadow="md"
            borderWidth="1px"
            borderRadius="md"
            onClick={() => router.push(`/blog/${blog.id}`)}
            _hover={{
              cursor: "pointer",
              shadow: "lg",
              direction: "column",
            }}
            justifyContent={"space-between"}
          >
            <VStack alignItems={"flex-start"} spacing={2} flex={1}>
              <HStack fontSize="sm" alignItems={"center"}>
                <Avatar.Root size={"xs"} key={"size"}>
                  <Avatar.Fallback name={blog?.userName} />
                  {blog?.userPhoto ? (
                    <Avatar.Image src={blog.userPhoto} />
                  ) : (
                    <Avatar.Image
                      src={`https://ui-avatars.com/api/?name=${blog.userEmail}`}
                    />
                  )}
                </Avatar.Root>

                <Text mb={"0"}>{blog.userName}</Text>
                <FaCircle size={"5px"} />

                <Text mb={"0"}>{formatDate(blog.createdAt)}</Text>
              </HStack>
              <VStack align="start" spacing={2} flex={1}>
                <Markdown
                  children={blog.content.substring(0, 99) + "..."}
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                ></Markdown>
              </VStack>
              <Flex alignItems="center" gap={3} _hover={{ cursor: "default" }}>
                <FaRegHeart />
                <Text m={0}>{blog.likes || 0}</Text>
              </Flex>
            </VStack>

            <Menu.Root zIndex={100} onClick={(e) => e.stopPropagation()}>
              <Menu.Trigger asChild>
                <IconButton
                  onClick={(e) => e.stopPropagation()}
                  aria-label="Menu"
                  variant={"ghost"}
                  size="md"
                >
                  <FaEllipsisV />
                </IconButton>
              </Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content>
                    <Menu.Item
                      value="new-txt"
                      _hover={{ cursor: "pointer" }}
                      onClick={(e) => handleShare(e, blog.id)}
                    >
                      <FaLink />
                      Share
                    </Menu.Item>
                    {user?.email === blog.userEmail && (
                      <Menu.Item
                        value="edit"
                        _hover={{ cursor: "pointer" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/editor/${blog.id}`);
                        }}
                      >
                        <MdEdit />
                        Edit
                      </Menu.Item>
                    )}
                    {user?.email === blog.userEmail && (
                      <Menu.Item
                        value="delete"
                        _hover={{ cursor: "pointer" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedBlogId(blog.id);
                          setOpenDialog(true);
                        }}
                      >
                        <FaTrashAlt />
                        Delete
                      </Menu.Item>
                    )}
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
          </Flex>
        ))}
      </Flex>
      <CustomDialog
        isOpen={openDialog}
        onClose={() => setOpenDialog(false)}
        header={"Are you sure?"}
        body={"This blog will be deleted permanently."}
        successAction={() => {
          handleDelete(selectedBlogId);
          setOpenDialog(false);
          setSelectedBlogId(null);
        }}
      />
    </Container>
  );
}
