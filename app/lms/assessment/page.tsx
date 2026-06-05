import { FileText } from 'lucide-react'

export default function AssessmentPage() {
  return (
    <div className="animate-fade-up">
      <header className="mb-12">
        <h1 className="text-title mb-2">Assessment</h1>
        <p className="text-body color-muted">
          Track your quiz scores, review past assessments, and test your knowledge.
        </p>
      </header>

      <section className="page-section">
        <div className="surface-card centered col gap-item bg-mesh">
          <div className="w-16 h-16 radius-lg bg-subtle centered border-standard mb-4">
            <FileText className="w-8 h-8 text-accent" />
          </div>
          <p className="text-subheading color-heading mb-1">Coming Soon</p>
          <p className="text-body color-muted">
            Your assessment results and quiz history will appear here once you start completing lessons.
          </p>
        </div>
      </section>
    </div>
  )
}
