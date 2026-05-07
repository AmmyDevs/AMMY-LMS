import ModuleCard from '@/app/ui/components/molecule/ModuleCard'
import modulesData from '../../../docs/module.json'

export default function ModulesPage() {
  const { modules } = modulesData

  return (
    <div className="modules-page">
      <div className="modules-container">
        <h1 className="modules-title">My Modules</h1>
        <p className="modules-subtitle">Select a module to start learning</p>
        <div className="modules-grid">
          {modules.map((module) => (
            <ModuleCard key={module.code} module={module} />
          ))}
        </div>
      </div>
    </div>
  )
}