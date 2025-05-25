/* eslint-disable @typescript-eslint/no-unused-vars */
import type React from "react";
import type { Metadata } from "next";
import { Domine, Inter, JetBrains_Mono, Lora, Playfair_Display, Poppins, Roboto, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const oswald = Domine({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400"]
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["math"],
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
      <body className={`${oswald.className} antialiased font-inter`}>
        {children}
      </body>
    </html>
  );
}
