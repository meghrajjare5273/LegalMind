import { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Auth | LegalMind - Join the future of legal advice",
  description:
    "Sign up or log in to access AI-powered legal insights and personalized guidance.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className={inter.className}>{children}</section>;
}
