import { Logo } from '../atomic/Logo'
import Link from 'next/link'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="page-footer">
      <div className="page-container grid-auto gap-row">

        {/* Brand column */}
        <div className="col gap-block"> {/* Changed to col gap-block for vertical spacing */}
          <div className="row gap-item">
            <Logo variant="full" size={40} />
            <span className="text-subheading">
              AMMY <span>LMS</span>
            </span>
          </div>
          <p className="text-caption color-muted"> {/* Applied text-caption and color-muted */}
            Empowering learners across Africa with modern tools for interactive, AI-assisted education.
          </p>
        </div>

        {/* Product links */}
        <div className="col gap-block"> {/* Changed to col gap-block */}
          <p className="text-label">Product</p> {/* Applied text-label */}
          <ul className="stack-md"> {/* Used stack-md for vertical spacing */}
            <li><Link href="#" className="text-body">Study Modules</Link></li> {/* Applied text-body */}
            <li><Link href="#" className="text-body">AI Assistant</Link></li>
            <li><Link href="#" className="text-body">Quizzes</Link></li>
            <li><Link href="#" className="text-body">Progress Tracking</Link></li>
          </ul>
        </div>

        {/* Company links */}
        <div className="col gap-block"> {/* Changed to col gap-block */}
          <p className="text-label">Company</p> {/* Applied text-label */}
          <ul className="stack-md"> {/* Used stack-md for vertical spacing */}
            <li><Link href="#" className="text-body">About</Link></li> {/* Applied text-body */}
            <li><Link href="#" className="text-body">Contact</Link></li>
            <li><Link href="#" className="text-body">Privacy Policy</Link></li>
            <li><Link href="#" className="text-body">Terms of Use</Link></li>
          </ul>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="row-between border-top page-container text-caption color-muted" style={{ marginTop: 'var(--gap-section)', paddingTop: 'var(--space-6)', paddingBottom: 'var(--space-6)' }}>
        <p>© {year} AMMY LMS. All rights reserved.</p>
        <span className="text-caption">Built with passion for learning</span> {/* Applied text-caption */}
      </div>
    </footer>
  )
}
