import { useMemo, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ChevronLeft, BookOpen } from 'lucide-react'
import { MarkdownRenderer } from '@/components/MarkdownRenderer'
import { CONTENT_FILES, SLUG_TO_FILE } from '@/content'

export function ContentPage() {
  const { '*': slug } = useParams()

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
          <h2 className="text-xl font-semibold text-text mb-2">Content Not Found</h2>
          <p className="text-muted mb-4">The requested lecture content could not be loaded.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-brand hover:underline"
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
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-brand transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </div>

        {/* Content */}
        <article className="bg-surface rounded-xl border border-border p-8 md:p-10">
          <MarkdownRenderer content={content} />
        </article>
      </div>
    </div>
  )
}
