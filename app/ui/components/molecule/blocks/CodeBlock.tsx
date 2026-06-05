import { CodeBlock as CodeBlockType } from '@/app/lms/types/module'

interface CodeBlockProps {
  block: CodeBlockType
}

export default function CodeBlock({ block }: CodeBlockProps) {
  return (
    <div className="my-6">
      {block.label && (
        <p className="text-fine color-muted mb-2 font-mono">
          {block.label}
        </p>
      )}
      <div
        className="radius-md overflow-x-auto"
        style={{
          backgroundColor: 'var(--gray-900)',
          border: '1px solid var(--color-border)',
          padding: 'var(--space-6)',
        }}
      >
        <pre
          className="text-fine font-mono leading-relaxed whitespace-pre"
          style={{ color: '#34d399' }}
        >
          {block.code}
        </pre>
        {block.language && (
          <div
            className="text-fine font-mono mt-3"
            style={{ color: 'var(--gray-500)' }}
          >
            {block.language}
          </div>
        )}
      </div>
    </div>
  )
}
