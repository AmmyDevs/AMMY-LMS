// Block types — one per visual component
export type BlockType =
  | 'heading'
  | 'paragraph'
  | 'callout'
  | 'definition_table'
  | 'table'
  | 'image_step'
  | 'code'
  | 'interactive'
  | 'quiz'
  | 'flashcard'

export type CalloutVariant = 'tip' | 'key' | 'important' | 'analogy' | 'warning'

// Base — every block must have these two fields
export interface BaseBlock {
  id: string        // Format: "{moduleId}-{lessonIndex}-b{blockIndex}" e.g. "L1-1-b3"
  type: BlockType
}

export interface HeadingBlock extends BaseBlock {
  type: 'heading'
  level: 1 | 2 | 3
  text: string
}

export interface ParagraphBlock extends BaseBlock {
  type: 'paragraph'
  text: string
}

export interface CalloutBlock extends BaseBlock {
  type: 'callout'
  variant: CalloutVariant
  title: string
  text: string
}

export interface DefinitionRow {
  term: string
  description: string
}

export interface DefinitionTableBlock extends BaseBlock {
  type: 'definition_table'
  title: string
  rows: DefinitionRow[]
}

export interface TableBlock extends BaseBlock {
  type: 'table'
  caption?: string
  headers: string[]
  rows: string[][]
}

export interface StepItem {
  number: number
  title: string
  text: string
}

export interface ImageStepBlock extends BaseBlock {
  type: 'image_step'
  steps: StepItem[]
}

export interface CodeBlock extends BaseBlock {
  type: 'code'
  language: string
  label?: string
  code: string
}

export interface InteractiveBlock extends BaseBlock {
  type: 'interactive'
  widgetId: string
  label: string
}

export interface QuizBlock extends BaseBlock {
  type: 'quiz'
  question: string
  options: string[]
  answer: number        // zero-based index of the correct option
  explanation: string
}

export interface FlashcardItem {
  front: string
  back: string
}

export interface FlashcardBlock extends BaseBlock {
  type: 'flashcard'
  cards: FlashcardItem[]
}

export type Block =
  | HeadingBlock
  | ParagraphBlock
  | CalloutBlock
  | DefinitionTableBlock
  | TableBlock
  | ImageStepBlock
  | CodeBlock
  | InteractiveBlock
  | QuizBlock
  | FlashcardBlock

// Lesson — a named section within a module containing an ordered array of blocks
export interface Lesson {
  id: string          // Format: "{moduleId}-{lessonIndex}" e.g. "L1-2"
  title: string
  blocks: Block[]
}

// LessonContent — the shape of an individual lesson JSON file (e.g., L1.json)
export interface LessonContent {
  moduleId: string              // The Lesson ID, e.g., "L1"
  title: string
  course: string                // The Course Name
  lecturer: string
  date: string | null
  estimatedMinutes: number
  lessons: Lesson[]             // Sections within the lesson
}

// Progress — stored in localStorage, keyed by moduleId
export interface LessonProgress {
  lessonId: string
  completed: boolean            // true when the student has scrolled past the last block
  quizScores: Record<string, boolean>   // blockId → correct?
  visitedAt: string | null      // ISO timestamp of first visit
}

export interface ModuleProgress {
  moduleId: string
  lessons: Record<string, LessonProgress>   // lessonId → progress
  lastLessonId: string | null               // resume point
  completedAt: string | null
}