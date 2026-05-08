'use client'

import React, { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('theme')
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setIsDark(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleTheme = (target: boolean) => {
    if (target === isDark) return
    
    if (target) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
      setIsDark(true)
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
      setIsDark(false)
    }
  }

  if (!mounted) return <div className="w-[72px] h-[36px]" />

  return (
    <div className="flex items-center">
      <div 
        className={cn(
          "relative flex items-center p-1 w-[72px] h-[36px] rounded-full cursor-pointer transition-all duration-500 shadow-inner",
          isDark ? "bg-[#13262B] ring-1 ring-white/10" : "bg-gray-100 ring-1 ring-gray-200"
        )}
        onClick={() => toggleTheme(!isDark)}
      >
        {/* Sliding High-End Thumb */}
        <div
          className={cn(
            "absolute w-7 h-7 rounded-full shadow-lg transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-10",
            isDark 
              ? "translate-x-9 bg-[var(--accent)]" 
              : "translate-x-0 bg-white"
          )}
        />

        {/* Horizontal Icons Track */}
        <div className="relative w-full flex items-center justify-between px-1.5 z-20 pointer-events-none">
          <div className={cn(
            "flex items-center justify-center w-7 h-7 transition-all duration-300",
            !isDark ? "text-amber-500 scale-110" : "text-gray-500 opacity-40 scale-90"
          )}>
            <Sun size={14} strokeWidth={2.5} />
          </div>
          
          <div className={cn(
            "flex items-center justify-center w-7 h-7 transition-all duration-300",
            isDark ? "text-white scale-110" : "text-gray-400 opacity-40 scale-90"
          )}>
            <Moon size={14} strokeWidth={2.5} />
          </div>
        </div>
      </div>
    </div>
  )
}
