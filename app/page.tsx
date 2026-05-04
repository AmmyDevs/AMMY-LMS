'use client'

import { useState } from 'react'
import { Hero } from './ui/components/molecule/Hero'
import { Footer } from './ui/components/molecule/Footer'
import Link from 'next/link'
import Image from 'next/image'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link href="/" className="navbar-brand">
          <Image src="/image/Logo.png" alt="Msomi Hub" width={40} height={40} className="navbar-logo" />
          <span className="navbar-name">
            Msomi <span>Hub</span>
          </span>
        </Link>
        <div className="navbar-actions">
          <Link href="#get-started" className="btn btn-primary">Get Started</Link>
        </div>
      </div>
    </nav>
  )
}

export default function HomePage() {
  const [name, setName] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleLogin = (userName: string) => {
    setName(userName)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="welcome-section">
        <div className="welcome-card">
          <span className="welcome-emoji">🎉</span>
          <h1 className="welcome-title">
            Welcome, <span>{name}</span>!
          </h1>
          <p className="welcome-subtitle">
            Your learning journey begins now. Explore modules, get AI help, and ace your quizzes.
          </p>
          <p className="welcome-hint">Redirecting to dashboard…</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero onLogin={handleLogin} />
      <Footer />
    </div>
  )
}
