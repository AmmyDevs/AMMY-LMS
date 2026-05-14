import { CalloutBlock as CalloutBlockType } from '@/app/lms/types/module'

interface CalloutBlockProps {
  block: CalloutBlockType
}

const variantStyles: Record<
  CalloutBlockType['variant'],
  { bg: string; text: string; border: string; icon: string }
> = {
  tip:       { bg: 'var(--tone-info-bg)',    text: 'var(--tone-info-text)',    border: 'var(--tone-info-text)',    icon: '💡' },
  key:       { bg: 'var(--tone-info-bg)',    text: 'var(--tone-info-text)',    border: 'var(--tone-info-text)',    icon: '🔑' },
  important: { bg: 'var(--tone-alert-bg)',   text: 'var(--tone-alert-text)',   border: 'var(--tone-alert-text)',   icon: '⚠️' },
  analogy:   { bg: 'var(--tone-purple-bg)',  text: 'var(--tone-purple-text)',  border: 'var(--tone-purple-text)',  icon: '🔍' },
  warning:   { bg: 'var(--tone-danger-bg)',  text: 'var(--tone-danger-text)',  border: 'var(--tone-danger-text)',  icon: '🚨' },
}

export default function CalloutBlock({ block }: CalloutBlockProps) {
  const style = variantStyles[block.variant]

  return (
    <div
      className="radius-md px-5 py-4 my-6"
      style={{
        borderLeft: `4px solid ${style.border}`,
        backgroundColor: style.bg,
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span>{style.icon}</span>
        <span className="text-label" style={{ color: style.text }}>
          {block.title}
        </span>
      </div>
      <p className="text-body color-body leading-relaxed">
        {block.text}
      </p>
    </div>
  )
}
