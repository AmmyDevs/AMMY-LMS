'use client'

import { useRouter } from 'next/navigation'
import { Navbar } from '@/app/ui/components/molecule/NavBar'
import { Hero } from './ui/components/molecule/Hero'
import { Footer } from './ui/components/molecule/Footer'

export default function HomePage() {
  const router = useRouter()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleLogin = (_userName: string) => {
    // Navigate to dashboard after setting name
    router.push('/lms')
  }


  return (
    <div className="page-wrapper">
      <Navbar />
      <main>
        <Hero onLogin={handleLogin} />
      </main>
      <Footer />
    </div>
  )
}
