import { useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ImageProcessingWidget } from './ImageProcessingWidget'

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
    <h1 className="text-title color-heading mt-12 mb-5 pb-3 border-bottom">
      {children}
    </h1>
  ),
  h2: ({ children }: { children?: React.ReactNode }) => (
    <h2 className="text-heading color-heading mt-10 mb-4 pb-2 border-bottom">
      {children}
    </h2>
  ),
  h3: ({ children }: { children?: React.ReactNode }) => (
    <h3 className="text-subheading color-heading mt-8 mb-3">
      {children}
    </h3>
  ),
  h4: ({ children }: { children?: React.ReactNode }) => (
    <h4 className="text-body weight-bold color-heading mt-6 mb-2">
      {children}
    </h4>
  ),
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className="text-body color-body leading-relaxed mb-5">
      {children}
    </p>
  ),
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="list-disc pl-6 mb-5 space-y-1.5 text-body color-body">
      {children}
    </ul>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol className="list-decimal pl-6 mb-5 space-y-1.5 text-body color-body">
      {children}
    </ol>
  ),
  li: ({ children }: { children?: React.ReactNode }) => (
    <li className="leading-relaxed">
      {children}
    </li>
  ),
  blockquote: ({ children }: { children?: React.ReactNode }) => (
    <blockquote
      className="pl-5 my-6 italic text-caption color-muted radius-sm py-4 pr-4"
      style={{
        borderLeft: '4px solid var(--accent)',
        backgroundColor: 'var(--color-bg-surface)',
      }}
    >
      {children}
    </blockquote>
  ),
  code: ({ children, className }: { children?: React.ReactNode; className?: string }) => {
    const isInline = !className
    if (isInline) {
      return (
        <code
          className="px-1.5 py-0.5 radius-xs text-fine font-mono"
          style={{
            backgroundColor: 'var(--accent-light)',
            color: 'var(--accent)',
          }}
        >
          {children}
        </code>
      )
    }
    return (
      <pre
        className="my-6 px-6 py-5 radius-md overflow-x-auto border-standard"
        style={{ backgroundColor: 'var(--gray-900)' }}
      >
        <code className={`${className} text-fine font-mono`} style={{ color: '#34d399' }}>
          {children}
        </code>
      </pre>
    )
  },
  table: ({ children }: { children?: React.ReactNode }) => (
    <div className="overflow-x-auto my-6 radius-md border-standard">
      <table className="w-full text-sm border-collapse">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }: { children?: React.ReactNode }) => (
    <thead className="bg-surface border-bottom">
      {children}
    </thead>
  ),
  th: ({ children }: { children?: React.ReactNode }) => (
    <th className="px-4 py-3 text-left text-label">
      {children}
    </th>
  ),
  td: ({ children }: { children?: React.ReactNode }) => (
    <td
      className="px-4 py-3 text-caption color-body"
      style={{ borderBottom: '1px solid var(--color-border-subtle)' }}
    >
      {children}
    </td>
  ),
  tr: ({ children }: { children?: React.ReactNode }) => (
    <tr className="hover:bg-hover transition-colors">
      {children}
    </tr>
  ),
  strong: ({ children }: { children?: React.ReactNode }) => (
    <strong className="weight-bold color-heading">
      {children}
    </strong>
  ),
  em: ({ children }: { children?: React.ReactNode }) => (
    <em className="italic color-body">
      {children}
    </em>
  ),
  a: ({ children, href }: { children?: React.ReactNode; href?: string }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-accent hover:underline"
    >
      {children}
    </a>
  ),
  hr: () => (
    <hr className="my-8 border-standard" style={{ border: 'none', borderTop: '1px solid var(--color-border)' }} />
  ),
}

// ─── MarkdownRenderer ────────────────────────────────────────────────────────

interface MarkdownRendererProps {
  content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const parts = useMemo(() => parseInteractiveMarkers(content), [content])

  return (
    <div className="col gap-1">
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
        return <ImageProcessingWidget key={index} effectId={part.id} />
      })}
    </div>
  )
}
