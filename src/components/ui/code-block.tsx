/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { Highlight, themes } from "prism-react-renderer";

interface CodeBlockProps {
  children: string;
  language: string;
  theme?: string;
  className?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  children,
  language,
  theme = "light",
  className,
}) => {
  const prismTheme = theme === "dark" ? themes.vsDark : themes.vsLight;

  return (
    <Highlight theme={prismTheme} code={children} language={language as any}>
      {({
        className: prismClassName,
        style,
        tokens,
        getLineProps,
        getTokenProps,
      }) => (
        <pre
          className={`${prismClassName} ${className} p-4 rounded-lg overflow-x-auto text-sm leading-relaxed`}
          style={style}
        >
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              <span className="inline-block w-8 text-right mr-4 text-gray-500 select-none">
                {i + 1}
              </span>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

export default CodeBlock;
