# UX Dictionary & Principles

This document defines the universal User Experience (UX) and User Interface (UI) principles that apply across AMMY's Archives, regardless of the specific feature or color scheme.

## 1. Spacing & Margins (The 8pt Grid)

All spacing (padding, margins, gap) must adhere to an 8pt or 4pt grid system to ensure visual rhythm and consistency.

| Token | Pixels | CSS Variable | Usage |
|-------|--------|-------------|-------|
| `xs` | 4px | `--space-1` | Tightest inline gaps, icon padding |
| `sm` | 8px | `--space-2` | Inline gaps, small padding |
| `md` | 16px | `--space-4` | Standard padding, card interiors |
| `lg` | 24px | `--space-6` | Section padding, large gaps |
| `xl` | 32px | `--space-8` | Between blocks inside cards |
| `2xl` | 48px | `--space-12` | Page vertical rhythm |
| `3xl` | 64px | `--space-16` | Large section gaps |

### Semantic Spacing (Use These)
- **Page breathing room:** `--pad-page-y` (48px vertical), `--pad-page-x` (24px/40px horizontal)
- **Card interior:** `--pad-card` (32px) or `--pad-card-sm` (24px)
- **Between cards:** `--gap-row` (24px)
- **Between blocks in card:** `--gap-block` (32px)
- **Between page sections:** `--gap-section` (80px)
- **Icon ↔ label:** `--gap-inline` (8px)

## 2. Typography Hierarchy

Typography must clearly distinguish between different levels of information.

### Display & Headings (Noto Serif — `--font-display`)
- **`.text-display-hero`:** Marketing landing page hero only. `clamp(3.5rem, 8vw, 5.5rem)`. Never in-app.
- **`.text-hero`:** Marketing & landing pages only. `clamp(2.5rem, 5vw, 4rem)`.
- **`.text-title`:** Page-level title (dashboard header, module name). `clamp(1.75rem, 3vw, 2.25rem)`.
- **`.text-heading`:** Section headings within a page. `1.5rem`.
- **`.text-subheading`:** Card titles, panel headers, modal titles. `1.125rem`.

### Body Text (Jost — `--font-body`)
- **`.text-body`:** Standard text for paragraphs and descriptions. `1rem`.
- **`.text-caption`:** Secondary copy, helper text, descriptions. `0.875rem`.
- **`.text-fine`:** Timestamps, metadata, fine print. `0.75rem`.
- **`.text-label`:** Eyebrow / category labels (uppercase, accent color, widest tracking). `0.6875rem`.

### Color Modifiers (Pair With Any Size)
- **`.color-muted`** — De-emphasised text (secondary info)
- **`.color-accent`** — Accent blue (links, emphasis)
- **`.color-white`** — White text (on dark/colored surfaces)
- **`.color-heading`** — Heading ink (for inline spans on body text)

## 3. Interactive Elements (Feedback & States)

Every interactive element (button, link, input) must clearly communicate its state:

| State | Visual Treatment | Transition |
|-------|-----------------|------------|
| **Default** | Standard appearance per variant | — |
| **Hover** | Darker background, slight shadow, 1px lift (`translateY(-1px)`) | `--transition-fast` |
| **Active (Click)** | Visual depression (`scale(0.98)`) | `--transition-fast` |
| **Focus** | 2px accent outline + 2px offset (`:focus-visible`) | instant |
| **Disabled** | 50% opacity + `cursor-not-allowed` | — |

### Button Variants
| Class | Appearance | Usage |
|-------|-----------|-------|
| `.btn-primary` | Accent bg, white text, accent shadow | Primary CTA |
| `.btn-secondary` | Accent-light bg, accent text | Secondary actions |
| `.btn-outline` | Transparent bg, border | Tertiary actions |
| `.btn-ghost` | Transparent bg, no border | Inline actions |
| `.btn-premium` | Card bg, border, shadow | Premium/elevated CTA |
| `.btn-destructive` | Danger bg, danger text | Destructive actions |

### Button Sizes
| Class | Height | Padding | Usage |
|-------|--------|---------|-------|
| `.btn-sm` | 40px | 16px | Compact UI, table rows |
| `.btn-md` | 48px | 24px | Standard (default) |
| `.btn-lg` | 56px | 32px | Hero CTAs, prominent actions |
| `.btn-icon` | 40×40px | 0 | Icon-only buttons |

## 4. Cards & Surfaces

### Standard Card (`.surface-card`)
- Background: `--color-bg-card`
- Border: 1px `--color-border`
- Radius: `--radius-lg` (16px)
- Padding: `--pad-card` (32px)
- Shadow: `--shadow-sm`
- Transition: box-shadow + border-color on `--transition-normal`

### Interactive Card (`.surface-interactive`)
- Adds `cursor: pointer`
- Adds transform transition on `--transition-fast`
- Pair with `.effect-glow` or `.effect-enlarge` for hover feedback

### Compact Card (`.surface-card-sm`)
- Same as card but with `--pad-card-sm` (24px) padding
- Used for inline forms, small content blocks

## 5. Modals & Overlays

- **Backdrop:** Fixed, full-screen, `rgba(0,0,0,0.5)` with 4px blur
- **Z-index:** `--z-overlay` (400)
- **Dismissal:** Click backdrop, explicit 'X' button, or `Esc` key
- **Animation:** Scale entrance from 0.92 → 1.0, opacity 0 → 1
- **Max-width:** 400px, 90% width on mobile

## 6. Forms & Validation

- **Input height:** 48px (consistent with buttons)
- **Border:** 1px `--color-border`, transitions to accent on focus
- **Focus ring:** `--focus-ring` (3px accent glow)
- **Placeholder:** `--color-text-muted` at 70% opacity
- **Error state:** Border `--tone-danger-text`, background `--tone-danger-bg`
- **Error text:** Near the field, `--tone-danger-text` color, clear resolution message

## 7. Status Pills

| Class | Background | Text | Usage |
|-------|-----------|------|-------|
| `.pill-success` | Success bg | Success text | Completed, active |
| `.pill-danger` | Danger bg | Danger text | Errors, failed |
| `.pill-alert` | Alert bg | Alert text | Warnings, action needed |
| `.pill-info` | Info bg | Info text | In progress, informational |
| `.pill-purple` | Purple bg | Purple text | Featured, premium |

## 8. Background Patterns

| Class | Description | Usage |
|-------|------------|-------|
| `.bg-page` | Main page background | Page shell |
| `.bg-surface` | Elevated surface | Cards, panels |
| `.bg-mesh` | Radial gradient accent tints | Hero sections, feature areas |
| `.bg-glass` | Frosted glass (blur + saturation) | Headers, floating elements |
| `.bg-glass-premium` | Deeper glass with reflection | Hero badges, premium cards |
| `.bg-gradient` | Accent gradient fill | CTA buttons, hero backgrounds |

## 9. Animation & Effects

| Class | Animation | Duration | Usage |
|-------|----------|----------|-------|
| `.animate-fade-in-up` | Fade + translateY(20px→0) | 0.8s | Page content entrance |
| `.animate-float` | Gentle vertical bob | 6s loop | Hero floating badges |
| `.animate-pulse-glow` | Accent ring pulse | 2s loop | Active indicators |
| `.effect-shimmer` | Horizontal gradient sweep | 1.8s loop | Loading skeletons |
| `.effect-glow` | Accent ring + glow on hover | instant | Card hover feedback |
| `.effect-enlarge` | Scale 1.03 on hover | instant | Subtle lift feedback |

### Stagger Delays
- `.delay-100` through `.delay-500` — 100ms increments for sequential reveals

## 10. Accessibility Requirements

- **Focus visible:** 2px accent outline + 2px offset on all interactive elements
- **Skip link:** "Skip to main content" — visually hidden until focused, jumps to `#main-content`
- **Heading hierarchy:** Never skip levels (h1 → h3 is forbidden)
- **Color contrast:** WCAG AA minimum (4.5:1 for text, 3:1 for large text)
- **Alt text:** All meaningful images must have descriptive alt attributes
- **ARIA labels:** Interactive elements without visible text need `aria-label`
- **Reduced motion:** Respect `prefers-reduced-motion` — disable animations for users who prefer it

## 11. Component Naming Rules

### Atomic Components
- Single-purpose, stateless (or minimal local state)
- Named after their function: `Button`, `Input`, `Card`, `Badge`
- Accept `className` prop for composition via `cn()` utility
- Support `data-slot` attribute for styling hooks

### Molecule Components
- Composed from atomic primitives
- Named after their feature: `NavBar`, `Hero`, `ModuleCard`, `LessonBoard`
- May contain light UI state (expanded/collapsed, form values)
- Export interfaces for their props

### System Components
- Layout and orchestration
- Named for their role: `Layout`, `BlockRenderer`, `ErrorBoundary`
- Manage routing, theme, global UI structure
