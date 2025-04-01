import { createSystem, defaultConfig } from "@chakra-ui/react";

// import { fonts } from "./fonts";

const customTheme = createSystem(defaultConfig, {
  theme: {
    keyframes: {
      shakeX: {
        "0%": { transform: "scale(1)" },
        "100%": { transform: "scale(1.1)" },
      },
    },
    semanticTokens: {
      colors: {
        primary: {
          DEFAULT: {
            value: { _light: "#F8F8F8", _dark: "#151515" }, // Custom dark background
          },
        },
        secondary: {
          DEFAULT: {
            value: { _light: "#DCDFE4", _dark: "#2B2B2C" }, // Custom dark text color
          },
        },
        tertiary: {
          DEFAULT: {
            value: { _light: "#3767D6", _dark: "#F5CD47" }, // Custom dark border
          },
        },
        title: {
          100: {
            value: { _light: "black", _dark: "#d6d6d6" }, // Custom dark title
          },
          200: {
            value: { _light: "#d6d6d6b3", _dark: "#d6d6d6b3" }, // Custom dark title
          },
        },
        borderColor: {
          DEFAULT: {
            value: { _light: "#B3B9C4", _dark: "#383838" }, // Custom dark border
          },
        },
        backgroundColor: {
          DEFAULT: {
            value: { _light: "#F8F8F8", _dark: "#151515" }, // Custom dark background
          },
        },
      },
      animations: {
        shakeX: { value: "shakeX 0.6s ease forwards" },
      },
    },
  },
  globalCss: {
    "::-moz-selection": {
      backgroundColor: "tertiary", // ✅ Apply selection background
      color: "black", // ✅ Apply selection text color
    },
    "::selection": {
      backgroundColor: "tertiary",
      color: "black",
    },
    html: {
      color: "title.100",
      overflowX: "hidden",
      backgroundColor: "backgroundColor",
    },
    body: {
      overflowX: "hidden",
    },
    h1: {
      fontSize: "2.5rem",
      fontWeight: "bold",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: "bold",
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: "bold",
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: "bold",
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: "bold",
    },
    h6: {
      fontSize: "1rem",
      fontWeight: "bold",
    },
    p: {
      marginBottom: "10px",
    },
    ".ProseMirror": {
      outline: "none !important",
    },
    ".ProseMirror:focus": {
      outline: "none !important",
      boxShadow: "none !important",
      borderColor: "inherit !important",
    },
    ".tiptap-editor .ProseMirror em": {
      fontStyle: "italic !important",
    },
    ".ProseMirror-menubar": {
      display: "none !important",
    },
  },
});

export default customTheme;
