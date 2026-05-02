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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[2px]">
      <div className="w-full max-w-md mx-4 card-surface p-8 animate-fade-in">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-14 h-14 rounded-xl bg-brand/10 flex items-center justify-center mb-4">
            <GraduationCap className="w-7 h-7 text-brand" />
          </div>
          <h2 className="text-2xl font-semibold text-text mb-2">
            Welcome to AMMY LMS
          </h2>
          <p className="text-muted">
            Your personal learning environment for Digital Image Processing
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-text mb-2">
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
              className="w-full px-4 py-3 rounded-lg border border-border bg-page text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all"
              autoFocus
            />
            {error && (
              <p className="mt-2 text-sm text-red-500">{error}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-lg bg-brand text-white font-medium hover:bg-brand/90 transition-colors focus:outline-none focus:ring-2 focus:ring-brand/50"
          >
            Start Learning
          </button>
        </form>
      </div>
    </div>
  )
}
