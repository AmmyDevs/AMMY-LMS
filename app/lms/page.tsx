export default function DashboardPage() {
  return (
    <div className="animate-fade-up">
      <header className="mb-12">
        <h1 className="text-title mb-2">Dashboard</h1>
        <p className="text-body color-muted">Welcome back! Here's an overview of your learning journey.</p>
      </header>

      <section className="page-section">
        <div className="surface-card centered col gap-item bg-mesh">
          <div className="w-16 h-16 radius-lg bg-subtle centered border-standard mb-4">
             <span className="text-heading color-accent">📚</span>
          </div>
          <p className="text-subheading color-heading mb-1">No Recent Activity</p>
          <p className="text-body color-muted">
            Your recently accessed modules and upcoming assessments will appear here.
          </p>
        </div>
      </section>
    </div>
  )
}
