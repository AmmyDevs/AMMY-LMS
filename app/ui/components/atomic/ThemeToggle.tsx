'use client'

import React, { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'
import { useLMSStore } from '@/lib/store'
import { cn } from '@/lib/utils'

/**
 * A polished, high-end theme toggle component that uses the 
 * central LMS store and design system tokens.
 */
interface ThemeToggleProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function ThemeToggle({ size = 'md', className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useLMSStore()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
    // Synchronize document class with store theme
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const sizeClass = {
    sm: 'theme-toggle-sm',
    md: 'theme-toggle-md',
    lg: 'theme-toggle-lg',
  }[size]

  // Simplified placeholder to maintain layout during hydration
  if (!mounted) return <div className={cn("rounded-pill border-standard opacity-20", sizeClass, className)} />

  const isDark = theme === 'dark'
  const iconSize = size === 'sm' ? 16 : size === 'lg' ? 24 : 20

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={cn("theme-toggle shadow-inner hover:shadow-md transition-shadow", sizeClass, className)}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Sliding High-End Thumb */}
      <div className="theme-toggle-thumb shadow-md" />

      {/* Horizontal Icons Track */}
      <div className="theme-toggle-track relative z-10">
        <div className={`
          centered transition-all duration-500
          ${!isDark ? 'text-accent scale-100 rotate-0' : 'text-muted dim scale-75 -rotate-12'}
        `}>
          <Sun size={iconSize} strokeWidth={2.5} />
        </div>
        
        <div className={`
          centered transition-all duration-500
          ${isDark ? 'text-white scale-100 rotate-0' : 'text-muted dim scale-75 rotate-12'}
        `}>
          <Moon size={iconSize} strokeWidth={2.5} />
        </div>
      </div>
    </button>
  )
}
