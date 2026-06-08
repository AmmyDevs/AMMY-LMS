import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

/* ─── Card Root ───────────────────────────────────────────── */

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Visual variant */
  variant?: 'default' | 'compact' | 'interactive'
}

/**
 * Core Card component for AMMY Archives.
 * Compound component pattern: Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter.
 *
 * @example
 * <Card variant="interactive" className="effect-glow">
 *   <CardHeader>
 *     <CardTitle>Module Name</CardTitle>
 *     <CardDescription>CS 6307</CardDescription>
 *   </CardHeader>
 *   <CardContent>Body content</CardContent>
 *   <CardFooter>Actions</CardFooter>
 * </Card>
 */
const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variantClasses = {
      default:    'surface-card',
      compact:    'surface-card-sm',
      interactive: 'surface-card surface-interactive',
    }

    return (
      <div
        ref={ref}
        data-slot="card"
        className={cn(variantClasses[variant], 'col gap-6', className)}
        {...props}
      />
    )
  }
)
Card.displayName = 'Card'

/* ─── CardHeader ──────────────────────────────────────────── */

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card-header"
      className={cn('col gap-2', className)}
      {...props}
    />
  )
)
CardHeader.displayName = 'CardHeader'

/* ─── CardTitle ───────────────────────────────────────────── */

const CardTitle = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card-title"
      className={cn('text-subheading font-bold color-heading', className)}
      {...props}
    />
  )
)
CardTitle.displayName = 'CardTitle'

/* ─── CardDescription ─────────────────────────────────────── */

const CardDescription = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card-description"
      className={cn('text-caption color-muted', className)}
      {...props}
    />
  )
)
CardDescription.displayName = 'CardDescription'

/* ─── CardContent ─────────────────────────────────────────── */

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card-content"
      className={cn('', className)}
      {...props}
    />
  )
)
CardContent.displayName = 'CardContent'

/* ─── CardFooter ──────────────────────────────────────────── */

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card-footer"
      className={cn('row gap-3 pt-4 border-top', className)}
      {...props}
    />
  )
)
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
