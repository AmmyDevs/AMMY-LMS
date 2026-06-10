'use client'

import { Bell, Search, User as UserIcon } from 'lucide-react'
import { ThemeToggle } from '../ThemeToggle'
import { usePathname } from 'next/navigation'

export function Topbar() {
  const pathname = usePathname()
  
  // Basic breadcrumb logic
  const getPageTitle = () => {
    if (pathname === '/archives') return 'Learning Archives'
    if (pathname?.includes('/quizzes')) return 'Quizzes'
    if (pathname?.includes('/flashcards')) return 'Flashcards'
    if (pathname?.includes('/settings')) return 'Settings'
    return 'Dashboard'
  }

  return (
    <header className="t-topbar">
      <div className="t-topbar__title">
        {getPageTitle()}
      </div>

      <div className="t-topbar__actions">
        {/* Search */}
        <button className="t-btn t-btn--ghost" style={{ padding: '8px', borderRadius: '50%' }} aria-label="Search">
          <Search size={20} className="t-color-muted" />
        </button>
        
        {/* Notifications */}
        <button className="t-btn t-btn--ghost" style={{ padding: '8px', borderRadius: '50%', position: 'relative' }} aria-label="Notifications">
          <Bell size={20} className="t-color-muted" />
          <span style={{ 
            position: 'absolute', 
            top: '6px', 
            right: '8px', 
            width: '8px', 
            height: '8px', 
            backgroundColor: 'var(--t-smart-blue)', 
            borderRadius: '50%' 
          }} />
        </button>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* User Profile */}
        <button className="t-btn t-btn--ghost" style={{ padding: '8px', borderRadius: '50%' }} aria-label="Profile">
          <UserIcon size={20} className="t-color-muted" />
        </button>
      </div>
    </header>
  )
}
