# Page Architecture

This defines the structural skeleton of AMMY's Archives. The agent must build all new pages to fit within this layout system.

## 1. The Global Shell

### Landing Page (`/`)
No persistent shell — standalone page with its own navigation.

```
┌─────────────────────────────────────┐
│ NavBar (sticky, frosted glass)      │
├─────────────────────────────────────┤
│ Hero Section                        │
│   ├── Left: Copy + CTA + Stats      │
│   └── Right: Illustration + Badges  │
├─────────────────────────────────────┤
│ [FEATURE SECTIONS — TBD]            │
├─────────────────────────────────────┤
│ Footer                              │
└─────────────────────────────────────┘
```

### Student Dashboard (`/lms/*`)
Authenticated shell with persistent navigation.

```
┌─────────────────────────────────────┐
│ TopBar (sticky, frosted glass)      │
├────────┬────────────────────────────┤
│ SideNav│ Main Content Canvas        │
│ (280px)│   (scrollable)             │
│        │                            │
│ Desktop│   Page Header (H1 + crumbs)│
│ visible│   Page Content             │
│        │                            │
│ Mobile │                            │
│ hidden │                            │
│ (🍔)   │                            │
└────────┴────────────────────────────┘
```

## 2. Layout Levels

### Level 1: Navigation Layer
- **Landing NavBar:** Brand + ThemeToggle + CTA button. Frosted glass, fixed.
- **Dashboard TopBar:** Brand + mobile hamburger + ThemeToggle + user profile. Frosted glass, fixed.
- **Dashboard SideNav:** Vertical nav links (Dashboard, Modules, Assistant, Assessment). Sticky, 280px.

### Level 2: Context Layer
- **Page Header:** H1 title + breadcrumb trail + optional description
- **Consistent spacing:** `mb-12` after header, `mb-8` after breadcrumbs

### Level 3: Content Layer
- **Main Canvas:** Scrollable area with standard max-width (1280px) and padding
- **Standard padding:** `--pad-page-y` (48px vertical), `--pad-page-x` (24px horizontal, 40px on desktop)

## 3. Standard Layout Patterns

### Grid Layout (Module Cards)
```
.grid-auto — repeat(auto-fit, minmax(240px, 1fr))
```
- Used for: Module card grid, feature cards
- Responsive: auto-collapses to single column on mobile

### Detail Layout (Lesson View)
```
┌─────────────────────────────────────┐
│ Module Header (code pill + title)   │
├─────────────────────────────────────┤
│ LessonBoard (accordion)             │
│   ├── Lesson 1 (expandable)         │
│   │   ├── Topic 1 → Start/Continue  │
│   │   └── Topic 2 → Start/Continue  │
│   └── Lesson 2 (expandable)         │
└─────────────────────────────────────┘
```

### Block Content Layout (Individual Lesson)
```
┌─────────────────────────────────────┐
│ Breadcrumbs                         │
│ Lesson Title (H1)                   │
├─────────────────────────────────────┤
│ HeadingBlock                        │
│ ParagraphBlock                      │
│ CodeBlock                           │
│ CalloutBlock                        │
│ QuizBlock (interactive)             │
│ FlashcardBlock (interactive)        │
│ ...                                 │
└─────────────────────────────────────┘
```

## 4. Landing Page Architecture (Full Redesign — v2.0)

### Target Sections
```
┌─────────────────────────────────────┐
│ 1. NAVBAR                           │
│    Brand · Theme · CTA              │
├─────────────────────────────────────┤
│ 2. HERO                             │
│    Headline · Sub · CTA Form        │
│    + Feature Badges (floating)      │
├─────────────────────────────────────┤
│ 3. FEATURES                         │
│    3-column grid of key features    │
│    Study Notes · AI Tutor · Quizzes │
├─────────────────────────────────────┤
│ 4. HOW IT WORKS                     │
│    Step-by-step (1-2-3)             │
│    Enter Name → Pick Module → Learn │
├─────────────────────────────────────┤
│ 5. MODULE SHOWCASE                  │
│    Grid of available modules        │
│    with code, name, lecturer        │
├─────────────────────────────────────┤
│ 6. CTA BANNER                       │
│    Final conversion push            │
│    "Start Learning Today"           │
├─────────────────────────────────────┤
│ 7. FOOTER                           │
│    Brand · Links · Copyright        │
└─────────────────────────────────────┘
```

### Design Principles for Landing Page
- **Premium feel:** Glass morphism, gradient accents, subtle animations
- **Mobile-first:** Every section must look excellent on phones
- **Performance:** No heavy images above the fold, lazy-load below
- **Accessibility:** Skip-to-content link, proper heading hierarchy, focus management

## 5. Responsive Rules

### Breakpoints
- **Desktop (>1024px):** Full sidebar, multi-column grids, floating badges
- **Tablet (768px–1024px):** Collapsed sidebar (hamburger), 2-column grids
- **Mobile (<768px):** Hidden sidebar, single column, full-width stacking

### Key Responsive Behaviors
| Element | Desktop | Tablet | Mobile |
|---------|---------|--------|--------|
| SideNav | Visible (280px) | Hidden (hamburger) | Hidden (hamburger) |
| NavBar | Brand + Actions | Brand + Actions | Brand + Hamburger |
| Hero Grid | 2 columns | 2 columns (compressed) | Single column (stacked) |
| Module Grid | 3-4 columns | 2 columns | 1 column |
| Footer Grid | 4 columns | 2 columns | 1 column |
| Page Padding | 40px horizontal | 24px horizontal | 16px horizontal |

## 6. Animation Patterns

| Animation | Class | Duration | Usage |
|-----------|-------|----------|-------|
| Fade up entrance | `.animate-fade-in-up` | 0.8s | Page content on load |
| Staggered children | `.delay-100` to `.delay-500` | +100ms each | Sequential element reveal |
| Floating badges | `.animate-float` | 6s loop | Hero floating elements |
| Pulse glow | `.animate-pulse-glow` | 2s loop | Accent dots, CTAs |
| Shimmer skeleton | `.effect-shimmer` | 1.8s loop | Loading states |
| Hover glow | `.effect-glow` | instant | Card hover feedback |
| Hover scale | `.effect-enlarge` | instant | Subtle lift on hover |
