'use client'

import { ArrowRight } from 'lucide-react'
import { Button } from '../primitives/Button'

/**
 * CTABanner — final conversion push with gradient background.
 */
export function CTABanner() {
  const scrollToHero = () => {
    document.getElementById('hero-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="page-section overflow-hidden animate-fade-in-up">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent via-accent-hover to-accent" />

      {/* Decorative pattern */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Glow orbs */}
      <div className="absolute top-[-30%] right-[-10%] w-[500px] h-[500px] rounded-full bg-white/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-5%] w-[300px] h-[300px] rounded-full bg-white/5 blur-3xl pointer-events-none" />

      <div className="page-container relative z-10 text-center">
        <div className="col gap-8 items-center max-w-[600px] mx-auto">
          <h2 className="text-title text-white">
            Start your learning journey today
          </h2>
          <p className="text-body text-white/80 max-w-[440px] leading-relaxed">
            No account needed. No complicated setup. Just enter your name and
            start studying smarter.
          </p>
          <Button
            variant="premium"
            size="lg"
            className="bg-white text-accent hover:bg-white/90 border-none shadow-premium"
            onClick={scrollToHero}
            endIcon={<ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />}
          >
            Get Started — It&apos;s Free
          </Button>
        </div>
      </div>
    </section>
  )
}
