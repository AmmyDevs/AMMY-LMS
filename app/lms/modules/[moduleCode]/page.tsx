import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getModuleByCode, getLessonsForModule, getLessonContent } from '@/lib/lms'
import LessonBoard, { LessonItem } from '@/app/ui/components/molecule/LessonBoard'
import { LessonContent } from '@/app/lms/types/module'

interface Props {
  params: { moduleCode: string }
}

export default async function ModuleOverviewPage({ params }: Props) {
  const { moduleCode } = params
  
  const moduleInfo = await getModuleByCode(moduleCode)
  if (!moduleInfo) {
    notFound()
  }

  const lessonIds = await getLessonsForModule(moduleCode)
  
  // Transform lesson content into the new LessonItem format
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
          progress: 0, // Mocked for now
          status: 'New'
        }))
      })
    }
  }

  return (
    <div className="min-h-screen bg-[var(--bg-page)]">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Module Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
             <span className="px-3 py-1 bg-[var(--accent-light)] text-[var(--accent)] text-xs font-bold rounded-full uppercase tracking-widest border border-[var(--accent-mid)]">
               {moduleInfo.code}
             </span>
          </div>
          <h1 className="text-4xl font-display font-extrabold text-[var(--text-heading)] mb-3 tracking-tight">
            {moduleInfo.name}
          </h1>
          <p className="text-lg text-[var(--text-body)] max-w-2xl">
            Explore the lectures and course materials for this module. Each lesson contains interactive blocks, quizzes, and practical examples.
          </p>
        </header>

        {/* The Reference-Accurate LessonBoard */}
        <LessonBoard lessons={lessons} />

        {/* Back link */}
        <div className="mt-16 text-center">
          <Link
            href="/lms"
            className="inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors text-sm font-medium"
          >
            <span className="text-lg">←</span>
            Back to Dashboard
          </Link>
        </div>
      </div>
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
