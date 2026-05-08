import { DefinitionTableBlock as DefinitionTableBlockType } from '@/app/lms/types/module'

interface DefinitionTableBlockProps {
  block: DefinitionTableBlockType
}

export default function DefinitionTableBlock({ block }: DefinitionTableBlockProps) {
  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden my-4">
      <div className="bg-blue-50 dark:bg-blue-950/30 px-4 py-3 border-b border-gray-200 dark:border-gray-800">
        <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-100">
          {block.title}
        </h3>
      </div>
      <div className="divide-y divide-gray-100 dark:divide-gray-800">
        {block.rows.map((row, index) => (
          <div key={index} className={`flex ${index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-900/50'}`}>
            <div className="w-1/3 px-4 py-3 border-r border-gray-100 dark:border-gray-800">
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {row.term}
              </span>
            </div>
            <div className="flex-1 px-4 py-3">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {row.description}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}