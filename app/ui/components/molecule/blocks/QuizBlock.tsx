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
    const base = 'quiz-option'
    if (!revealed) return base
    if (index === block.answer) return cn(base, 'quiz-option-correct')
    if (index === selectedOption && index !== block.answer) return cn(base, 'quiz-option-wrong')
    return cn(base, 'quiz-option-dimmed')
  }

  return (
    <div className="my-8 animate-fade-up">
      <div className="surface-card bg-mesh p-8">
        <h3 className="text-subheading color-heading mb-6">
          {block.question}
        </h3>
        <div className="grid gap-3">
          {block.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(index)}
              className={getOptionClass(index)}
              disabled={revealed}
            >
              <div className="row gap-item">
                <span className="text-label opacity-40">{String.fromCharCode(65 + index)}.</span>
                <span className="weight-bold">{option}</span>
              </div>
            </button>
          ))}
        </div>
        {revealed && (
          <div className="bg-surface radius-md p-6 mt-8 animate-fade-up">
            <p className="text-body color-body mb-4">
              <span className="text-label block mb-1">Explanation</span>
              {block.explanation}
            </p>
            <button
              onClick={resetQuiz}
              className="btn-secondary btn-sm"
            >
              Try again
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
