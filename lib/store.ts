import { create } from 'zustand'

interface LMSStore {
  theme: 'light' | 'dark'
  userName: string
  username: string
  progress: Record<string, Record<string, unknown>>
  currentPath: string[]
  setTheme: (theme: 'light' | 'dark') => void
  toggleTheme: () => void
  setUsername: (name: string) => void
  setCurrentPath: (path: string[]) => void
  setProgress: (key: string, data: Record<string, unknown>) => void
}

export const useLMSStore = create<LMSStore>((set) => ({
  theme: 'light',
  userName: '',
  username: '',
  progress: {},
  currentPath: [],
  setTheme: (theme) => set({ theme }),
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
  setUsername: (name) => set({ userName: name, username: name }),
  setCurrentPath: (path) => set({ currentPath: path }),
  setProgress: (key, data) => set((state) => ({
    progress: { ...state.progress, [key]: { ...state.progress[key], ...data } }
  })),
}))