'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, BookOpen, Bot, FileText } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/lms', label: 'Dashboard', icon: Home },
  { href: '/lms/modules', label: 'Modules', icon: BookOpen },
  { href: '/lms/assistant', label: 'Assistant', icon: Bot },
  { href: '/lms/assessment', label: 'Assessment', icon: FileText },
]

/**
 * Atomic SideNav component for vertical dashboard navigation.
 * Uses Design System v2.0 tokens and semantic classes.
 */
export default function SideNav() {
  const pathname = usePathname()

  return (
    <nav>
      <ul className="nav-list">
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
  )
}
