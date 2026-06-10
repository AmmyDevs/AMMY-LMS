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
│   │   ├── assistant/            # AI Tutor (planned v1.1)
│   │   │   └── page.tsx
│   │   ├── assessment/           # Quizzes & assessments
│   │   │   └── page.tsx
│   │   ├── hooks/                # LMS-specific hooks
│   │   │   └── useModuleProgress.ts
│   │   └── types/                # LMS TypeScript interfaces
│   │       └── module.ts
│   │
│   ├── admin/                    # Admin / Design System Gallery
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── testing/                  # Isolated Testing Sandbox
│   │   └── page.tsx              # Safe testing environment (standalone CSS/components)
│   │
│   └── ui/                       # Component Library (Custom Tokens)
│       ├── global.css            # Design System v2.0 (single source of truth)
│       ├── testing/              # Safely isolated test components (LandingNav, Hero, etc.)
│       └── components/           # (To be rebuilt)
│           ├── atomic/           # Primitives (Button, Input, Card, Dialog, etc.)
│           ├── molecule/         # Composed UI patterns (NavBar, Hero, Footer, LessonBoard)
│           └── system/           # Layout & orchestration (Layout, MDXRenderer, ErrorBoundary)
│
├── lib/                          # Shared utilities & data layer
│   ├── api/                      # Data Abstraction Layer
│   │   └── modules.ts            # Data fetching logic
│   ├── store.ts                  # Zustand global store (theme, user, progress)
│   ├── utils.ts                  # cn() helper (clsx + tailwind-merge)
│   ├── hooks/                    # App-wide hooks
│   │   └── use-mobile.ts
│   └── utils/
│       └── types.ts              # Shared TypeScript types
│
├── content/                      # Static lesson content
│   └── lms/
│       └── CS6307/
│           ├── L1.mdx
│           ├── L2.mdx
│           └── L3.mdx
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
├── commit.sh
└── README.md
```

## 2. Naming Conventions

### Files & Folders
- **Components:** PascalCase (`Button.tsx`, `LessonBoard.tsx`)
- **Pages:** Next.js conventions (`page.tsx`, `layout.tsx`)
- **Utilities:** camelCase (`useModuleProgress.ts`, `api/modules.ts`)
- **Types:** camelCase (`module.ts`, `types.ts`)
- **Content:** UPPER-CASE (`CS6307/L1.mdx`)
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
