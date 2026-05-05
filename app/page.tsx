'use client'

import { useRouter } from 'next/navigation'
import { Hero } from './ui/components/molecule/Hero'
import { Footer } from './ui/components/molecule/Footer'
import Link from 'next/link'
import Image from 'next/image'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link href="/" className="navbar-brand">
          <Image src="/image/Logo.png" alt="AMMY LMS" width={40} height={40} className="navbar-logo" />
          <span className="navbar-name">
            AMMY <span>LMS</span>
          </span>
        </Link>
        <div className="navbar-actions">
          <button className="btn btn-primary" onClick={() => { const el = document.getElementById('hero-name'); el?.scrollIntoView({behavior: 'smooth'}); el?.focus(); }}>Get Started</button>
        </div>
      </div>
    </nav>
  )
}

export default function HomePage() {
  const router = useRouter()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleLogin = (_userName: string) => {
    // Navigate to dashboard after setting name
    router.push('/dashboard')
  }


  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero onLogin={handleLogin} />
      <Footer />
    </div>
  )
}
