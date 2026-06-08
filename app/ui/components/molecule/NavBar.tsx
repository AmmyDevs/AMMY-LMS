'use client'

import { useState, useEffect } from 'react'
import { Menu } from 'lucide-react'
import ThemeToggle from '@/app/ui/components/primitives/ThemeToggle'
import { Logo } from '@/app/ui/components/primitives/Logo'
import { Button } from '@/app/ui/components/primitives/Button'
import { Sheet, SheetContent, SheetTrigger } from '@/app/ui/components/primitives/Sheet'
import Link from 'next/link'

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Modules', href: '#modules' },
]

/**
 * Landing page NavBar — fixed, frosted glass, with smooth scroll links.
 */
export function NavBar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (href: string) => {
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav
      className={`header-sticky transition-all duration-300 ${
        scrolled ? 'bg-glass border-bottom-subtle shadow-sm' : 'bg-transparent'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="page-container row-between h-full">

        {/* Brand */}
        <Link href="/" className="brand-link row gap-item" aria-label="AMMY Archives home">
          <Logo variant="icon" size={24} withBackground />
          <span className="text-subheading tracking-tight">
            AMMY <span className="color-accent">Archives</span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:row gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-body color-muted hover:color-heading transition-colors cursor-pointer bg-transparent border-none font-medium"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="row gap-3">
          <ThemeToggle size="sm" className="hidden sm:flex" />
          <Button
            variant="primary"
            size="sm"
            className="hidden sm:inline-flex"
            onClick={() => scrollTo('#hero-section')}
          >
            Get Started
          </Button>

          {/* Mobile hamburger */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="btn-ghost btn-icon md:hidden" aria-label="Open menu">
                <Menu size={20} />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 p-0">
              <div className="col h-full">
                {/* Mobile header */}
                <div className="p-6 border-bottom">
                  <Link href="/" className="brand-link row gap-item">
                    <Logo variant="icon" size={28} withBackground />
                    <span className="text-subheading tracking-tight color-heading">
                      AMMY <span className="color-accent">Archives</span>
                    </span>
                  </Link>
                </div>

                {/* Mobile nav links */}
                <nav className="flex-1 p-4">
                  <ul className="nav-list">
                    {navLinks.map((link) => (
                      <li key={link.href}>
                        <button
                          onClick={() => {
                            scrollTo(link.href)
                            // Close sheet by pressing Escape
                            document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
                          }}
                          className="nav-link w-full text-left bg-transparent border-none cursor-pointer"
                        >
                          <span>{link.label}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>

                {/* Mobile actions */}
                <div className="p-4 border-top col gap-3">
                  <ThemeToggle size="sm" />
                  <Button
                    variant="primary"
                    size="md"
                    className="w-full"
                    onClick={() => {
                      scrollTo('#hero-section')
                      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
                    }}
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </nav>
  )
}
