'use client'
import { useState } from 'react'
import { QuizBlock as QuizBlockType } from '@/app/lms/types/module'
import { cn } from '@/lib/utils'

interface QuizBlockProps {
  block: QuizBlockType
  onAnswer: (correct: boolean) => void
}

export default function QuizBlock({ block, onAnswer }: QuizBlockProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [revealed, setRevealed] = useState(false)

  const handleOptionClick = (index: number) => {
    if (revealed) return
    setSelectedOption(index)
    setRevealed(true)
    onAnswer(index === block.answer)
  }

  const resetQuiz = () => {
    setSelectedOption(null)
    setRevealed(false)
  }

  const getOptionClass = (index: number) => {
    if (!revealed) {
      return 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer'
    }
    if (index === block.answer) {
      return 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
    }
    if (index === selectedOption && index !== block.answer) {
      return 'border-red-400 bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300'
    }
    return 'border-gray-200 dark:border-gray-700'
  }

  return (
    <div className="my-4">
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
          {block.question}
        </h3>
        <div className="space-y-2">
          {block.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(index)}
              className={cn(
                'w-full text-left border rounded-lg px-4 py-2.5 text-sm transition-colors',
                getOptionClass(index),
                'focus:ring-2 focus:ring-blue-500 focus:outline-none'
              )}
              disabled={revealed}
            >
              {option}
            </button>
          ))}
        </div>
        {revealed && (
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {block.explanation}
            </p>
            <button
              onClick={resetQuiz}
              className="mt-3 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
            >
              Try again
            </button>
          </div>
        )}
      </div>
    </div>
  )
}