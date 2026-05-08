import { InteractiveBlock as InteractiveBlockType } from '@/app/lms/types/module'

interface InteractiveBlockProps {
  block: InteractiveBlockType
}

export default function InteractiveBlock({ block }: InteractiveBlockProps) {
  return (
    <div className="border-2 border-dashed border-blue-300 dark:border-blue-700 bg-blue-50/50 dark:bg-blue-950/20 rounded-lg px-6 py-8 my-4 text-center min-h-32 flex flex-col justify-center">
      <div className="text-2xl mb-2">🎛️</div>
      <h3 className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-1">
        Interactive: {block.label}
      </h3>
      <p className="text-xs text-gray-400">
        Widget coming soon
      </p>
    </div>
  )
}