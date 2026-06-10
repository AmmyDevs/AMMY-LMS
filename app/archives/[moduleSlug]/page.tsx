import { LessonsBoard } from '../../ui/components/module/LessonsBoard'

export default async function ModuleOverviewPage({ params }: { params: Promise<{ moduleSlug: string }> }) {
  const { moduleSlug } = await params
  
  return (
    <div className="t-animate-fade-in">
      <LessonsBoard moduleSlug={moduleSlug} />
    </div>
  )
}
