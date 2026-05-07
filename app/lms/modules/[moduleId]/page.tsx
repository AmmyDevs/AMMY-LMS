'use client'

import { useMemo } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, Calendar, User, BookOpen } from 'lucide-react'
import modulesData from '../../../../docs/module.json'

export default function ModulePage() {
  const params = useParams()
  const slug = Array.isArray(params.slug) ? params.slug : [params.slug || '']
  const moduleCode = slug[0]?.toUpperCase()

  const currentModule = useMemo(() => {
    return modulesData.modules.find(m => m.code.replace(/\s+/g, '') === moduleCode)
  }, [moduleCode])

  if (!currentModule) {
    return (
      <div className="min-h-screen bg-page flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-12 h-12 text-muted mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-text mb-2">Module Not Found</h2>
          <p className="text-muted mb-4">The requested module could not be found.</p>
          <Link
            href="/lms/modules"
            className="inline-flex items-center gap-2 text-brand hover:underline"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Modules
          </Link>
        </div>
      </div>
    )
  }

  // For now, if there are sub-slugs, handle later
  if (slug.length > 1) {
    return <div>Sub-content not implemented yet</div>
  }

  return (
    <div className="min-h-screen bg-page">
      <div className="max-w-4xl mx-auto px-8 py-12">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/modules"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-brand transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Modules
          </Link>
        </div>

        {/* Module Header */}
        <div className="bg-surface rounded-xl border border-border p-8 md:p-10 mb-8">
          <h1 className="text-3xl font-bold text-text mb-4">{currentModule.name}</h1>
          <p className="text-xl text-muted mb-6">{currentModule.code}</p>

          {currentModule.lecturer && (
            <div className="flex items-center gap-2 mb-4">
              <User className="w-5 h-5 text-muted" />
              <span className="text-text">Lecturer: {currentModule.lecturer}</span>
            </div>
          )}

          {currentModule.schedule.length > 0 && (
            <div className="flex items-start gap-2">
              <Calendar className="w-5 h-5 text-muted mt-0.5" />
              <div>
                <p className="text-text font-medium mb-2">Schedule:</p>
                <ul className="space-y-1">
                  {currentModule.schedule.map((session, index) => (
                    <li key={index} className="text-muted">
                      {session.day}: {session.startTime} - {session.endTime} ({session.venue})
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Module Content Placeholder */}
        <div className="bg-surface rounded-xl border border-border p-8 md:p-10">
          <h2 className="text-2xl font-semibold text-text mb-4">Module Content</h2>
          <p className="text-muted">
            Content for this module is being developed. Check back soon!
          </p>
          {/* For Image Processing module, we can add links or content here */}
          {currentModule.code === 'CS 6307' && (
            <div className="mt-6">
              <p className="text-text mb-4">
                This module covers Introduction to Image, Video and Speech Processing.
              </p>
              <p className="text-muted">
                Interactive tools and examples will be available here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}