'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, BookOpen, PenTool } from 'lucide-react'

interface ModuleTabsProps {
  moduleSlug: string
}

export function ModuleTabs({ moduleSlug }: ModuleTabsProps) {
  const pathname = usePathname()
  
  const tabs = [
    { name: 'Overview', href: `/archives/${moduleSlug}`, icon: LayoutDashboard },
    { name: 'Study', href: `/archives/${moduleSlug}/study`, icon: BookOpen },
    { name: 'Exam', href: `/archives/${moduleSlug}/solve`, icon: PenTool },
  ]

  return (
    <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--t-border)', marginBottom: '32px' }}>
      {tabs.map((tab) => {
        const Icon = tab.icon
        // Overview is active only if it matches exactly (no sub-routes like /study)
        const isActive = tab.name === 'Overview' 
          ? pathname === `/archives/${moduleSlug}` 
          : pathname.includes(tab.href)

        return (
          <Link
            key={tab.name}
            href={tab.href}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              borderBottom: isActive ? '2px solid var(--t-accent)' : '2px solid transparent',
              color: isActive ? 'var(--t-accent)' : 'var(--t-text-muted)',
              fontWeight: isActive ? 600 : 500,
              transition: 'all var(--t-transition-fast)',
              textDecoration: 'none'
            }}
            className="hover:text-[var(--t-text-primary)] hover:bg-[var(--t-surface)] rounded-t-md"
          >
            <Icon size={18} />
            {tab.name}
          </Link>
        )
      })}
    </div>
  )
}
