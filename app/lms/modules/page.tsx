import { Suspense } from 'react'
import Link from 'next/link'
import ModuleCard from '@/app/ui/components/molecule/ModuleCard'
import { ModuleCardSkeleton } from '@/app/ui/components/system/LoadingSkeleton'
import modulesData from '../../../docs/module.json'

/**
 * Modules Overview Page.
 * Lists all enrolled modules using the standard design system grid.
 */
export default function ModulesPage() {
  const { modules } = modulesData

  return (
    <div className="animate-fade-up">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="row gap-inline text-fine color-muted">
          <li>
            <Link href="/lms" className="hover:text-accent transition-colors">Dashboard</Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="color-heading weight-bold" aria-current="page">Modules</li>
        </ol>
      </nav>

      <header className="mb-12">
        <h1 className="text-title mb-2">My Modules</h1>
        <p className="text-body color-muted">Select a module to start learning and track your academic progress.</p>
      </header>

      <Suspense fallback={
        <div className="grid-auto">
          {[1, 2, 3, 4].map((i) => <ModuleCardSkeleton key={i} />)}
        </div>
      }>
        <div className="grid-auto">
          {modules.map((module) => (
            <ModuleCard key={module.code} module={module} />
          ))}
        </div>
      </Suspense>
    </div>
  )
}
