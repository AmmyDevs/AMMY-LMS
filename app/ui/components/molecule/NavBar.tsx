'use client'
import { ThemeToggle } from './ThemeToggle'
import Link from 'next/link'


/* ─────────────────────────────────────────
   Navbar — fixed, frosted glass
───────────────────────────────────────── */
export function Navbar() {
  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-inner">

        {/* Brand */}
        <Link href="/" className="navbar-brand" aria-label="Msomi Hub home">
          <div className="navbar-logo-mark" aria-hidden="true">M</div>
          <span className="navbar-name">
            Msomi <span>Hub</span>
          </span>
        </Link>

        {/* Actions */}
        <div className="navbar-actions">
          <Link href="#features" className="btn btn-ghost">Features</Link>
          <ThemeToggle />
          <Link href="#get-started" className="btn btn-primary">Get Started</Link>
        </div>

      </div>
    </nav>
  )
}