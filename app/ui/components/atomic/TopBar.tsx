import Link from 'next/link'
import Image from 'next/image'
import ThemeToggle from './ThemeToggle'

export default function TopBar() {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <Link href="/" className="topbar-brand">
          <div className="p-1.5 rounded-xl bg-[var(--accent-light)] dark:bg-[var(--accent)]/10 ring-1 ring-[var(--accent-mid)]">
            <Image src="/image/Logo.png" alt="AMMY LMS" width={28} height={28} className="topbar-logo" />
          </div>
          <span className="topbar-title font-display font-extrabold tracking-tight">AMMY LMS</span>
        </Link>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          {/* User Profile Placeholder */}
          <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 ring-1 ring-gray-200 dark:ring-white/10 hidden sm:block"></div>
        </div>
      </div>
    </header>
  )
}
