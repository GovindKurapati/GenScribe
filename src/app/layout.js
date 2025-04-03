import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Provider } from "@/components/Provider";
import { Flex } from "@chakra-ui/react";
import { ColorModeButton } from "@/components/ColorMode";
import AuthButton from "@/components/AuthButton";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "GenScribe",
  description: "GenScribe is a platform for writing blog using AI.",
  authors: [{ name: "Govind Kurapati" }],
  keywords: [],
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gen-scribe.govind-kurapati.com/",
    site_name: "GenScribe",
    title: "GenScribe",
    description: "Platform for generating and editing blog using AI ",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Provider>
          <Flex>
            <Navbar />
          </Flex>
          <main>{children}</main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
