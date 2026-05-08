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
    <div className="flex h-screen overflow-hidden bg-white dark:bg-gray-950">
      <aside className="w-80 border-r border-gray-200 dark:border-gray-800 overflow-y-auto hidden lg:block bg-gray-50/50 dark:bg-gray-900/50">
        <LessonBoard
          module={module}
          activeLessonId={activeLessonId}
          getLessonStatus={getLessonStatus}
          onLessonClick={handleLessonClick}
        />
      </aside>
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-6 py-12">
          {/* Header */}
          <div className="mb-12 border-b border-gray-100 dark:border-gray-800 pb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {module.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1">
                ⏱️ {module.estimatedMinutes} min
              </span>
              <span className="flex items-center gap-1">
                👨‍🏫 {module.lecturer}
              </span>
            </div>
          </div>

          {module.lessons.map((lesson) => (
            <section
              key={lesson.id}
              id={lesson.id}
              data-lesson={lesson.id}
              className="mb-16 scroll-mt-10"
            >
              <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-gray-100 flex items-center gap-3">
                <span className="text-blue-500">#</span>
                {lesson.title}
              </h2>
              <div className="space-y-6">
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
          <footer className="mt-20 pt-10 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center text-sm text-gray-500">
             <a href={`/lms/modules/${module.course.replace(/\s+/g, '')}`} className="hover:text-blue-500 transition-colors flex items-center gap-2">
               ← Back to Module Overview
             </a>
             <span>End of Lesson</span>
          </footer>
        </div>
      </main>
    </div>
  )
}