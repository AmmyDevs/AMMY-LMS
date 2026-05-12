import Link from 'next/link'
import { BookOpen, User, Calendar } from 'lucide-react'

interface ModuleCardProps {
  module: {
    code: string
    name: string
    lecturer: string | null
    schedule: Array<{
      day: string
      startTime: string
      endTime: string
      venue: string
    }>
  }
}

/**
 * Polished ModuleCard component for the LMS.
 * Features a clean, premium surface with subtle hover interactions.
 */
export default function ModuleCard({ module }: ModuleCardProps) {
  const scheduleText = module.schedule.length > 0
    ? `${module.schedule[0].day} ${module.schedule[0].startTime}-${module.schedule[0].endTime}`
    : 'No schedule'

  const moduleSlug = module.code.replace(/\s+/g, '')

  return (
    <Link href={`/lms/modules/${moduleSlug}`} className="surface-card surface-interactive effect-glow col gap-item">
      {/* Icon and Code */}
      <div className="row-between mb-2">
        <div className="w-10 h-10 radius-md bg-subtle centered text-accent">
          <BookOpen size={20} />
        </div>
        <span className="pill pill-info">{module.code}</span>
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="text-subheading mb-1 color-heading">{module.name}</h3>
        <div className="col gap-1">
          {module.lecturer && (
            <div className="row gap-inline text-fine color-muted">
              <User size={14} />
              <span>{module.lecturer}</span>
            </div>
          )}
          <div className="row gap-inline text-fine color-muted">
            <Calendar size={14} />
            <span>{scheduleText}</span>
          </div>
        </div>
      </div>

      {/* Footer / Meta */}
      <div className="pt-4 border-top flex items-center justify-between">
        <span className="text-label" style={{ fontSize: '10px' }}>Module Overview</span>
        <div className="dot-accent" />
      </div>
    </Link>
  )
}