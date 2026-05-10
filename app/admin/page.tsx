'use client'

import React, { useState } from 'react'
import { useLMSStore } from '@/lib/store'
import {
  Sun,
  Moon,
  Type,
  Palette,
  Zap,
  Play,
  CheckCircle2,
  AlertCircle,
  Info,
  XCircle,
  Bell,
  Box,
  Layout as LayoutIcon,
  Maximize2,
  Settings,
  MoreVertical,
  Plus,
} from 'lucide-react'

export default function AdminStyleGallery() {
  const { theme, toggleTheme } = useLMSStore()
  const [showToaster, setShowToaster]   = useState(false)
  const [showPopup,   setShowPopup]     = useState(false)

  const triggerToaster = () => {
    setShowToaster(true)
    setTimeout(() => setShowToaster(false), 3000)
  }

  return (
    <div className="surface-page py-12">
      <div className="container-max">

        {/* ── 1. HEADER ───────────────────────────────────────────── */}
        <header className="flex items-center justify-between mb-16 animate-fade-up">
          <div>
            <h1 className="text-title mb-2">
              Design <span className="text-accent">System</span>
            </h1>
            <p className="text-base text-muted">
              Standardized tokens and utility classes for AMMY LMS.
            </p>
          </div>
          <button onClick={toggleTheme} className="btn-secondary">
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
          </button>
        </header>

        {/* ── 2. TYPOGRAPHY ───────────────────────────────────────── */}
        <section className="mb-20 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center gap-3 mb-8">
            <Type className="text-accent" size={20} />
            <h2 className="text-heading">Typography</h2>
          </div>
          <div className="surface-card p-10 flex flex-col gap-8">

            <div>
              <p className="text-label mb-2">.text-hero — marketing & landing only</p>
              <p className="text-hero">Empower Learning</p>
            </div>

            <div>
              <p className="text-label mb-2">.text-title — page-level titles</p>
              <p className="text-title">Empower Your Learning Journey</p>
            </div>

            <div>
              <p className="text-label mb-2">.text-heading — section headings</p>
              <p className="text-heading">Standardizing the Academic Experience</p>
            </div>

            <div>
              <p className="text-label mb-2">.text-subheading — card & panel titles</p>
              <p className="text-subheading">Course Progress Overview</p>
            </div>

            <div>
              <p className="text-label mb-2">.text-base — body copy (Jost)</p>
              <p className="text-base">
                Interactive study notes, AI-powered tutoring, and sharp assessments —
                everything you need to go from confused to confident. Jost provides a
                clean, modern geometric feel for optimal readability.
              </p>
            </div>

            <div>
              <p className="text-label mb-2">.text-sm — secondary copy</p>
              <p className="text-sm text-muted">
                Last updated 3 hours ago · 42 students enrolled · Module 4 of 9
              </p>
            </div>

          </div>
        </section>

        {/* ── 3. BUTTON SYSTEM ────────────────────────────────────── */}
        <section className="mb-20 animate-fade-up" style={{ animationDelay: '0.15s' }}>
          <div className="flex items-center gap-3 mb-8">
            <Zap className="text-accent" size={20} />
            <h2 className="text-heading">Button System</h2>
          </div>
          <div className="grid-standard">

            <div className="surface-card p-8 flex flex-col gap-6">
              <p className="text-label">1. Primary — text only</p>
              <div className="flex-center h-24 bg-subtle radius-md">
                <button className="btn-primary">Start Learning</button>
              </div>
            </div>

            <div className="surface-card p-8 flex flex-col gap-6">
              <p className="text-label">2. Secondary — icon + text</p>
              <div className="flex-center h-24 bg-subtle radius-md">
                <button className="btn-secondary">
                  <Settings size={18} />
                  <span>Configure Settings</span>
                </button>
              </div>
            </div>

            <div className="surface-card p-8 flex flex-col gap-6">
              <p className="text-label">3. Tertiary — icon ghost</p>
              <div className="flex-center h-24 bg-subtle radius-md gap-4">
                <button className="btn-tertiary" aria-label="More options">
                  <MoreVertical size={20} />
                </button>
                <button className="btn-tertiary" aria-label="Add item">
                  <Plus size={20} />
                </button>
              </div>
            </div>

            <div className="surface-card p-8 flex flex-col gap-6">
              <p className="text-label">4. Tertiary — icon bordered</p>
              <div className="flex-center h-24 bg-subtle radius-md gap-4">
                <button className="btn-tertiary-bordered" aria-label="Play">
                  <Play size={18} fill="currentColor" />
                </button>
                <button className="btn-tertiary-bordered" aria-label="Add">
                  <Plus size={18} />
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* ── 4. BACKGROUNDS ──────────────────────────────────────── */}
        <section className="mb-20 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center gap-3 mb-8">
            <Palette className="text-accent" size={20} />
            <h2 className="text-heading">Background Styles</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="h-40 radius-lg bg-subtle flex-center border-standard">
              <span className="text-label">.bg-subtle</span>
            </div>

            <div className="h-40 radius-lg bg-gradient flex-center"
                 style={{ boxShadow: 'var(--shadow-premium)' }}>
              <span className="text-label text-white">.bg-gradient</span>
            </div>

            <div className="h-40 radius-lg bg-gradient flex-center"
                 style={{ position: 'relative', overflow: 'hidden' }}>
              <div className="bg-glass flex-center radius-lg"
                   style={{ position: 'absolute', inset: '12px' }}>
                <span className="text-label text-white">.bg-glass</span>
              </div>
            </div>

            <div className="h-40 radius-lg bg-mesh flex-center border-subtle">
              <span className="text-label">.bg-mesh</span>
            </div>

          </div>
        </section>

        {/* ── 5. BORDERS & RADIUS ─────────────────────────────────── */}
        <section className="mb-20 animate-fade-up" style={{ animationDelay: '0.25s' }}>
          <div className="flex items-center gap-3 mb-8">
            <Box className="text-accent" size={20} />
            <h2 className="text-heading">Borders & Radius</h2>
          </div>
          <div className="surface-card p-10">

            <p className="text-label mb-6">Border radius scale</p>
            <div className="flex flex-wrap gap-6 items-end mb-10">
              <div className="w-20 h-20 bg-accent flex-center radius-xs text-white text-xs font-bold text-center">XS · 4px</div>
              <div className="w-20 h-20 bg-accent flex-center radius-sm text-white text-xs font-bold text-center">SM · 8px</div>
              <div className="w-20 h-20 bg-accent flex-center radius-md text-white text-xs font-bold text-center">MD · 12px</div>
              <div className="w-20 h-20 bg-accent radius-lg flex-center text-white text-xs font-bold text-center">LG · 16px</div>
              <div className="w-20 h-20 bg-accent radius-xl flex-center text-white text-xs font-bold text-center">XL · 24px</div>
              <div className="w-20 h-20 bg-accent radius-pill flex-center text-white text-xs font-bold text-center">Pill</div>
            </div>

            <p className="text-label mb-6">Border variants</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 border-standard radius-md bg-subtle">
                <p className="text-sm font-bold mb-2">Standard</p>
                <p className="text-xs text-muted">1px · var(--color-border)</p>
              </div>
              <div className="p-6 border-strong radius-md bg-subtle">
                <p className="text-sm font-bold mb-2">Strong</p>
                <p className="text-xs text-muted">2px · var(--color-border-strong)</p>
              </div>
              <div className="p-6 border-accent radius-md bg-subtle">
                <p className="text-sm font-bold mb-2">Accent</p>
                <p className="text-xs text-muted">1px · var(--accent)</p>
              </div>
            </div>

          </div>
        </section>

        {/* ── 6. STATUS TONES ─────────────────────────────────────── */}
        <section className="mb-20 animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center gap-3 mb-8">
            <Palette className="text-accent" size={20} />
            <h2 className="text-heading">Status Tones</h2>
          </div>
          <div className="surface-card p-10 flex flex-wrap gap-6 items-center">
            <div className="pill pill-success">
              <CheckCircle2 size={13} />Completed
            </div>
            <div className="pill pill-danger">
              <XCircle size={13} />Error
            </div>
            <div className="pill pill-alert">
              <AlertCircle size={13} />Action Required
            </div>
            <div className="pill pill-info">
              <Info size={13} />In Progress
            </div>
            <div className="pill pill-purple">
              <LayoutIcon size={13} />Featured
            </div>
          </div>
        </section>

        {/* ── 7. HOVER EFFECTS ────────────────────────────────────── */}
        <section className="mb-20 animate-fade-up" style={{ animationDelay: '0.35s' }}>
          <div className="flex items-center gap-3 mb-8">
            <Zap className="text-accent" size={20} />
            <h2 className="text-heading">Hover Effects</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="surface-card surface-interactive effect-glow p-8">
              <p className="text-subheading mb-2">Glow</p>
              <p className="text-base text-muted">
                Accent ring + soft glow on hover.
              </p>
            </div>

            <div className="surface-card surface-interactive effect-enlarge p-8">
              <p className="text-subheading mb-2">Enlarge</p>
              <p className="text-base text-muted">
                Subtle scale-up for tactile feedback.
              </p>
            </div>

            <div className="surface-card p-8 overflow-hidden relative">
              <div className="absolute inset-0 effect-shimmer pointer-events-none opacity-50" />
              <p className="text-subheading mb-2">Shimmer</p>
              <p className="text-base text-muted">
                Loading skeleton animation, dark-mode safe.
              </p>
            </div>

          </div>
        </section>

        {/* ── 8. OVERLAYS & MESSAGING ─────────────────────────────── */}
        <section className="mb-20 animate-fade-up" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center gap-3 mb-8">
            <Bell className="text-accent" size={20} />
            <h2 className="text-heading">Overlays & Messaging</h2>
          </div>
          <div className="surface-card p-10 flex flex-wrap gap-6">
            <button className="btn-secondary" onClick={triggerToaster}>
              <Bell size={18} />
              <span>Trigger Toaster</span>
            </button>
            <button className="btn-secondary" onClick={() => setShowPopup(true)}>
              <Maximize2 size={18} />
              <span>Open Pop-up</span>
            </button>
          </div>
        </section>

        {/* ── FOOTER ──────────────────────────────────────────────── */}
        <footer className="mt-32 pt-12 border-t text-center">
          <p className="text-sm text-muted">
            AMMY LMS Design System · v2.0
          </p>
        </footer>

      </div>

      {/* ── TOASTER ─────────────────────────────────────────────── */}
      <div className={`toaster ${showToaster ? 'active' : ''}`} role="status" aria-live="polite">
        <CheckCircle2 size={20} style={{ color: 'var(--tone-success-text)', flexShrink: 0 }} />
        <div className="flex flex-col gap-2">
          <span className="text-sm font-bold text-heading-color">Success</span>
          <span className="text-xs text-muted">Theme settings updated successfully.</span>
        </div>
      </div>

      {/* ── POP-UP ──────────────────────────────────────────────── */}
      <div
        className={`overlay ${showPopup ? 'active' : ''}`}
        onClick={() => setShowPopup(false)}
        role="dialog"
        aria-modal="true"
        aria-label="Standard pop-up"
      >
        <div className="pop-up" onClick={e => e.stopPropagation()}>
          <h3 className="text-heading mb-4">Standard Pop-up</h3>
          <p className="text-base text-muted mb-8">
            Backdrop blur, scale entrance, and token-based sizing.
          </p>
          <div className="flex justify-end gap-3">
            <button className="btn-secondary" onClick={() => setShowPopup(false)}>
              Cancel
            </button>
            <button className="btn-primary" onClick={() => setShowPopup(false)}>
              Confirm
            </button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .flex-center { display: flex; align-items: center; justify-content: center; }
        .grid-standard { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; }
      `}</style>

    </div>
  )
}
