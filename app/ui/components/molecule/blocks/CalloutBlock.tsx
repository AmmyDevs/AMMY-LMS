import { CalloutBlock as CalloutBlockType } from '@/app/lms/types/module'

interface CalloutBlockProps {
  block: CalloutBlockType
}

const variantStyles: Record<
  CalloutBlockType['variant'],
  { border: string; bg: string; color: string; icon: string }
> = {
  tip:       { border: 'var(--tone-info-text)',    bg: 'var(--tone-info-bg)',    color: 'var(--tone-info-text)',    icon: '💡' },
  key:       { border: 'var(--tone-info-text)',    bg: 'var(--tone-info-bg)',    color: 'var(--tone-info-text)',    icon: '🔑' },
  important: { border: 'var(--tone-alert-text)',   bg: 'var(--tone-alert-bg)',   color: 'var(--tone-alert-text)',   icon: '⚠️' },
  analogy:   { border: 'var(--tone-purple-text)',  bg: 'var(--tone-purple-bg)',  color: 'var(--tone-purple-text)',  icon: '🔍' },
  warning:   { border: 'var(--tone-danger-text)',  bg: 'var(--tone-danger-bg)',  color: 'var(--tone-danger-text)',  icon: '🚨' },
}

export default function CalloutBlock({ block }: CalloutBlockProps) {
  const style = variantStyles[block.variant]

  return (
    <div
      className="callout"
      style={{ borderLeftColor: style.border, backgroundColor: style.bg }}
    >
      <div className="callout-title">
        <span>{style.icon}</span>
        <span className="text-label" style={{ color: style.color }}>
          {block.title}
        </span>
      </div>
      <p className="callout-text color-body">
        {block.text}
      </p>
    </div>
  )
}
