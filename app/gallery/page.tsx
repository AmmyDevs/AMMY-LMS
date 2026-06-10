'use client'

import '../ui/components/ui/gallery.css'

import { useState } from 'react'
import {
  BookOpen, Brain,  CheckCircle, Clock,
  Sparkles, GraduationCap, Zap, Target,
  ArrowRight, Download, Star,
} from 'lucide-react'

import { GalleryButton } from '../ui/components/ui/GalleryButton'
import { BaseCard, CourseCard, StatCard } from '../ui/components/ui/GalleryCard'
import { Flashcard } from '../ui/components/ui/Flashcard'
import { OnboardingCarousel, type OnboardingStep } from '../ui/components/ui/OnboardingCarousel'
import { GalleryModal } from '../ui/components/ui/GalleryModal'
import { GalleryDrawer } from '../ui/components/ui/GalleryDrawer'

/* ─────────────────────────────────────────────
   MOCK DATA
   ───────────────────────────────────────────── */

const onboardingSteps: OnboardingStep[] = [
  {
    icon: <BookOpen size={28} />,
    title: 'Explore Modules',
    description: 'Browse through 7 comprehensive computer engineering modules with structured lessons.',
  },
  {
    icon: <Brain size={28} />,
    title: 'AI-Powered Tutoring',
    description: 'Get instant help from our AI tutor that understands your course material.',
  },
  {
    icon: <Target size={28} />,
    title: 'Test Your Knowledge',
    description: 'Interactive quizzes and flashcards to reinforce what you have learned.',
  },
  {
    icon: <Sparkles size={28} />,
    title: 'Track Progress',
    description: 'Visualize your learning journey with detailed progress tracking and analytics.',
  },
]

const flashcards = [
  { front: 'What is the time complexity of binary search?', back: 'O(log n) — it halves the search space with each comparison.' },
  { front: 'What does the "yield" keyword do in Python?', back: 'It pauses the function and returns a value to the caller, creating a generator that can be resumed.' },
  { front: 'What is the difference between TCP and UDP?', back: 'TCP is connection-oriented and reliable; UDP is connectionless and faster but unreliable.' },
]

/* ─────────────────────────────────────────────
   GALLERY PAGE
   ───────────────────────────────────────────── */

export default function GalleryPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <div className="g-gallery">
      <div className="g-gallery__inner">

        {/* ── HERO ── */}
        <div className="g-gallery__hero">
          <h1>Design System Gallery</h1>
          <p>A comprehensive toolkit of premium, interactive components ready to build the 56 Archives learning platform.</p>
        </div>

        {/* ═══════════════════════════════════════
           § 1. BUTTONS
           ═══════════════════════════════════════ */}
        <section className="g-gallery__section">
          <div className="g-gallery__section-header">
            <h2 className="g-gallery__section-title">Buttons</h2>
            <p className="g-gallery__section-desc">Primary, secondary, outline, ghost, danger, and premium variants with loading and disabled states.</p>
          </div>

          {/* Variants */}
          <p className="g-gallery__subheader">Variants</p>
          <div className="g-gallery__row" style={{ marginBottom: 24 }}>
            <GalleryButton variant="primary">Primary</GalleryButton>
            <GalleryButton variant="secondary">Secondary</GalleryButton>
            <GalleryButton variant="outline">Outline</GalleryButton>
            <GalleryButton variant="ghost">Ghost</GalleryButton>
            <GalleryButton variant="danger">Danger</GalleryButton>
            <GalleryButton variant="premium">Premium</GalleryButton>
          </div>

          {/* Sizes */}
          <p className="g-gallery__subheader">Sizes</p>
          <div className="g-gallery__row" style={{ marginBottom: 24 }}>
            <GalleryButton variant="primary" size="sm">Small</GalleryButton>
            <GalleryButton variant="primary" size="md">Default</GalleryButton>
            <GalleryButton variant="primary" size="lg">Large</GalleryButton>
            <GalleryButton variant="primary" size="icon"><Star size={18} /></GalleryButton>
          </div>

          {/* States */}
          <p className="g-gallery__subheader">States</p>
          <div className="g-gallery__row">
            <GalleryButton variant="primary">Default</GalleryButton>
            <GalleryButton variant="primary" loading>Loading</GalleryButton>
            <GalleryButton variant="primary" disabled>Disabled</GalleryButton>
            <GalleryButton variant="secondary" icon={<Download size={16} />}>With Icon</GalleryButton>
            <GalleryButton variant="outline" icon={<ArrowRight size={16} />}>Arrow</GalleryButton>
          </div>
        </section>

        {/* ═══════════════════════════════════════
           § 2. CARDS
           ═══════════════════════════════════════ */}
        <section className="g-gallery__section">
          <div className="g-gallery__section-header">
            <h2 className="g-gallery__section-title">Cards</h2>
            <p className="g-gallery__section-desc">Base, course, and stat cards with glass morphism, hover elevation, and progress tracking.</p>
          </div>

          {/* Course Cards */}
          <p className="g-gallery__subheader">Course Cards</p>
          <div className="g-gallery__grid g-gallery__grid--3" style={{ marginBottom: 32 }}>
            <CourseCard
              title="Data Structures & Algorithms"
              description="Trees, graphs, sorting algorithms, and complexity analysis."
              tags={[
                { label: 'Intermediate', color: '#3b82f6' },
                { label: '12 lessons' },
              ]}
              progress={72}
              meta="CS6307 · Dr. Martinez"
            />
            <CourseCard
              title="Operating Systems"
              description="Process management, memory allocation, file systems, and concurrency."
              tags={[
                { label: 'Advanced', color: '#ef4444' },
                { label: '10 lessons' },
              ]}
              progress={35}
              meta="CS6308 · Dr. Chen"
            />
            <CourseCard
              title="Computer Networks"
              description="TCP/IP, routing protocols, network security, and application layers."
              tags={[
                { label: 'Beginner', color: '#22c55e' },
                { label: '8 lessons' },
              ]}
              progress={0}
              meta="CS6309 · Dr. Patel"
            />
          </div>

          {/* Stat Cards */}
          <p className="g-gallery__subheader">Stat Cards</p>
          <div className="g-gallery__grid g-gallery__grid--4">
            <StatCard
              label="Hours Studied"
              value="142.5"
              change="+12.3% this week"
              changeType="positive"
              icon={<Clock size={22} />}
            />
            <StatCard
              label="Modules Completed"
              value="3 / 7"
              change="+1 this month"
              changeType="positive"
              icon={<CheckCircle size={22} />}
            />
            <StatCard
              label="Quiz Average"
              value="84%"
              change="-2% from last quiz"
              changeType="negative"
              icon={<Target size={22} />}
            />
            <StatCard
              label="AI Tutor Sessions"
              value="28"
              change="5 this week"
              changeType="neutral"
              icon={<Brain size={22} />}
            />
          </div>
        </section>

        {/* ═══════════════════════════════════════
           § 3. FLASHCARDS
           ═══════════════════════════════════════ */}
        <section className="g-gallery__section">
          <div className="g-gallery__section-header">
            <h2 className="g-gallery__section-title">Flashcards</h2>
            <p className="g-gallery__section-desc">Interactive cards with smooth 3D CSS flip animation. Click to reveal the answer.</p>
          </div>
          <div className="g-gallery__grid g-gallery__grid--3">
            {flashcards.map((fc, i) => (
              <Flashcard key={i} front={fc.front} back={fc.back} />
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════
           § 4. ONBOARDING CAROUSEL
           ═══════════════════════════════════════ */}
        <section className="g-gallery__section">
          <div className="g-gallery__section-header">
            <h2 className="g-gallery__section-title">Onboarding Carousel</h2>
            <p className="g-gallery__section-desc">Multi-step carousel with dot indicators, prev/next controls, and responsive slide count.</p>
          </div>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <OnboardingCarousel steps={onboardingSteps} />
          </div>
        </section>

        {/* ═══════════════════════════════════════
           § 5. MODAL / DIALOG
           ═══════════════════════════════════════ */}
        <section className="g-gallery__section">
          <div className="g-gallery__section-header">
            <h2 className="g-gallery__section-title">Modal / Dialog</h2>
            <p className="g-gallery__section-desc">Radix Dialog with backdrop blur, scale animation, and clean layout.</p>
          </div>
          <div className="g-gallery__row">
            <button className="g-modal-trigger" onClick={() => setModalOpen(true)}>
              Open Modal
            </button>
            <GalleryModal open={modalOpen} onOpenChange={setModalOpen} title="Confirm Module Start" description="You are about to begin the Operating Systems module. This module contains 10 lessons and 3 quizzes.">
              <p style={{ color: 'var(--g-text-muted)', fontSize: 14, lineHeight: 1.6 }}>
                Your progress will be tracked automatically. You can pause and resume at any time.
                Estimated completion time is 8-10 hours.
              </p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 8 }}>
                <GalleryButton variant="ghost" size="sm" onClick={() => setModalOpen(false)}>Cancel</GalleryButton>
                <GalleryButton variant="primary" size="sm" onClick={() => setModalOpen(false)}>Start Module</GalleryButton>
              </div>
            </GalleryModal>
          </div>
        </section>

        {/* ═══════════════════════════════════════
           § 6. DRAWER
           ═══════════════════════════════════════ */}
        <section className="g-gallery__section">
          <div className="g-gallery__section-header">
            <h2 className="g-gallery__section-title">Drawer / Side Panel</h2>
            <p className="g-gallery__section-desc">Slide-out panel using Vaul with smooth animation and backdrop.</p>
          </div>
          <div className="g-gallery__row">
            <GalleryDrawer open={drawerOpen} onOpenChange={setDrawerOpen} title="Module Details" description="CS6307 — Data Structures & Algorithms">
              <BaseCard hover={false}>
                <p style={{ fontSize: 14, color: 'var(--g-text-muted)', lineHeight: 1.6 }}>
                  This module covers fundamental data structures including arrays, linked lists, trees, and graphs.
                  You will learn to analyze algorithm complexity and implement efficient solutions.
                </p>
              </BaseCard>
              <BaseCard hover={false}>
                <p style={{ fontSize: 13, color: 'var(--g-text-dim)' }}>
                  12 lessons · 3 quizzes · ~15 hours · Dr. Martinez
                </p>
              </BaseCard>
              <GalleryButton variant="primary" size="sm" style={{ marginTop: 8 }} onClick={() => setDrawerOpen(false)}>
                Start Learning
              </GalleryButton>
            </GalleryDrawer>
            <button
              className="g-drawer-trigger"
              onClick={() => setDrawerOpen(true)}
            >
              Open Drawer
            </button>
          </div>
        </section>

        {/* ═══════════════════════════════════════
           § 7. BASE CARDS SHOWCASE
           ═══════════════════════════════════════ */}
        <section className="g-gallery__section">
          <div className="g-gallery__section-header">
            <h2 className="g-gallery__section-title">Base Cards</h2>
            <p className="g-gallery__section-desc">Glass morphism containers with hover elevation effects.</p>
          </div>
          <div className="g-gallery__grid g-gallery__grid--3">
            <BaseCard>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--g-accent-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--g-accent)' }}>
                  <GraduationCap size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--g-text)' }}>Quick Start</h3>
                  <p style={{ fontSize: 12, color: 'var(--g-text-dim)' }}>Get started in minutes</p>
                </div>
              </div>
              <p style={{ fontSize: 14, color: 'var(--g-text-muted)', lineHeight: 1.5 }}>
                Enter your name, pick a module, and start learning. No account setup required.
              </p>
            </BaseCard>
            <BaseCard>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(167, 139, 250, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--g-purple)' }}>
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--g-text)' }}>AI Assistant</h3>
                  <p style={{ fontSize: 12, color: 'var(--g-text-dim)' }}>Always available</p>
                </div>
              </div>
              <p style={{ fontSize: 14, color: 'var(--g-text-muted)', lineHeight: 1.5 }}>
                Ask questions about any topic and get instant, context-aware explanations.
              </p>
            </BaseCard>
            <BaseCard>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(34, 197, 94, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--g-success)' }}>
                  <Zap size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--g-text)' }}>Instant Access</h3>
                  <p style={{ fontSize: 12, color: 'var(--g-text-dim)' }}>Zero friction</p>
                </div>
              </div>
              <p style={{ fontSize: 14, color: 'var(--g-text-muted)', lineHeight: 1.5 }}>
                All materials are available immediately. Jump between modules freely.
              </p>
            </BaseCard>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <div style={{ textAlign: 'center', padding: '48px 0', borderTop: '1px solid var(--g-border)' }}>
          <p style={{ fontSize: 13, color: 'var(--g-text-dim)' }}>
            56 Archives · Design System Gallery · Built with Next.js 15 + Tailwind v4
          </p>
        </div>
      </div>
    </div>
  )
}
