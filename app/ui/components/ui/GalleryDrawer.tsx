'use client'

import * as Drawer from 'vaul'
import { clsx } from 'clsx'
import { X } from 'lucide-react'
import type { ReactNode } from 'react'

interface GalleryDrawerProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  direction?: 'right' | 'left'
  title?: string
  description?: string
  children: ReactNode
  className?: string
  trigger?: ReactNode
}

function GalleryDrawer({
  open,
  onOpenChange,
  direction = 'right',
  title,
  description,
  children,
  className,
}: GalleryDrawerProps) {
  return (
    <Drawer.Root
      open={open}
      onOpenChange={onOpenChange}
      direction={direction}
    >
      <Drawer.Portal>
        <Drawer.Overlay className="g-drawer__overlay" />
        <Drawer.Content className={clsx('g-drawer__content', `g-drawer__content--${direction}`, className)}>
          {/* Close button */}
          <button className="g-drawer__close" aria-label="Close drawer" onClick={() => onOpenChange?.(false)}>
            <X size={16} />
          </button>

          {/* Header */}
          {(title || description) && (
            <div className="g-drawer__header">
              {title && <h2 className="g-drawer__title">{title}</h2>}
              {description && <p className="g-drawer__desc">{description}</p>}
            </div>
          )}

          {/* Body */}
          <div className="g-drawer__body">{children}</div>

          {/* Handle bar */}
          <Drawer.Handle className="g-drawer__handle" />
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}

export { GalleryDrawer }
export type { GalleryDrawerProps }
