import Link from 'next/link'

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

export default function ModuleCard({ module }: ModuleCardProps) {
  const scheduleText = module.schedule.length > 0
    ? `${module.schedule[0].day} ${module.schedule[0].startTime}-${module.schedule[0].endTime} (${module.schedule[0].venue})`
    : 'No schedule available'

  const moduleSlug = module.code.replace(/\s+/g, '')

  return (
    <Link href={`/modules/${moduleSlug}`} className="module-card">
      <div className="module-card-content">
        <h3 className="module-card-title">{module.name}</h3>
        <p className="module-card-code">{module.code}</p>
        {module.lecturer && (
          <p className="module-card-lecturer">Lecturer: {module.lecturer}</p>
        )}
        <p className="module-card-schedule">{scheduleText}</p>
      </div>
    </Link>
  )
}