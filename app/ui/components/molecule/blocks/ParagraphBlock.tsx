import { ParagraphBlock as ParagraphBlockType } from '@/app/lms/types/module'

interface ParagraphBlockProps {
  block: ParagraphBlockType
}

export default function ParagraphBlock({ block }: ParagraphBlockProps) {
  return (
    <p className="text-body color-body mb-5 leading-relaxed">
      {block.text}
    </p>
  )
}
