import { TableBlock as TableBlockType } from '@/app/lms/types/module'

interface TableBlockProps {
  block: TableBlockType
}

export default function TableBlock({ block }: TableBlockProps) {
  return (
    <div className="overflow-x-auto my-6">
      {block.caption && (
        <p className="text-fine color-muted mb-2 italic">
          {block.caption}
        </p>
      )}
      <table className="w-full text-sm border-collapse radius-md overflow-hidden border-standard">
        <thead>
          <tr style={{ backgroundColor: 'var(--color-bg-surface)' }}>
            {block.headers.map((header, index) => (
              <th
                key={index}
                className="px-4 py-3 text-left text-label border-bottom"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              style={{
                backgroundColor: rowIndex % 2 === 0
                  ? 'var(--color-bg-card)'
                  : 'var(--color-bg-surface)',
                borderBottom: '1px solid var(--color-border-subtle)',
              }}
            >
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-4 py-3 text-caption color-body">
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
