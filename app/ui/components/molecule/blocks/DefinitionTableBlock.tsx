import { DefinitionTableBlock as DefinitionTableBlockType } from '@/app/lms/types/module'

interface DefinitionTableBlockProps {
  block: DefinitionTableBlockType
}

export default function DefinitionTableBlock({ block }: DefinitionTableBlockProps) {
  return (
    <div className="definition-table">
      {/* Table header */}
      <div className="definition-table-header">
        <h3 className="text-caption weight-bold" style={{ color: 'var(--tone-info-text)' }}>
          {block.title}
        </h3>
      </div>

      {/* Rows */}
      <div>
        {block.rows.map((row, index) => (
          <div
            key={index}
            className="definition-table-row"
            style={{
              backgroundColor: index % 2 === 0
                ? 'var(--color-bg-card)'
                : 'var(--color-bg-surface)',
            }}
          >
            <div className="definition-table-term">
              <span className="text-caption weight-bold color-heading">
                {row.term}
              </span>
            </div>
            <div className="definition-table-desc">
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
