'use client'

import { Sidebar } from './Sidebar'
import { UsernameModal } from '../molecule/UsernameModal'
import { useLMSStore } from '@/lib/store'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function Layout({ children }: { children: React.ReactNode }) {
  const { theme } = useLMSStore()
  const pathname = usePathname()

  const isLandingPage = pathname === '/'

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return (
    <>
      <UsernameModal />
      <div className="min-h-screen bg-page">
        {!isLandingPage && <Sidebar />}
        <main className={`${!isLandingPage ? 'md:ml-72' : ''} min-h-screen`}>
          {children}
        </main>
      </div>
    </>
  )
}