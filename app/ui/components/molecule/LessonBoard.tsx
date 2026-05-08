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
    <div className={className}>
      {lessons.map((lesson, lessonIndex) => {
        const isExpanded = expandedLessons.includes(lesson.id)
        
        return (
          <div
            key={lesson.id}
            className={cn("premium-card", isExpanded && "active")}
          >
            {/* Header Section */}
            <div 
              onClick={() => toggleLesson(lesson.id)}
              className="premium-header"
            >
              <div>
                <h3 className="premium-title">
                  Lesson {lessonIndex + 1}: {lesson.title}
                </h3>
                <div className="premium-subtitle">
                  {lesson.topics.length} Topics
                </div>
              </div>
              <div className="premium-icon-box">
                {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
              </div>
            </div>

            {/* Topics Section */}
            {isExpanded && (
              <div>
                {lesson.topics.map((topic, tIndex) => (
                  <div 
                    key={tIndex} 
                    className="premium-topic-row"
                    onClick={() => onTopicClick?.(topic)}
                  >
                    <div className="premium-topic-text">
                      Topic {tIndex + 1}: {topic.title}
                    </div>

                    <div>
                      <Link 
                        href={lesson.href} 
                        onClick={(e) => e.stopPropagation()}
                        className="premium-btn"
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