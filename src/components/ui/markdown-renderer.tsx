"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTheme } from "next-themes";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

const CodeBlock = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const { theme } = useTheme();
  const [copied, setCopied] = React.useState(false);

  const match = /language-(\w+)/.exec(className || "");
  const language = match ? match[1] : "";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(String(children));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (match) {
    return (
      <div className="relative group">
        <Button
          size="sm"
          variant="ghost"
          className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity z-10"
          onClick={handleCopy}
        >
          {copied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
        <SyntaxHighlighter
          style={theme === "dark" ? oneDark : oneLight}
          language={language}
          PreTag="div"
          className="rounded-lg !mt-0 !mb-4"
          {...props}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      </div>
    );
  }

  return (
    <code
      className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
      {...props}
    >
      {children}
    </code>
  );
};

const LegalCitation = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 rounded-md text-sm font-medium border border-blue-200 dark:border-blue-800">
    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
    {children}
  </span>
);

const RiskBadge = ({
  level,
  children,
}: {
  level: "high" | "medium" | "low";
  children: React.ReactNode;
}) => {
  const colors = {
    high: "bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800",
    medium:
      "bg-yellow-50 dark:bg-yellow-950/30 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800",
    low: "bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-1 rounded-md text-sm font-medium border",
        colors[level]
      )}
    >
      <span
        className={cn(
          "w-1.5 h-1.5 rounded-full",
          level === "high" && "bg-red-500",
          level === "medium" && "bg-yellow-500",
          level === "low" && "bg-green-500"
        )}
      />
      {children}
    </span>
  );
};

export function MarkdownRenderer({
  content,
  className,
}: MarkdownRendererProps) {
  // Enhanced content processing for legal-specific formatting
  const processedContent = React.useMemo(() => {
    let processed = content;

    // Convert legal citations to special format
    processed = processed.replace(
      /\b(Article\s+\d+|Section\s+\d+|IPC\s+\d+|Constitution\s+Article\s+\d+|Act\s+\d{4})\b/gi,
      "**[$1]**"
    );

    // Convert risk indicators to badges
    processed = processed.replace(
      /\*\*(HIGH RISK|MEDIUM RISK|LOW RISK)\*\*/gi,
      (match, risk) => {
        const level = risk.toLowerCase().split(" ")[0] as
          | "high"
          | "medium"
          | "low";
        return `<RiskBadge level="${level}">${risk}</RiskBadge>`;
      }
    );

    return processed;
  }, [content]);

  return (
    <div
      className={cn("prose prose-sm max-w-none dark:prose-invert", className)}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code: CodeBlock,
          h1: ({ children, ...props }) => (
            <h1
              className="text-xl font-bold text-foreground mb-4 pb-2 border-b border-border"
              {...props}
            >
              {children}
            </h1>
          ),
          h2: ({ children, ...props }) => (
            <h2
              className="text-lg font-semibold text-foreground mb-3 mt-6"
              {...props}
            >
              {children}
            </h2>
          ),
          h3: ({ children, ...props }) => (
            <h3
              className="text-base font-semibold text-foreground mb-2 mt-4"
              {...props}
            >
              {children}
            </h3>
          ),
          p: ({ children, ...props }) => (
            <p
              className="text-foreground leading-relaxed mb-4 text-pretty"
              {...props}
            >
              {children}
            </p>
          ),
          ul: ({ children, ...props }) => (
            <ul
              className="list-disc list-inside space-y-2 mb-4 text-foreground"
              {...props}
            >
              {children}
            </ul>
          ),
          ol: ({ children, ...props }) => (
            <ol
              className="list-decimal list-inside space-y-2 mb-4 text-foreground"
              {...props}
            >
              {children}
            </ol>
          ),
          li: ({ children, ...props }) => (
            <li className="text-foreground" {...props}>
              {children}
            </li>
          ),
          blockquote: ({ children, ...props }) => (
            <blockquote
              className="border-l-4 border-primary pl-4 py-2 bg-muted/50 rounded-r-lg mb-4 italic text-muted-foreground"
              {...props}
            >
              {children}
            </blockquote>
          ),
          table: ({ children, ...props }) => (
            <div className="overflow-x-auto mb-4">
              <table
                className="min-w-full border border-border rounded-lg"
                {...props}
              >
                {children}
              </table>
            </div>
          ),
          th: ({ children, ...props }) => (
            <th
              className="border border-border bg-muted px-4 py-2 text-left font-semibold text-foreground"
              {...props}
            >
              {children}
            </th>
          ),
          td: ({ children, ...props }) => (
            <td
              className="border border-border px-4 py-2 text-foreground"
              {...props}
            >
              {children}
            </td>
          ),
          strong: ({ children, ...props }) => {
            const text = String(children);

            // Check if it's a legal citation
            if (text.match(/^\[.*\]$/)) {
              return <LegalCitation>{text.slice(1, -1)}</LegalCitation>;
            }

            return (
              <strong className="font-semibold text-foreground" {...props}>
                {children}
              </strong>
            );
          },
          em: ({ children, ...props }) => (
            <em className="italic text-muted-foreground" {...props}>
              {children}
            </em>
          ),
          a: ({ children, href, ...props }) => (
            <a
              href={href}
              className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            >
              {children}
            </a>
          ),
        }}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  );
}
