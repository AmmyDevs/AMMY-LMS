import type { ReactNode } from 'react'

interface TagProps {
  children: ReactNode
  icon?: ReactNode
  variant?: 'default' | 'light'
  float?: boolean
  floatDelay?: 1 | 2 | 3
  className?: string
}

/**
 * Testing Tag — floating feature badge component.
 * Used in Hero section for floating badges.
 */
export function Tag({
  children,
  icon,
  variant = 'default',
  float = false,
  floatDelay,
  className = '',
}: TagProps) {
  const classes = [
    't-tag',
    variant === 'light' ? 't-tag--light' : '',
    float ? 't-tag--float' : '',
    floatDelay === 1 ? 't-tag--float-delay-1' : '',
    floatDelay === 2 ? 't-tag--float-delay-2' : '',
    floatDelay === 3 ? 't-tag--float-delay-3' : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <span className={classes}>
      {icon}
      {children}
    </span>
  )
}
