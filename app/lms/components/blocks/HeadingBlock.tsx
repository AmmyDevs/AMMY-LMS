import { HeadingBlock as HeadingBlockType } from '@/app/lms/types/module'

interface HeadingBlockProps {
  block: HeadingBlockType
}

export default function HeadingBlock({ block }: HeadingBlockProps) {
  const Tag = block.level === 2 ? 'h2' : 'h3'
  const className = block.level === 2
    ? 'text-xl font-semibold mt-8 mb-3 text-gray-900 dark:text-gray-100'
    : 'text-base font-medium mt-6 mb-2 text-gray-800 dark:text-gray-200'

  return (
    <Tag id={block.id} className={className}>
      {block.text}
    </Tag>
  )
}