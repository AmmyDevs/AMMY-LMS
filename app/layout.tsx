import type { Metadata } from 'next'
import { Layout } from './ui/components/system/Layout'
import './ui/global.css'

export const metadata: Metadata = {
  title: 'AMMY LMS — Learn Smarter',
  description: 'Interactive notes, AI tutoring, and assessments for modern learners.',
  icons: {
    icon: '/image/Logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {/* Skip to content — accessibility */}
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
