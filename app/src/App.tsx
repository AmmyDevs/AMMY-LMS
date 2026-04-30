import { Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useLMSStore } from '@/lib/store'
import { Sidebar } from '@/components/Sidebar'
import { Dashboard } from '@/components/Dashboard'
import { ContentPage } from '@/components/ContentPage'
import { UsernameModal } from '@/components/UsernameModal'

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-page">
      <Sidebar />
      <main className="ml-72 min-h-screen">
        {children}
      </main>
    </div>
  )
}

export default function App() {
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
      <Routes>
        <Route
          path="/"
          element={
            <AppLayout>
              <Dashboard />
            </AppLayout>
          }
        />
        <Route
          path="/module/image-processing/*"
          element={
            <AppLayout>
              <ContentPage />
            </AppLayout>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}
