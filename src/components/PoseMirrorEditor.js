"use client";

import { useEffect, useRef } from "react";
import { EditorView } from "prosemirror-view";
import { EditorState } from "prosemirror-state";
import { schema } from "prosemirror-schema-basic";
import { exampleSetup } from "prosemirror-example-setup";
import { keymap } from "prosemirror-keymap";
import { toggleMark, setBlockType, wrapIn, lift } from "prosemirror-commands";
import {
  schema as markdownSchema,
  defaultMarkdownParser,
  defaultMarkdownSerializer,
} from "prosemirror-markdown";
import { undo, redo } from "prosemirror-history";
import "prosemirror-view/style/prosemirror.css";
import "prosemirror-menu/style/menu.css";
import { Button, Flex, IconButton } from "@chakra-ui/react";
import {
  FaBold,
  FaCode,
  FaItalic,
  FaUnderline,
  FaListOl,
  FaList,
  FaUndoAlt,
  FaRedoAlt,
  FaHeading,
} from "react-icons/fa";
import { FaHeading as FaHeading2 } from "react-icons/fa6";

/** ✨ Custom Toolbar Menu Plugin */
const menuPlugin = (view) => {
  return {
    update: (editorState) => {
      document.getElementById("bold-btn").onclick = () => {
        toggleMark(markdownSchema.marks.strong)(view.state, view.dispatch);
        view.focus();
      };
      document.getElementById("italic-btn").onclick = () => {
        toggleMark(markdownSchema.marks.em)(view.state, view.dispatch);
        view.focus();
      };
      document.getElementById("underline-btn").onclick = () => {
        toggleMark(markdownSchema.marks.code)(view.state, view.dispatch);
        view.focus();
      };
      document.getElementById("h1-btn").onclick = () => {
        setBlockType(markdownSchema.nodes.heading, { level: 1 })(
          view.state,
          view.dispatch
        );
        view.focus();
      };
      document.getElementById("h2-btn").onclick = () => {
        setBlockType(markdownSchema.nodes.heading, { level: 2 })(
          view.state,
          view.dispatch
        );
        view.focus();
      };
      document.getElementById("ul-btn").onclick = () => {
        wrapIn(markdownSchema.nodes.bullet_list)(view.state, view.dispatch);
        view.focus();
      };
      document.getElementById("ol-btn").onclick = () => {
        wrapIn(markdownSchema.nodes.ordered_list)(view.state, view.dispatch);
        view.focus();
      };
      document.getElementById("undo-btn").onclick = () => {
        undo(view.state, view.dispatch);
        view.focus();
      };
      document.getElementById("redo-btn").onclick = () => {
        redo(view.state, view.dispatch);
        view.focus();
      };
    },
  };
};

const ProseMirrorEditor = ({ content, onChange }) => {
  const editorRef = useRef(null);
  const viewRef = useRef(null);

  useEffect(() => {
    if (!editorRef.current) return;

    const markdownContent = typeof content === "string" ? content : "";
    viewRef.current = new EditorView(editorRef.current, {
      state: EditorState.create({
        doc: defaultMarkdownParser.parse(markdownContent),
        plugins: [
          ...exampleSetup({ schema: markdownSchema }),
          keymap({
            "Mod-z": undo,
            "Mod-y": redo,
          }),
        ],
      }),
      dispatchTransaction(transaction) {
        let newState = viewRef.current.state.apply(transaction);
        viewRef.current.updateState(newState);
        onChange(defaultMarkdownSerializer.serialize(newState.doc));
      },
    });

    const menuHandler = menuPlugin(viewRef.current);
    menuHandler.update(viewRef.current.state);

    setTimeout(() => viewRef.current.focus(), 100); // Small delay to ensure UI is loaded

    return () => {
      if (viewRef.current) {
        viewRef.current.destroy();
      }
    };
  }, []);

  return (
    <Flex
      borderWidth="1px"
      borderRadius="lg"
      shadow="lg"
      p={4}
      w="100%"
      direction={"column"}
    >
      <Flex className="toolbar" gap={2} mb={4} wrap={"wrap"}></Flex>
      <Flex gap={2} my={2} mb={6} wrap={"wrap"}>
        <IconButton id="bold-btn" aria-label="Bold" size="sm">
          <FaBold fontSize="30px" color="primary" />
        </IconButton>
        <IconButton
          id="italic-btn"
          aria-label="Italic"
          _hover={{ bg: "hoverBg" }}
          size="sm"
        >
          <FaItalic fontSize="20px" color="primary" />
        </IconButton>

        <IconButton aria-label="Underline" _hover={{ bg: "hoverBg" }} size="sm">
          <FaUnderline fontSize="20px" color="primary" />
        </IconButton>

        <IconButton
          id="underline-btn"
          aria-label="Code"
          _hover={{ bg: "hoverBg" }}
          size="sm"
        >
          <FaCode fontSize="20px" color="primary" />
        </IconButton>
        <IconButton
          id="h1-btn"
          aria-label="heading-1"
          _hover={{ bg: "hoverBg" }}
          size="sm"
        >
          <FaHeading fontSize="20px" color="primary" />
        </IconButton>

        <IconButton
          id="h2-btn"
          aria-label="heading-2"
          _hover={{ bg: "hoverBg" }}
          size="sm"
        >
          <FaHeading2 fontSize="20px" color="primary" />
        </IconButton>

        {/* Lists */}
        <IconButton
          aria-label="Bullet List"
          _hover={{ bg: "hoverBg" }}
          size="sm"
          id="ul-btn"
        >
          <FaList fontSize="20px" color="primary" />
        </IconButton>

        <IconButton
          aria-label="Numbered List"
          _hover={{ bg: "hoverBg" }}
          size="sm"
          id="ol-btn"
        >
          <FaListOl fontSize="20px" color="primary" />
        </IconButton>

        <IconButton
          aria-label="Undo"
          _hover={{ bg: "hoverBg" }}
          size="sm"
          id="undo-btn"
        >
          <FaUndoAlt fontSize="20px" color="primary" />
        </IconButton>
        <IconButton
          aria-label="Redo"
          _hover={{ bg: "hoverBg" }}
          size="sm"
          id="redo-btn"
        >
          <FaRedoAlt fontSize="20px" color="primary" />
        </IconButton>
      </Flex>
      <div ref={editorRef} className="editor-container"></div>
    </Flex>
  );
};

export default ProseMirrorEditor;
