'use client'
import { useState } from 'react'
import { FlashcardBlock as FlashcardBlockType } from '@/app/lms/types/module'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface FlashcardBlockProps {
  block: FlashcardBlockType
}

export default function FlashcardBlock({ block }: FlashcardBlockProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)

  const currentCard = block.cards[currentIndex]

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % block.cards.length)
    setFlipped(false)
  }

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + block.cards.length) % block.cards.length)
    setFlipped(false)
  }

  return (
    <div className="my-6">
      <div className="flex flex-col items-center">
        {/* Card face */}
        <button
          onClick={() => setFlipped(!flipped)}
          className="relative w-full max-w-md h-44 radius-lg border-standard cursor-pointer transition-all"
          style={{
            backgroundColor: flipped ? 'var(--accent)' : 'var(--color-bg-card)',
            boxShadow: flipped ? 'var(--shadow-accent)' : 'var(--shadow-sm)',
          }}
          aria-label={flipped ? 'Flip to front' : 'Flip to reveal answer'}
        >
          <div className="flex items-center justify-center h-full px-8">
            <p
              className="text-body weight-bold text-center"
              style={{ color: flipped ? 'var(--white)' : 'var(--color-text-heading)' }}
            >
              {flipped ? currentCard.back : currentCard.front}
            </p>
          </div>
        </button>

        {/* Flip hint + navigation */}
        <div className="mt-4 text-center">
          <p className="text-fine color-muted mb-3">
            {flipped ? 'Tap to flip back' : 'Tap to reveal answer'}
          </p>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={prevCard}
              disabled={block.cards.length <= 1}
              className="btn-ghost btn-icon"
              aria-label="Previous card"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="text-fine color-muted">
              {currentIndex + 1} / {block.cards.length}
            </span>
            <button
              onClick={nextCard}
              disabled={block.cards.length <= 1}
              className="btn-ghost btn-icon"
              aria-label="Next card"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
