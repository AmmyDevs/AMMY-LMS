import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { LMSState } from '@/lib/utils/types'

export const useLMSStore = create<LMSState>()(
  persist(
    (set) => ({
      username: null,
      setUsername: (name) => set({ username: name }),
      clearUsername: () => set({ username: null }),

      currentPath: [],
      setCurrentPath: (path) => set({ currentPath: path }),

      progress: {},
      setProgress: (key, data) =>
        set((s) => ({
          progress: {
            ...s.progress,
            [key]: { ...s.progress[key], ...data },
          },
        })),
      resetProgress: () => set({ progress: {} }),

      theme: 'dark',
      toggleTheme: () => set((s) => ({ theme: s.theme === 'dark' ? 'light' : 'dark' })),
      setTheme: (t) => set({ theme: t }),
    }),
    {
      name: 'ammy-lms-v1',
      version: 1,
    }
  )
)
