'use client'
import { useState, useEffect, useCallback } from 'react'
import { ModuleProgress, LessonProgress } from '@/app/lms/types/module'

const STORAGE_KEY = (moduleId: string) => `lms_progress_${moduleId}`

const defaultLessonProgress = (lessonId: string): LessonProgress => ({
  lessonId,
  completed: false,
  quizScores: {},
  visitedAt: null,
})

export function useModuleProgress(moduleId: string, lessonIds: string[]) {
  const [progress, setProgress] = useState<ModuleProgress>({
    moduleId,
    lessons: {},
    lastLessonId: null,
    completedAt: null,
  })

  // Hydrate from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY(moduleId))
    if (stored) {
      setProgress(JSON.parse(stored))
    }
  }, [moduleId])

  // Persist to localStorage on every change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY(moduleId), JSON.stringify(progress))
  }, [moduleId, progress])

  // Mark a lesson as visited (first scroll into view)
  const markVisited = useCallback((lessonId: string) => {
    setProgress(prev => {
      const lesson = prev.lessons[lessonId] ?? defaultLessonProgress(lessonId)
      if (lesson.visitedAt) return prev   // already visited — no state update
      return {
        ...prev,
        lastLessonId: lessonId,
        lessons: {
          ...prev.lessons,
          [lessonId]: { ...lesson, visitedAt: new Date().toISOString() },
        },
      }
    })
  }, [])

  // Mark a lesson as fully completed (scrolled past last block)
  const markCompleted = useCallback((lessonId: string) => {
    setProgress(prev => {
      const lesson = prev.lessons[lessonId] ?? defaultLessonProgress(lessonId)
      const updatedLesson = { ...lesson, completed: true }
      const updatedLessons = { ...prev.lessons, [lessonId]: updatedLesson }

      // Check if all lessons are now complete
      const allDone = lessonIds.every(id => updatedLessons[id]?.completed)

      return {
        ...prev,
        lessons: updatedLessons,
        completedAt: allDone ? new Date().toISOString() : prev.completedAt,
      }
    })
  }, [lessonIds])

  // Record a quiz answer result
  const recordQuiz = useCallback((lessonId: string, blockId: string, correct: boolean) => {
    setProgress(prev => {
      const lesson = prev.lessons[lessonId] ?? defaultLessonProgress(lessonId)
      return {
        ...prev,
        lessons: {
          ...prev.lessons,
          [lessonId]: {
            ...lesson,
            quizScores: { ...lesson.quizScores, [blockId]: correct },
          },
        },
      }
    })
  }, [])

  // Derived helpers
  const getLessonStatus = useCallback((lessonId: string): 'completed' | 'active' | 'locked' => {
    if (progress.lessons[lessonId]?.completed) return 'completed'
    if (progress.lessons[lessonId]?.visitedAt) return 'active'

    // A lesson is locked if the previous one hasn't been visited yet
    const idx = lessonIds.indexOf(lessonId)
    if (idx === 0) return 'active'   // First lesson always unlocked
    const prevId = lessonIds[idx - 1]
    return progress.lessons[prevId]?.visitedAt ? 'active' : 'locked'
  }, [progress, lessonIds])

  return { progress, markVisited, markCompleted, recordQuiz, getLessonStatus }
}