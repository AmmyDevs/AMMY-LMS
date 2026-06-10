'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BookOpen, LogOut, Settings, BrainCircuit, Library } from 'lucide-react'

const navLinks = [
  { name: 'Archives', href: '/archives', icon: Library },
  { name: 'Quizzes', href: '/archives/quizzes', icon: BrainCircuit },
  { name: 'Flashcards', href: '/archives/flashcards', icon: BookOpen },
  { name: 'Settings', href: '/archives/settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="t-sidebar">
      <div className="t-sidebar__brand">
        <Link href="/" className="t-nav__brand outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">
          <div className="t-nav__brand-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <span className="t-nav__brand-text">AMMY LMS</span>
        </Link>
      </div>

      <nav className="t-sidebar__nav">
        {navLinks.map((link) => {
          const Icon = link.icon
          const isActive = pathname === link.href || pathname?.startsWith(`${link.href}/`) && link.href !== '/archives'
          const activeClass = isActive ? 't-sidebar__link--active' : ''
          
          return (
            <Link 
              key={link.name} 
              href={link.href}
              className={`t-sidebar__link ${activeClass}`}
            >
              <Icon size={18} />
              <span>{link.name}</span>
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto pt-4 border-t border-[rgba(255,255,255,0.1)] t-dark:border-[rgba(255,255,255,0.06)]" style={{ borderColor: 'var(--t-border)' }}>
        <button 
          onClick={() => {
            localStorage.removeItem('ammy-username')
            window.location.href = '/'
          }}
          className="t-sidebar__link w-full text-left"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}
