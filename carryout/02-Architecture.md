# Architecture

## 1. Tech Stack

- **Frontend Framework:** Next.js 15 (App Router) with React 19
- **Language:** TypeScript 5.9 (strict mode)
- **Styling:** Tailwind CSS v4 (CSS-first config) + custom design system tokens in `app/ui/global.css`
- **State Management:** Zustand (client-side, single store in `lib/store.ts`)
- **Data Fetching:** Data Abstraction Layer (Server-side rendering via `lib/api/modules.ts`)
- **Component Library:** Custom component system built strictly on design system tokens. (No shadcn/ui).
  - `atomic/` → Primitives
  - `molecule/` → Composed UI
  - `system/` → Layouts
- **Content Engine:** MDX (Markdown + JSX components) for polished, interactive lesson content.
- **Icons:** Lucide React
- **Theming:** next-themes + custom Zustand store toggle
- **Build:** Bun (package manager), Next.js built-in bundler

## 2. Data Flow

### Content Pipeline (v1.0 — Single File Backend)
```
content/lms/{MODULE_CODE}/{LESSON}.mdx
        ↓
lib/api/modules.ts (Data Abstraction Layer: getModuleByCode, getLessonContent)
        ↓
Next.js Server Components (app/lms/modules/[moduleCode]/page.tsx)
        ↓
Client Components (LessonBoard, MDXRenderer, QuizBlock, etc.)
        ↓
Zustand Store (progress tracking, theme, user state)
```

### Key Data Patterns
- **Module Registry:** `docs/module.json` — static list of all modules with metadata.
- **Lesson Content:** `content/lms/{CODE}/{L1,L2,L3...}.mdx` — markdown content with embedded interactive React components.
- **User State:** Zustand store persisted to localStorage (theme, username, progress).
- **Data Abstraction Layer:** All fetches go through an API interface (`lib/api/`) which currently reads local MDX files, but is decoupled from UI so it can easily swap to a DB later.

### Future Data Flow (Post-v1.0 DB Integration)
```
Client → lib/api/ → Database (Supabase/Firebase)
                  → AI Provider (OpenAI/Anthropic)
                  → File Storage (PDF/PPTX downloads)
```

## 3. Component Hierarchy

### Three-Tier Architecture
```
ui/components/
├── atomic/     → Primitives (Button, Input, Card, Dialog, etc.)
│                  Stateless, theme-aware, built explicitly on global.css design tokens.
│
├── molecule/   → Composed UI (NavBar, Hero, Footer, LessonBoard, ModuleCard)
│                  Combine atomic primitives into feature-specific patterns.
│                  May contain light state (expanded/collapsed, form inputs).
│
└── system/     → Layout & Orchestration (Layout, MDXRenderer, ErrorBoundary)
                   Page-level shell, routing logic, error boundaries.
                   Manages theme application and navigation structure.
```

### Separation of Concerns
- **Atomic:** Pure presentational. No business logic. Accept props, render UI.
- **Molecule:** Feature-aware. May use hooks, manage local UI state.
- **System:** Layout-aware. Reads pathname, manages global UI structure.

## 4. Third-Party Integrations

### Current
- **Lucide React:** Icon library (consistent stroke-based icons)
- **MDX / react-markdown:** Markdown rendering with embedded custom UI blocks.

### Planned (Version 1.1+)
- **Progressive Web App (PWA):** Service worker caching for offline access.
- **AI Provider:** OpenAI or Anthropic API for an integrated AI tutor assistant.
- **Authentication:** Supabase Auth or NextAuth.js
- **Database:** Supabase (PostgreSQL) or Firebase Firestore

## 5. Path Aliases

```json
{
  "@/*":     "./*",           // Root directory mapping
  "@/app/*": "./app/*",       // Primary app routes and UI components
  "@/lib/*": "./lib/*",       // Shared utilities, store, types, API functions
  "@/hooks/*": "./lib/hooks/*"// Custom hooks
}
```
