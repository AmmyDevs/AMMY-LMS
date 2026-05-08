import { readFile, readdir } from 'fs/promises'
import path from 'path'
import { LessonContent } from '@/app/lms/types/module'

export interface ModuleRegistryItem {
  code: string
  name: string
  lecturer: string | null
  creditHours: number | null
  schedule: Array<{
    day: string
    startTime: string
    endTime: string
    venue: string
  }>
}

export interface ModuleRegistry {
  modules: ModuleRegistryItem[]
}

const REGISTRY_PATH = path.join(process.cwd(), 'docs', 'module.json')
const CONTENT_ROOT = path.join(process.cwd(), 'content', 'lms')

/**
 * Get all modules from the registry
 */
export async function getAllModules(): Promise<ModuleRegistryItem[]> {
  try {
    const raw = await readFile(REGISTRY_PATH, 'utf-8')
    const registry = JSON.parse(raw) as ModuleRegistry
    return registry.modules
  } catch (error) {
    console.error('Error reading module registry:', error)
    return []
  }
}

/**
 * Get a specific module by its code (e.g., "CS 6307")
 */
export async function getModuleByCode(code: string): Promise<ModuleRegistryItem | null> {
  const modules = await getAllModules()
  // Normalize code for comparison (remove spaces)
  const normalizedSearch = code.replace(/\s+/g, '').toUpperCase()
  return modules.find(m => m.code.replace(/\s+/g, '').toUpperCase() === normalizedSearch) || null
}

/**
 * Get all lessons available for a module by scanning its content directory
 */
export async function getLessonsForModule(code: string): Promise<string[]> {
  // Normalize code for folder lookup (remove spaces, e.g., "CS6307")
  const normalizedCode = code.replace(/\s+/g, '').toUpperCase()
  const moduleDir = path.join(CONTENT_ROOT, normalizedCode)
  
  try {
    const files = await readdir(moduleDir)
    return files
      .filter(f => f.endsWith('.json'))
      .map(f => f.replace('.json', ''))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  } catch {
    return []
  }
}

/**
 * Get the content of a specific lesson
 */
export async function getLessonContent(code: string, lessonId: string): Promise<LessonContent | null> {
  const normalizedCode = code.replace(/\s+/g, '').toUpperCase()
  const filePath = path.join(CONTENT_ROOT, normalizedCode, `${lessonId}.json`)
  
  try {
    const raw = await readFile(filePath, 'utf-8')
    return JSON.parse(raw) as LessonContent
  } catch {
    return null
  }
}
