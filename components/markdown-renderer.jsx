"use client";
import React from "react";
import ReactMarkdown from "react-markdown";
import { ScrollArea } from "@/components/ui/scroll-area";

export function MarkdownRenderer(
  { content, title = "Terms and Conditions" } = {
    content: "# Welcome\n\nThis is a sample markdown content.",
  },
) {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-background rounded-lg ">
      <ReactMarkdown
        components={{
          h1: ({ node, ...props }) => (
            <h1 className="text-2xl font-bold mt-6 mb-4" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-xl font-semibold mt-5 mb-3" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-lg font-medium mt-4 mb-2" {...props} />
          ),
          p: ({ node, ...props }) => (
            <p className="mb-4 leading-relaxed" {...props} />
          ),
          ul: ({ node, ...props }) => (
            <ul className="list-disc pl-6 mb-4" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal pl-6 mb-4" {...props} />
          ),
          li: ({ node, ...props }) => <li className="mb-2" {...props} />,
          a: ({ node, ...props }) => (
            <a className="text-primary hover:underline" {...props} />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote
              className="border-l-4 border-primary pl-4 italic my-4"
              {...props}
            />
          ),
          code: ({ node, inline, ...props }) =>
            inline ? (
              <code
                className="bg-muted text-primary px-1 py-0.5 rounded"
                {...props}
              />
            ) : (
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                <code className="text-primary" {...props} />
              </pre>
            ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
