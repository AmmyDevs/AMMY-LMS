'use client'

import { createContext, useContext, useState, useCallback, useEffect, useRef, type ReactNode } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

/* ─── Context ─────────────────────────────────────────────── */

interface SheetContextValue {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const SheetContext = createContext<SheetContextValue>({
  open: false,
  onOpenChange: () => {},
})

/* ─── Sheet Root ──────────────────────────────────────────── */

interface SheetProps {
  children: ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  defaultOpen?: boolean
}

function Sheet({ children, open: controlledOpen, onOpenChange, defaultOpen = false }: SheetProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : uncontrolledOpen

  const handleOpenChange = useCallback((value: boolean) => {
    if (!isControlled) setUncontrolledOpen(value)
    onOpenChange?.(value)
  }, [isControlled, onOpenChange])

  return (
    <SheetContext.Provider value={{ open, onOpenChange: handleOpenChange }}>
      {children}
    </SheetContext.Provider>
  )
}

/* ─── Sheet Trigger ───────────────────────────────────────── */

interface SheetTriggerProps {
  children: ReactNode
  asChild?: boolean
  className?: string
}

function SheetTrigger({ children, asChild, className }: SheetTriggerProps) {
  const { onOpenChange } = useContext(SheetContext)

  if (asChild) {
    // Clone child and inject onClick handler
    const child = children as React.ReactElement<React.HTMLAttributes<HTMLElement>>
    return (
      <span className={className}>
        {child && typeof child === 'object' && 'props' in child
          ? { ...child, props: { ...child.props, onClick: () => onOpenChange(true) } }
          : children}
      </span>
    )
  }

  return (
    <button
      className={className}
      onClick={() => onOpenChange(true)}
      type="button"
    >
      {children}
    </button>
  )
}

/* ─── Sheet Content ───────────────────────────────────────── */

interface SheetContentProps {
  children: ReactNode
  side?: 'left' | 'right' | 'top' | 'bottom'
  className?: string
}

function SheetContent({ children, side = 'right', className }: SheetContentProps) {
  const { open, onOpenChange } = useContext(SheetContext)
  const contentRef = useRef<HTMLDivElement>(null)

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onOpenChange(false)
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onOpenChange])

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = '' }
    }
  }, [open])

  const sideClasses = {
    right: 'inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm',
    left: 'inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm',
    top: 'inset-x-0 top-0 h-auto border-b',
    bottom: 'inset-x-0 bottom-0 h-auto border-t',
  }

  const slideClasses = {
    right: open ? 'translate-x-0' : 'translate-x-full',
    left: open ? 'translate-x-0' : '-translate-x-full',
    top: open ? 'translate-y-0' : '-translate-y-full',
    bottom: open ? 'translate-y-0' : 'translate-y-full',
  }

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-50 bg-black/50 transition-opacity duration-300',
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={() => onOpenChange(false)}
        aria-hidden="true"
      />

      {/* Content */}
      <div
        ref={contentRef}
        role="dialog"
        aria-modal="true"
        className={cn(
          'fixed z-50 flex flex-col gap-4 bg-background shadow-lg transition-transform duration-300 ease-in-out',
          sideClasses[side],
          slideClasses[side],
          className
        )}
      >
        {children}

        {/* Close button */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:outline-2 focus:outline-accent"
          aria-label="Close"
          type="button"
        >
          <X className="size-4" />
        </button>
      </div>
    </>
  )
}

/* ─── Sheet Header / Footer / Title / Description ─────────── */

function SheetHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex flex-col gap-1.5 p-4', className)} {...props} />
}

function SheetFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mt-auto flex flex-col gap-2 p-4', className)} {...props} />
}

function SheetTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn('text-foreground font-semibold', className)} {...props} />
}

function SheetDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('text-muted-foreground text-sm', className)} {...props} />
}

export { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription }
