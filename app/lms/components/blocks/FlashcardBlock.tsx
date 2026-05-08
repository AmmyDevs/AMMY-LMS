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

  const flipCard = () => {
    setFlipped(!flipped)
  }

  return (
    <div className="my-4">
      <div className="flex flex-col items-center">
        <div
          className="relative w-full max-w-md h-40 cursor-pointer"
          onClick={flipCard}
        >
          <div className="relative w-full h-full transition-all duration-300">
            {flipped ? (
              <div className="w-full h-full bg-blue-600 text-white rounded-xl shadow-sm flex items-center justify-center p-6">
                <p className="text-center font-medium">
                  {currentCard.back}
                </p>
              </div>
            ) : (
              <div className="w-full h-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm flex items-center justify-center p-6">
                <p className="text-center text-gray-900 dark:text-gray-100 font-medium">
                  {currentCard.front}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-400 mb-2">
            {flipped ? 'Tap to flip back' : 'Tap to reveal'}
          </p>
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={prevCard}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
              disabled={block.cards.length <= 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs text-gray-500">
              {currentIndex + 1} / {block.cards.length}
            </span>
            <button
              onClick={nextCard}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
              disabled={block.cards.length <= 1}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}