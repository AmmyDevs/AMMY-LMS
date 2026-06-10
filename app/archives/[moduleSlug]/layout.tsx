import { use } from 'react'
import { ModuleDetailsCard } from '../../ui/components/module/ModuleDetailsCard'
import { ModuleTabs } from '../../ui/components/module/ModuleTabs'

export default function ModuleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ moduleSlug: string }>
}) {
  const { moduleSlug } = use(params)

  return (
    <div className="t-animate-fade-in" style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <ModuleDetailsCard slug={moduleSlug} />
      <ModuleTabs moduleSlug={moduleSlug} />
      
      <div style={{ marginTop: '24px' }}>
        {children}
      </div>
    </div>
  )
}
