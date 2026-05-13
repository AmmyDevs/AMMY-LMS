'use client'

import React from 'react'
import Link from 'next/link'
import { GripVertical, ChevronDown, Box } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/app/ui/components/atomic/card'
import { Button } from '@/app/ui/components/atomic/button'

export interface LessonCardProps {
  id: string | number
  title: string
  topicsCount: number
  progress: number
  status: 'New' | 'In Progress' | 'Completed'
  duration?: string
  href: string
  order?: number
  totalLessons?: number
  className?: string
}

const TopicTag = ({ 
  children, 
  status, 
  className 
}: { 
  children: React.ReactNode, 
  status?: string, 
  className?: string 
}) => {
  const getStatusClasses = (s?: string) => {
    const sl = s?.toLowerCase()
    if (sl === 'completed' || sl === 'published') {
      return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
    }
    if (sl === 'in progress' || sl === 'pending') {
      return 'bg-[var(--primary)]/10 text-[var(--primary)] border-[var(--primary)]/20'
    }
    if (sl === 'new') {
      return 'bg-slate-500/10 text-slate-500 border-slate-500/20'
    }
    return 'bg-[var(--primary)]/10 text-[var(--primary)] border-[var(--primary)]/20'
  }

  return (
    <span className={cn(
      "text-[10px] px-2 py-0.5 rounded-md border uppercase font-bold tracking-wider whitespace-nowrap",
      getStatusClasses(status),
      className
    )}>
      {children}
    </span>
  )
}

export default function LessonCard({
  title,
  topicsCount,
  progress,
  status,
  duration,
  href,
  order,
  totalLessons,
  className
}: LessonCardProps) {
  const isCompleted = progress === 100
  const btnLabel = progress > 0 ? 'Continue' : 'Start'

  return (
    <Card
      className={cn(
        "border-2 border-[var(--border)] shadow-sm transition-all duration-300 overflow-hidden py-0 gap-0",
        "hover:border-[var(--primary)]/50 bg-[var(--surface)]",
        isCompleted && "border-[var(--primary)]/30 shadow-md",
        className
      )}
    >
      <CardContent className="p-0">
        {/* ── HEADER (ref: LessonBoard.tsx lines 93-117) ── */}
        <div className="p-5 sm:p-6 flex items-center justify-between cursor-pointer transition-colors bg-[var(--bg-panel)]/30 hover:bg-[var(--accent-light)]">
          <div className="flex items-center gap-4 min-w-0">
            <GripVertical className="hidden sm:block w-6 h-6 text-[var(--ink-muted)] opacity-30 flex-shrink-0" aria-hidden="true" />
            <div className="min-w-0">
              <h3 className="font-bold text-[var(--ink)] text-lg sm:text-xl leading-tight">
                {order !== undefined && `Lesson ${order}: `}{title}
              </h3>
              <div className="text-sm text-[var(--ink-muted)] flex items-center gap-2 font-medium mt-1">
                <span className="text-[var(--primary)] font-bold">{topicsCount} topics</span>
                {totalLessons !== undefined && order !== undefined && (
                  <>
                    <span className="opacity-30">•</span>
                    <span>Lesson {order}/{totalLessons}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="w-10 h-10 flex items-center justify-center rounded-full border border-[var(--border)] bg-white text-[var(--ink-muted)]">
            <ChevronDown className="w-5 h-5" />
          </div>
        </div>

        {/* ── TOPICS ROWS (ref: LessonBoard.tsx lines 119-165) ── */}
        <div className="bg-white/50">
          {/* Row 1: Description or title */}
          <div className="px-6 sm:pl-16 sm:pr-8 py-5 border-b border-[var(--border)]/20 transition-all group/topic">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="min-w-0 flex-1">
                <h4 className="font-bold text-[var(--ink)] text-base mb-2 transition-colors group-hover/topic:text-[var(--primary)]">
                  {title}
                </h4>
                <div className="flex items-center gap-3">
                  <span className="text-[9px] px-2 py-0.5 rounded bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20 uppercase font-black tracking-widest">
                    LECTURE
                  </span>
                  {duration && (
                    <span className="text-xs text-[var(--ink-muted)] font-semibold">
                      {duration}
                    </span>
                  )}
                  <span className="text-xs text-[var(--ink-muted)] font-semibold">{progress}% done</span>
                </div>
              </div>

              <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 flex-shrink-0">
                <TopicTag status={status.toLowerCase()}>
                  {isCompleted ? 'Completed' : status.toUpperCase()}
                </TopicTag>
                <Link href={href}>
                  <Button
                    variant="default"
                    size="sm"
                    className="bg-emerald-500 hover:bg-emerald-600 text-white font-black px-6 h-9 rounded-xl shadow-lg shadow-emerald-500/20"
                  >
                    <Box className="size-4 mr-2" />
                    {btnLabel}
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Row 2: Topics breakdown */}
          <div className="px-6 sm:pl-16 sm:pr-8 py-5 border-b-0 border-[var(--border)]/20 transition-all group/topic">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="min-w-0 flex-1">
                <h4 className="font-bold text-[var(--ink)] text-base mb-2 transition-colors group-hover/topic:text-[var(--primary)]">
                  Lesson Content Overview
                </h4>
                <div className="flex items-center gap-3">
                  <span className="text-[9px] px-2 py-0.5 rounded bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20 uppercase font-black tracking-widest">
                    {topicsCount} TOPICS
                  </span>
                  <span className="text-xs text-[var(--ink-muted)] font-semibold">
                    {Math.min(progress, 100)}% completed
                  </span>
                </div>
              </div>

              <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 flex-shrink-0">
                <TopicTag status={status.toLowerCase()}>
                  {isCompleted ? 'Completed' : status.toUpperCase()}
                </TopicTag>
                <Link href={href}>
                  <Button
                    variant="default"
                    size="sm"
                    className="bg-emerald-500 hover:bg-emerald-600 text-white font-black px-6 h-9 rounded-xl shadow-lg shadow-emerald-500/20"
                  >
                    <Box className="size-4 mr-2" />
                    View Topics
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
