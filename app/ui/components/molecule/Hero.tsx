'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Target, Bot } from 'lucide-react'
import { Button } from '../atomic/button'

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
    <section className="page-section">
      <div className="page-container">
        <div className="grid-halves gap-section">

          {/* ── Left Column ─────────────────────────── */}
          <div className="col gap-block">

            <span className="text-label row gap-inline">
              <span className="dot-accent" /> 
              Now in early access
            </span>

            <h1 className="text-hero">
              Learn smarter with{' '}
              <span className="color-accent">AMMY LMS</span>
            </h1>

            <p className="text-body color-muted">
              Interactive study notes, AI-powered tutoring, and sharp assessments —
              everything you need to go from confused to confident.
            </p>

            {/* Stats */}
            <div className="row gap-row">
              <div className="surface-card col gap-item">
                <span className="text-heading">500+</span>
                <span className="text-caption color-muted">Learners</span>
              </div>
              <div className="surface-card col gap-item">
                <span className="text-heading">50+</span>
                <span className="text-caption color-muted">Modules</span>
              </div>
              <div className="surface-card col gap-item">
                <span className="text-heading">AI</span>
                <span className="text-caption color-muted">Powered</span>
              </div>
            </div>

            {/* Login Form */}
            <div className="col gap-item">
              <label className="text-subheading weight-bold" htmlFor="hero-name">
                Start your journey
              </label>
              <p className="text-fine color-muted">No account needed — just enter your name.</p>
              <div className="form-input-wrapper">
                <input
                  id="hero-name"
                  type="text"
                  placeholder="e.g. Amara Osei"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="input-primary"
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e as unknown as React.FormEvent)}
                />
                <Button
                  variant="default"
                  size="lg"
                  className="w-full"
                  onClick={handleSubmit}
                >
                  Start Learning →
                </Button>
              </div>
            </div>
          </div>

          {/* ── Right Column ────────────────────────── */}
          <div className="centered relative">
            <div className="relative w-full" style={{ maxWidth: '600px' }}>
              <Image
                src="/image/HeroBackground.png"
                alt="Student learning illustration"
                width={800}
                height={600}
                className="radius-xl w-full"
              />

              {/* Floating badge 1 */}
              <div 
                className="surface-card row gap-item absolute shadow-lg" 
                style={{ 
                  top: '10%', 
                  left: '-5%', 
                  minWidth: '180px', 
                  zIndex: 'var(--z-raised)' 
                }}
              >
                <Target className="color-accent" size={24} />
                <div>
                  <div className="text-body">Quiz Streak</div>
                  <div className="text-caption color-muted">7 days in a row</div>
                </div>
              </div>

              {/* Floating badge 2 */}
              <div 
                className="surface-card row gap-item absolute shadow-lg" 
                style={{ 
                  bottom: '15%', 
                  right: '-5%', 
                  minWidth: '180px', 
                  zIndex: 'var(--z-raised)' 
                }}
              >
                <Bot className="color-accent" size={24} />
                <div>
                  <div className="text-body">AI Tutor</div>
                  <div className="text-caption color-muted">Always available</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
