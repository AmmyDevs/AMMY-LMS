'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, BookOpen, Bot, FileText } from 'lucide-react'

const navItems = [
  { href: '/lms', label: 'Dashboard', icon: Home },
  { href: '/lms/modules', label: 'Modules', icon: BookOpen },
  { href: '/lms/assistant', label: 'Assistant', icon: Bot },
  { href: '/lms/assessment', label: 'Assessment', icon: FileText },
]

export default function SideNav() {
  const pathname = usePathname()

  return (
    <nav className="sidenav">
      <ul className="sidenav-list">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href
          return (
            <li key={href}>
              <Link href={href} className={`sidenav-link ${isActive ? 'active' : ''}`}>
                <Icon />
                <span>{label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
