'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Target, Bot, Sparkles } from 'lucide-react'
import { Button } from '../atomic/button'
import { HoverCard, HoverCardTrigger, HoverCardContent } from '../atomic/hover-card'

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
    <section className="page-section overflow-hidden">
      {/* Background Mesh */}
      <div className="absolute inset-0 z-0 bg-mesh opacity-50" />
      
      <div className="page-container relative z-10">
        <div className="grid-halves gap-section items-center">

          {/* ── Left Column ─────────────────────────── */}
          <div className="stack-hero animate-fade-in-up">

            <span className="text-label row gap-inline">
              <span className="dot-accent animate-pulse-glow" /> 
              Now in early access
            </span>

            <h1 className="text-display-hero max-w-[800px]">
              Learn smarter with <br/>
              <span className="text-gradient-accent">AMMY LMS</span>
            </h1>

            <p className="text-subheading color-muted max-w-[540px]">
              Interactive study notes, AI-powered tutoring, and sharp assessments —
              everything you need to go from confused to confident.
            </p>

            {/* Login Form */}
            <div className="surface-card-sm col gap-item w-full max-w-[500px]">
              <label className="text-body weight-bold" htmlFor="hero-name">
                Start your journey
              </label>
              <div className="flex flex-col sm:flex-row gap-2 w-full">
                <input
                  id="hero-name"
                  type="text"
                  placeholder="e.g. Amara Osei"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="input-primary flex-1"
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e as unknown as React.FormEvent)}
                />
                <Button
                  variant="premium"
                  size="md"
                  className="w-full sm:w-auto shrink-0 group"
                  onClick={handleSubmit}
                  endIcon={<Sparkles className="ml-2 size-4 group-hover:text-accent transition-colors" />}
                >
                  Start Learning
                </Button>
              </div>
              <p className="text-fine color-muted">No account needed — just enter your name.</p>
            </div>

            {/* Stats Row */}
            <div className="row gap-8 pt-8 border-top">
              <div className="col">
                <span className="text-heading text-gradient-accent">500+</span>
                <span className="text-caption color-muted">Learners</span>
              </div>
              <div className="col">
                <span className="text-heading text-gradient-accent">50+</span>
                <span className="text-caption color-muted">Modules</span>
              </div>
              <div className="col">
                <span className="text-heading text-gradient-accent">AI</span>
                <span className="text-caption color-muted">Powered</span>
              </div>
            </div>
          </div>

          {/* ── Right Column ────────────────────────── */}
          <div className="centered relative delay-200 animate-fade-in-up w-full max-w-[600px] mx-auto">
            <div className="relative w-full aspect-[4/3]">
              <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent radius-xl animate-pulse-glow" />
              <Image
                src="/image/HeroBackground.png"
                alt="Student learning illustration"
                fill
                className="radius-xl object-cover shadow-premium z-10"
              />

              {/* Floating badge 1: Interactive with HoverCard */}
              <HoverCard>
                <HoverCardTrigger asChild>
                  <div 
                    className="bg-glass-premium radius-lg row gap-item absolute animate-float cursor-pointer z-20 shadow-lg" 
                    style={{ 
                      top: '10%', 
                      left: '-5%', 
                      minWidth: '180px', 
                    }}
                  >
                    <Target className="color-accent" size={24} />
                    <div>
                      <div className="text-body weight-bold">Quiz Streak</div>
                      <div className="text-caption color-muted">7 days in a row</div>
                    </div>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent side="top" align="start">
                  <div className="col gap-item">
                    <div className="row gap-inline"><Target className="color-accent" size={16}/> <span className="weight-bold">Consistent Effort!</span></div>
                    <p className="text-caption">You're in the top 5% of active learners this week. Keep up the streak to unlock the "Focus Master" badge.</p>
                  </div>
                </HoverCardContent>
              </HoverCard>

              {/* Floating badge 2: Interactive with HoverCard */}
              <HoverCard>
                <HoverCardTrigger asChild>
                  <div 
                    className="bg-glass-premium radius-lg row gap-item absolute animate-float cursor-pointer z-20 delay-500 shadow-lg" 
                    style={{ 
                      bottom: '15%', 
                      right: '-5%', 
                      minWidth: '180px', 
                    }}
                  >
                    <Bot className="color-accent" size={24} />
                    <div>
                      <div className="text-body weight-bold">AI Tutor</div>
                      <div className="text-caption color-muted">Always available</div>
                    </div>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent side="bottom" align="end">
                  <div className="col gap-item">
                    <div className="row gap-inline"><Bot className="color-accent" size={16}/> <span className="weight-bold">Personalized Help</span></div>
                    <p className="text-caption">The AI tutor analyzes your learning style and adapts explanations in real-time for maximum comprehension.</p>
                  </div>
                </HoverCardContent>
              </HoverCard>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
