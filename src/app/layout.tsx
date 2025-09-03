// src/app/layout.tsx - Updated with better viewport settings
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  weight: ["400"],
  subsets: ["latin"],
  style: ["normal"],
});

export const metadata: Metadata = {
  title: "LegalMind",
  description: "Join the community to experience AI powered Legal Assistance",
  publisher: "LegalMind",
  creator: "Meghraj Jare",
  applicationName: "LegalMind",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // Prevent zoom issues that can cause viewport snapping
  viewportFit: "cover",
  // Remove interactiveWidget temporarily to test
  // interactiveWidget: "resizes-content",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} overflow-x-hidden`}>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
