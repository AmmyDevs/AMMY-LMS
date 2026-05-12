import ModuleCard from '@/app/ui/components/molecule/ModuleCard'
import modulesData from '../../../docs/module.json'

/**
 * Modules Overview Page.
 * Lists all enrolled modules using the standard design system grid.
 */
export default function ModulesPage() {
  const { modules } = modulesData

  return (
    <div className="animate-fade-up">
      <header className="mb-12">
        <h1 className="text-title mb-2">My Modules</h1>
        <p className="text-base color-muted">Select a module to start learning and track your academic progress.</p>
      </header>

      <div className="grid-auto">
        {modules.map((module) => (
          <ModuleCard key={module.code} module={module} />
        ))}
      </div>
    </div>
  )
}