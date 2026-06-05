'use client'
import ThemeToggle from '@/app/ui/components/atomic/ThemeToggle'
import { Logo } from '@/app/ui/components/atomic/Logo'
import { Button } from '@/app/ui/components/atomic/button' // Import the Button component
import Link from 'next/link'


/* ─────────────────────────────────────────
   Navbar — fixed, frosted glass
───────────────────────────────────────── */
export function NavBar() {
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
        <div className="row gap-4">
          <ThemeToggle className="theme-toggle-md" />
          <Button variant="default" size="lg" onClick={() => {
              const heroSection = document.getElementById('hero-section')
              heroSection?.scrollIntoView({ behavior: 'smooth' })
            }}>Get Started</Button>
        </div>

      </div>
    </nav>
  )
}