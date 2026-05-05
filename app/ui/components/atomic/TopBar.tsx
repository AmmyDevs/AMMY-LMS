'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function TopBar() {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <Link href="/" className="topbar-brand">
          <Image src="/image/Logo.png" alt="AMMY LMS" width={30} height={30} />
          <span className="topbar-title">AMMY LMS</span>
        </Link>
      </div>
    </header>
  )
}
