import { useRef, useState, useCallback, useEffect } from 'react'
import { MoveHorizontal } from 'lucide-react'
import Image from 'next/image'

interface CompareSliderProps {
  originalUrl: string
  processedUrl: string
  defaultPosition?: number
  orientation?: 'horizontal'
  onPositionChange?: (position: number) => void
}

export function CompareSlider({
  originalUrl,
  processedUrl,
  defaultPosition = 50,
  onPositionChange,
}: CompareSliderProps) {
  const [position, setPosition] = useState(defaultPosition)
  const [isDragging, setIsDragging] = useState(false)
  const [pointerId, setPointerId] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      if (!isDragging || !containerRef.current) return
      e.preventDefault()
      const rect = containerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const pct = Math.max(0, Math.min(100, (x / rect.width) * 100))
      setPosition(pct)
      onPositionChange?.(pct)
    },
    [isDragging, onPositionChange]
  )

  const handlePointerUp = useCallback(() => {
    setIsDragging(false)
    if (containerRef.current && pointerId !== null) {
      containerRef.current.releasePointerCapture(pointerId)
      setPointerId(null)
      try {
        // releasePointerCapture might throw if not captured
      } catch { /* ignore */ }
    }
  }, [pointerId])

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('pointermove', handlePointerMove)
      window.addEventListener('pointerup', handlePointerUp)
      return () => {
        window.removeEventListener('pointermove', handlePointerMove)
        window.removeEventListener('pointerup', handlePointerUp)
      }
    }
  }, [isDragging, handlePointerMove, handlePointerUp])

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true)
    setPointerId(e.pointerId)
    if (containerRef.current) {
      containerRef.current.setPointerCapture(e.pointerId)
    }
    const rect = containerRef.current!.getBoundingClientRect()
    const x = e.clientX - rect.left
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setPosition(pct)
    onPositionChange?.(pct)
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/3] overflow-hidden radius-md border-standard bg-page cursor-crosshair select-none touch-none"
      onPointerDown={handlePointerDown}
    >
      {/* Original image (bottom layer) */}
      <Image
        src={originalUrl}
        alt="Original"
        fill
        unoptimized
        className="object-contain"
        draggable={false}
      />

      {/* Processed image (top layer, clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 0 0 ${position}%)` }}
      >
        <Image
          src={processedUrl}
          alt="Processed"
          fill
          unoptimized
          className="object-contain"
          draggable={false}
        />
      </div>

      {/* Divider line + handle */}
      <div
        className="absolute top-0 bottom-0 w-0.5"
        style={{ left: `${position}%`, transform: 'translateX(-50%)', backgroundColor: 'var(--accent)' }}
      >
        {/* Drag handle — 44×44 min touch target */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 radius-pill flex items-center justify-center"
          style={{ backgroundColor: 'var(--accent)', boxShadow: 'var(--shadow-lg)' }}
        >
          <MoveHorizontal className="w-5 h-5 text-white" />
        </div>
      </div>

      {/* Labels */}
      <div
        className="absolute top-3 left-3 px-2 py-1 radius-xs text-fine weight-bold text-white"
        style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
      >
        Original
      </div>
      <div
        className="absolute top-3 right-3 px-2 py-1 radius-xs text-fine weight-bold text-white"
        style={{ backgroundColor: 'rgba(var(--accent-rgb), 0.8)' }}
      >
        Processed
      </div>
    </div>
  )
}
