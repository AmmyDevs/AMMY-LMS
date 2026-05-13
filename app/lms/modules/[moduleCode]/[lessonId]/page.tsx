import { notFound } from 'next/navigation'
import { getLessonContent } from '@/lib/lms'
import ModulePageClient from '@/app/lms/components/ModulePageClient'

interface Props {
  params: Promise<{ moduleCode: string; lessonId: string }>
}

export default async function LessonPage({ params }: Props) {
  const { moduleCode, lessonId } = await params
  
  const content = await getLessonContent(moduleCode, lessonId)
  if (!content) {
    notFound()
  }

  return <ModulePageClient module={content} />
}

export async function generateStaticParams() {
  // This could be made more dynamic by scanning all folders, 
  // but for now we list the known ones or let Next.js handle it dynamically
  return [
    { moduleCode: 'CS6307', lessonId: 'L1' },
    { moduleCode: 'CS6307', lessonId: 'L2' },
    { moduleCode: 'CS6307', lessonId: 'L3' },
  ]
}
