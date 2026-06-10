'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { clsx } from 'clsx'
import { X } from 'lucide-react'
import type { ReactNode } from 'react'

interface GalleryModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  description?: string
  children: ReactNode
  className?: string
}

function GalleryModal({ open, onOpenChange, title, description, children, className }: GalleryModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="g-modal__overlay" />
        <Dialog.Content className={clsx('g-modal__content', className)}>
          {/* Close button */}
          <Dialog.Close className="g-modal__close" aria-label="Close">
            <X size={16} />
          </Dialog.Close>

          {/* Header */}
          {title && (
            <div className="g-modal__header">
              <Dialog.Title className="g-modal__title">{title}</Dialog.Title>
              {description && <Dialog.Description className="g-modal__desc">{description}</Dialog.Description>}
            </div>
          )}

          {/* Body */}
          <div className="g-modal__body">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

/* Trigger button for the modal */
function GalleryModalTrigger({ children, className, ...props }: Dialog.DialogTriggerProps) {
  return (
    <Dialog.Trigger className={clsx('g-modal-trigger', className)} {...props}>
      {children}
    </Dialog.Trigger>
  )
}

export { GalleryModal, GalleryModalTrigger }
export type { GalleryModalProps }
