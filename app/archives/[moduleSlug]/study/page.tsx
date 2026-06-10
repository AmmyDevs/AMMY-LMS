import { Suspense } from 'react'
import { StudyNote } from '../../../ui/components/study/StudyNote'
import fs from 'fs'
import path from 'path'

// In a real app, this would be a DB call or fetch
async function getModuleData(slug: string) {
  try {
    const dataPath = path.join(process.cwd(), 'content', slug, 'module-data.json')
    const rawData = fs.readFileSync(dataPath, 'utf8')
    return JSON.parse(rawData)
  } catch (error) {
    console.error(`Failed to load module data for slug: ${slug}`, error)
    return null
  }
}

export default async function StudyPage({
  params,
  searchParams,
}: {
  params: Promise<{ moduleSlug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { moduleSlug } = await params
  const { topic, subtopic } = await searchParams

  const topicId = typeof topic === 'string' ? topic : undefined
  const subtopicId = typeof subtopic === 'string' ? subtopic : undefined

  const data = await getModuleData(moduleSlug)

  if (!data) {
    return (
      <div className="t-card" style={{ padding: '48px', textAlign: 'center' }}>
        <h2 className="t-text-title t-color-muted">Module content coming soon.</h2>
        <p className="t-text-body">The structured study notes for this module are currently being prepared.</p>
      </div>
    )
  }

  return (
    <Suspense fallback={<div className="t-animate-fade-in t-text-muted">Loading study notes...</div>}>
      <div className="t-animate-fade-in">
        <StudyNote 
          topics={data.topics} 
          initialTopicId={topicId} 
          initialSubtopicId={subtopicId} 
        />
      </div>
    </Suspense>
  )
}
