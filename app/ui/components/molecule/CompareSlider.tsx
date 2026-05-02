import { useRef, useState, useCallback, useEffect } from 'react'
import { MoveHorizontal } from 'lucide-react'

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
    if (containerRef.current) {
      containerRef.current.releasePointerCapture
      try {
        // releasePointerCapture might throw if not captured
      } catch { /* ignore */ }
    }
  }, [])

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
      className="relative w-full aspect-[4/3] overflow-hidden rounded-lg border border-border bg-page cursor-crosshair select-none touch-none"
      onPointerDown={handlePointerDown}
    >
      {/* Original image (bottom layer) */}
      <img
        src={originalUrl}
        alt="Original"
        className="absolute inset-0 w-full h-full object-contain"
        draggable={false}
      />

      {/* Processed image (top layer, clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 0 0 ${position}%)` }}
      >
        <img
          src={processedUrl}
          alt="Processed"
          className="absolute inset-0 w-full h-full object-contain"
          draggable={false}
        />
      </div>

      {/* Divider line + handle */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-brand"
        style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
      >
        {/* Drag handle - 44x44 min touch target */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-brand shadow-lg flex items-center justify-center"
        >
          <MoveHorizontal className="w-5 h-5 text-white" />
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-3 left-3 px-2 py-1 rounded bg-black/60 text-white text-xs font-medium">
        Original
      </div>
      <div className="absolute top-3 right-3 px-2 py-1 rounded bg-brand/80 text-white text-xs font-medium">
        Processed
      </div>
    </div>
  )
}
