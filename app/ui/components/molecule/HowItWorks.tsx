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
 * HowItWorks section — 3-step visual walkthrough.
 */
export function HowItWorks() {
  return (
    <section id="how-it-works" className="page-section animate-fade-in-up">
      <div className="page-container">

        {/* Section header */}
        <div className="text-center col gap-item items-center mb-10">
          <span className="text-label">How It Works</span>
          <h2 className="text-title">
            Three steps to{' '}
            <span className="text-gradient-accent">start learning</span>
          </h2>
        </div>

        {/* Steps */}
        <div className="grid-thirds gap-row items-start">
          {steps.map((step, index) => (
            <div key={step.number} className="relative col gap-4 items-center text-center">
              {/* Connector line (hidden on last step and mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] right-[-40%] h-[1px] bg-border z-0" />
              )}

              {/* Step number circle */}
              <div className="relative z-10 w-20 h-20 radius-xl bg-surface border-standard centered mb-2">
                <step.icon className="color-accent" size={32} />
                <span className="absolute -top-2 -right-2 w-7 h-7 radius-pill bg-accent color-white text-fine weight-bold centered">
                  {step.number}
                </span>
              </div>

              <h3 className="text-subheading color-heading">{step.title}</h3>
              <p className="text-body color-muted max-w-[280px] leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
