'use client'

import { ArrowRight } from 'lucide-react'

/**
 * Testing CTA — final conversion banner with deep blue gradient.
 */
export function CTA() {
  const scrollToHero = () => {
    document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="t-section t-cta">
      {/* Background decorations */}
      <div className="t-cta__bg-pattern" />
      <div className="t-cta__bg-orb-1" />
      <div className="t-cta__bg-orb-2" />

      <div className="t-container">
        <div className="t-cta__content t-animate-fade-in">
          <h2 className="t-text-title t-color-white">
            Start your learning journey today
          </h2>
          <p className="t-text-body t-cta__desc">
            No account needed. No complicated setup. Just enter your name and
            start studying smarter.
          </p>
          <button
            className="t-btn t-btn--white t-btn--lg"
            onClick={scrollToHero}
          >
            Get Started — It&apos;s Free
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}
