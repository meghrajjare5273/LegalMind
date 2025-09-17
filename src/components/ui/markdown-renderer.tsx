/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { memo, useMemo, useCallback, lazy, Suspense } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useTheme } from "next-themes";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Lazy load syntax highlighter only when needed
const LazyCodeBlock = lazy(() => import("./code-block"));

interface MarkdownRendererProps {
  content: string;
  className?: string;
  maxHeight?: string;
}

// Memoized components for better performance
const LegalCitation = memo(({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300 rounded-md text-sm font-medium border border-blue-200/50 dark:border-blue-800/50 transition-colors">
    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
    {children}
  </span>
));
LegalCitation.displayName = "LegalCitation";

const RiskBadge = memo(
  ({
    level,
    children,
  }: {
    level: "high" | "medium" | "low";
    children: React.ReactNode;
  }) => {
    const colorConfig = useMemo(
      () => ({
        high: {
          bg: "bg-red-50 dark:bg-red-950/20",
          text: "text-red-700 dark:text-red-300",
          border: "border-red-200/50 dark:border-red-800/50",
          dot: "bg-red-500",
        },
        medium: {
          bg: "bg-amber-50 dark:bg-amber-950/20",
          text: "text-amber-700 dark:text-amber-300",
          border: "border-amber-200/50 dark:border-amber-800/50",
          dot: "bg-amber-500",
        },
        low: {
          bg: "bg-emerald-50 dark:bg-emerald-950/20",
          text: "text-emerald-700 dark:text-emerald-300",
          border: "border-emerald-200/50 dark:border-emerald-800/50",
          dot: "bg-emerald-500",
        },
      }),
      []
    );

    const colors = colorConfig[level];

    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-sm font-medium border transition-all hover:scale-105",
          colors.bg,
          colors.text,
          colors.border
        )}
      >
        <span className={cn("w-1.5 h-1.5 rounded-full", colors.dot)} />
        {children}
      </span>
    );
  }
);
RiskBadge.displayName = "RiskBadge";

// Optimized code block with lazy loading
const CodeBlock = memo(
  ({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) => {
    const [copied, setCopied] = React.useState(false);
    const { theme } = useTheme();

    const match = /language-(\w+)/.exec(className || "");
    const language = match ? match[1] : "";

    const handleCopy = useCallback(async () => {
      try {
        await navigator.clipboard.writeText(String(children));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy code:", err);
      }
    }, [children]);

    if (match) {
      // Destructure to separate conflicting props
      const { style, ...rest } = props;

      return (
        <div className="relative group my-4">
          <div className="absolute right-3 top-3 z-10">
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-background/80 backdrop-blur-sm"
              onClick={handleCopy}
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
          <Suspense
            fallback={
              <div className="rounded-lg bg-muted p-4 animate-pulse">
                <div className="h-4 bg-muted-foreground/20 rounded w-3/4 mb-2" />
                <div className="h-4 bg-muted-foreground/20 rounded w-1/2" />
              </div>
            }
          >
            <LazyCodeBlock
              language={language}
              theme={theme}
              className="rounded-lg border border-border/50 overflow-hidden"
              {...rest}
            >
              {String(children).replace(/\n$/, "")}
            </LazyCodeBlock>
          </Suspense>
        </div>
      );
    }

    return (
      <code
        className="relative rounded-md bg-muted/60 px-2 py-1 font-mono text-sm font-medium border border-muted-foreground/20"
        {...props}
      >
        {children}
      </code>
    );
  }
);
CodeBlock.displayName = "CodeBlock";

// Main component with performance optimizations
export const MarkdownRenderer = memo(
  ({ content, className, maxHeight = "none" }: MarkdownRendererProps) => {
    // Process content for legal-specific formatting
    const processedContent = useMemo(() => {
      if (!content) return "";

      let processed = content;

      // Enhanced legal citation detection
      processed = processed.replace(
        /\b(Article\s+\d+(?:\(\d+\))?|Section\s+\d+(?:\(\d+\))?|IPC\s+\d+|Constitution\s+Article\s+\d+|Act\s+\d{4}|Rule\s+\d+|Order\s+\d+)\b/gi,
        "**[$1]**"
      );

      return processed;
    }, [content]);

    // Render components mapping with optimized styling
    const components = useMemo(
      () => ({
        code: CodeBlock,

        h1: ({
          children,
          ...props
        }: React.HTMLAttributes<HTMLHeadingElement>) => (
          <h1
            className="text-2xl font-bold text-foreground mb-6 pb-3 border-b-2 border-primary/20"
            {...props}
          >
            {children}
          </h1>
        ),

        h2: ({
          children,
          ...props
        }: React.HTMLAttributes<HTMLHeadingElement>) => (
          <h2
            className="text-xl font-semibold text-foreground mb-4 mt-8 pb-2 border-b border-border/30"
            {...props}
          >
            {children}
          </h2>
        ),

        h3: ({
          children,
          ...props
        }: React.HTMLAttributes<HTMLHeadingElement>) => (
          <h3
            className="text-lg font-semibold text-foreground mb-3 mt-6"
            {...props}
          >
            {children}
          </h3>
        ),

        p: ({
          children,
          ...props
        }: React.HTMLAttributes<HTMLParagraphElement>) => (
          <p
            className="text-foreground/90 leading-relaxed mb-4 text-pretty"
            {...props}
          >
            {children}
          </p>
        ),

        ul: ({
          children,
          ...props
        }: React.HTMLAttributes<HTMLUListElement>) => (
          <ul className="list-none space-y-2 mb-4 pl-0" {...props}>
            {children}
          </ul>
        ),

        ol: ({
          children,
          ...props
        }: React.HTMLAttributes<HTMLOListElement>) => (
          <ol
            className="list-decimal list-inside space-y-2 mb-4 text-foreground marker:text-primary"
            {...props}
          >
            {children}
          </ol>
        ),

        li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
          <li className="text-foreground/90 flex items-start gap-3" {...props}>
            <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2.5 flex-shrink-0" />
            <span className="flex-1">{children}</span>
          </li>
        ),

        blockquote: ({
          children,
          ...props
        }: React.HTMLAttributes<HTMLQuoteElement>) => (
          <blockquote
            className="border-l-4 border-primary/50 pl-6 py-3 bg-muted/30 rounded-r-lg mb-6 italic text-muted-foreground relative overflow-hidden"
            {...props}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent" />
            <div className="relative">{children}</div>
          </blockquote>
        ),

        table: ({
          children,
          ...props
        }: React.HTMLAttributes<HTMLTableElement>) => (
          <div className="overflow-x-auto mb-6 rounded-lg border border-border/50">
            <table className="min-w-full divide-y divide-border/50" {...props}>
              {children}
            </table>
          </div>
        ),

        th: ({
          children,
          ...props
        }: React.HTMLAttributes<HTMLTableHeaderCellElement>) => (
          <th
            className="bg-muted/50 px-6 py-3 text-left text-sm font-semibold text-foreground border-b border-border/30"
            {...props}
          >
            {children}
          </th>
        ),

        td: ({
          children,
          ...props
        }: React.HTMLAttributes<HTMLTableDataCellElement>) => (
          <td
            className="px-6 py-4 text-sm text-foreground/90 border-b border-border/20"
            {...props}
          >
            {children}
          </td>
        ),

        strong: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => {
          const text = String(children);

          if (text.match(/^\[.*\]$/)) {
            return <LegalCitation>{text.slice(1, -1)}</LegalCitation>;
          }

          // Handle risk badges
          if (text.match(/^(HIGH|MEDIUM|LOW)\s+RISK$/i)) {
            const level = text.toLowerCase().split(" ")[0] as
              | "high"
              | "medium"
              | "low";
            return <RiskBadge level={level}>{text}</RiskBadge>;
          }

          return (
            <strong className="font-semibold text-foreground" {...props}>
              {children}
            </strong>
          );
        },

        em: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
          <em className="italic text-muted-foreground" {...props}>
            {children}
          </em>
        ),

        a: ({
          children,
          href,
          ...props
        }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
          <a
            href={href}
            className="text-primary hover:text-primary/80 underline underline-offset-2 decoration-primary/30 hover:decoration-primary/60 transition-all duration-200"
            target="_blank"
            rel="noopener noreferrer"
            {...props}
          >
            {children}
          </a>
        ),
      }),
      []
    );

    if (!content) {
      return (
        <div className="flex items-center justify-center p-8 text-muted-foreground">
          No content to display
        </div>
      );
    }

    return (
      <div
        className={cn(
          "prose prose-sm max-w-none dark:prose-invert",
          "prose-headings:scroll-mt-20 prose-code:before:content-none prose-code:after:content-none",
          className
        )}
        style={{ maxHeight }}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
          {processedContent}
        </ReactMarkdown>
      </div>
    );
  }
);

MarkdownRenderer.displayName = "MarkdownRenderer";
