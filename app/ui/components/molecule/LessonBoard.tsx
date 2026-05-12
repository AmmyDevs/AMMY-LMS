'use client'

import React, { useState } from 'react'
import { 
  ChevronDown, 
  ChevronRight, 
  Play
} from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export interface TopicItem {
  id?: string
  title: string
  progress: number
}

export interface LessonItem {
  id: string | number
  title: string
  topics: TopicItem[]
  href: string
}

interface LessonBoardProps {
  lessons: LessonItem[]
  className?: string
  onTopicClick?: (topic: TopicItem) => void
}

/**
 * LessonBoard - Using Hardcoded Premium CSS System for absolute reliability
 */
export default function LessonBoard({ 
  lessons, 
  className,
  onTopicClick 
}: LessonBoardProps) {
  const [expandedLessons, setExpandedLessons] = useState<(string | number)[]>(
    lessons.map(l => l.id)
  )

  const toggleLesson = (lessonId: string | number) => {
    setExpandedLessons(prev =>
      prev.includes(lessonId) ? prev.filter(id => id !== lessonId) : [...prev, lessonId]
    )
  }

  return (
    <div className={cn("stack-md", className)}>
      {lessons.map((lesson, lessonIndex) => {
        const isExpanded = expandedLessons.includes(lesson.id)
        
        return (
          <div
            key={lesson.id}
            className={cn(
              "surface-card p-0 overflow-hidden transition-all duration-300",
              isExpanded ? "border-accent shadow-md" : "hover:border-accent/40"
            )}
          >
            {/* Header Section */}
            <div 
              onClick={() => toggleLesson(lesson.id)}
              className={cn(
                "p-6 cursor-pointer row-between transition-colors",
                isExpanded ? "bg-accent color-white" : "hover:bg-hover"
              )}
            >
              <div>
                <h3 className={cn(
                  "text-subheading mb-1",
                  isExpanded ? "color-white" : "color-heading"
                )}>
                  Lesson {lessonIndex + 1}: {lesson.title}
                </h3>
                <div className={cn(
                  "text-label",
                  isExpanded ? "color-white opacity-80" : "color-muted"
                )}>
                  {lesson.topics.length} Topics
                </div>
              </div>
              <div className={cn(
                "w-10 h-10 radius-md centered transition-all",
                isExpanded ? "bg-white/20" : "bg-subtle"
              )}>
                {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
              </div>
            </div>

            {/* Topics Section */}
            {isExpanded && (
              <div className="bg-page">
                {lesson.topics.map((topic, tIndex) => (
                  <div 
                    key={tIndex} 
                    className="p-4 px-8 row-between border-top hover:bg-hover transition-colors group"
                    onClick={() => onTopicClick?.(topic)}
                  >
                    <div className="text-body color-body group-hover:color-heading transition-colors">
                      <span className="color-muted mr-2">Topic {tIndex + 1}:</span>
                      {topic.title}
                    </div>

                    <div>
                      <Link 
                        href={lesson.href} 
                        onClick={(e) => e.stopPropagation()}
                        className="btn-primary btn-sm"
                      >
                        <Play size={14} fill="currentColor" />
                        <span>{topic.progress > 0 ? 'Continue' : 'Start Lesson'}</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}