import { BookOpen, User, Calendar } from 'lucide-react'
import { Card } from './Card'

const modules = [
  {
    code: 'CS 6301',
    name: 'Communication Systems',
    lecturer: 'Dr. A. Kimaro',
    schedule: 'Mon 08:00–10:00',
  },
  {
    code: 'CS 6302',
    name: 'Data Communication & Networks',
    lecturer: 'Dr. J. Mwakaje',
    schedule: 'Tue 10:00–12:00',
  },
  {
    code: 'CS 6303',
    name: 'Advanced Computer Architecture',
    lecturer: 'Dr. F. Kambona',
    schedule: 'Wed 14:00–16:00',
  },
  {
    code: 'CS 6304',
    name: 'Software Engineering',
    lecturer: 'Dr. P. Msuya',
    schedule: 'Thu 08:00–10:00',
  },
  {
    code: 'CS 6305',
    name: 'Digital Forensics',
    lecturer: 'Dr. E. Mushi',
    schedule: 'Fri 10:00–12:00',
  },
  {
    code: 'CS 6306',
    name: 'Image, Video & Speech Processing',
    lecturer: 'Mr. A. Mbaga',
    schedule: 'Mon 14:00–16:00',
  },
  {
    code: 'CS 6307',
    name: 'Project Management',
    lecturer: 'Dr. S. Nkwame',
    schedule: 'Wed 10:00–12:00',
  },
]

/**
 * Testing Modules — card grid of available modules.
 * Uses the isolated Card component with clean metadata layout.
 */
export function Modules() {
  return (
    <section id="modules" className="t-section t-modules">
      <div className="t-container">

        {/* Section header */}
        <div className="t-modules__header">
          <span className="t-text-label">Modules</span>
          <h2 className="t-text-title">
            Your{' '}
            <span className="t-text-gradient">Computer Engineering</span>{' '}
            subjects
          </h2>
          <p className="t-text-body t-color-muted">
            {modules.length} modules with structured study materials, ready for you.
          </p>
        </div>

        {/* Module grid */}
        <div className="t-grid-3">
          {modules.map((module) => (
            <Card
              key={module.code}
              icon={<BookOpen size={20} />}
              badge={module.code}
              title={module.name}
              meta={[
                { icon: <User size={14} />, text: module.lecturer },
                { icon: <Calendar size={14} />, text: module.schedule },
              ]}
              footerLabel="View Lessons"
            />
          ))}
        </div>

      </div>
    </section>
  )
}
