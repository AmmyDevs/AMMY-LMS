import { CodeBlock as CodeBlockType } from '@/app/lms/types/module'

interface CodeBlockProps {
  block: CodeBlockType
}

export default function CodeBlock({ block }: CodeBlockProps) {
  return (
    <div className="my-4">
      {block.label && (
        <p className="text-xs font-mono text-gray-400 mb-1">
          {block.label}
        </p>
      )}
      <div className="bg-gray-950 dark:bg-gray-900 rounded-lg px-4 py-3 overflow-x-auto">
        <pre className="text-sm font-mono text-emerald-400 leading-relaxed whitespace-pre">
          {block.code}
        </pre>
        <div className="text-xs text-gray-500 font-mono mt-2">
          {block.language}
        </div>
      </div>
    </div>
  )
}