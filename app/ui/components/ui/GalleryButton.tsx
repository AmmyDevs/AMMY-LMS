'use client'

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { clsx } from 'clsx'


const buttonVariants = cva(
  [
    'gallery-btn',
    'inline-flex items-center justify-center gap-2 font-semibold',
    'transition-all duration-200 ease-out',
    'select-none whitespace-nowrap',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--g-bg)]',
    'disabled:pointer-events-none disabled:opacity-40',
    'active:scale-[0.97]',
  ].join(' '),
  {
    variants: {
      variant: {
        primary: [
          'g-btn-primary',
          'bg-gradient-to-br from-[var(--g-accent)] to-[var(--g-accent-hover)]',
          'text-white shadow-lg shadow-[var(--g-accent)]/25',
          'hover:shadow-xl hover:shadow-[var(--g-accent)]/30 hover:-translate-y-0.5',
          'focus-visible:ring-[var(--g-accent)]',
        ].join(' '),
        secondary: [
          'g-btn-secondary',
          'bg-[var(--g-surface)] text-[var(--g-text)] border border-[var(--g-border)]',
          'hover:bg-[var(--g-surface-hover)] hover:border-[var(--g-accent)]/30',
          'backdrop-blur-sm',
        ].join(' '),
        outline: [
          'g-btn-outline',
          'bg-transparent border-2 border-[var(--g-accent)]/40 text-[var(--g-accent)]',
          'hover:bg-[var(--g-accent)]/10 hover:border-[var(--g-accent)]',
        ].join(' '),
        ghost: [
          'g-btn-ghost',
          'bg-transparent text-[var(--g-text-muted)]',
          'hover:bg-[var(--g-surface)] hover:text-[var(--g-text)]',
        ].join(' '),
        danger: [
          'g-btn-danger',
          'bg-gradient-to-br from-red-500 to-rose-600 text-white',
          'shadow-lg shadow-red-500/25',
          'hover:shadow-xl hover:shadow-red-500/30 hover:-translate-y-0.5',
        ].join(' '),
        premium: [
          'g-btn-premium',
          'bg-gradient-to-r from-[var(--g-accent)] via-blue-400 to-[var(--g-accent)] text-white',
          'bg-[length:200%_100%] animate-[shimmer_3s_ease-in-out_infinite]',
          'shadow-lg shadow-[var(--g-accent)]/30',
          'hover:shadow-xl hover:-translate-y-0.5',
        ].join(' '),
      },
      size: {
        sm: 'h-8 px-3 text-xs rounded-md gap-1.5',
        md: 'h-10 px-5 text-sm rounded-lg',
        lg: 'h-12 px-7 text-base rounded-xl',
        icon: 'h-10 w-10 rounded-lg p-0',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

interface GalleryButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
  icon?: ReactNode
  children?: ReactNode
}

const GalleryButton = forwardRef<HTMLButtonElement, GalleryButtonProps>(
  ({ className, variant, size, loading, icon, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(buttonVariants({ variant, size, className }))}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <span className="g-spinner" />
        ) : icon ? (
          <span className="shrink-0 [&>svg]:w-4 [&>svg]:h-4">{icon}</span>
        ) : null}
        {children && <span>{children}</span>}
      </button>
    )
  }
)

GalleryButton.displayName = 'GalleryButton'
export { GalleryButton, buttonVariants }
