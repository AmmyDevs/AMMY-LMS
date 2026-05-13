import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  GraduationCap,
  Circle,
  CheckCircle2,
  FlaskConical,
  Telescope,
} from 'lucide-react'
import { useLMSStore } from '@/lib/store'
import { CONTENT_NAV } from '@/lib/mock'

const TYPE_ICONS = {
  lecture: BookOpen,
  'self-study': FlaskConical,
  further: Telescope,
}

const TYPE_COLORS = {
  lecture: 'text-accent',
  'self-study': 'text-accent',
  further: 'text-muted',
}

export function Sidebar() {
  const pathname = usePathname()
  const { username, progress, setCurrentPath } = useLMSStore()
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    'lecture-1': true,
    'lecture-2': true,
    'lecture-3': true,
  })

  const toggleExpand = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const isActive = (slug: string) => {
    return pathname === `/modules/${slug}`
  }

  const getProgressForItem = (slug: string) => {
    const slugProgress = Object.keys(progress).filter((k) =>
      k.startsWith(slug)
    )
    if (slugProgress.length === 0) return null
    const completed = slugProgress.filter((k) => progress[k]?.completed).length
    return { completed, total: slugProgress.length }
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-surface border-r border-standard flex flex-col z-40">
      {/* Header */}
      <div className="px-5 py-5 border-b border-standard">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 radius-md flex items-center justify-center bg-accent-light">
            <GraduationCap className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h1 className="text-subheading font-bold text-heading leading-tight">AMMY LMS</h1>
          </div>
        </Link>
      </div>

      {/* User info */}
      {username && (
        <div className="px-5 py-3 border-b border-standard bg-surface">
          <p className="text-caption text-muted">
            Hello, <span className="font-medium text-body">{username}</span>
          </p>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto scrollbar-thin py-3">

        {CONTENT_NAV.map((section) => {
          const Icon = TYPE_ICONS[section.type]
          const isExpanded = expanded[section.id] ?? false
          const hasChildren = section.children && section.children.length > 0

          return (
            <div key={section.id} className="mb-1">
              <button
                onClick={() => {
                  toggleExpand(section.id)
                  if (hasChildren && section.children!.length === 1) {
                    setCurrentPath([section.id, section.children![0].id])
                  }
                }}
                className={`w-full flex items-center gap-2 px-4 py-2.5 text-caption radius-lg transition-colors ${
                  isExpanded ? 'bg-surface text-body' : 'text-muted hover:text-body hover:bg-surface'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${TYPE_COLORS[section.type]}`} />
                <span className="flex-1 text-left font-medium">
                  {section.label}
                </span>
                {hasChildren && (
                  isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-muted" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-muted" />
                  )
                )}
              </button>

              {isExpanded && hasChildren && (
                <div className="ml-4 mt-0.5 space-y-0.5">
                  {section.children!.map((child) => {
                    const active = isActive(child.slug)
                    const prog = getProgressForItem(child.slug)
                    const isCompleted = prog && prog.completed > 0

                    return (
                      <Link
                        key={child.id}
                        href={`/modules/${child.slug}`}
                        className={`flex items-center gap-2 px-4 py-2 text-caption radius-lg transition-colors ${
                          active
                            ? 'bg-accent-light text-accent font-medium'
                            : 'text-muted hover:text-body hover:bg-surface'
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                        ) : (
                          <Circle className="w-3.5 h-3.5 text-muted opacity-40 shrink-0" />
                        )}
                        <span className="truncate">{child.label}</span>
                        {active && (
                          <div className="ml-auto w-1.5 h-1.5 radius-pill bg-accent" />
                        )}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </nav>
    </aside>
  )
}
