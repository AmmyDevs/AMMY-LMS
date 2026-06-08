'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Home, BookOpen, Bot, FileText } from 'lucide-react'
import ThemeToggle from '@/app/ui/components/primitives/ThemeToggle'
import { Logo } from '@/app/ui/components/primitives/Logo'
import { Sheet, SheetContent, SheetTrigger } from '@/app/ui/components/primitives/Sheet'
import { useLMSStore } from '@/lib/store'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/lms', label: 'Dashboard', icon: Home },
  { href: '/lms/modules', label: 'Modules', icon: BookOpen },
  { href: '/lms/assistant', label: 'Assistant', icon: Bot },
  { href: '/lms/assessment', label: 'Assessment', icon: FileText },
]

/**
 * A polished, high-end TopBar component that aligns with the
 * Design System v2.0. Includes a mobile slide-out drawer navigation.
 */
export default function TopBar() {
  const pathname = usePathname()
  const { username } = useLMSStore()
  const displayName = username || 'Ayubu Mbaga'
  const initials = displayName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'AM'

  return (
    <header className="header-sticky bg-glass">
      <div className="page-container row-between">
        {/* Brand Section */}
        <div className="row gap-item">
          {/* Mobile Hamburger */}
          <Sheet>
            <SheetTrigger asChild>
              <button
                className="btn-ghost btn-icon lg:hidden"
                aria-label="Open navigation menu"
              >
                <Menu size={20} />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 pt-12 w-72">
              <nav className="flex flex-col h-full">
                <div className="px-4 pb-4 border-bottom">
                  <Link href="/" className="brand-link row gap-item">
                    <Logo variant="icon" size={28} withBackground />
                    <span className="text-subheading tracking-tight color-heading">
                      AMMY <span className="color-accent">LMS</span>
                    </span>
                  </Link>
                </div>
                <ul className="nav-list p-3 flex-1">
                  {navItems.map(({ href, label, icon: Icon }) => {
                    const isActive = pathname === href
                    return (
                      <li key={href}>
                        <Link
                          href={href}
                          className={cn(
                            "nav-link",
                            isActive && "active"
                          )}
                        >
                          <Icon strokeWidth={isActive ? 2.5 : 2} />
                          <span>{label}</span>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </nav>
            </SheetContent>
          </Sheet>

          <Link href="/" className="brand-link row gap-item">
            <Logo variant="icon" size={32} withBackground />
            <span className="text-subheading tracking-tight color-heading">
              AMMY <span className="color-accent">LMS</span>
            </span>
          </Link>
        </div>

        {/* Right Actions */}
        <div className="row gap-row">
          <ThemeToggle size="sm" />

          {/* User Profile / Account */}
          <div className="row gap-item">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-fine weight-bold color-heading">{displayName}</span>
              <span className="text-label" style={{ fontSize: '10px' }}>Learner</span>
            </div>
            <div className="w-10 h-10 radius-pill border-standard bg-surface centered overflow-hidden">
              <div className="w-full h-full bg-mesh centered text-label color-accent">{initials}</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
