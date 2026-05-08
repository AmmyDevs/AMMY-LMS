import { ParagraphBlock as ParagraphBlockType } from '@/app/lms/types/module'

interface ParagraphBlockProps {
  block: ParagraphBlockType
}

export default function ParagraphBlock({ block }: ParagraphBlockProps) {
  return (
    <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
      {block.text}
    </p>
  )
}