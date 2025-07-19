// app/layout.tsx
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
// import { ThemeProvider } from "@mui/material";
// import { muiTheme } from "@/lib/theme";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        {/* <ThemeProvider theme={muiTheme}> */}
          {/* <CssBaseline /> */}
          {children}
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
