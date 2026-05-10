'use client'

import React, { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'
import { useLMSStore } from '@/lib/store'

/**
 * A polished, high-end theme toggle component that uses the 
 * central LMS store and design system tokens.
 */
export default function ThemeToggle() {
  const { theme, toggleTheme } = useLMSStore()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
    // Synchronize document class with store theme
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  if (!mounted) return <div className="w-[64px] h-[32px]" />

  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative flex items-center p-1 w-[64px] h-[32px] 
        rounded-pill cursor-pointer transition-all duration-300
        border border-standard hover:border-accent
        ${isDark ? 'bg-surface' : 'bg-white'}
      `}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Sliding High-End Thumb */}
      <div
        className={`
          absolute w-6 h-6 rounded-full shadow-md 
          transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-10
          ${isDark 
            ? 'translate-x-7 bg-accent' 
            : 'translate-x-0 bg-white'
          }
        `}
      />

      {/* Horizontal Icons Track */}
      <div className="relative w-full flex items-center justify-between px-1 z-20 pointer-events-none">
        <div className={`
          flex items-center justify-center w-6 h-6 transition-all duration-300
          ${!isDark ? 'text-accent' : 'text-muted dim scale-90'}
        `}>
          <Sun size={14} strokeWidth={2.5} />
        </div>
        
        <div className={`
          flex items-center justify-center w-6 h-6 transition-all duration-300
          ${isDark ? 'text-white' : 'text-muted dim scale-90'}
        `}>
          <Moon size={14} strokeWidth={2.5} />
        </div>
      </div>
    </button>
  )
}
