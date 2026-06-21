import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import "./globals.css";

// Font configuration
const inter = Inter({
  variable: "--next-font-sans",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--next-font-display",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

// SEO Metadata
export const metadata: Metadata = {
  title: "Sourav Roy - Technical Program Leadership & Delivery",
  description: "Portfolio of a senior IT professional specializing in technical program management, Agile leadership, and AI-led solution delivery.",
  openGraph: {
    title: "Sourav Roy - Technical Program Leadership & Delivery",
    description: "AI/GenAI platform engineering, enterprise delivery, and program governance",
    type: "profile",
    url: "https://souravroy.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sourav Roy — Technical Program Leadership",
    description: "Senior technical leader specializing in AI-led transformation",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${newsreader.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
