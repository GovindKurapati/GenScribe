import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Provider } from "@/components/Provider";
import { Flex } from "@chakra-ui/react";
import { ColorModeButton } from "@/components/ColorMode";
import AuthButton from "@/components/AuthButton";
import { Navbar } from "@/components/Navbar";

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
    url: "https://govind-kurapati.com",
    site_name: "Govind Kurapati Portfolio",
    title: "Govind Kurapati - Software Engineer",
    description:
      "Portfolio website of Govind Kurapati - Software Engineer and Developer",
    images: [
      {
        url: "/profile-pic.jpg",
        width: 1200,
        height: 630,
        alt: "Govind Kurapati - Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Govind Kurapati - Software Engineer",
    description:
      "Portfolio website of Govind Kurapati - Software Engineer and Developer",
    images: ["/l/profile-pic.jpg"],
    creator: "@YourTwitterHandle",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
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
        </Provider>
      </body>
    </html>
  );
}
