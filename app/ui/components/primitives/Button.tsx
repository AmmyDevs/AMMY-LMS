import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  // Base styles shared by all variants
  'inline-flex items-center justify-center gap-2 font-body font-semibold select-none transition-all duration-150 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4',
  {
    variants: {
      variant: {
        primary:             'btn-primary',
        secondary:           'btn-secondary',
        outline:             'btn-outline',
        ghost:               'btn-ghost',
        premium:             'btn-premium',
        destructive:         'btn-destructive',
        tertiary:            'btn-tertiary',
        'tertiary-bordered': 'btn-tertiary-bordered',
      },
      size: {
        sm:    'btn-sm',
        md:    'btn-md',
        lg:    'btn-lg',
        icon:  'btn-icon',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Icon element placed before children */
  startIcon?: React.ReactNode
  /** Icon element placed after children */
  endIcon?: React.ReactNode
}

/**
 * Core Button component for AMMY Archives.
 *
 * Uses CVA for variant management and design system CSS classes.
 * All styling is token-based — no hardcoded values.
 *
 * @example
 * <Button variant="primary" size="md">Click me</Button>
 * <Button variant="ghost" startIcon={<ArrowLeft />}>Back</Button>
 * <Button variant="destructive" size="sm">Delete</Button>
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, startIcon, endIcon, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {startIcon}
        <span className="leading-none">{children}</span>
        {endIcon}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants }
