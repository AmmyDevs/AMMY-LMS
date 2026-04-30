import { Moon, Sun } from 'lucide-react'
import { useLMSStore } from '@/lib/store'

export function ThemeToggle() {
  const { theme, toggleTheme } = useLMSStore()

  return (
    <button
      onClick={toggleTheme}
      className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-border bg-surface hover:bg-elevated transition-colors"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 text-brand" />
      ) : (
        <Moon className="w-4 h-4 text-brand" />
      )}
    </button>
  )
}
