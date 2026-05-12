import Link from 'next/link'
import ThemeToggle from './ThemeToggle'
import { Logo } from './Logo'

/**
 * A polished, high-end TopBar component that aligns with the 
 * Design System v2.0.
 */
export default function TopBar() {
  return (
    <header className="header-sticky bg-glass">
      <div className="page-container row-between">
        {/* Brand Section */}
        <Link href="/" className="brand-link row gap-item">
          <Logo variant="icon" size={32} withBackground />
          <span className="text-subheading tracking-tight color-heading">
            AMMY <span className="color-accent">LMS</span>
          </span>
        </Link>

        {/* Right Actions */}
        <div className="row gap-row">
          <ThemeToggle size="sm" />
          
          {/* User Profile / Account */}
          <div className="row gap-item">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-fine weight-bold color-heading">Ayubu Mbaga</span>
              <span className="text-label" style={{ fontSize: '10px' }}>Instructor</span>
            </div>
            <div className="w-10 h-10 radius-pill border-standard bg-surface centered overflow-hidden">
              <div className="w-full h-full bg-mesh centered text-label color-accent">AM</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
