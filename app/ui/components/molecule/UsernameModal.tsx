import { useState } from 'react'
import { GraduationCap } from 'lucide-react'
import { useLMSStore } from '@/lib/store'

export function UsernameModal() {
  const { username, setUsername } = useLMSStore()
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  if (username !== null) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = name.trim()
    if (trimmed.length < 1) {
      setError('Please enter your name')
      return
    }
    if (trimmed.length > 50) {
      setError('Name must be 50 characters or less')
      return
    }
    setUsername(trimmed)
    setError('')
  }

  return (
    <div className="overlay active" style={{ zIndex: 'var(--z-toaster)' }}>
      <div className="pop-up" style={{ maxWidth: '28rem' }}>
        {/* Icon + heading */}
        <div className="col items-center text-center mb-8 gap-item">
          <div className="w-14 h-14 radius-xl bg-accent-light flex items-center justify-center mb-2">
            <GraduationCap className="w-7 h-7 text-accent" />
          </div>
          <h2 className="text-heading color-heading">
            Welcome to AMMY LMS
          </h2>
          <p className="text-caption color-muted">
            Your personal learning environment for Digital Image Processing
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="col gap-item">
          <div className="col gap-item">
            <label htmlFor="username" className="text-caption weight-bold color-heading">
              What should we call you?
            </label>
            <input
              id="username"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                setError('')
              }}
              placeholder="Enter your name"
              className="input-primary"
              autoFocus
            />
            {error && (
              <p className="text-fine" style={{ color: 'var(--tone-danger-text)' }}>
                {error}
              </p>
            )}
          </div>

          <button type="submit" className="btn-primary w-full mt-2">
            Start Learning
          </button>
        </form>
      </div>
    </div>
  )
}
