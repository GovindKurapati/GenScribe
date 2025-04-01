"use client";

import customTheme from "@/lib/styles/theme";
import { ChakraProvider } from "@chakra-ui/react";
import { ColorModeProvider } from "@/components/ColorMode";

export function Provider({ children }) {
  return (
    <ChakraProvider value={customTheme}>
      <ColorModeProvider>{children}</ColorModeProvider>
    </ChakraProvider>
  );
}
