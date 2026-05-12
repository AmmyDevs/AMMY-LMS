import { CalloutBlock as CalloutBlockType } from '@/app/lms/types/module'
import { cn } from '@/lib/utils'

interface CalloutBlockProps {
  block: CalloutBlockType
}

const variantStyles: Record<CalloutBlockType['variant'], { border: string; bg: string; icon: string; text: string }> = {
  tip: { border: 'border-accent', bg: 'var(--tone-info-bg)', icon: '💡', text: 'var(--tone-info-text)' },
  key: { border: 'border-accent', bg: 'var(--tone-info-bg)', icon: '🔑', text: 'var(--tone-info-text)' },
  important: { border: 'border-accent', bg: 'var(--tone-alert-bg)', icon: '⚠️', text: 'var(--tone-alert-text)' },
  analogy: { border: 'border-l-purple-500', bg: 'var(--tone-purple-bg)', icon: '🔍', text: 'var(--tone-purple-text)' },
  warning: { border: 'border-accent', bg: 'var(--tone-danger-bg)', icon: '🚨', text: 'var(--tone-danger-text)' },
}

export default function CalloutBlock({ block }: CalloutBlockProps) {
  const style = variantStyles[block.variant]

  return (
    <div className={cn('border-l-4 radius-md px-5 py-4 my-6')} style={{ borderColor: style.border === 'border-accent' ? 'var(--accent)' : undefined, backgroundColor: style.bg }}>
      <div className="flex items-center gap-2 mb-2">
        <span style={{ color: style.text }}>{style.icon}</span>
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