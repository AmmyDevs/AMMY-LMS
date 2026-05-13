// ─── Parameter Schema Types ────────────────────────────────────────────────

export type ParameterType = 'slider' | 'select' | 'toggle'

export interface SelectOption {
  value: string
  label: string
}

export interface ParameterSchema {
  id: string
  label: string
  type: ParameterType
  default: number | string | boolean
  min?: number
  max?: number
  step?: number
  unit?: string
  options?: SelectOption[]
}

// ─── Effect Config Types ───────────────────────────────────────────────────

export interface EffectConfig {
  id: string
  title: string
  description: string
  pythonModule: 'noise' | 'filters' | 'transforms' | 'segmentation'
  pythonFunction: string
  parameters: ParameterSchema[]
  hint?: string
}

// ─── Progress & Store Types ────────────────────────────────────────────────

export interface ProgressEntry {
  completed: boolean
  lastParams: Record<string, unknown>
  timestamp: number
}

export interface LMSState {
  username: string | null
  setUsername: (name: string) => void
  clearUsername: () => void

  currentPath: string[]
  setCurrentPath: (path: string[]) => void

  progress: Record<string, ProgressEntry>
  setProgress: (key: string, data: Partial<ProgressEntry>) => void
  resetProgress: () => void

  theme: 'light' | 'dark' | null
  toggleTheme: () => void
  setTheme: (t: 'light' | 'dark') => void
}

// ─── Interactive Block State Machine ─────────────────────────────────────────

export type BlockState = 'idle' | 'ready' | 'processing' | 'done' | 'error'

export interface InteractiveBlockInternalState {
  blockState: BlockState
  uploadedFile: File | null
  originalUrl: string | null
  processedUrl: string | null
  currentParams: Record<string, unknown>
  errorMessage: string | null
  processingTimeMs: number | null
}

// ─── API Response Types ────────────────────────────────────────────────────

export interface ProcessSuccessResponse {
  processedImage: string
  metadata: {
    width: number
    height: number
    processingTimeMs: number
  }
}

export interface ProcessErrorResponse {
  error: string
}

export type ProcessResponse = ProcessSuccessResponse | ProcessErrorResponse

export function isProcessError(r: ProcessResponse): r is ProcessErrorResponse {
  return 'error' in r
}

// ─── Navigation Types ────────────────────────────────────────────────────────

export interface NavItem {
  id: string
  label: string
  slug: string
  type: 'lecture' | 'self-study' | 'further'
  children?: NavItem[]
}

export interface ContentModule {
  title: string
  subtitle: string
  description: string
  icon: string
  color: string
  items: {
    label: string
    slug: string
    type: 'lecture' | 'self-study' | 'further'
  }[]
}
