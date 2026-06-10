'use client'

import type { ReactNode } from 'react'
import { clsx } from 'clsx'

/* ================================================================
   BASE CARD — Glass morphism container with hover elevation
   ================================================================ */

interface BaseCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

function BaseCard({ children, className, hover = true }: BaseCardProps) {
  return (
    <div className={clsx('g-card', hover && 'g-card--hover', className)}>
      {children}
    </div>
  )
}

/* ================================================================
   COURSE CARD — Image, tags, title, description, progress bar
   ================================================================ */

interface CourseCardProps {
  image?: string
  imageAlt?: string
  tags?: Array<{ label: string; color?: string }>
  title: string
  description?: string
  progress?: number // 0-100
  meta?: string
  className?: string
}

function CourseCard({
  image,
  imageAlt = 'Course thumbnail',
  tags,
  title,
  description,
  progress,
  meta,
  className,
}: CourseCardProps) {
  return (
    <div className={clsx('g-card g-card--hover g-course-card', className)}>
      {/* Image */}
      <div className="g-course-card__image">
        {image ? (
          <img src={image} alt={imageAlt} className="w-full h-full object-cover" />
        ) : (
          <div className="g-course-card__placeholder">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--g-accent)' }}>
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
            </svg>
          </div>
        )}
        {/* Tags overlay */}
        {tags && tags.length > 0 && (
          <div className="g-course-card__tags">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="g-course-card__tag"
                style={tag.color ? { backgroundColor: tag.color + '20', color: tag.color, borderColor: tag.color + '30' } : undefined}
              >
                {tag.label}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="g-course-card__body">
        <h3 className="g-course-card__title">{title}</h3>
        {description && <p className="g-course-card__desc">{description}</p>}
        {meta && <p className="g-course-card__meta">{meta}</p>}

        {/* Progress bar */}
        {progress !== undefined && (
          <div className="g-course-card__progress-wrap">
            <div className="g-course-card__progress-bar">
              <div
                className="g-course-card__progress-fill"
                style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
              />
            </div>
            <span className="g-course-card__progress-label">{progress}%</span>
          </div>
        )}
      </div>
    </div>
  )
}

/* ================================================================
   STAT CARD — Minimalist metric with icon
   ================================================================ */

interface StatCardProps {
  label: string
  value: string | number
  change?: string
  changeType?: 'positive' | 'negative' | 'neutral'
  icon?: ReactNode
  sparkline?: ReactNode
  className?: string
}

function StatCard({
  label,
  value,
  change,
  changeType = 'neutral',
  icon,
  sparkline,
  className,
}: StatCardProps) {
  return (
    <div className={clsx('g-card g-stat-card', className)}>
      <div className="g-stat-card__row">
        <div className="g-stat-card__info">
          <p className="g-stat-card__label">{label}</p>
          <p className="g-stat-card__value">{value}</p>
          {change && (
            <p className={clsx('g-stat-card__change', `g-stat-card__change--${changeType}`)}>
              {changeType === 'positive' && '↑ '}
              {changeType === 'negative' && '↓ '}
              {change}
            </p>
          )}
        </div>
        {icon && <div className="g-stat-card__icon">{icon}</div>}
      </div>
      {sparkline && <div className="g-stat-card__sparkline">{sparkline}</div>}
    </div>
  )
}

export { BaseCard, CourseCard, StatCard }
export type { BaseCardProps, CourseCardProps, StatCardProps }
