import { TableBlock as TableBlockType } from '@/app/lms/types/module'

interface TableBlockProps {
  block: TableBlockType
}

export default function TableBlock({ block }: TableBlockProps) {
  return (
    <div className="overflow-x-auto my-4">
      {block.caption && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 italic">
          {block.caption}
        </p>
      )}
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800">
            {block.headers.map((header, index) => (
              <th key={index} className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
          {block.rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-3 py-2 text-gray-700 dark:text-gray-300">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}