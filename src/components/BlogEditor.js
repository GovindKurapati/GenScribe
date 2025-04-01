import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "tiptap-markdown";

import CodeBlock from "@tiptap/extension-code-block";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import HardBreak from "@tiptap/extension-hard-break";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Underline from "@tiptap/extension-underline";
import Italic from "@tiptap/extension-italic";
import Text from "@tiptap/extension-text";
import { Box, Button, Tooltip, IconButton, Flex } from "@chakra-ui/react";
import {
  FaBold,
  FaCode,
  FaItalic,
  FaUnderline,
  FaListOl,
  FaList,
} from "react-icons/fa";

export const BlogEditor = ({ initialContent, onContentChange }) => {
  const editor = useEditor({
    extensions: [
      Markdown,
      CodeBlock,
      Document,
      Paragraph,
      Text,
      HardBreak,
      BulletList,
      OrderedList,
      ListItem,
      Underline,
      Italic,
      StarterKit.configure({
        // Ensure italic is not disabled
        italic: true,
      }),
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      const htmlContent = editor.storage.markdown.getMarkdown();
      console.log(htmlContent);
      onContentChange(htmlContent);
    },
    autofocus: false,
    editable: true,
  });

  return (
    <Box
      className="editor-container"
      border={"1px solid #E2E8F0"}
      p={4}
      w="100%"
    >
      <Flex gap={2} my={2} mb={6} wrap={"wrap"}>
        <IconButton
          aria-label="Bold"
          onClick={() => editor.chain().focus().toggleBold().run()}
          size="sm"
          isActive={editor?.isActive("bold")}
          bg={editor?.isActive("bold") ? "black" : "secondary"}
        >
          <FaBold fontSize="30px" color="white" />
        </IconButton>
        <IconButton
          aria-label="Italic"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor?.isActive("italic")}
          bg={editor?.isActive("italic") ? "black" : "secondary"}
          _hover={{ bg: "hoverBg" }}
          size="sm"
        >
          <FaItalic fontSize="20px" color="white" />
        </IconButton>

        <IconButton
          aria-label="Underline"
          onClick={() =>
            editor.chain().focus().toggleUnderline().run().scrollIntoView()
          }
          isActive={editor?.isActive("underline")}
          bg={editor?.isActive("underline") ? "black" : "secondary"}
          _hover={{ bg: "hoverBg" }}
          size="sm"
        >
          <FaUnderline fontSize="20px" color="white" />
        </IconButton>

        <IconButton
          aria-label="Code"
          onClick={() => editor.chain().focus().toggleCode().run()}
          isActive={editor?.isActive("code")}
          bg={editor?.isActive("code") ? "black" : "secondary"}
          _hover={{ bg: "hoverBg" }}
          size="sm"
        >
          <FaCode fontSize="20px" color="white" />
        </IconButton>

        {/* Lists */}
        <IconButton
          aria-label="Bullet List"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor?.isActive("bulletList")}
          bg={editor?.isActive("bulletList") ? "black" : "secondary"}
          _hover={{ bg: "hoverBg" }}
          size="sm"
        >
          <FaList fontSize="20px" color="white" />
        </IconButton>

        <IconButton
          aria-label="Numbered List"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor?.isActive("orderedList")}
          bg={editor?.isActive("orderedList") ? "black" : "secondary"}
          _hover={{ bg: "hoverBg" }}
          size="sm"
        >
          <FaListOl fontSize="20px" color="white" />
        </IconButton>
      </Flex>
      <EditorContent editor={editor} />
      {/* <Button
        onClick={() => editor?.chain()?.focus()?.toggleStrike().run()}
        className={editor.isActive("strike") ? "is-active" : ""}
      >
        Toggle strike
      </Button> */}
      {/* <Tooltip label="Bold (Ctrl+B)"> */}

      {/* </Tooltip> */}
    </Box>
  );
};
