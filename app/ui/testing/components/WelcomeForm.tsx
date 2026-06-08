'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'

interface WelcomeFormProps {
  onSubmit: (name: string) => void
}

/**
 * Testing WelcomeForm — clean unauthenticated login card.
 * No dependency on existing component library.
 */
export function WelcomeForm({ onSubmit }: WelcomeFormProps) {
  const [name, setName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      onSubmit(name.trim())
    }
  }

  return (
    <div className="t-welcome">
      <p className="t-welcome__title">Start your journey</p>

      <form onSubmit={handleSubmit} className="t-welcome__form">
        <div className="t-welcome__input-group">
          <label className="t-welcome__input-label" htmlFor="t-hero-name">
            Your name
          </label>
          <input
            id="t-hero-name"
            type="text"
            placeholder="e.g. Amara Osei"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="t-welcome__input"
          />
        </div>

        <button type="submit" className="t-btn t-btn--primary t-btn--lg t-welcome__submit">
          Enter Archives
          <ArrowRight size={18} />
        </button>

        <p className="t-welcome__hint">
          No account needed — just enter your name and start learning.
        </p>
      </form>
    </div>
  )
}
