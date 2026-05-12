'use client'

import React from 'react'
import { LessonContent } from '@/app/lms/types/module'
import { CheckCircle2, PlayCircle, Lock, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LessonBoardProps {
  module: LessonContent
  activeLessonId: string
  getLessonStatus: (lessonId: string) => 'completed' | 'active' | 'locked'
  onLessonClick: (lessonId: string) => void
}

/**
 * High-end sidebar navigation for lesson content.
 * Aligned with Design System v2.0.
 */
export default function LessonBoard({
  module,
  activeLessonId,
  getLessonStatus,
  onLessonClick
}: LessonBoardProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Module Info Header */}
      <div className="p-6 border-bottom">
        <div className="text-label mb-1">
          {module.course}
        </div>
        <h2 className="text-subheading color-heading leading-tight">
          {module.title}
        </h2>
        <div className="mt-4 flex items-center gap-2 text-fine color-muted">
          <span className="row gap-inline">
            ⏱️ {module.estimatedMinutes} min
          </span>
          <span>•</span>
          <span>{module.lessons.length} Lessons</span>
        </div>
      </div>

      {/* Lesson List */}
      <div className="flex-1 overflow-y-auto py-4">
        {module.lessons.map((lesson, index) => {
          const status = getLessonStatus(lesson.id)
          const isActive = activeLessonId === lesson.id
          
          return (
            <button
              key={lesson.id}
              onClick={() => status !== 'locked' && onLessonClick(lesson.id)}
              disabled={status === 'locked'}
              className={cn(
                "nav-link w-full rounded-none px-6 py-4 border-l-4 border-transparent",
                isActive 
                  ? "bg-white dark:bg-gray-800 border-accent color-heading shadow-sm" 
                  : "color-body hover:bg-hover",
                status === 'locked' && "opacity-40 cursor-not-allowed"
              )}
            >
              {/* Status Icon */}
              <div className="mt-0.5 flex-shrink-0">
                {status === 'completed' ? (
                  <CheckCircle2 size={18} className="color-accent" />
                ) : status === 'active' ? (
                  <PlayCircle size={18} className={isActive ? "color-accent" : "color-muted"} />
                ) : (
                  <Lock size={18} className="color-muted" />
                )}
              </div>

              {/* Lesson Content */}
              <div className="flex-1 min-w-0">
                <div className={cn(
                  "text-label mb-0.5",
                  isActive ? "color-accent" : "color-muted"
                )} style={{ fontSize: '9px' }}>
                  Lesson {index + 1}
                </div>
                <h3 className={cn(
                  "text-body weight-bold leading-snug truncate",
                  isActive ? "color-heading" : "color-body"
                )}>
                  {lesson.title}
                </h3>
              </div>

              {/* Arrow indicator for active/hover */}
              <ChevronRight 
                size={14} 
                className={cn(
                  "transition-all duration-200",
                  isActive ? "color-accent translate-x-0 opacity-100" : "color-muted -translate-x-2 opacity-0"
                )} 
              />
            </button>
          )
        })}
      </div>

      {/* Progress Footer */}
      <div className="p-6 border-top bg-surface">
        <div className="row-between text-fine weight-bold mb-2">
          <span className="text-label">Your Progress</span>
          <span className="color-accent">
            {Math.round((module.lessons.filter(l => getLessonStatus(l.id) === 'completed').length / module.lessons.length) * 100)}%
          </span>
        </div>
        <div className="h-1.5 w-full bg-subtle radius-pill overflow-hidden">
          <div 
            className="h-full bg-accent transition-all duration-500"
            style={{ width: `${(module.lessons.filter(l => getLessonStatus(l.id) === 'completed').length / module.lessons.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}
