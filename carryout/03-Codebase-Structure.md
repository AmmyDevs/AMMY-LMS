# Codebase Structure

## 1. Directory Tree

```
ammy-lms/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (html, body, theme provider)
│   ├── page.tsx                  # Landing page (Hero + Footer)
│   ├── not-found.tsx             # Custom 404 page
│   │
│   ├── lms/                      # Student Dashboard (authenticated shell)
│   │   ├── layout.tsx            # LMS layout (TopBar + SideNav shell)
│   │   ├── page.tsx              # Dashboard home
│   │   ├── modules/              # Module listing & detail
│   │   │   ├── page.tsx          # All modules grid
│   │   │   └── [moduleCode]/
│   │   │       ├── page.tsx      # Module overview (lesson board)
│   │   │       └── [lessonId]/
│   │   │           └── page.tsx  # Individual lesson view
│   │   ├── assistant/            # AI Tutor (planned)
│   │   │   └── page.tsx
│   │   ├── assessment/           # Quizzes & assessments
│   │   │   └── page.tsx
│   │   ├── components/           # LMS-specific client components
│   │   │   └── ModulePageClient.tsx
│   │   ├── hooks/                # LMS-specific hooks
│   │   │   └── useModuleProgress.ts
│   │   └── types/                # LMS TypeScript interfaces
│   │       └── module.ts
│   │
│   ├── admin/                    # Admin / Design System Gallery
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── lib/                      # App-level shared code
│   │   ├── api/                  # API route stubs (empty)
│   │   ├── store.ts              # ⚠️ DUPLICATE — see lib/store.ts
│   │   ├── utils.ts              # ⚠️ DUPLICATE — see lib/utils.ts
│   │   ├── utils/
│   │   │   └── types/index.ts
│   │   ├── mock/                 # Mock data (content/index.ts)
│   │   ├── hooks/
│   │   │   └── use-mobile.ts
│   │   └── effects.ts
│   │
│   └── ui/                       # Component Library
│       ├── global.css            # Design System v2.0 (single source of truth)
│       ├── components.json       # ⚠️ STALE — references old paths
│       └── components/
│           ├── atomic/           # Primitives (50+ components)
│           │   ├── button.tsx    # Custom Button with CVA variants
│           │   ├── Logo.tsx      # AMMY brand logo
│           │   ├── ThemeToggle.tsx
│           │   ├── TopBar.tsx    # Dashboard header
│           │   ├── SideNav.tsx   # Dashboard sidebar nav
│           │   └── ...           # shadcn/ui components (being phased out)
│           ├── molecule/         # Composed UI patterns
│           │   ├── NavBar.tsx    # Landing page nav
│           │   ├── Hero.tsx      # Landing page hero
│           │   ├── Footer.tsx    # Landing page footer
│           │   ├── ModuleCard.tsx
│           │   ├── LessonBoard.tsx
│           │   ├── MarkdownRenderer.tsx
│           │   └── blocks/       # Content block renderers
│           │       ├── HeadingBlock.tsx
│           │       ├── ParagraphBlock.tsx
│           │       ├── QuizBlock.tsx
│           │       ├── CodeBlock.tsx
│           │       ├── CalloutBlock.tsx
│           │       ├── TableBlock.tsx
│           │       ├── DefinitionTableBlock.tsx
│           │       ├── ImageStepBlock.tsx
│           │       ├── InteractiveBlock.tsx
│           │       └── FlashcardBlock.tsx
│           └── system/           # Layout & orchestration
│               ├── Layout.tsx    # Root layout shell
│               ├── BlockRenderer.tsx
│               ├── ErrorBoundary.tsx
│               └── LoadingSkeleton.tsx
│
├── lib/                          # Shared utilities & data layer
│   ├── lms.ts                    # Server-side data functions (read JSON files)
│   ├── store.ts                  # Zustand global store (theme, user, progress)
│   ├── utils.ts                  # cn() helper (clsx + tailwind-merge)
│   └── utils/
│       └── types.ts              # Shared TypeScript types
│
├── content/                      # Static lesson content
│   └── lms/
│       └── CS6307/
│           ├── L1.json
│           ├── L2.json
│           └── L3.json
│
├── carryout/                     # Design & architecture docs (this directory)
│   ├── 00-Single-Source-of-Truth.md
│   ├── 01-UX-Dictionary.md
│   ├── 02-Architecture.md
│   ├── 03-Codebase-Structure.md
│   ├── 04-Business-Plan.md
│   ├── 05-Color-Palette.md
│   └── 06-Page-Architecture.md
│
├── public/                       # Static assets
│   ├── components.json           # ⚠️ STALE shadcn config
│   └── image/                    # Logo, hero images
│
├── scripts/                      # Build/utility scripts
│   └── docs-toggle.sh
│
├── docs/                         # Module registry
│   └── module.json               # All module metadata
│
├── package.json
├── tsconfig.json
├── next.config.js
├── eslint.config.js
├── postcss.config.mjs
├── jest.config.cjs
├── info.md                       # ⚠️ STALE — references Vite/React setup
├── commit.sh
└── README.md
```

## 2. Known Structural Issues

| Issue | Location | Action |
|-------|----------|--------|
| Duplicate store | `lib/store.ts` vs `app/lib/store.ts` | Consolidate to `lib/store.ts` |
| Duplicate utils | `lib/utils.ts` vs `app/lib/utils.ts` | Consolidate to `lib/utils.ts` |
| Stale components.json | `app/ui/components.json` | Remove or update |
| Stale public/components.json | `public/components.json` | Remove or update |
| Stale info.md | `info.md` | Remove or update |
| Path alias mismatch | `@/* → ./src/*` in tsconfig | Fix to `@/* → ./*` |
| Empty api stubs | `app/lib/api/.gitkeep` | Remove or implement |
| Empty hooks stubs | `app/ui/hooks/.gitkeep`, `app/lib/hooks/.gitkeep` | Remove or implement |

## 3. Naming Conventions

### Files & Folders
- **Components:** PascalCase (`Button.tsx`, `LessonBoard.tsx`)
- **Pages:** Next.js conventions (`page.tsx`, `layout.tsx`)
- **Utilities:** camelCase (`useModuleProgress.ts`, `lms.ts`)
- **Types:** camelCase (`module.ts`, `types.ts`)
- **Content:** UPPER-CASE (`CS6307/L1.json`)
- **Config:** lowercase (`next.config.js`, `tsconfig.json`)

### CSS Classes
- **Design tokens:** kebab-case (`--color-bg-page`, `--space-4`)
- **Semantic classes:** kebab-case (`surface-card`, `btn-primary`, `text-heading`)
- **Utility classes:** Tailwind utilities (`flex`, `items-center`, `gap-4`)
- **Component classes:** kebab-case with prefix (`btn-*`, `text-*`, `bg-*`, `radius-*`)

### Variables & Functions
- **Variables:** camelCase (`expandedLessons`, `moduleSlug`)
- **Interfaces:** PascalCase (`LessonItem`, `BlockRendererProps`)
- **Constants:** UPPER_SNAKE_CASE (`REGISTRY_PATH`, `CONTENT_ROOT`)
- **Event handlers:** `handle` prefix (`handleSubmit`, `handleLogin`)

### Import Order (enforced by ESLint)
1. React / Next.js
2. External libraries (lucide-react, zustand, etc.)
3. Internal `@/lib/*` utilities
4. Internal `@/app/*` components (atomic → molecule → system)
