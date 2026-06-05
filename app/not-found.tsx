import Link from 'next/link'
import { FileQuestion, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-page centered">
      <div className="surface-card centered col gap-item p-16 max-w-md text-center">
        <div className="w-20 h-20 radius-xl bg-subtle centered border-standard mb-2">
          <FileQuestion className="w-10 h-10 text-accent" />
        </div>
        <h1 className="text-title color-heading mb-2">Page Not Found</h1>
        <p className="text-body color-muted mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/" className="btn-primary">
          <Home size={18} />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  )
}
