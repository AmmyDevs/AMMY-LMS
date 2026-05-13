'use client'

import { useMemo, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, BookOpen } from 'lucide-react'
import { MarkdownRenderer } from '@/app/ui/components/molecule/MarkdownRenderer'
import { CONTENT_FILES, SLUG_TO_FILE } from '@/lib/mock'

export function ContentPage() {
  const params = useParams()
  const slug = Array.isArray(params.slug) ? params.slug.join('/') : params.slug || ''

  const content = useMemo(() => {
    if (!slug) return null
    const fileKey = SLUG_TO_FILE[slug]
    if (!fileKey) return null
    return CONTENT_FILES[fileKey] ?? null
  }, [slug])

  const pageTitle = useMemo(() => {
    if (!content) return 'Not Found'
    const match = content.match(/^#\s+(.+)$/m)
    return match ? match[1] : 'Untitled'
  }, [content])

  useEffect(() => {
    if (pageTitle && pageTitle !== 'Not Found') {
      document.title = `${pageTitle} · AMMY LMS`
    }
  }, [pageTitle])

  if (!content) {
    return (
      <div className="min-h-screen bg-page flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-12 h-12 text-muted mx-auto mb-4" />
          <h2 className="text-subheading mb-2">Content Not Found</h2>
          <p className="text-caption text-muted mb-4">The requested lecture content could not be loaded.</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-accent hover:underline"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-page">
      <div className="max-w-4xl mx-auto px-8 py-12">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-caption text-muted hover:text-accent transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </div>

        {/* Content */}
        <article className="surface-card p-8 md:p-12">
          <MarkdownRenderer content={content} />
        </article>
      </div>
    </div>
  )
}
