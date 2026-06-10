import { UserCircle, BookOpen, Rocket } from 'lucide-react'

const steps = [
  {
    number: 1,
    icon: UserCircle,
    title: 'Enter Your Name',
    description: 'No signup, no passwords. Just type your name and you\'re in.',
  },
  {
    number: 2,
    icon: BookOpen,
    title: 'Pick a Module',
    description: 'Browse 7 Computer Engineering modules — from Image Processing to Digital Forensics.',
  },
  {
    number: 3,
    icon: Rocket,
    title: 'Start Learning',
    description: 'Interactive notes, quizzes, AI help, and downloadable materials — all at your fingertips.',
  },
]

/**
 * Testing HowItWorks — 3-step visual walkthrough with connector lines.
 */
export function HowItWorks() {
  return (
    <section id="how-it-works" className="t-section">
      <div className="t-container">

        {/* Section header */}
        <div className="t-how-it-works__header">
          <span className="t-text-label">How It Works</span>
          <h2 className="t-text-title">
            Three steps to{' '}
            <span className="t-text-gradient">start learning</span>
          </h2>
        </div>

        {/* Steps */}
        <div className="t-steps">
          {steps.map((step, index) => (
            <div key={step.number} className="t-step">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="t-step__connector" />
              )}

              {/* Step icon */}
              <div className="t-step__number">
                <step.icon size={28} />
                <span className="t-step__badge">{step.number}</span>
              </div>

              <h3 className="t-step__title">{step.title}</h3>
              <p className="t-step__desc">{step.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
