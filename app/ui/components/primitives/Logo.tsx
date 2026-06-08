'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'

interface LogoProps {
  variant?: 'icon' | 'full'
  size?: number
  className?: string
  withBackground?: boolean
}

/**
 * Atomic Logo component for AMMY LMS.
 * Handles variants for tab-style icons or full brand marks.
 */
export function Logo({ 
  variant = 'icon', 
  size = 32, 
  className, 
  withBackground = false 
}: LogoProps) {
  const src = variant === 'icon' ? '/image/Logo.png' : '/image/BrandLogo.png'
  
  const imageElement = (
    <Image
      src={src}
      alt="AMMY LMS Logo"
      width={size}
      height={size}
      className={cn("object-contain", className)}
      priority
    />
  )

  if (withBackground) {
    return (
      <div className="logo-square" style={{ '--logo-sz': `${size + 8}px` } as React.CSSProperties}>
        {imageElement}
      </div>
    )
  }

  return imageElement
}