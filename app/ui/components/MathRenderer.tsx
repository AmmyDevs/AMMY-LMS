'use client'

import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css' // Import global katex styles

interface MathRendererProps {
  content: string
  className?: string
}

/**
 * MathRenderer component securely parses Markdown and renders LaTeX formulas
 * using KaTeX. Supports inline $math$ and block $$math$$.
 */
export function MathRenderer({ content, className = '' }: MathRendererProps) {
  return (
    <div className={`prose prose-neutral dark:prose-invert max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
