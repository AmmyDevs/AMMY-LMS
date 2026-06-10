'use client'

import { BookOpen, Brain, FileCheck } from 'lucide-react'
import { WelcomeForm } from './WelcomeForm'
import { useEffect, useState } from 'react'

interface HeroProps {
  onLogin: (name: string) => void
}

/**
 * Free Floating Feature Node component
 */
const FloatingNode = ({ icon, title, desc, delay = '0s' }: any) => (
  <div 
    className="t-hero__tag" 
    style={{ 
      position: 'relative', 
      animation: 't-float 6s ease-in-out infinite',
      animationDelay: delay,
      top: 0, left: 0, right: 'auto', bottom: 'auto'
    }}
  >
    <div className="t-hero__tag-icon">
      {icon}
    </div>
    <div style={{ textAlign: 'left' }}>
      <div className="t-hero__tag-title">{title}</div>
      {desc && <div className="t-hero__tag-desc">{desc}</div>}
    </div>
  </div>
)

/**
 * Testing Hero — Clean Free Floating Tags Layout
 */
export function Hero({ onLogin }: HeroProps) {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section id="hero" className="t-hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      
      {/* ── Background Nodes (Free Tags) ── */}
      <div className="t-desktop-only">
        {/* Left Side (2 Nodes) */}
        <div style={{ position: 'absolute', top: '25%', left: '15%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
          <FloatingNode icon={<BookOpen size={18} />} title="Study Notes" desc="Interactive blocks" delay="0s" />
        </div>
        <div style={{ position: 'absolute', top: '75%', left: '20%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
          <FloatingNode icon={<FileCheck size={18} />} title="Quizzes" desc="Test yourself" delay="2s" />
        </div>

        {/* Right Side (1 Node) */}
        <div style={{ position: 'absolute', top: '45%', left: '85%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
          <FloatingNode icon={<Brain size={18} />} title="AI Tutor" desc="Always available" delay="1s" />
        </div>
      </div>

      {/* ── Foreground Content (Centered) ── */}
      <div className="t-container" style={{ position: 'relative', zIndex: 4, width: '100%' }}>
        <div 
          className="t-animate-fade-in" 
          style={{ 
            maxWidth: '640px', 
            margin: '0 auto', 
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          
          <div className="t-hero__eyebrow" style={{ justifyContent: 'center', marginBottom: '24px' }}>
            <span className="t-hero__eyebrow-dot" />
            <span className="t-text-label t-hero__eyebrow-text">
              Computer Engineering — 7 Modules
            </span>
          </div>

          <h1 className="t-hero__headline" style={{ textShadow: '0 4px 24px rgba(0,0,0,0.5)' }}>
            Your Complete{' '}
            <span className="t-text-gradient-white">Learning Archive</span>
          </h1>

          <p className="t-hero__subheadline" style={{ margin: '24px auto', textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}>
            Study notes, summaries, AI tutoring, and quizzes — everything for your
            Computer Engineering modules, connected in one central system.
          </p>

          <div style={{ 
            width: '100%',
            maxWidth: '380px',
            marginBottom: '48px',
            marginTop: '16px'
          }}>
            <WelcomeForm onSubmit={onLogin} />
          </div>

          <div className="t-hero__stats" style={{ justifyContent: 'center', borderTop: 'none', paddingTop: 0 }}>
            <div className="t-hero__stat" style={{ padding: '0 24px' }}>
              <span className="t-hero__stat-value">7</span>
              <span className="t-hero__stat-label">Modules</span>
            </div>
            <div className="t-hero__stat" style={{ padding: '0 24px', borderLeft: '1px solid rgba(255,255,255,0.1)', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
              <span className="t-hero__stat-value">50+</span>
              <span className="t-hero__stat-label">Lessons</span>
            </div>
            <div className="t-hero__stat" style={{ padding: '0 24px' }}>
              <span className="t-hero__stat-value">AI</span>
              <span className="t-hero__stat-label">Powered</span>
            </div>
          </div>

        </div>

        {/* Mobile Fallback: Stack the nodes when below LG breakpoint */}
        <div className="t-mobile-only" style={{ marginTop: '64px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px', marginTop: '16px' }}>
            <FloatingNode icon={<BookOpen size={18} />} title="Study Notes" />
            <FloatingNode icon={<Brain size={18} />} title="AI Tutor" />
            <FloatingNode icon={<FileCheck size={18} />} title="Quizzes" />
          </div>
        </div>

      </div>

    </section>
  )
}
