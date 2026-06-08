'use client'

import { useState, useEffect } from 'react'
import { ThemeToggle } from './ThemeToggle'
import { Button } from './Button'

/**
 * Testing LandingNav — clean isolated navigation bar.
 * Frosted glass on scroll, mobile drawer menu, no dependency on existing components.
 */
export function LandingNav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on escape
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    if (mobileOpen) {
      window.addEventListener('keydown', onKeyDown)
      return () => window.removeEventListener('keydown', onKeyDown)
    }
  }, [mobileOpen])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = '' }
    }
  }, [mobileOpen])

  const scrollTo = (id: string) => {
    setMobileOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <nav className={`t-nav ${scrolled ? 't-nav--scrolled' : 't-nav--transparent'}`}>
        <div className="t-container t-nav__inner">

          {/* Brand */}
          <div className="t-nav__brand">
            <div className="t-nav__brand-mark">AM</div>
            <span className="t-nav__brand-text">
              AMMY <span>Archives</span>
            </span>
          </div>

          {/* Desktop links */}
          <div className="t-nav__links">
            <button className="t-nav__link" onClick={() => scrollTo('features')}>
              Features
            </button>
            <button className="t-nav__link" onClick={() => scrollTo('modules')}>
              Modules
            </button>
            <button className="t-nav__link" onClick={() => scrollTo('how-it-works')}>
              How It Works
            </button>
          </div>

          {/* Actions */}
          <div className="t-nav__actions">
            <ThemeToggle />
            <Button
              variant="primary"
              size="sm"
              className="t-hide-mobile"
              onClick={() => scrollTo('hero')}
            >
              Get Started
            </Button>

            {/* Mobile hamburger */}
            <button
              className="t-nav__mobile-toggle"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile drawer */}
      <div className={`t-mobile-menu ${mobileOpen ? 't-mobile-menu--open' : ''}`}>
        <button className="t-mobile-menu__link" onClick={() => scrollTo('features')}>
          Features
        </button>
        <button className="t-mobile-menu__link" onClick={() => scrollTo('modules')}>
          Modules
        </button>
        <button className="t-mobile-menu__link" onClick={() => scrollTo('how-it-works')}>
          How It Works
        </button>        <div className="t-mobile-menu__actions">
          <ThemeToggle />
          <Button
            variant="primary"
            size="md"
            style={{ width: '100%' }}
            onClick={() => scrollTo('hero')}
          >
            Get Started
          </Button>
        </div>
      </div>
    </>
  )
}
