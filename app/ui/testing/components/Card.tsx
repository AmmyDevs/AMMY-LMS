import type { ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'

interface CardProps {
  icon: ReactNode
  badge?: string
  title: string
  meta?: Array<{ icon: ReactNode; text: string }>
  footerLabel?: string
  children?: ReactNode
  className?: string
}

/**
 * Testing Card — module card component.
 * Clean hover effects, no dependency on existing Card primitives.
 */
export function Card({
  icon,
  badge,
  title,
  meta,
  footerLabel,
  children,
  className = '',
}: CardProps) {
  return (
    <div className={`t-card ${className}`}>
      <div className="t-card__header">
        <div className="t-card__icon">{icon}</div>
        {badge && <span className="t-card__badge">{badge}</span>}
      </div>

      <h3 className="t-card__title">{title}</h3>

      {meta && meta.length > 0 && (
        <div className="t-card__meta">
          {meta.map((item, i) => (
            <div key={i} className="t-card__meta-row">
              {item.icon}
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      )}

      {children}

      {footerLabel && (
        <div className="t-card__footer">
          <span className="t-card__footer-label">{footerLabel}</span>
          <span className="t-card__footer-arrow">
            <ArrowRight size={16} />
          </span>
        </div>
      )}
    </div>
  )
}
