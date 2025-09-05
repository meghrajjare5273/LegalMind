"use client";

import { Toaster } from "sonner";
import ContractReview from "@/components/protected/contract/ContractReview";

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      {/* Top App Bar */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-lg font-semibold text-foreground">
              Contract Review
            </h1>
            <div className="text-sm text-muted-foreground">/ Analysis</div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground hover:bg-muted/80 transition-colors">
              ?
            </button>
            <button className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground hover:bg-muted/80 transition-colors">
              ⚙
            </button>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs font-medium text-primary-foreground">
              U
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <ContractReview />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-12">
        <div className="max-w-7xl mx-auto px-6 py-4">
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

      {/* <Toaster richColors position="top-right" /> */}
    </div>
  );
}
