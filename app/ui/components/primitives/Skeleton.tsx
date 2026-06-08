import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export type SkeletonProps = HTMLAttributes<HTMLDivElement>

/**
 * Core Skeleton component for AMMY Archives.
 * Loading placeholder with shimmer animation.
 *
 * @example
 * <Skeleton className="h-5 w-3/4" />
 * <Skeleton className="w-10 h-10 radius-md" />
 */
const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="skeleton"
      className={cn('effect-shimmer rounded-md', className)}
      {...props}
    />
  )
)
Skeleton.displayName = 'Skeleton'

export { Skeleton }
