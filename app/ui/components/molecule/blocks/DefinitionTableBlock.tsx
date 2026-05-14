import { DefinitionTableBlock as DefinitionTableBlockType } from '@/app/lms/types/module'

interface DefinitionTableBlockProps {
  block: DefinitionTableBlockType
}

export default function DefinitionTableBlock({ block }: DefinitionTableBlockProps) {
  return (
    <div className="radius-md border-standard overflow-hidden my-6">
      {/* Table header */}
      <div
        className="px-5 py-3 border-bottom"
        style={{ backgroundColor: 'var(--tone-info-bg)' }}
      >
        <h3 className="text-caption weight-bold" style={{ color: 'var(--tone-info-text)' }}>
          {block.title}
        </h3>
      </div>

      {/* Rows */}
      <div>
        {block.rows.map((row, index) => (
          <div
            key={index}
            className="flex border-bottom last:border-0"
            style={{
              backgroundColor: index % 2 === 0
                ? 'var(--color-bg-card)'
                : 'var(--color-bg-surface)',
            }}
          >
            <div
              className="px-5 py-3 border-r border-standard"
              style={{ width: '33%', flexShrink: 0 }}
            >
              <span className="text-caption weight-bold color-heading">
                {row.term}
              </span>
            </div>
            <div className="flex-1 px-5 py-3">
              <span className="text-caption color-body">
                {row.description}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
