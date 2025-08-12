import { Metadata, Viewport } from "next";

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

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
