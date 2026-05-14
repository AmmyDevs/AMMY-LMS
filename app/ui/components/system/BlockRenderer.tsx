'use client'
import { Block } from '@/app/lms/types/module'
import HeadingBlock from '../molecule/blocks/HeadingBlock'
import ParagraphBlock from '../molecule/blocks/ParagraphBlock'
import CalloutBlock from '../molecule/blocks/CalloutBlock'
import DefinitionTableBlock from '../molecule/blocks/DefinitionTableBlock'
import TableBlock from '../molecule/blocks/TableBlock'
import ImageStepBlock from '../molecule/blocks/ImageStepBlock'
import CodeBlock from '../molecule/blocks/CodeBlock'
import InteractiveBlock from '../molecule/blocks/InteractiveBlock'
import QuizBlock from '../molecule/blocks/QuizBlock'
import FlashcardBlock from '../molecule/blocks/FlashcardBlock'

interface BlockRendererProps {
  block: Block
  lessonId: string
  onQuizAnswer?: (blockId: string, correct: boolean) => void
}

export default function BlockRenderer({ block, onQuizAnswer }: BlockRendererProps) {
  switch (block.type) {
    case 'heading':
      return <HeadingBlock block={block} />
    case 'paragraph':
      return <ParagraphBlock block={block} />
    case 'callout':
      return <CalloutBlock block={block} />
    case 'definition_table':
      return <DefinitionTableBlock block={block} />
    case 'table':
      return <TableBlock block={block} />
    case 'image_step':
      return <ImageStepBlock block={block} />
    case 'code':
      return <CodeBlock block={block} />
    case 'interactive':
      return <InteractiveBlock block={block} />
    case 'quiz':
      return <QuizBlock block={block} onAnswer={(correct) => onQuizAnswer?.(block.id, correct)} />
    case 'flashcard':
      return <FlashcardBlock block={block} />
    default:
      // Never silently skip unknown block types
      console.warn(`BlockRenderer: unknown block type "${(block as Block).type}"`)
      return null
  }
}