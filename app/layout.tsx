import type { Metadata } from 'next'
import './ui/global.css'

export const metadata: Metadata = {
  title: 'AMMY LMS',
  description: 'Learning Management System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}