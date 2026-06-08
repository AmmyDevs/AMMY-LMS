import Link from 'next/link'
import { BookOpen, User, Calendar, ArrowRight } from 'lucide-react'
import modulesData from '../../../../docs/module.json'

/**
 * ModuleShowcase section — dynamic grid of available modules.
 * Server component that reads from module.json at build time.
 */
export function ModuleShowcase() {
  const { modules } = modulesData

  return (
    <section id="modules" className="page-section bg-surface animate-fade-in-up">
      <div className="page-container">

        {/* Section header */}
        <div className="text-center col gap-item items-center mb-10">
          <span className="text-label">Modules</span>
          <h2 className="text-title">
            Your{' '}
            <span className="text-gradient-accent">Computer Engineering</span>{' '}
            subjects
          </h2>
          <p className="text-body color-muted max-w-[480px]">
            {modules.length} modules with structured study materials, ready for you.
          </p>
        </div>

        {/* Module grid */}
        <div className="grid-auto gap-row">
          {modules.map((module) => {
            const scheduleText = module.schedule.length > 0
              ? `${module.schedule[0].day} ${module.schedule[0].startTime}–${module.schedule[module.schedule.length - 1].endTime}`
              : 'Schedule TBD'

            const moduleSlug = module.code.replace(/\s+/g, '')

            return (
              <Link
                key={module.code}
                href={`/lms/modules/${moduleSlug}`}
                className="surface-card surface-interactive effect-glow col gap-3 group"
              >
                {/* Header: icon + code pill */}
                <div className="row-between">
                  <div className="w-10 h-10 radius-md bg-accent/10 centered">
                    <BookOpen className="color-accent" size={20} />
                  </div>
                  <span className="pill pill-info">{module.code}</span>
                </div>

                {/* Module name */}
                <h3 className="text-subheading color-heading leading-snug">
                  {module.name}
                </h3>

                {/* Metadata */}
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

                {/* Footer */}
                <div className="pt-4 border-top row-between mt-auto">
                  <span className="text-label" style={{ fontSize: '10px' }}>
                    View Lessons
                  </span>
                  <ArrowRight
                    size={16}
                    className="color-accent opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </div>
              </Link>
            )
          })}
        </div>

      </div>
    </section>
  )
}
