import { ImageStepBlock as ImageStepBlockType } from '@/app/lms/types/module'

interface ImageStepBlockProps {
  block: ImageStepBlockType
}

export default function ImageStepBlock({ block }: ImageStepBlockProps) {
  return (
    <div className="my-4">
      {block.steps.map((step, index) => (
        <div key={step.number} className="relative flex gap-4 pb-6 last:pb-0">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-sm font-bold flex items-center justify-center shrink-0">
              {step.number}
            </div>
            {index < block.steps.length - 1 && (
              <div className="w-px bg-gray-200 dark:bg-gray-700 flex-1 mt-2" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">
              {step.title}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {step.text}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}