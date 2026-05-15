import { Logo } from '../atomic/Logo'
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
            <span className="text-heading">AMMY LMS</span>
          </div>
          <p className="text-body color-muted max-w-[400px]">
            Empowering learners across Africa with modern tools for interactive, AI-assisted education.
          </p>
        </div>

        {/* Product links */}
        <div className="col gap-6">
          <p className="text-label">Product</p>
          <ul className="stack-md">
            <li><Link href="#" className="text-body color-muted hover:text-accent transition-colors">Study Modules</Link></li>
            <li><Link href="#" className="text-body color-muted hover:text-accent transition-colors">AI Assistant</Link></li>
            <li><Link href="#" className="text-body color-muted hover:text-accent transition-colors">Quizzes</Link></li>
            <li><Link href="#" className="text-body color-muted hover:text-accent transition-colors">Progress Tracking</Link></li>
          </ul>
        </div>

        {/* Company links */}
        <div className="col gap-6">
          <p className="text-label">Company</p>
          <ul className="stack-md">
            <li><Link href="#" className="text-body color-muted hover:text-accent transition-colors">About</Link></li>
            <li><Link href="#" className="text-body color-muted hover:text-accent transition-colors">Contact</Link></li>
            <li><Link href="#" className="text-body color-muted hover:text-accent transition-colors">Privacy Policy</Link></li>
            <li><Link href="#" className="text-body color-muted hover:text-accent transition-colors">Terms of Use</Link></li>
          </ul>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="page-container mt-32 pt-10 border-top">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-8 text-caption color-muted">
          <p>© {year} AMMY LMS. All rights reserved.</p>
          <span className="text-caption bg-glass-premium px-4 py-2 rounded-full shadow-sm">Built with passion for learning ✨</span>
        </div>
      </div>
    </footer>
  )
}
