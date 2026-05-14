'use client'
import ThemeToggle from '../atomic/ThemeToggle'
import { Logo } from '../atomic/Logo'
import { Button } from '../atomic/button' // Import the Button component
import Link from 'next/link'


/* ─────────────────────────────────────────
   Navbar — fixed, frosted glass
───────────────────────────────────────── */
export function Navbar() {
  return (
    <nav className="header-sticky bg-glass border-bottom-subtle" role="navigation">
      <div className="page-container row-between h-full">

        {/* Brand */}
        <Link href="/" className="brand-link row gap-item effect-enlarge" aria-label="AMMY LMS home">
          <Logo variant="icon" size={24} withBackground />
          <span className="text-subheading">
            AMMY <span className="color-accent">LMS</span>
          </span>
        </Link>

        {/* Actions */}
        <div className="row gap-block">
          <ThemeToggle size="lg" />
          <Button variant="default" size="lg">Get Started</Button>
        </div>

      </div>
    </nav>
  )
}