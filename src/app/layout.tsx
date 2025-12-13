import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Atlantiser | Brand Transformation Navigators",
  description: "Digital-first branding agency building and scaling next-gen brands.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans bg-white text-black selection:bg-black selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}