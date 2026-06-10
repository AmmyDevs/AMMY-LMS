'use client'

import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'

/**
 * Testing ThemeToggle — self-contained dark/light toggle.
 * Manages its own state via localStorage, no store dependency.
 */
export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('t-theme')
    if (saved === 'dark') {
      setIsDark(true)
      document.documentElement.classList.add('t-dark')
    }
  }, [])

  const toggle = () => {
    const next = !isDark
    setIsDark(next)
    localStorage.setItem('t-theme', next ? 'dark' : 'light')
    document.documentElement.classList.toggle('t-dark', next)
  }

  if (!mounted) {
    return <div className="t-theme-toggle" />
  }

  return (
    <button
      onClick={toggle}
      type="button"
      className={`t-theme-toggle ${isDark ? 't-theme-toggle--dark' : ''}`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <div className="t-theme-toggle__track">
        <div className="t-theme-toggle__icon" style={{ opacity: isDark ? 0.4 : 1 }}>
          <Sun />
        </div>
        <div className="t-theme-toggle__icon" style={{ opacity: isDark ? 1 : 0.4 }}>
          <Moon />
        </div>
      </div>
      <div className="t-theme-toggle__thumb" />
    </button>
  )
}
