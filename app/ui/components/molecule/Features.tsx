'use client'

import { BookOpen, Brain, FileCheck, Library, Layers, BarChart3 } from 'lucide-react'

const features = [
  {
    icon: BookOpen,
    title: 'Study Notes',
    description: 'Interactive lesson blocks with code examples, callouts, and definition tables — structured for understanding.',
    tone: 'info' as const,
  },
  {
    icon: Brain,
    title: 'AI Tutor',
    description: 'Ask questions, get explanations. The AI adapts to your learning style and breaks down complex topics.',
    tone: 'purple' as const,
  },
  {
    icon: FileCheck,
    title: 'Interactive Quizzes',
    description: 'Test your knowledge with embedded quizzes and flashcards. Instant feedback helps you learn faster.',
    tone: 'success' as const,
  },
  {
    icon: Library,
    title: 'Material Archive',
    description: 'Download original PDFs and PowerPoint slides from your lecturers — all organized by module.',
    tone: 'alert' as const,
  },
  {
    icon: Layers,
    title: 'Structured Content',
    description: 'Lessons broken into digestible topics with clear progression. Pick up right where you left off.',
    tone: 'info' as const,
  },
  {
    icon: BarChart3,
    title: 'Progress Tracking',
    description: 'Track completion across modules and topics. Your progress saves automatically between sessions.',
    tone: 'success' as const,
  },
]

const toneStyles: Record<string, { bg: string; text: string }> = {
  info:    { bg: 'tone-info-bg',    text: 'tone-info-text' },
  purple:  { bg: 'tone-purple-bg',  text: 'tone-purple-text' },
  success: { bg: 'tone-success-bg', text: 'tone-success-text' },
  alert:   { bg: 'tone-alert-bg',   text: 'tone-alert-text' },
}

/**
 * Features section — 3-column grid showcasing core capabilities.
 */
export function Features() {
  return (
    <section id="features" className="page-section bg-surface animate-fade-in-up">
      <div className="page-container">

        {/* Section header */}
        <div className="text-center col gap-item items-center mb-10">
          <span className="text-label">Features</span>
          <h2 className="text-title max-w-[600px]">
            Everything you need to{' '}
            <span className="text-gradient-accent">master your modules</span>
          </h2>
          <p className="text-body color-muted max-w-[500px]">
            Built for how you actually study — not a generic classroom tool.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid-thirds gap-row">
          {features.map((feature) => {
            const tone = toneStyles[feature.tone]
            return (
              <div
                key={feature.title}
                className="surface-card surface-interactive effect-glow col gap-4"
              >
                <div className={`w-12 h-12 radius-md centered ${tone.bg}`}>
                  <feature.icon className={tone.text} size={22} />
                </div>
                <h3 className="text-subheading color-heading">{feature.title}</h3>
                <p className="text-body color-muted leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
