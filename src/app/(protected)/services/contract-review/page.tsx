/*
 * REFACTOR CHANGES:
 * 1. Removed min-h-screen constraint that conflicted with parent layout
 * 2. Simplified header structure to work with parent layout's padding
 * 3. Removed redundant container max-width (handled by parent)
 * 4. Maintained all existing contract review functionality
 * 5. Preserved footer but adjusted for new layout structure
 */

"use client";

// import { Toaster } from "sonner";
import ContractReview from "@/components/protected/contract/ContractReview";

export default function Page() {
  return (
    <div className="flex flex-col gap-6">
      {/* Top App Bar */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm -mx-6 md:-mx-8 px-6 md:px-8">
        <div className="flex items-center justify-between py-4">
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
      <main className="flex-1">
        <ContractReview />
      </main>

      {/* Footer */}
      <footer className="border-t border-border -mx-6 md:-mx-8 px-6 md:px-8 mt-12">
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
