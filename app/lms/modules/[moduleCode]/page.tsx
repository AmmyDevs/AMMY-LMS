import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getModuleByCode, getLessonsForModule, getLessonContent } from '@/lib/lms'
import LessonBoard, { LessonItem } from '@/app/ui/components/molecule/LessonBoard'
import { LessonListSkeleton } from '@/app/ui/components/system/LoadingSkeleton'
import { ErrorBoundary } from '@/app/ui/components/system/ErrorBoundary'

interface Props {
  params: Promise<{ moduleCode: string }>
}

async function ModuleContent({ moduleCode }: { moduleCode: string }) {
  const moduleInfo = await getModuleByCode(moduleCode)
  if (!moduleInfo) {
    notFound()
  }

  const lessonIds = await getLessonsForModule(moduleCode)

  const lessons: LessonItem[] = []
  for (const id of lessonIds) {
    const content = await getLessonContent(moduleCode, id)
    if (content) {
      lessons.push({
        id: content.moduleId,
        title: content.title,
        href: `/lms/modules/${moduleCode}/${content.moduleId}`,
        topics: content.lessons.map(l => ({
          title: l.title,
          blockCount: l.blocks.length,
          progress: 0,
          status: 'New' as const
        }))
      })
    }
  }

  return (
    <>
      {/* Module Header */}
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="pill pill-info">{moduleInfo.code}</span>
        </div>
        <h1 className="text-title mb-3">
          {moduleInfo.name}
        </h1>
        <p className="text-body color-muted max-w-2xl">
          Explore the lectures and course materials for this module. Each lesson contains interactive blocks, quizzes, and practical examples.
        </p>
      </header>

      {/* LessonBoard */}
      <div className="surface-card p-0 overflow-hidden">
        <LessonBoard lessons={lessons} />
      </div>

      {/* Back link */}
      <div className="mt-16 text-center">
        <Link
          href="/lms/modules"
          className="btn-secondary"
        >
          <ArrowLeft size={18} />
          <span>Back to Modules</span>
        </Link>
      </div>
    </>
  )
}

/**
 * Module Detail Page.
 * Displays lesson board for a specific module.
 */
export default async function ModuleOverviewPage({ params }: Props) {
  const { moduleCode } = await params

  return (
    <div className="animate-fade-up">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="row gap-inline text-fine color-muted">
          <li>
            <Link href="/lms" className="hover:text-accent transition-colors">Dashboard</Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/lms/modules" className="hover:text-accent transition-colors">Modules</Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="color-heading weight-bold" aria-current="page">{moduleCode}</li>
        </ol>
      </nav>

      <ErrorBoundary>
        <Suspense fallback={<LessonListSkeleton />}>
          <ModuleContent moduleCode={moduleCode} />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}

export async function generateStaticParams() {
  return [
    { moduleCode: 'CS6307' },
    { moduleCode: 'ST6323' },
    { moduleCode: 'BM6122' },
    { moduleCode: 'CS6309' },
    { moduleCode: 'CS6310' },
    { moduleCode: 'CS6311' },
  ]
}
