import { HeadingBlock as HeadingBlockType } from '@/app/lms/types/module'

interface HeadingBlockProps {
  block: HeadingBlockType
}

export default function HeadingBlock({ block }: HeadingBlockProps) {
  if (block.level === 2) {
    return (
      <h2 id={block.id} className="text-heading color-heading mt-10 mb-4">
        {block.text}
      </h2>
    )
  }

  return (
    <h3 id={block.id} className="text-subheading color-heading mt-8 mb-3">
      {block.text}
    </h3>
  )
}
