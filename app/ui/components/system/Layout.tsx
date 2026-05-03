import { Sidebar } from './Sidebar'
import { UsernameModal } from '../molecule/UsernameModal'
import { useLMSStore } from '@/lib/store'
import { useEffect } from 'react'

export function Layout({ children }: { children: React.ReactNode }) {
  const { theme } = useLMSStore()

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
        <Sidebar />
        <main className="ml-72 min-h-screen">
          {children}
        </main>
      </div>
    </>
  )
}