'use client'

import { useState } from 'react'
import { clsx } from 'clsx'
import { RotateCcw } from 'lucide-react'

interface FlashcardProps {
  front: string
  back: string
  frontLabel?: string
  backLabel?: string
  className?: string
}

function Flashcard({ front, back, frontLabel = 'Question', backLabel = 'Answer', className }: FlashcardProps) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className={clsx('g-flashcard', flipped && 'g-flashcard--flipped', className)}
      onClick={() => setFlipped(f => !f)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          setFlipped(f => !f)
        }
      }}
      aria-label={`Flashcard. ${flipped ? 'Showing answer' : 'Showing question'}. Click to flip.`}
    >
      <div className="g-flashcard__inner">
        {/* Front */}
        <div className="g-flashcard__face g-flashcard__front">
          <span className="g-flashcard__label">{frontLabel}</span>
          <p className="g-flashcard__text">{front}</p>
          <span className="g-flashcard__hint">
            <RotateCcw size={12} />
            Click to reveal
          </span>
        </div>
        {/* Back */}
        <div className="g-flashcard__face g-flashcard__back">
          <span className="g-flashcard__label">{backLabel}</span>
          <p className="g-flashcard__text">{back}</p>
          <span className="g-flashcard__hint">
            <RotateCcw size={12} />
            Click to flip back
          </span>
        </div>
      </div>
    </div>
  )
}

export { Flashcard }
export type { FlashcardProps }
