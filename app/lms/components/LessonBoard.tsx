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

export default function LessonBoard({
  module,
  activeLessonId,
  getLessonStatus,
  onLessonClick
}: LessonBoardProps) {
  return (
    <div className="flex flex-col h-full bg-gray-50/50 dark:bg-gray-950/50">
      {/* Module Info Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <div className="text-[10px] font-bold text-teal-500 uppercase tracking-widest mb-1">
          {module.course}
        </div>
        <h2 className="text-xl font-extrabold text-gray-900 dark:text-white leading-tight">
          {module.title}
        </h2>
        <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
          <span className="flex items-center gap-1">
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
                "w-full flex items-start gap-4 px-6 py-4 transition-all duration-200 text-left group relative",
                isActive 
                  ? "bg-white dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800 shadow-sm" 
                  : "hover:bg-gray-100/50 dark:hover:bg-gray-800/30",
                status === 'locked' && "opacity-50 cursor-not-allowed"
              )}
            >
              {/* Active Indicator Bar */}
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-teal-500" />
              )}

              {/* Status Icon */}
              <div className="mt-1 flex-shrink-0">
                {status === 'completed' ? (
                  <CheckCircle2 size={18} className="text-teal-500" />
                ) : status === 'active' ? (
                  <PlayCircle size={18} className={isActive ? "text-teal-500" : "text-gray-400"} />
                ) : (
                  <Lock size={18} className="text-gray-400" />
                )}
              </div>

              {/* Lesson Content */}
              <div className="flex-1 min-w-0">
                <div className={cn(
                  "text-[10px] font-bold uppercase tracking-wider mb-0.5",
                  isActive ? "text-teal-500" : "text-gray-400"
                )}>
                  Lesson {index + 1}
                </div>
                <h3 className={cn(
                  "text-sm font-semibold leading-snug truncate",
                  isActive ? "text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-400"
                )}>
                  {lesson.title}
                </h3>
              </div>

              {/* Arrow indicator for active/hover */}
              <ChevronRight 
                size={14} 
                className={cn(
                  "mt-1.5 transition-all duration-200",
                  isActive ? "text-teal-500 translate-x-0 opacity-100" : "text-gray-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                )} 
              />
            </button>
          )
        })}
      </div>

      {/* Progress Footer */}
      <div className="p-6 border-t border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50">
        <div className="flex items-center justify-between text-xs font-bold mb-2">
          <span className="text-gray-500 uppercase tracking-wider">Your Progress</span>
          <span className="text-teal-500">
            {Math.round((module.lessons.filter(l => getLessonStatus(l.id) === 'completed').length / module.lessons.length) * 100)}%
          </span>
        </div>
        <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-teal-500 transition-all duration-500"
            style={{ width: `${(module.lessons.filter(l => getLessonStatus(l.id) === 'completed').length / module.lessons.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}
