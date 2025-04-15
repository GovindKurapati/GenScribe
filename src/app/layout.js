import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Provider } from "@/components/Provider";
import { Flex } from "@chakra-ui/react";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageProgressLoader from "@/components/PageProgressLoader";
import Script from "next/script";

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
  keywords: ["AI", "blogging", "content creation", "writing", "GenScribe"],
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gen-scribe.govind-kurapati.com/",
    site_name: "GenScribe",
    title: "GenScribe",
    description: "Platform for generating and editing blog using AI ",
    images: [
      {
        url: "https://gen-scribe.govind-kurapati.com/genScribe.png",
        width: 1200,
        height: 630,
        alt: "GenScribe Open Graph Image",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning="true">
      <head>
        {process.env.NODE_ENV == "production" && (
          <Script
            async
            defer
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
            src={process.env.NEXT_PUBLIC_UMAMI_SRC}
            strategy="afterInteractive"
          />
        )}
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Provider>
          <Flex>
            <Navbar />
          </Flex>
          <PageProgressLoader />
          <main>{children}</main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
