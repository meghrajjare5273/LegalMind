import { Metadata } from "next";
import type { ReactNode } from "react";
// import { ThemeProvider } from "@/components/theme-provider";
// import { Toaster } from "@/components/ui/sonner";
// import { SessionProvider } from "@/contexts/session-context";

export const metadata: Metadata = {
  title: "Contract Review",
};

export default function ContractReviewLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    // <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    //   <SessionProvider>
    <div className="min-h-screen w-full bg-background">
      <div className="mx-auto max-w-7xl">{children}</div>
    </div>
    // <Toaster />
    //   </SessionProvider>
    // </ThemeProvider>
  );
}
