'use client'

import Link from 'next/link'

export default function SideNav() {
  return (
    <nav className="sidenav">
      <ul className="sidenav-list">
        <li><Link href="/dashboard" className="sidenav-link">Dashboard</Link></li>
        <li><Link href="/modules" className="sidenav-link">Modules</Link></li>
        <li><Link href="/assistant" className="sidenav-link">Assistant</Link></li>
        <li><Link href="/assessment" className="sidenav-link">Assessment</Link></li>
      </ul>
    </nav>
  )
}
