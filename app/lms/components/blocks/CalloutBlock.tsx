import { CalloutBlock as CalloutBlockType } from '@/app/lms/types/module'
import { cn } from '@/lib/utils'

interface CalloutBlockProps {
  block: CalloutBlockType
}

const variantStyles: Record<CalloutBlockType['variant'], { border: string; bg: string; icon: string; iconColor: string }> = {
  tip: { border: 'border-l-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-950/30', icon: '💡', iconColor: 'text-emerald-600' },
  key: { border: 'border-l-blue-500', bg: 'bg-blue-50 dark:bg-blue-950/30', icon: '🔑', iconColor: 'text-blue-600' },
  important: { border: 'border-l-amber-500', bg: 'bg-amber-50 dark:bg-amber-950/30', icon: '⚠️', iconColor: 'text-amber-600' },
  analogy: { border: 'border-l-purple-500', bg: 'bg-purple-50 dark:bg-purple-950/30', icon: '🔍', iconColor: 'text-purple-600' },
  warning: { border: 'border-l-red-500', bg: 'bg-red-50 dark:bg-red-950/30', icon: '🚨', iconColor: 'text-red-600' },
}

export default function CalloutBlock({ block }: CalloutBlockProps) {
  const style = variantStyles[block.variant]

  return (
    <div className={cn('border-l-4 rounded-r-lg px-4 py-3 my-4', style.border, style.bg)}>
      <div className="flex items-center gap-2 mb-1">
        <span className={style.iconColor}>{style.icon}</span>
        <span className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
          {block.title}
        </span>
      </div>
      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
        {block.text}
      </p>
    </div>
  )
}