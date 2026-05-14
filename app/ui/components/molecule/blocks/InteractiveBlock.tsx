import { InteractiveBlock as InteractiveBlockType } from '@/app/lms/types/module'

interface InteractiveBlockProps {
  block: InteractiveBlockType
}

export default function InteractiveBlock({ block }: InteractiveBlockProps) {
  return (
    <div
      className="radius-md px-6 py-10 my-6 text-center flex flex-col items-center justify-center"
      style={{
        border: '2px dashed var(--color-border)',
        backgroundColor: 'var(--tone-info-bg)',
        minHeight: '8rem',
      }}
    >
      <div className="text-2xl mb-3">🎛️</div>
      <h3 className="text-caption weight-bold mb-1" style={{ color: 'var(--tone-info-text)' }}>
        Interactive: {block.label}
      </h3>
      <p className="text-fine color-muted">
        Widget coming soon
      </p>
    </div>
  )
}
