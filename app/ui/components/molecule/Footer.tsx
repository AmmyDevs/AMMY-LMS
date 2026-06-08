import { Logo } from '../primitives/Logo'
import Link from 'next/link'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="page-section overflow-hidden">
      {/* Subtle top border gradient */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-border to-transparent opacity-50" />

      <div className="page-container grid-fourths gap-row">

        {/* Brand column */}
        <div className="col gap-4 md:col-span-1 lg:col-span-2">
          <div className="row gap-item">
            <Logo variant="icon" size={32} withBackground />
            <span className="text-heading">AMMY Archives</span>
          </div>
          <p className="text-body color-muted max-w-[400px]">
            Your complete learning archive for Computer Engineering.
            Study notes, AI tutoring, quizzes, and materials — all in one place.
          </p>
        </div>

        {/* Platform links */}
        <div className="col gap-6">
          <p className="text-label">Platform</p>
          <ul className="stack-md">
            <li><Link href="/lms/modules" className="text-body color-muted hover:text-accent transition-colors">Study Modules</Link></li>
            <li><Link href="/lms/assistant" className="text-body color-muted hover:text-accent transition-colors">AI Assistant</Link></li>
            <li><Link href="/lms/assessment" className="text-body color-muted hover:text-accent transition-colors">Assessments</Link></li>
            <li><Link href="/admin" className="text-body color-muted hover:text-accent transition-colors">Design System</Link></li>
          </ul>
        </div>

        {/* Resources links */}
        <div className="col gap-6">
          <p className="text-label">Resources</p>
          <ul className="stack-md">
            <li><span className="text-body color-muted">Study Materials</span></li>
            <li><span className="text-body color-muted">Flashcards</span></li>
            <li><span className="text-body color-muted">Progress Reports</span></li>
            <li><span className="text-body color-muted">Help & FAQ</span></li>
          </ul>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="page-container mt-20 pt-8 border-top">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 text-caption color-muted">
          <p>© {year} AMMY Archives. Built for learning.</p>
          <span className="text-fine bg-glass-premium px-4 py-2 radius-pill">
            Made with ✨ for Computer Engineering
          </span>
        </div>
      </div>
    </footer>
  )
}
