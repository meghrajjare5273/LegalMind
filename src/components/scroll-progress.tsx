"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();

  // Hide on auth routes
  const isAuthRoute = pathname.startsWith("/auth");

  useEffect(() => {
    if (isAuthRoute) return;

    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const p = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, p)));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isAuthRoute]);

  if (isAuthRoute) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: 3,
        width: `${progress}%`,
        background:
          "linear-gradient(90deg, rgba(255,68,68,1) 0%, rgba(255,107,107,1) 100%)",
        zIndex: 9999,
        transition: "width 120ms ease-out",
      }}
    />
  );
}
