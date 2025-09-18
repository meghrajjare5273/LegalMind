"use client";

import ContractReview from "@/components/protected/contract/ContractReview";

export default function ContractReviewPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm px-6 md:px-8">
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

      {/* Main Content */}
      <main className="flex-1 px-6 md:px-8 py-6">
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
