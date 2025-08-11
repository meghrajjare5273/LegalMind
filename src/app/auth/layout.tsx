"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

export default function AuthLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // Hide scroll progress bar for auth routes
  if (typeof document !== "undefined") {
    const scrollProgress = document.querySelector('[aria-hidden="true"]');
    if (scrollProgress && pathname.startsWith("/auth")) {
      (scrollProgress as HTMLElement).style.display = "none";
    }
  }

  return (
    <div className="auth-layout">
      <style jsx global>{`
        /* Custom scrollbar for auth routes */
        .auth-layout ::-webkit-scrollbar {
          width: 6px;
        }
        .auth-layout ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
        }
        .auth-layout ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 3px;
        }
        .auth-layout ::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }

        /* Hide scroll progress bar for auth routes */
        .auth-layout ~ div[aria-hidden="true"] {
          display: none !important;
        }
      `}</style>
      {children}
    </div>
  );
}
