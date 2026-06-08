'use client'

import { useRouter } from 'next/navigation'
import { LandingNav } from '../ui/testing/components/LandingNav'
import { Hero } from '../ui/testing/components/Hero'
import { Features } from '../ui/testing/components/Features'
import { HowItWorks } from '../ui/testing/components/HowItWorks'
import { Modules } from '../ui/testing/components/Modules'
import { CTA } from '../ui/testing/components/CTA'
import { Footer } from '../ui/testing/components/Footer'

import '../ui/testing/testing.css'

/**
 * Testing page — completely isolated landing page.
 * Own CSS, own components, zero imports from existing design system.
 * Used to diagnose UI issues by providing a clean baseline.
 */
export default function TestingPage() {
  const router = useRouter()

  const handleLogin = (userName: string) => {
    localStorage.setItem('ammy-username', userName)
    router.push('/lms')
  }

  return (
    <div>
      <LandingNav />
      <main>
        <Hero onLogin={handleLogin} />
        <Features />
        <HowItWorks />
        <Modules />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
