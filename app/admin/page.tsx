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
  Plus,
  MousePointer2,
} from 'lucide-react'

/**
 * Admin Style Gallery
 * A living design reference for AMMY LMS Design System v2.0.
 * Uses only semantic classes defined in global.css.
 */
export default function AdminStyleGallery() {
  const { theme, toggleTheme } = useLMSStore()
  const [showToaster, setShowToaster]   = useState(false)
  const [showPopup,   setShowPopup]     = useState(false)

  const triggerToaster = () => {
    setShowToaster(true)
    setTimeout(() => setShowToaster(false), 3000)
  }

  return (
    <div className="bg-page py-12 min-h-screen">
      <div className="page-container">

        {/* ── 1. HEADER ───────────────────────────────────────────── */}
        <header className="row-between mb-16 animate-fade-up">
          <div>
            <h1 className="text-title mb-2">
              Design <span className="text-accent">System</span>
            </h1>
            <p className="text-body text-muted">
              Standardized tokens and utility classes for AMMY LMS.
            </p>
          </div>
          <button onClick={toggleTheme} className="btn-secondary">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </header>

        {/* ── 2. TYPOGRAPHY ───────────────────────────────────────── */}
        <section className="mb-20 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center gap-3 mb-8">
            <Type className="text-accent" size={20} />
            <h2 className="text-heading">Typography</h2>
          </div>
          <div className="surface-card col gap-block">

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
              <p className="text-label mb-2">.text-body — standard body copy</p>
              <p className="text-body">
                Interactive study notes, AI-powered tutoring, and sharp assessments —
                everything you need to go from confused to confident. Jost provides a
                clean, modern geometric feel for optimal readability.
              </p>
            </div>

            <div>
              <p className="text-label mb-2">.text-caption — secondary copy</p>
              <p className="text-caption text-muted">
                Last updated 3 hours ago · 42 students enrolled · Module 4 of 9
              </p>
            </div>

            <div>
              <p className="text-label mb-2">.text-fine — timestamps & metadata</p>
              <p className="text-fine text-muted">
                Submitted 2 min ago · v1.4.2 · 12 KB
              </p>
            </div>

            <div>
              <p className="text-label mb-2">.text-label — category / eyebrow</p>
              <p className="text-label">Module Overview</p>
            </div>

          </div>
        </section>

        {/* ── 3. BUTTON SYSTEM ────────────────────────────────────── */}
        <section className="mb-20 animate-fade-up" style={{ animationDelay: '0.15s' }}>
          <div className="flex items-center gap-3 mb-8">
            <Zap className="text-accent" size={20} />
            <h2 className="text-heading">Button System</h2>
          </div>

          {/* Variants */}
          <div className="grid-standard mb-8">

            <div className="surface-card col gap-item">
              <p className="text-label">btn-primary</p>
              <div className="flex-center bg-subtle radius-md" style={{ height: '6rem' }}>
                <button className="btn-primary">Start Learning</button>
              </div>
            </div>

            <div className="surface-card col gap-item">
              <p className="text-label">btn-secondary</p>
              <div className="flex-center bg-subtle radius-md" style={{ height: '6rem' }}>
                <button className="btn-secondary">
                  <Settings size={18} />
                  <span>Settings</span>
                </button>
              </div>
            </div>

            <div className="surface-card col gap-item">
              <p className="text-label">btn-outline</p>
              <div className="flex-center bg-subtle radius-md" style={{ height: '6rem' }}>
                <button className="btn-outline">Outline Action</button>
              </div>
            </div>

            <div className="surface-card col gap-item">
              <p className="text-label">btn-ghost</p>
              <div className="flex-center bg-subtle radius-md" style={{ height: '6rem' }}>
                <button className="btn-ghost">Ghost Action</button>
              </div>
            </div>

            <div className="surface-card col gap-item">
              <p className="text-label">btn-tertiary</p>
              <div className="flex-center bg-subtle radius-md" style={{ height: '6rem' }}>
                <button className="btn-tertiary">
                  <Plus size={18} />
                  <span>Add Item</span>
                </button>
              </div>
            </div>

            <div className="surface-card col gap-item">
              <p className="text-label">btn-tertiary-bordered</p>
              <div className="flex-center bg-subtle radius-md" style={{ height: '6rem' }}>
                <button className="btn-tertiary-bordered">
                  <Play size={18} fill="currentColor" />
                  <span>Play</span>
                </button>
              </div>
            </div>

            <div className="surface-card col gap-item">
              <p className="text-label">btn-premium</p>
              <div className="flex-center bg-subtle radius-md" style={{ height: '6rem' }}>
                <button className="btn-premium">Upgrade Plan</button>
              </div>
            </div>

          </div>

          {/* Sizes */}
          <div className="surface-card col gap-item">
            <p className="text-label">Sizes</p>
            <div className="flex-center bg-subtle radius-md gap-row flex-wrap" style={{ minHeight: '6rem', padding: '1.5rem' }}>
              <div className="col items-center gap-item">
                <button className="btn-primary btn-sm">Small</button>
                <span className="text-fine text-muted">btn-sm</span>
              </div>
              <div className="col items-center gap-item">
                <button className="btn-primary btn-md">Medium</button>
                <span className="text-fine text-muted">btn-md</span>
              </div>
              <div className="col items-center gap-item">
                <button className="btn-primary btn-lg">Large</button>
                <span className="text-fine text-muted">btn-lg</span>
              </div>
              <div className="col items-center gap-item">
                <button className="btn-primary btn-icon" aria-label="Settings icon">
                  <Settings size={18} />
                </button>
                <span className="text-fine text-muted">btn-icon</span>
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
          <div className="grid-auto">

            <div className="h-40 radius-lg bg-page flex-center border-standard">
              <span className="text-label">.bg-page</span>
            </div>

            <div className="h-40 radius-lg bg-surface flex-center border-standard">
              <span className="text-label">.bg-surface</span>
            </div>

            <div className="h-40 radius-lg bg-subtle flex-center border-standard">
              <span className="text-label">.bg-subtle</span>
            </div>

            <div className="h-40 radius-lg bg-accent flex-center">
              <span className="text-label text-white">.bg-accent</span>
            </div>

            <div className="h-40 radius-lg bg-gradient flex-center shadow-premium">
              <span className="text-label text-white">.bg-gradient</span>
            </div>

            <div className="h-40 radius-lg bg-gradient flex-center relative clip">
              <div className="bg-glass flex-center radius-lg absolute inset-[12px]">
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
          <div className="surface-card col gap-block">

            {/* Radius scale */}
            <div>
              <p className="text-label mb-6">Border radius scale</p>
              <div className="row-wrap gap-row">

                <div className="col gap-item items-center">
                  <div className="w-24 h-24 bg-accent flex-center radius-xs text-white text-fine weight-bold">
                    4px
                  </div>
                  <p className="text-fine text-muted">.radius-xs</p>
                </div>

                <div className="col gap-item items-center">
                  <div className="w-24 h-24 bg-accent flex-center radius-sm text-white text-fine weight-bold">
                    8px
                  </div>
                  <p className="text-fine text-muted">.radius-sm</p>
                </div>

                <div className="col gap-item items-center">
                  <div className="w-24 h-24 bg-accent flex-center radius-md text-white text-fine weight-bold">
                    12px
                  </div>
                  <p className="text-fine text-muted">.radius-md</p>
                </div>

                <div className="col gap-item items-center">
                  <div className="w-24 h-24 bg-accent flex-center radius-lg text-white text-fine weight-bold">
                    16px
                  </div>
                  <p className="text-fine text-muted">.radius-lg</p>
                </div>

                <div className="col gap-item items-center">
                  <div className="w-24 h-24 bg-accent flex-center radius-xl text-white text-fine weight-bold">
                    24px
                  </div>
                  <p className="text-fine text-muted">.radius-xl</p>
                </div>

                <div className="col gap-item items-center">
                  <div className="w-40 h-12 bg-accent flex-center radius-pill text-white text-fine weight-bold">
                    9999px
                  </div>
                  <p className="text-fine text-muted">.radius-pill</p>
                </div>

              </div>
            </div>

            {/* Border variants */}
            <div>
              <p className="text-label mb-6">Border variants</p>
              <div className="grid-thirds">

                <div className="p-6 border-standard radius-md bg-subtle">
                  <p className="text-caption weight-bold mb-1">.border-standard</p>
                  <p className="text-fine text-muted">1px · var(--color-border)</p>
                </div>

                <div className="p-6 border-subtle radius-md bg-subtle">
                  <p className="text-caption weight-bold mb-1">.border-subtle</p>
                  <p className="text-fine text-muted">1px · var(--color-border-subtle)</p>
                </div>

                <div className="p-6 border-strong radius-md bg-subtle">
                  <p className="text-caption weight-bold mb-1">.border-strong</p>
                  <p className="text-fine text-muted">2px · var(--color-border-strong)</p>
                </div>

                <div className="p-6 border-accent radius-md bg-subtle">
                  <p className="text-caption weight-bold mb-1">.border-accent</p>
                  <p className="text-fine text-muted">1px · var(--accent)</p>
                </div>

                <div className="p-6 border-top bg-subtle radius-md">
                  <p className="text-caption weight-bold mb-1">.border-top</p>
                  <p className="text-fine text-muted">1px top · var(--color-border)</p>
                </div>

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
          <div className="surface-card row-wrap gap-row">
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
          <div className="grid-thirds">

            <div className="surface-card surface-interactive effect-glow">
              <p className="text-label mb-2">effect-glow</p>
              <p className="text-subheading mb-2">Glow</p>
              <p className="text-body text-muted">
                Accent ring + soft glow on hover.
              </p>
            </div>

            <div className="surface-card surface-interactive effect-enlarge">
              <p className="text-label mb-2">effect-enlarge</p>
              <p className="text-subheading mb-2">Enlarge</p>
              <p className="text-body text-muted">
                Subtle scale-up for tactile feedback.
              </p>
            </div>

            <div className="surface-card surface-interactive effect-shimmer">
              <p className="text-label mb-2">effect-shimmer</p>
              <p className="text-subheading mb-2">Shimmer</p>
              <p className="text-body text-muted">
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
          <div className="surface-card row-wrap gap-row">
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

        {/* ── 9. FORM INPUTS ──────────────────────────────────────── */}
        <section className="mb-20 animate-fade-up" style={{ animationDelay: '0.45s' }}>
          <div className="flex items-center gap-3 mb-8">
            <MousePointer2 className="text-accent" size={20} />
            <h2 className="text-heading">Form Inputs</h2>
          </div>
          <div className="surface-card col gap-block max-w-xl">
            <div>
              <p className="text-label mb-2">Default — .input-primary</p>
              <input type="text" className="input-primary" defaultValue="Ayubu Mbaga" />
            </div>
            <div>
              <p className="text-label mb-2">Placeholder state</p>
              <input type="text" className="input-primary" placeholder="Enter your name..." />
            </div>
            <div>
              <p className="text-label mb-2">Focused state — click to activate (:focus CSS)</p>
              <input type="text" className="input-primary" placeholder="Click to see focus ring..." />
            </div>
          </div>
        </section>

        {/* ── FOOTER ──────────────────────────────────────────────── */}
        <footer className="mt-32 pt-12 border-t border-standard text-center">
          <p className="text-caption text-muted">
            AMMY LMS Design System · v2.0
          </p>
        </footer>

      </div>

      {/* ── TOASTER ─────────────────────────────────────────────── */}
      <div className={`toaster ${showToaster ? 'active' : ''}`} role="status" aria-live="polite">
        <CheckCircle2 size={20} className="text-accent shrink-0" />
        <div className="col gap-1">
          <span className="text-caption weight-bold color-heading">Success</span>
          <span className="text-fine text-muted">Theme settings updated successfully.</span>
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
          <p className="text-body text-muted mb-8">
            Backdrop blur, scale entrance, and token-based sizing.
          </p>
          <div className="row-end gap-item">
            <button className="btn-ghost" onClick={() => setShowPopup(false)}>
              Cancel
            </button>
            <button className="btn-primary" onClick={() => setShowPopup(false)}>
              Confirm
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}
