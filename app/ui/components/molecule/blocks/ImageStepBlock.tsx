import { ImageStepBlock as ImageStepBlockType } from '@/app/lms/types/module'

interface ImageStepBlockProps {
  block: ImageStepBlockType
}

export default function ImageStepBlock({ block }: ImageStepBlockProps) {
  return (
    <div className="my-6">
      {block.steps.map((step, index) => (
        <div key={step.number} className="relative flex gap-5 pb-8 last:pb-0">
          {/* Step number + connector line */}
          <div className="flex flex-col items-center flex-shrink-0">
            <div
              className="w-8 h-8 radius-pill flex items-center justify-center text-fine weight-bold"
              style={{
                backgroundColor: 'var(--tone-info-bg)',
                color: 'var(--tone-info-text)',
                border: '1px solid var(--tone-info-text)',
              }}
            >
              {step.number}
            </div>
            {index < block.steps.length - 1 && (
              <div
                className="w-px flex-1 mt-2"
                style={{ backgroundColor: 'var(--color-border)' }}
              />
            )}
          </div>

          {/* Step content */}
          <div className="flex-1 min-w-0 pb-2">
            <h4 className="text-caption weight-bold color-heading mb-1">
              {step.title}
            </h4>
            <p className="text-caption color-body leading-relaxed">
              {step.text}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
