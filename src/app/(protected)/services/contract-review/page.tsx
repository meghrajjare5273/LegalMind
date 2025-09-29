"use client";

import ContractReview from "@/components/protected/contract/ContractReview";
import CardNav from "@/components/react-bits/CardNav";
import { useSession } from "@/contexts/session-context";

export default function ContractReviewPage() {
  const { user, loading } = useSession();
  const navItems = [
    {
      label: "Services",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        {
          label: "AI Chat",
          href: "/services/chat",
          ariaLabel: "AI Chat Service",
        },
        {
          label: "Contract Review",
          href: "/services/contract-review",
          ariaLabel: "Contract Review Service",
        },
      ],
    },
    {
      label: "Dashboard",
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        {
          label: "Overview",
          href: "/dashboard",
          ariaLabel: "Dashboard Overview",
        },
        {
          label: "Analytics",
          href: "/analytics",
          ariaLabel: "Analytics Dashboard",
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40">
        <CardNav
          logo="/logo.svg"
          logoAlt="LegalMind Logo"
          items={navItems}
          baseColor="#fff"
          menuColor="#000"
          buttonBgColor="#111"
          buttonTextColor="#fff"
          ease="power3.out"
          user={user!}
        />
      </div>

      {/* Main Content */}
      <main className="flex-1 px-6 md:px-8 py-6" style={{ paddingTop: "95px" }}>
        <ContractReview />
      </main>

      {/* Footer */}
      <footer className="border-t border-border px-6 md:px-8">
        <div className="py-4">
          <div className="flex items-center justify-center space-x-6 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Legal Notice
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
