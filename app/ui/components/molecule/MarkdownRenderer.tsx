import { useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { InteractiveBlock } from './InteractiveBlock'

// ─── Parse {{interactive: effectId}} markers ──────────────────────────────

function parseInteractiveMarkers(content: string): (string | { type: 'interactive'; id: string })[] {
  const regex = /\{\{interactive:\s*([^}]+)\}\}/g
  const parts: (string | { type: 'interactive'; id: string })[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      parts.push(content.slice(lastIndex, match.index))
    }
    parts.push({ type: 'interactive', id: match[1].trim() })
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < content.length) {
    parts.push(content.slice(lastIndex))
  }

  return parts
}

// ─── Custom Markdown Components ────────────────────────────────────────────

const components = {
  h1: ({ children }: { children?: React.ReactNode }) => (
    <h1 className="font-ui text-3xl font-semibold text-text mt-12 mb-5 pb-3 border-b border-border">
      {children}
    </h1>
  ),
  h2: ({ children }: { children?: React.ReactNode }) => (
    <h2 className="font-ui text-2xl font-semibold text-text mt-10 mb-4 pb-2 border-b border-border">
      {children}
    </h2>
  ),
  h3: ({ children }: { children?: React.ReactNode }) => (
    <h3 className="font-ui text-xl font-semibold text-text mt-8 mb-3">
      {children}
    </h3>
  ),
  h4: ({ children }: { children?: React.ReactNode }) => (
    <h4 className="font-ui text-lg font-semibold text-text mt-6 mb-2">
      {children}
    </h4>
  ),
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className="font-body text-base leading-relaxed text-text mb-4">
      {children}
    </p>
  ),
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="list-disc pl-6 mb-4 space-y-1.5 font-body text-base text-text">
      {children}
    </ul>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol className="list-decimal pl-6 mb-4 space-y-1.5 font-body text-base text-text">
      {children}
    </ol>
  ),
  li: ({ children }: { children?: React.ReactNode }) => (
    <li className="leading-relaxed">
      {children}
    </li>
  ),
  blockquote: ({ children }: { children?: React.ReactNode }) => (
    <blockquote className="border-l-4 border-brand pl-5 my-6 italic text-muted bg-navy-fill/50 py-3 pr-4 rounded-r-lg">
      {children}
    </blockquote>
  ),
  code: ({ children, className }: { children?: React.ReactNode; className?: string }) => {
    const isInline = !className
    if (isInline) {
      return (
        <code className="px-1.5 py-0.5 rounded bg-elevated text-brand text-sm font-mono">
          {children}
        </code>
      )
    }
    return (
      <pre className="my-6 p-4 rounded-lg bg-elevated border border-border overflow-x-auto">
        <code className={`${className} text-sm font-mono text-text`}>
          {children}
        </code>
      </pre>
    )
  },
  table: ({ children }: { children?: React.ReactNode }) => (
    <div className="overflow-x-auto my-6 rounded-lg border border-border">
      <table className="w-full text-sm border-collapse">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }: { children?: React.ReactNode }) => (
    <thead className="bg-elevated border-b border-border">
      {children}
    </thead>
  ),
  th: ({ children }: { children?: React.ReactNode }) => (
    <th className="px-4 py-3 text-left text-xs font-semibold text-muted uppercase tracking-wider">
      {children}
    </th>
  ),
  td: ({ children }: { children?: React.ReactNode }) => (
    <td className="px-4 py-3 text-text border-b border-border/50 font-body">
      {children}
    </td>
  ),
  tr: ({ children }: { children?: React.ReactNode }) => (
    <tr className="hover:bg-navy-fill/30 transition-colors">
      {children}
    </tr>
  ),
  strong: ({ children }: { children?: React.ReactNode }) => (
    <strong className="font-semibold text-text">
      {children}
    </strong>
  ),
  em: ({ children }: { children?: React.ReactNode }) => (
    <em className="italic text-text">
      {children}
    </em>
  ),
  a: ({ children, href }: { children?: React.ReactNode; href?: string }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-brand hover:underline"
    >
      {children}
    </a>
  ),
  hr: () => <hr className="my-8 border-border" />,
}

// ─── MarkdownRenderer ────────────────────────────────────────────────────────

interface MarkdownRendererProps {
  content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const parts = useMemo(() => parseInteractiveMarkers(content), [content])

  return (
    <div className="prose max-w-none">
      {parts.map((part, index) => {
        if (typeof part === 'string') {
          return (
            <ReactMarkdown
              key={index}
              remarkPlugins={[remarkGfm]}
              components={components}
            >
              {part}
            </ReactMarkdown>
          )
        }
        return <InteractiveBlock key={index} effectId={part.id} />
      })}
    </div>
  )
}
