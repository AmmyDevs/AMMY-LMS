'use client'

import { useLMSStore } from '@/lib/store'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import TopBar from '@/app/ui/components/atomic/TopBar'
import SideNav from '@/app/ui/components/atomic/SideNav'

export function Layout({ children }: { children: React.ReactNode }) {
  const { theme } = useLMSStore()
  const pathname = usePathname()

  const isLandingPage = pathname === '/'
  const isAdminPage = pathname.startsWith('/admin')
  const isLMSPage = pathname.startsWith('/lms')

  useEffect(() => {
    const resolved = theme ?? (
      window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    )
    document.documentElement.classList.toggle('dark', resolved === 'dark')
  }, [theme])

  return (
    <div className="min-h-screen bg-page">
      {isLandingPage || isLMSPage || isAdminPage ? (
        <main className="min-h-screen" id="main-content">
          {children}
        </main>
      ) : (
        <div className="layout-shell">
          <TopBar />
          <div className="layout-main">
            <aside className="layout-aside">
              <SideNav />
            </aside>
            <main className="layout-content" id="main-content" tabIndex={-1}>
              {children}
            </main>
          </div>
        </div>
      )}
    </div>
  )
}
