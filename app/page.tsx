'use client'

import { useRouter } from 'next/navigation'
import { LandingNav } from './ui/components/LandingNav'
import { Hero } from './ui/components/Hero'
import { Features } from './ui/components/Features'
import { Modules } from './ui/components/Modules'
import { Footer } from './ui/components/Footer'

/**
 * Main landing page
 */
export default function HomePage() {
  const router = useRouter()

  const handleLogin = (userName: string) => {
    localStorage.setItem('ammy-username', userName)
    router.push('/archives')
  }

  return (
    <div>
      <LandingNav />
      <main id="main-content">
        <Hero onLogin={handleLogin} />
        <Features />
        <Modules />
      </main>
      <Footer />
    </div>
  )
}
