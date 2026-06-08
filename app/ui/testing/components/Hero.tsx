'use client'

import { BookOpen, Brain, FileCheck, Sparkles } from 'lucide-react'
import { WelcomeForm } from './WelcomeForm'

interface HeroProps {
  onLogin: (name: string) => void
}

/**
 * Testing Hero — premium two-column hero section.
 * Dark gradient background, floating tags, clean typography.
 * Zero imports from existing components.
 */
export function Hero({ onLogin }: HeroProps) {
  return (
    <section id="hero" className="t-hero">

      {/* Background decoration */}
      <div className="t-hero__bg" />
      <div className="t-hero__grid" />

      <div className="t-container" style={{ width: '100%', position: 'relative', zIndex: 2 }}>
        <div className="t-hero__content">

          {/* ── Left Column: Copy + CTA ── */}
          <div className="t-hero__left t-animate-fade-in">

            {/* Eyebrow */}
            <div className="t-hero__eyebrow">
              <span className="t-hero__eyebrow-dot" />
              <span className="t-text-label t-hero__eyebrow-text">
                Computer Engineering — 7 Modules
              </span>
            </div>

            {/* Headline */}
            <h1 className="t-hero__headline">
              Your Complete{' '}
              <span className="t-text-gradient-white">Learning Archive</span>
            </h1>

            {/* Subheadline */}
            <p className="t-hero__subheadline">
              Study notes, summaries, AI tutoring, and quizzes — everything for your
              Computer Engineering modules, in one place.
            </p>

            {/* Welcome form */}
            <WelcomeForm onSubmit={onLogin} />

            {/* Stats row */}
            <div className="t-hero__stats">
              <div className="t-hero__stat">
                <span className="t-hero__stat-value">7</span>
                <span className="t-hero__stat-label">Modules</span>
              </div>
              <div className="t-hero__stat">
                <span className="t-hero__stat-value">50+</span>
                <span className="t-hero__stat-label">Lessons</span>
              </div>
              <div className="t-hero__stat">
                <span className="t-hero__stat-value">AI</span>
                <span className="t-hero__stat-label">Powered</span>
              </div>
            </div>

          </div>

          {/* ── Right Column: Visual + Floating Tags ── */}
          <div className="t-hero__right t-animate-fade-in t-animate-fade-in--delay-2">
            <div className="t-hero__visual">

              <div className="t-hero__visual-backdrop" />

              {/* Center icon cluster */}
              <div className="t-hero__visual-center">
                <Sparkles size={48} />
              </div>

              {/* Orbital dots */}
              <div className="t-hero__orb t-hero__orb--1" />
              <div className="t-hero__orb t-hero__orb--2" />
              <div className="t-hero__orb t-hero__orb--3" />
              <div className="t-hero__orb t-hero__orb--4" />

              {/* Floating tag: Study Notes */}
              <div className="t-hero__tag t-hero__tag--1">
                <div className="t-hero__tag-icon">
                  <BookOpen size={18} />
                </div>
                <div>
                  <div className="t-hero__tag-title">Study Notes</div>
                  <div className="t-hero__tag-desc">Interactive blocks</div>
                </div>
              </div>

              {/* Floating tag: AI Tutor */}
              <div className="t-hero__tag t-hero__tag--2">
                <div className="t-hero__tag-icon">
                  <Brain size={18} />
                </div>
                <div>
                  <div className="t-hero__tag-title">AI Tutor</div>
                  <div className="t-hero__tag-desc">Always available</div>
                </div>
              </div>

              {/* Floating tag: Quizzes */}
              <div className="t-hero__tag t-hero__tag--3">
                <div className="t-hero__tag-icon">
                  <FileCheck size={18} />
                </div>
                <div>
                  <div className="t-hero__tag-title">Quizzes</div>
                  <div className="t-hero__tag-desc">Test yourself</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
