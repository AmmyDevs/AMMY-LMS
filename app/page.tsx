'use client'

import { useRouter } from 'next/navigation'
import { NavBar } from '@/app/ui/components/molecule/NavBar'
import { Hero } from './ui/components/molecule/Hero'
import { Features } from './ui/components/molecule/Features'
import { HowItWorks } from './ui/components/molecule/HowItWorks'
import { ModuleShowcase } from './ui/components/molecule/ModuleShowcase'
import { CTABanner } from './ui/components/molecule/CTABanner'
import { Footer } from './ui/components/molecule/Footer'

export default function HomePage() {
  const router = useRouter()

  const handleLogin = (userName: string) => {
    // Store name for personalization, then navigate to dashboard
    localStorage.setItem('ammy-username', userName)
    router.push('/lms')
  }

  return (
    <div className="page-wrapper">
      <NavBar />
      <main id="main-content">
        <Hero onLogin={handleLogin} />
        <Features />
        <HowItWorks />
        <ModuleShowcase />
        <CTABanner />
      </main>
      <Footer />
    </div>
  )
}
