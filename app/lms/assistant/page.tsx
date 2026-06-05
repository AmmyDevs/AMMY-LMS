import { Bot } from 'lucide-react'

export default function AssistantPage() {
  return (
    <div className="animate-fade-up">
      <header className="mb-12">
        <h1 className="text-title mb-2">AI Assistant</h1>
        <p className="text-body color-muted">
          Your intelligent learning companion — ask questions, get explanations, and deepen your understanding.
        </p>
      </header>

      <section className="page-section">
        <div className="surface-card centered col gap-item bg-mesh">
          <div className="w-16 h-16 radius-lg bg-subtle centered border-standard mb-4">
            <Bot className="w-8 h-8 text-accent" />
          </div>
          <p className="text-subheading color-heading mb-1">Coming Soon</p>
          <p className="text-body color-muted">
            The AI Assistant feature is being developed. You'll soon be able to ask questions
            about your course materials and get instant, contextual answers.
          </p>
        </div>
      </section>
    </div>
  )
}
