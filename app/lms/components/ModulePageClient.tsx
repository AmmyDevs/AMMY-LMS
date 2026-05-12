'use client'
import { useState, useEffect, useCallback } from 'react'
import { LessonContent } from '@/app/lms/types/module'
import { useModuleProgress } from '@/app/lms/hooks/useModuleProgress'
import LessonBoard from '@/app/lms/components/LessonBoard'
import BlockRenderer from '@/app/lms/components/BlockRenderer'

interface ModulePageClientProps {
  module: LessonContent
}

export default function ModulePageClient({ module }: ModulePageClientProps) {
  const [activeLessonId, setActiveLessonId] = useState<string>(module.lessons[0]?.id || '')
  const { progress, markVisited, markCompleted, recordQuiz, getLessonStatus } = useModuleProgress(module.moduleId, module.lessons.map(l => l.id))

  // Scroll to lesson function
  const scrollToLesson = useCallback((lessonId: string) => {
    document.getElementById(lessonId)?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  // Handle lesson click from sidebar
  const handleLessonClick = useCallback((lessonId: string) => {
    setActiveLessonId(lessonId)
    scrollToLesson(lessonId)
  }, [scrollToLesson])

  // IntersectionObserver for active lesson tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const lessonId = entry.target.getAttribute('data-lesson')!
            setActiveLessonId(lessonId)
            markVisited(lessonId)
          }
        })
      },
      { threshold: 0.3 }
    )

    // Observe lesson sections
    module.lessons.forEach((lesson) => {
      const element = document.getElementById(lesson.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [module.lessons, markVisited])

  // IntersectionObserver for lesson completion
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const lessonId = entry.target.getAttribute('data-sentinel')!
            markCompleted(lessonId)
          }
        })
      },
      { threshold: 1.0 }
    )

    // Observe sentinel elements
    module.lessons.forEach((lesson) => {
      const element = document.querySelector(`[data-sentinel="${lesson.id}"]`)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [module.lessons, markCompleted])

  // Resume on mount
  useEffect(() => {
    if (progress.lastLessonId) {
      setTimeout(() => scrollToLesson(progress.lastLessonId!), 200)
    }
  }, [progress.lastLessonId, scrollToLesson])

  // Handle quiz answers
  const handleQuizAnswer = useCallback((lessonId: string, blockId: string, correct: boolean) => {
    recordQuiz(lessonId, blockId, correct)
  }, [recordQuiz])

  return (
    <div className="layout-shell h-screen overflow-hidden bg-page">
      <div className="layout-main pt-0"> {/* Override padding-top for full-screen lesson */}
        <aside className="layout-aside border-r border-standard bg-surface overflow-y-auto hidden lg:block" style={{ top: 0, height: '100vh' }}>
          <LessonBoard
            module={module}
            activeLessonId={activeLessonId}
            getLessonStatus={getLessonStatus}
            onLessonClick={handleLessonClick}
          />
        </aside>
        
        <main className="layout-content overflow-y-auto">
          <div className="max-w-3xl mx-auto py-12">
            {/* Header */}
            <header className="mb-12 border-bottom pb-8">
              <h1 className="text-title mb-4">
                {module.title}
              </h1>
              <div className="row gap-row text-fine color-muted">
                <span className="row gap-inline">
                   ⏱️ {module.estimatedMinutes} min
                </span>
                <span className="row gap-inline">
                   👨‍🏫 {module.lecturer}
                </span>
              </div>
            </header>

            {module.lessons.map((lesson) => (
              <section
                key={lesson.id}
                id={lesson.id}
                data-lesson={lesson.id}
                className="mb-16 scroll-mt-10"
              >
                <h2 className="text-heading mb-8 color-heading row gap-item">
                  <span className="color-accent opacity-50">#</span>
                  {lesson.title}
                </h2>
                <div className="stack-md">
                  {lesson.blocks.map((block) => (
                    <BlockRenderer
                      key={block.id}
                      block={block}
                      lessonId={lesson.id}
                      onQuizAnswer={(blockId, correct) => handleQuizAnswer(lesson.id, blockId, correct)}
                    />
                  ))}
                </div>
                <div data-sentinel={lesson.id} className="h-1 mt-8" />
              </section>
            ))}
            
            {/* Footer Navigation */}
            <footer className="mt-20 pt-10 border-top row-between text-fine color-muted">
               <a href={`/lms/modules/${module.course.replace(/\s+/g, '')}`} className="btn-secondary btn-sm">
                 ← Back to Module Overview
               </a>
               <span className="text-label">End of Lesson</span>
            </footer>
          </div>
        </main>
      </div>
    </div>
  )
}