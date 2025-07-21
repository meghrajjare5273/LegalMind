import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "@/lib/theme";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LegalMind - AI-Powered Legal Intelligence",
  description:
    "Transform your legal practice with advanced AI-driven document analysis and legal research.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1", // Add viewport meta
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ overflowX: 'hidden' }}> {/* Add overflow hidden */}
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div style={{ width: '100%', overflowX: 'hidden' }}> {/* Wrapper div */}
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
