'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Target, Bot } from 'lucide-react'

interface HeroProps {
  onLogin: (name: string) => void
}

export function Hero({ onLogin }: HeroProps) {
  const [name, setName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) onLogin(name.trim())
  }

  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-grid">

          {/* ── Left Column ─────────────────────────── */}
          <div className="hero-text">

            <span className="hero-eyebrow">
              <span className="hero-eyebrow-dot" />
              Now in early access
            </span>

            <h1 className="hero-title">
              Learn smarter with{' '}
              <span className="hero-title-accent">AMMY LMS</span>
            </h1>

            <p className="hero-subtitle">
              Interactive study notes, AI-powered tutoring, and sharp assessments —
              everything you need to go from confused to confident.
            </p>

            {/* Stats */}
            <div className="hero-stats">
              <div className="hero-stat">
                <span className="hero-stat-num">500+</span>
                <span className="hero-stat-label">Learners</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-num">50+</span>
                <span className="hero-stat-label">Modules</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-num">AI</span>
                <span className="hero-stat-label">Powered</span>
              </div>
            </div>

            {/* Login Form */}
            <div className="hero-form">
              <label className="hero-form-label" htmlFor="hero-name">
                Start your journey
              </label>
              <p className="hero-form-hint">No account needed — just enter your name.</p>
              <div className="form-input-wrapper">
                <input
                  id="hero-name"
                  type="text"
                  placeholder="e.g. Amara Osei"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="form-input"
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e as unknown as React.FormEvent)}
                />
                <button
                  className="btn btn-primary btn-lg w-full"
                  onClick={handleSubmit}
                  type="button"
                >
                  Start Learning →
                </button>
              </div>
            </div>
          </div>

          {/* ── Right Column ────────────────────────── */}
          <div className="hero-illustration">
            <div className="hero-img-wrap">
              <Image
                src="/image/HeroBackground.png"
                alt="Student learning illustration"
                width={800}
                height={600}
                className="hero-image"
              />

              {/* Floating badge 1 */}
              <div className="hero-badge">
                <Target className="hero-badge-icon" size={24} />
                <div>
                  <div className="hero-badge-text">Quiz Streak</div>
                  <div className="hero-badge-sub">7 days in a row</div>
                </div>
              </div>

              {/* Floating badge 2 */}
              <div className="hero-badge hero-badge-2">
                <Bot className="hero-badge-icon" size={24} />
                <div>
                  <div className="hero-badge-text">AI Tutor</div>
                  <div className="hero-badge-sub">Always available</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
