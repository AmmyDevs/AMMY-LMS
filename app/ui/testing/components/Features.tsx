import { BookOpen, Brain, FileCheck, Library, Layers, BarChart3 } from 'lucide-react'

const features = [
  {
    icon: BookOpen,
    title: 'Study Notes',
    description: 'Interactive lesson blocks with code examples, callouts, and definition tables — structured for understanding.',
    tone: 'blue',
  },
  {
    icon: Brain,
    title: 'AI Tutor',
    description: 'Ask questions, get explanations. The AI adapts to your learning style and breaks down complex topics.',
    tone: 'purple',
  },
  {
    icon: FileCheck,
    title: 'Interactive Quizzes',
    description: 'Test your knowledge with embedded quizzes and flashcards. Instant feedback helps you learn faster.',
    tone: 'green',
  },
  {
    icon: Library,
    title: 'Material Archive',
    description: 'Download original PDFs and PowerPoint slides from your lecturers — all organized by module.',
    tone: 'amber',
  },
  {
    icon: Layers,
    title: 'Structured Content',
    description: 'Lessons broken into digestible topics with clear progression. Pick up right where you left off.',
    tone: 'indigo',
  },
  {
    icon: BarChart3,
    title: 'Progress Tracking',
    description: 'Track completion across modules and topics. Your progress saves automatically between sessions.',
    tone: 'rose',
  },
]

/**
 * Testing Features — 3-column bento grid showcasing core capabilities.
 * Clean card design with colored icon backgrounds.
 */
export function Features() {
  return (
    <section id="features" className="t-section t-features">
      <div className="t-container">

        {/* Section header */}
        <div className="t-features__header">
          <span className="t-text-label">Features</span>
          <h2 className="t-text-title">
            Everything you need to{' '}
            <span className="t-text-gradient">master your modules</span>
          </h2>
          <p className="t-text-body t-color-muted">
            Built for how you actually study — not a generic classroom tool.
          </p>
        </div>

        {/* Feature grid */}
        <div className="t-grid-3">
          {features.map((feature) => (
            <div key={feature.title} className="t-feature-card">
              <div className={`t-feature-card__icon t-feature-card__icon--${feature.tone}`}>
                <feature.icon size={22} />
              </div>
              <h3 className="t-feature-card__title">{feature.title}</h3>
              <p className="t-feature-card__desc">{feature.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
