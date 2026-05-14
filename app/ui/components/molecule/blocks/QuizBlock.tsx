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
      return 'border-standard bg-card hover:bg-hover cursor-pointer'
    }
    if (index === block.answer) {
      return 'border-accent pill-success' // pill-success class might need adjustment or we use inline
    }
    if (index === selectedOption && index !== block.answer) {
      return 'border-standard pill-danger'
    }
    return 'border-standard opacity-50'
  }

  const getOptionStyle = (index: number) => {
    if (!revealed) return {}
    if (index === block.answer) {
      return { borderColor: 'var(--tone-success-text)', backgroundColor: 'var(--tone-success-bg)', color: 'var(--tone-success-text)' }
    }
    if (index === selectedOption && index !== block.answer) {
      return { borderColor: 'var(--tone-danger-text)', backgroundColor: 'var(--tone-danger-bg)', color: 'var(--tone-danger-text)' }
    }
    return {}
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
              className={cn(
                'w-full text-left border radius-md px-5 py-3 text-body transition-all duration-200',
                getOptionClass(index)
              )}
              style={getOptionStyle(index)}
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