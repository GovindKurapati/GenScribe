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
import Strike from "@tiptap/extension-strike";
import { Box, Button, IconButton, Flex, ButtonGroup } from "@chakra-ui/react";
import {
  FaBold,
  FaCode,
  FaItalic,
  FaUnderline,
  FaListOl,
  FaList,
  FaStrikethrough,
} from "react-icons/fa";
import { marked } from "marked";
import { useEffect } from "react";
import { FaRegSave } from "react-icons/fa";
import DOMPurify from "dompurify";

export const BlogEditor = ({
  initialContent = "## hi",
  onSave,
  isEditable = true,
}) => {
  const htmlContent = marked(initialContent);
  const editor = useEditor({
    extensions: [
      Markdown,
      Underline,
      StarterKit.configure({
        // Ensure italic is not disabled
        italic: true,
      }),
    ],
    content: htmlContent,
    autofocus: false,
    editable: isEditable,
    immediatelyRender: false,
  });

  // If the parent sends new markdown content, update the editor.
  useEffect(() => {
    if (editor && initialContent) {
      const updatedHTML = marked(initialContent);
      editor.commands.setContent(updatedHTML);
    }
  }, [initialContent, editor]);

  const handleSave = () => {
    if (editor && onSave) {
      const rawHTML = editor.getHTML();
      const safeHTML = DOMPurify.sanitize(rawHTML);
      onSave(safeHTML);
    }
  };

  return (
    <Box w={"100%"}>
      <Box
        className="editor-container"
        // border={isEditable ? "1px solid #E2E8F0" : "none"}
        borderWidth={isEditable ? "1px" : "none"}
        borderRadius={isEditable ? "lg" : "none"}
        shadow={isEditable ? "lg" : "none"}
        p={4}
        w="100%"
      >
        {isEditable && (
          <Flex w="100%" gap={2} my={2} mb={6} wrap={"wrap"}>
            <ButtonGroup spacing="2">
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
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                isActive={editor?.isActive("underline")}
                bg={editor?.isActive("underline") ? "black" : "secondary"}
                _hover={{ bg: "hoverBg" }}
                size="sm"
              >
                <FaUnderline fontSize="20px" color="white" />
              </IconButton>

              <IconButton
                aria-label="strike"
                onClick={() => editor.chain().focus().toggleStrike().run()}
                isActive={editor?.isActive("strike")}
                bg={editor?.isActive("strike") ? "black" : "secondary"}
                _hover={{ bg: "hoverBg" }}
                size="sm"
              >
                <FaStrikethrough fontSize="20px" color="white" />
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
            </ButtonGroup>
          </Flex>
        )}
        <EditorContent editor={editor} />
      </Box>
      {isEditable && (
        <Button colorScheme="blue" mt={6} mb={"20px"} onClick={handleSave}>
          <FaRegSave />
          Save Blog
        </Button>
      )}
    </Box>
  );
};
