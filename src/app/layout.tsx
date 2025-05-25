/* eslint-disable @typescript-eslint/no-unused-vars */
import type React from "react";
import type { Metadata } from "next";
import { Inter, Lora, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["cyrillic"],
  weight: ["400", "500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "LegalMind - AI-Powered Legal Advisory Platform",
  description:
    "Get instant legal guidance with our advanced AI chatbot. Describe your legal issues and receive personalized suggestions on how to proceed.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${lora.className} antialiased font-inter`}>
        {children}
      </body>
    </html>
  );
}
