# Architecture

## 1. Tech Stack

- **Frontend Framework:** Next.js 15 (App Router) with React 19
- **Language:** TypeScript 5.9 (strict mode)
- **Styling:** Tailwind CSS v4 (CSS-first config) + custom design system tokens in `global.css`
- **State Management:** Zustand (client-side, single store in `lib/store.ts`)
- **Data Fetching:** File-system based (JSON content files read server-side via `lib/lms.ts`)
- **Component Library:** Custom component system (atomic → molecule → system hierarchy)
  - Legacy: shadcn/ui components in `app/ui/components/atomic/` (being phased out)
  - Target: Bespoke components built on design system tokens
- **Forms:** React Hook Form + Zod validation
- **Icons:** Lucide React
- **Markdown:** react-markdown + remark-gfm
- **Charts:** Recharts
- **Theming:** next-themes + custom Zustand store toggle
- **Build:** Bun (package manager), Next.js built-in bundler
- **Testing:** Jest (configured, tests pending)

## 2. Data Flow

### Content Pipeline (Current — File-Based)
```
content/lms/{MODULE_CODE}/{LESSON}.json
        ↓
lib/lms.ts (server functions: getAllModules, getModuleByCode, getLessonContent)
        ↓
Next.js Server Components (app/lms/modules/[moduleCode]/page.tsx)
        ↓
Client Components (LessonBoard, BlockRenderer, QuizBlock, etc.)
        ↓
Zustand Store (progress tracking, theme, user state)
```

### Key Data Patterns
- **Module Registry:** `docs/module.json` — static list of all modules with metadata
- **Lesson Content:** `content/lms/{CODE}/{L1,L2,L3...}.json` — structured block-based content
- **User State:** Zustand store persisted to localStorage (theme, username, progress)
- **No backend API:** All data is file-system based, read at build/request time

### Future Data Flow (Post-Auth/DB Integration)
```
Client → Next.js API Routes → Database (Supabase/Firebase)
       → AI Provider (OpenAI/Anthropic)
       → File Storage (PDF/PPTX downloads)
```

## 3. Component Hierarchy

### Three-Tier Architecture
```
atomic/     → Primitives (Button, Input, Card, Dialog, etc.)
               Stateless, theme-aware, built on design tokens
               Legacy: shadcn/ui wrappers. Target: custom implementations

molecule/   → Composed UI (NavBar, Hero, Footer, LessonBoard, ModuleCard)
               Combine atomic primitives into feature-specific patterns
               May contain light state (expanded/collapsed, form inputs)

system/     → Layout & Orchestration (Layout, BlockRenderer, ErrorBoundary)
               Page-level shell, routing logic, error boundaries
               Manages theme application and navigation structure
```

### Separation of Concerns
- **Atomic:** Pure presentational. No business logic. Accept props, render UI.
- **Molecule:** Feature-aware. May use hooks, manage local UI state.
- **System:** Layout-aware. Reads pathname, manages global UI structure.

### Block Rendering System
```
BlockRenderer (system/)
  → HeadingBlock (molecule/blocks/)
  → ParagraphBlock
  → CalloutBlock
  → DefinitionTableBlock
  → TableBlock
  → ImageStepBlock
  → CodeBlock
  → InteractiveBlock
  → QuizBlock
  → FlashcardBlock
```

## 4. Third-Party Integrations

### Current
- **Lucide React:** Icon library (consistent stroke-based icons)
- **Recharts:** Charting for future analytics/progress dashboards
- **react-markdown + remark-gfm:** Markdown rendering for lesson content
- **Radix UI Primitives:** Foundation for atomic components (via shadcn — being replaced)

### Planned (Post-Polish Phase)
- **AI Provider:** OpenAI or Anthropic API for AI tutor assistant
- **Authentication:** Supabase Auth or NextAuth.js
- **Database:** Supabase (PostgreSQL) or Firebase Firestore
- **File Storage:** Supabase Storage or Cloudflare R2 (PDF/PPTX downloads)
- **Analytics:** PostHog or Vercel Analytics (usage tracking)

## 5. Path Aliases

```json
{
  "@/*":     "./src/*",       // ⚠️ NOTE: tsconfig maps to ./src but code uses ./app and ./lib
  "@/app/*": "./app/*",       // Primary app routes and UI components
  "@/lib/*": "./lib/*",       // Shared utilities, store, types, LMS data functions
  "@/hooks/*": "./app/lib/hooks/*"  // Custom hooks
}
```

**Known Issue:** `tsconfig.json` base `@/*` maps to `./src/*` which doesn't exist. Most imports use `@/app/*` or `@/lib/*` directly. This should be cleaned up during refactoring.
