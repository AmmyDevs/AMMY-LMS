'use client'

import { useState } from 'react'
import { BookOpen, Brain, FileCheck, ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '../primitives/Button'

interface HeroProps {
  onLogin: (name: string) => void
}

/**
 * Landing page Hero — premium two-column layout with CTA form
 * and floating feature badges.
 */
export function Hero({ onLogin }: HeroProps) {
  const [name, setName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) onLogin(name.trim())
  }

  return (
    <section id="hero-section" className="page-section overflow-hidden">
      {/* Background mesh */}
      <div className="absolute inset-0 z-0 bg-mesh opacity-60" />

      {/* Decorative gradient orbs */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-accent/8 blur-3xl pointer-events-none" />

      <div className="page-container relative z-10">
        <div className="grid-halves gap-section items-center">

          {/* ── Left Column: Copy + CTA ─────────────── */}
          <div className="stack-hero animate-fade-in-up">

            {/* Eyebrow */}
            <span className="text-label row gap-inline">
              <span className="dot-accent animate-pulse-glow" />
              Computer Engineering — 7 Modules
            </span>

            {/* Headline */}
            <h1 className="text-display-hero max-w-[700px]">
              Your Complete{' '}
              <span className="text-gradient-accent">Learning Archive</span>
            </h1>

            {/* Subheadline */}
            <p className="text-subheading color-muted max-w-[480px] leading-relaxed">
              Study notes, summaries, AI tutoring, and quizzes — everything for your
              Computer Engineering modules, in one place.
            </p>

            {/* CTA Form */}
            <div className="surface-card col gap-4 w-full max-w-[480px]">
              <label className="text-body weight-bold color-heading" htmlFor="hero-name">
                Start your journey
              </label>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full">
                <input
                  id="hero-name"
                  type="text"
                  placeholder="e.g. Amara Osei"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="input-primary flex-1"
                />
                <Button
                  variant="primary"
                  size="md"
                  type="submit"
                  className="w-full sm:w-auto shrink-0 group"
                  endIcon={<ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />}
                >
                  Enter Archives
                </Button>
              </form>
              <p className="text-fine color-muted">No account needed — just enter your name and start learning.</p>
            </div>

            {/* Stats row */}
            <div className="row gap-10 pt-8 border-top">
              <div className="col">
                <span className="text-heading text-gradient-accent">7</span>
                <span className="text-caption color-muted">Modules</span>
              </div>
              <div className="col">
                <span className="text-heading text-gradient-accent">50+</span>
                <span className="text-caption color-muted">Lessons</span>
              </div>
              <div className="col">
                <span className="text-heading text-gradient-accent">AI</span>
                <span className="text-caption color-muted">Powered</span>
              </div>
            </div>
          </div>

          {/* ── Right Column: Visual + Floating Badges ── */}
          <div className="centered relative animate-fade-in-up delay-200 w-full max-w-[560px] mx-auto">
            <div className="relative w-full aspect-[4/3]">

              {/* Gradient backdrop */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/15 via-accent/5 to-transparent radius-xl" />

              {/* Abstract pattern (no external image dependency) */}
              <div className="absolute inset-0 radius-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent/5" />
                {/* Grid pattern overlay */}
                <div
                  className="absolute inset-0 opacity-[0.03]"
                  style={{
                    backgroundImage: `linear-gradient(var(--accent) 1px, transparent 1px), linear-gradient(90deg, var(--accent) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                  }}
                />
                {/* Center accent glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />
              </div>

              {/* Floating badge: Study Notes */}
              <div
                className="bg-glass-premium radius-lg row gap-item absolute animate-float cursor-default z-20"
                style={{ top: '8%', left: '-8%', minWidth: '180px' }}
              >
                <div className="w-10 h-10 radius-md bg-accent/10 centered shrink-0">
                  <BookOpen className="color-accent" size={20} />
                </div>
                <div>
                  <div className="text-body weight-bold color-heading">Study Notes</div>
                  <div className="text-fine color-muted">Interactive blocks</div>
                </div>
              </div>

              {/* Floating badge: AI Tutor */}
              <div
                className="bg-glass-premium radius-lg row gap-item absolute animate-float cursor-default z-20 delay-300"
                style={{ bottom: '12%', right: '-6%', minWidth: '180px' }}
              >
                <div className="w-10 h-10 radius-md bg-accent/10 centered shrink-0">
                  <Brain className="color-accent" size={20} />
                </div>
                <div>
                  <div className="text-body weight-bold color-heading">AI Tutor</div>
                  <div className="text-fine color-muted">Always available</div>
                </div>
              </div>

              {/* Floating badge: Quizzes */}
              <div
                className="bg-glass-premium radius-lg row gap-item absolute animate-float cursor-default z-20 delay-500"
                style={{ top: '50%', right: '-12%', minWidth: '170px' }}
              >
                <div className="w-10 h-10 radius-md bg-accent/10 centered shrink-0">
                  <FileCheck className="color-accent" size={20} />
                </div>
                <div>
                  <div className="text-body weight-bold color-heading">Quizzes</div>
                  <div className="text-fine color-muted">Test yourself</div>
                </div>
              </div>

              {/* Central icon cluster */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="relative">
                  <div className="w-24 h-24 radius-xl bg-accent/10 border border-accent/20 centered animate-pulse-glow">
                    <Sparkles className="color-accent" size={40} />
                  </div>
                  {/* Orbital dots */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-3 h-3 bg-accent rounded-full opacity-60" />
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-2 h-2 bg-accent/40 rounded-full" />
                  <div className="absolute top-1/2 -left-3 -translate-y-1/2 w-2 h-2 bg-accent/50 rounded-full" />
                  <div className="absolute top-1/2 -right-3 -translate-y-1/2 w-3 h-3 bg-accent/30 rounded-full" />
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
