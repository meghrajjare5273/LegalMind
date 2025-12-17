import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication | LegalMind",
  description: "Login to your account or create a new one to get started.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full w-full">
      {children}
    </div>
  );
}