import { Link } from 'react-router-dom'
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
import { CONTENT_NAV } from '@/content'

const TYPE_CONFIG = {
  lecture: {
    icon: BookOpen,
    color: 'bg-brand/10 text-brand',
    border: 'border-brand/20',
    badge: 'bg-brand/10 text-brand',
  },
  'self-study': {
    icon: FlaskConical,
    color: 'bg-emerald-500/10 text-emerald-500',
    border: 'border-emerald-500/20',
    badge: 'bg-emerald-500/10 text-emerald-500',
  },
  further: {
    icon: Telescope,
    color: 'bg-amber-500/10 text-amber-500',
    border: 'border-amber-500/20',
    badge: 'bg-amber-500/10 text-amber-500',
  },
}

export function Dashboard() {
  const { username, progress } = useLMSStore()

  const totalItems = CONTENT_NAV.reduce((sum, section) => sum + (section.children?.length ?? 0), 0)
  const completedItems = Object.values(progress).filter((p) => p.completed).length
  const progressPct = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0

  return (
    <div className="min-h-screen bg-page">
      <div className="max-w-6xl mx-auto px-8 py-12">
        {/* Hero */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-brand/10 text-brand text-xs font-semibold uppercase tracking-wider">
              Digital Image Processing
            </span>
          </div>
          <h1 className="text-4xl font-semibold text-text mb-4">
            {username ? `Welcome back, ${username}` : 'Welcome to AMMY LMS'}
          </h1>
          <p className="text-lg text-muted max-w-2xl leading-relaxed">
            An interleaved learning environment where theory and practice are woven together.
            Explore lectures, experiment with image processing techniques, and track your progress.
          </p>
        </div>

        {/* Progress overview */}
        {completedItems > 0 && (
          <div className="mb-10 p-6 rounded-xl border border-border bg-surface">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <BarChart3 className="w-5 h-5 text-brand" />
                <h2 className="text-lg font-semibold text-text">Your Progress</h2>
              </div>
              <span className="text-sm font-medium text-brand">
                {completedItems} / {totalItems} completed
              </span>
            </div>
            <div className="w-full h-2.5 bg-page rounded-full overflow-hidden">
              <div
                className="h-full bg-brand rounded-full transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        )}

        {/* Module cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                className={`group relative rounded-xl border bg-surface p-6 transition-all hover:shadow-md ${config.border}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${config.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${config.badge}`}>
                    {section.type === 'lecture' ? `Lecture` : section.type === 'self-study' ? 'Self-Study' : 'Further'}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-text mb-1">
                  {section.label}
                </h3>
                <p className="text-sm text-muted mb-4">
                  {section.subtitle}
                </p>

                <div className="space-y-2 mb-5">
                  {section.children?.map((child) => {
                    const prog = Object.keys(progress).filter((k) =>
                      k.startsWith(child.slug)
                    )
                    const isCompleted = prog.some((k) => progress[k]?.completed)

                    return (
                      <div key={child.id} className="flex items-center gap-2 text-sm">
                        {isCompleted ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        ) : (
                          <Circle className="w-4 h-4 text-border shrink-0" />
                        )}
                        <span className={isCompleted ? 'text-muted line-through' : 'text-text'}>
                          {child.label}
                        </span>
                      </div>
                    )
                  })}
                </div>

                {firstChild && (
                  <Link
                    to={`/module/image-processing/${firstChild.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-brand hover:gap-3 transition-all"
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
        <div className="mt-16 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted">
            Course by Mr. Ayubu Mbaga · Image, Video and Speech Processing
          </p>
        </div>
      </div>
    </div>
  )
}
