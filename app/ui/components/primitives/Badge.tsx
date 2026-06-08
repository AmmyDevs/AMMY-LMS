import { forwardRef, type HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  // Base pill styles
  'pill inline-flex items-center gap-1 whitespace-nowrap shrink-0 [&_svg]:size-3 [&_svg]:pointer-events-none',
  {
    variants: {
      variant: {
        success:  'pill-success',
        danger:   'pill-danger',
        alert:    'pill-alert',
        info:     'pill-info',
        purple:   'pill-purple',
        outline:  'border-standard bg-transparent color-heading',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  }
)

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

/**
 * Core Badge component for AMMY Archives.
 * Uses design system pill classes for status indicators.
 *
 * @example
 * <Badge variant="success">Completed</Badge>
 * <Badge variant="info">CS 6307</Badge>
 * <Badge variant="danger">Error</Badge>
 */
const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => (
    <span
      ref={ref}
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
)
Badge.displayName = 'Badge'

export { Badge, badgeVariants }
