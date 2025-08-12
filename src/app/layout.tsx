import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "@/lib/theme";
import "./globals.css";
import ScrollProgress from "@/components/scroll-progress";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Authentication | LegalMind",
  description: "Join the community to experience AI powered Legal Assistance",
  publisher: "LegalMind",
  creator: "Meghraj Jare",
  applicationName: "LegalMind",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ overflowX: "hidden" }}>
        {" "}
        {/* Add overflow hidden */}
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ScrollProgress />
          <div style={{ width: "100%", overflowX: "hidden" }}>
            {" "}
            {/* Wrapper div */}
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
