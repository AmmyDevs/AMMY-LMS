import Link from 'next/link'
import {
  BookOpen,
  FlaskConical,
  Telescope,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Circle,
  Play,
} from 'lucide-react'
import { useLMSStore } from '@/lib/store'
import { CONTENT_NAV } from '@/lib/mock'

const TYPE_CONFIG = {
  lecture: {
    icon: BookOpen,
    color: 'bg-accent text-white',
    border: 'border-standard',
    badge: 'pill-info',
  },
  'self-study': {
    icon: FlaskConical,
    color: 'bg-accent text-white',
    border: 'border-standard',
    badge: 'pill-success',
  },
  further: {
    icon: Telescope,
    color: 'bg-accent text-white',
    border: 'border-standard',
    badge: 'pill-alert',
  },
}

export function Dashboard() {
  const { username, progress } = useLMSStore()

  const totalItems = CONTENT_NAV.reduce((sum, section) => sum + (section.children?.length ?? 0), 0)
  const completedItems = Object.values(progress).filter((p) => p.completed).length
  const progressPct = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0

  return (
    <div className="min-h-screen bg-page">
      <div className="page-container py-12">
        {/* Hero */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="pill pill-info uppercase tracking-wider">
              Digital Image Processing
            </span>
          </div>
          <h1 className="text-title mb-4">
            {username ? `Welcome back, ${username}` : 'Welcome to AMMY LMS'}
          </h1>
          <p className="text-body text-muted max-w-2xl leading-relaxed">
            An interleaved learning environment where theory and practice are woven together.
            Explore lectures, experiment with image processing techniques, and track your progress.
          </p>
        </div>

        {/* Progress overview */}
        {completedItems > 0 && (
          <div className="mb-10 surface-card-sm radius-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <BarChart3 className="w-5 h-5 text-accent" />
                <h2 className="text-subheading">Your Progress</h2>
              </div>
              <span className="text-caption font-medium text-accent">
                {completedItems} / {totalItems} completed
              </span>
            </div>
            <div className="w-full h-2.5 bg-subtle radius-pill overflow-hidden">
              <div
                className="h-full bg-accent radius-pill transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        )}

        {/* Module cards */}
        <div className="grid-standard">
          {CONTENT_NAV.map((section) => {
            const config = TYPE_CONFIG[section.type]
            const Icon = config.icon
            const firstChild = section.children?.[0]
            const sectionProgress = section.children?.map((child) => {
              const prog = Object.keys(progress).filter((k) =>
                k.startsWith(child.slug)
              )
              const completed = prog.filter((k) => progress[k]?.completed).length
              return { total: prog.length, completed }
            }) ?? []
            const completedProg = sectionProgress.reduce((s, p) => s + p.completed, 0)

            return (
              <div
                key={section.id}
                className={`group relative surface-card transition-all hover:shadow-md hover:border-accent`}
              >
                <div className="flex items-start justify-between mb-5">
                  <div className={`w-12 h-12 radius-lg ${config.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={`pill ${config.badge}`}>
                    {section.type === 'lecture' ? `Lecture` : section.type === 'self-study' ? 'Self-Study' : 'Further'}
                  </span>
                </div>

                <h3 className="text-subheading mb-2">
                  {section.label}
                </h3>
                <p className="text-caption text-muted mb-5">
                  {section.subtitle}
                </p>

                <div className="space-y-2 mb-6">
                  {section.children?.map((child) => {
                    const prog = Object.keys(progress).filter((k) =>
                      k.startsWith(child.slug)
                    )
                    const isCompleted = prog.some((k) => progress[k]?.completed)

                    return (
                      <div key={child.id} className="flex items-center gap-2 text-caption">
                        {isCompleted ? (
                          <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                        ) : (
                          <Circle className="w-4 h-4 text-muted opacity-40 shrink-0" />
                        )}
                        <span className={isCompleted ? 'text-muted line-through' : 'text-body'}>
                          {child.label}
                        </span>
                      </div>
                    )
                  })}
                </div>

                {firstChild && (
                  <Link
                    href={`/modules/${firstChild.slug}`}
                    className="inline-flex items-center gap-2 text-caption font-medium text-accent hover:gap-3 transition-all"
                  >
                    <Play className="w-4 h-4" />
                    {completedProg > 0 ? 'Continue' : 'Start Learning'}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            )
          })}
        </div>

        {/* Footer info */}
        <div className="mt-16 pt-8 border-t border-standard text-center">
          <p className="text-caption text-muted">
            Course by Mr. Ayubu Mbaga · Image, Video and Speech Processing
          </p>
        </div>
      </div>
    </div>
  )
}
