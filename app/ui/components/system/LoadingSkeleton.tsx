import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'effect-shimmer rounded-md',
        className
      )}
    />
  )
}

export function ModuleCardSkeleton() {
  return (
    <div className="surface-card col gap-item">
      <div className="row-between mb-2">
        <Skeleton className="w-10 h-10 radius-md" />
        <Skeleton className="w-20 h-6 radius-pill" />
      </div>
      <Skeleton className="h-5 w-3/4 mb-1" />
      <Skeleton className="h-4 w-1/2 mb-1" />
      <Skeleton className="h-4 w-1/3" />
      <div className="pt-4 border-top flex items-center justify-between mt-2">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="w-2 h-2 radius-pill" />
      </div>
    </div>
  )
}

export function LessonListSkeleton() {
  return (
    <div className="stack-md">
      {[1, 2, 3].map((i) => (
        <div key={i} className="surface-card p-6 col gap-item">
          <Skeleton className="h-6 w-2/3" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-full mt-2" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      ))}
    </div>
  )
}

export function DashboardPageSkeleton() {
  return (
    <div className="animate-fade-up">
      <header className="mb-12">
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-5 w-96" />
      </header>
      <div className="surface-card centered col gap-item p-12">
        <Skeleton className="w-16 h-16 radius-lg mb-4" />
        <Skeleton className="h-5 w-40 mb-1" />
        <Skeleton className="h-4 w-64" />
      </div>
    </div>
  )
}
