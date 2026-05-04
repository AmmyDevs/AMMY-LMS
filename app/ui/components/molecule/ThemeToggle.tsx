import { useEffect, useState } from 'react'



 export function ThemeToggle() {
  const [dark, setDark] = useState(false)

  /* Initialise from localStorage or system preference */
  useEffect(() => {
    const stored = localStorage.getItem('msomi-theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDark = stored ? stored === 'dark' : prefersDark
    setDark(isDark)
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
  }, [])

  const toggle = () => {
    const next = !dark
    setDark(next)
    const value = next ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', value)
    localStorage.setItem('msomi-theme', value)
  }

  return (
    <button
      className="theme-toggle"
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={dark ? 'Light mode' : 'Dark mode'}
    >
      <span className="theme-toggle-track">
        <span className="theme-toggle-thumb" />
      </span>
      <span className="theme-toggle-icon" aria-hidden="true">
        {dark ? '🌙' : '☀️'}
      </span>
    </button>
  )
}