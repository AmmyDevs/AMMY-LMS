# Implementation Plan: Design System Overhaul

## Overview

Migrate AMMY LMS from a split-personality styling architecture (hand-rolled CSS + broken Tailwind utilities) to a Tailwind v4 CSS-first single source of truth. `global.css` becomes the canonical file for all design tokens and semantic classes. Component files are cleaned of broken utilities and component-scoped names. The theme store is fixed to support system preference detection. The admin gallery is rewritten as a living design reference.

Implementation proceeds in strict dependency order: Tailwind installation → CSS rewrite → store/layout fixes → component migrations → admin gallery → property tests.

---

## Tasks

- [x] 1. Install Tailwind v4 and wire up PostCSS
  - [x] 1.1 Add `tailwindcss` (v4.x) and `@tailwindcss/postcss` as devDependencies in `package.json`
    - Add `"tailwindcss": "^4.0.0"` and `"@tailwindcss/postcss": "^4.0.0"` to `devDependencies`
    - Do NOT add a `tailwind.config.js` or `tailwind.config.ts` — Tailwind v4 is configured entirely in CSS
    - _Requirements: 1.1_

  - [x] 1.2 Create `postcss.config.mjs` at the project root
    - Register `@tailwindcss/postcss` as the sole PostCSS plugin
    - Content: `export default { plugins: { '@tailwindcss/postcss': {} } }`
    - _Requirements: 1.2_

- [x] 2. Rewrite `app/ui/global.css` as the single source of truth
  - [x] 2.1 Add `@import "tailwindcss"` and Google Fonts import at the top of `global.css`
    - Replace any existing first line with `@import "tailwindcss";` as the very first non-comment statement
    - Keep the existing Google Fonts `@import url(...)` immediately after
    - _Requirements: 1.3, 1.4_

  - [x] 2.2 Add the `@theme {}` block mapping all tokens to Tailwind utility names
    - Insert a `@theme {}` block after the font import, before `:root {}`
    - Map every token that needs a Tailwind utility: `--color-accent`, `--color-bg-page`, `--color-bg-surface`, `--color-bg-card`, `--color-bg-hover`, `--color-text-heading`, `--color-text-body`, `--color-text-muted`, `--color-text-accent`, `--color-text-white`, `--color-border`, `--color-border-subtle`, `--color-border-strong`, `--font-display`, `--font-body`, and all `--size-*`, `--space-*`, `--radius-*`, `--shadow-*`, `--transition-*`, `--z-*` tokens
    - Each entry maps the Tailwind utility name to `var(--token-name)` so utilities resolve to CSS custom properties
    - _Requirements: 2.1, 2.2, 2.6_

  - [x] 2.3 Preserve all existing `:root {}` tokens and add the `.dark {}` block
    - Keep every existing token in `:root {}` unchanged (names and values)
    - Ensure `.dark {}` overrides exactly: `--color-bg-page`, `--color-bg-surface`, `--color-bg-card`, `--color-bg-hover`, `--color-text-heading`, `--color-text-body`, `--color-text-muted`, `--color-border`, `--color-border-subtle`, `--color-border-strong`, and all five `--tone-*` pairs (10 semantic tokens + 10 tone tokens)
    - Do NOT add dark overrides for `--accent`, `--font-*`, `--size-*`, `--space-*`, `--radius-*`, `--shadow-*`, `--transition-*`, `--z-*`
    - _Requirements: 2.3, 2.4, 9.1, 9.2_

  - [x] 2.4 Add base reset and `html` background-color rule
    - Keep existing `*, *::before, *::after` reset and `body` styles
    - Add `html { background-color: var(--color-bg-page); }` immediately after the reset — this prevents flash of unstyled content before JS runs
    - _Requirements: 6.5_

  - [x] 2.5 Add missing semantic classes to `@layer components {}`
    - Add `.bg-subtle { background-color: var(--color-bg-surface); }` — _Requirements: 8.1_
    - Add `.flex-center { display: flex; align-items: center; justify-content: center; }` — _Requirements: 8.2_
    - Add `.grid-standard { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: var(--gap-row); }` — _Requirements: 8.3_
    - Add `.text-accent { color: var(--color-text-accent); }` — _Requirements: 8.4_
    - Add `.text-muted { color: var(--color-text-muted); }` — _Requirements: 8.5_
    - Add `.text-white { color: var(--white); }` — _Requirements: 8.6_
    - Add `.btn-ghost` (no bg, no border, body-color text, hover shows `var(--color-bg-hover)`) — _Requirements: 4.4_
    - Add `.btn-tertiary` as an alias with identical rules to `.btn-ghost` — _Requirements: 4.5_
    - Add `.btn-tertiary-bordered` (no bg, `border: 1px solid var(--color-border)`, body-color text, hover: `var(--color-bg-hover)` bg + `var(--accent)` border) — _Requirements: 4.6_
    - Add `.btn-destructive` (danger-tone bg `var(--tone-danger-bg)`, text `var(--tone-danger-text)`, 48px height, same shape as `btn-primary`) — _Requirements: 4.7, 8.7_
    - Wrap all existing and new component class definitions inside `@layer components {}`
    - All property values inside component class rules MUST use `var(--*)` references — no hardcoded hex, px, or palette names
    - _Requirements: 2.5, 3.1–3.8_

  - [x]* 2.6 Write property test for token preservation (P1)
    - **Property 1: Token Preservation Round-Trip**
    - Parse the original `:root {}` token names from the pre-migration snapshot; for each token name, assert it exists in the new `global.css` with the same value
    - Use `fc.constantFrom(...originalTokenNames)` to drive the property
    - Test file: `app/ui/__tests__/design-system.p1.test.ts`
    - **Validates: Requirements 2.3**

  - [x]* 2.7 Write property test for component class var() references (P2)
    - **Property 2: Component Classes Reference Only CSS Custom Properties**
    - Parse all class rules inside `@layer components {}` from `global.css`; for each rule, assert every color/size/spacing value is a `var(--*)` reference (regex: `/^var\(--/`)
    - Use `fc.constantFrom(...componentClassRules)` to drive the property
    - Test file: `app/ui/__tests__/design-system.p2.test.ts`
    - **Validates: Requirements 2.5, 5.3, 5.4**

  - [x]* 2.8 Write property test for no component-scoped class names (P3)
    - **Property 3: No Component-Scoped Class Names in CSS**
    - Parse all class names defined in `global.css`; for each name, assert it does NOT match the component-scoped pattern (names like `dashboard-card`, `card-body`, `card-title`, `side-nav-item`, `surface-page`)
    - Use `fc.constantFrom(...allDefinedClassNames)` to drive the property
    - Test file: `app/ui/__tests__/design-system.p3.test.ts`
    - **Validates: Requirements 3.9, 8.9**

  - [x]* 2.9 Write property test for dark mode token completeness (P6)
    - **Property 6: Dark Mode Token Completeness**
    - Define the required dark-mode token set (all 10 `--color-*` + all 10 `--tone-*` pairs); for each required token, assert it appears in the `.dark {}` block of `global.css`
    - Use `fc.constantFrom(...requiredDarkModeTokens)` to drive the property
    - Test file: `app/ui/__tests__/design-system.p6.test.ts`
    - **Validates: Requirements 9.1**

  - [x]* 2.10 Write property test for dark mode override scope (P7)
    - **Property 7: Dark Mode Override Scope**
    - Parse all token names inside the `.dark {}` block; for each token, assert it matches `--color-*` or `--tone-*` and does NOT match `--accent$`, `--font-*`, `--size-*`, `--space-*`, `--radius-*`, `--shadow-*`, `--transition-*`, `--z-*`
    - Use `fc.constantFrom(...darkBlockTokens)` to drive the property
    - Test file: `app/ui/__tests__/design-system.p7.test.ts`
    - **Validates: Requirements 9.2**

- [x] 3. Fix theme store and Layout component
  - [x] 3.1 Update `app/lib/utils/types/index.ts` — change `theme` type in `LMSState`
    - Change `theme: 'light' | 'dark'` to `theme: 'light' | 'dark' | null`
    - `setTheme` signature stays `(t: 'light' | 'dark') => void` — no change needed
    - _Requirements: 6.1_

  - [x] 3.2 Update `app/lib/store.ts` — fix theme initial value and `toggleTheme`
    - Change `theme: 'dark'` to `theme: null as 'light' | 'dark' | null`
    - Update `toggleTheme` to: `() => set((s) => ({ theme: s.theme === 'dark' ? 'light' : 'dark' }))`
    - Note: when `theme` is `null`, `toggleTheme` sets it to `'light'` (null !== 'dark'); this is intentional — the first explicit toggle sets a preference
    - _Requirements: 6.1, 6.3, 6.6_

  - [x] 3.3 Update `app/ui/components/system/Layout.tsx` — system theme detection
    - Replace the existing `useEffect` with:
      ```tsx
      useEffect(() => {
        const resolved = theme ?? (
          window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        )
        document.documentElement.classList.toggle('dark', resolved === 'dark')
      }, [theme])
      ```
    - This runs only on the client after hydration — server HTML never includes a theme class
    - _Requirements: 6.2, 6.4, 6.7_

- [x] 4. Fix Button CVA and add missing variants
  - [x] 4.1 Fix `app/ui/components/atomic/button.tsx` — CVA size default bug
    - Change `size: { default: "btn-primary" }` to `size: { default: "btn-md" }`
    - Verify the variant map includes `btn-tertiary`, `btn-tertiary-bordered`, and `btn-destructive` entries
    - After fix: rendering `<Button />` with no props produces `btn-primary btn-md`, not `btn-primary btn-primary`
    - _Requirements: 4.9, 4.10, 4.11_

- [x] 5. Migrate component files to semantic classes
  - [x] 5.1 Migrate `app/ui/components/molecule/DashboardCard.tsx`
    - Remove `dashboard-card`, `card-body`, `card-title`, `card-text` class names
    - Replace wrapper with `surface-card col gap-item` (or `surface-card` with `href` on the `<a>`)
    - Replace `<h3 className="card-title">` with `<h3 className="text-subheading">`
    - Replace `<p className="card-text">` with `<p className="text-caption text-muted">`
    - _Requirements: 3.9, 8.9_

  - [x] 5.2 Migrate `app/ui/components/system/Dashboard.tsx`
    - Replace all broken Tailwind utilities with semantic equivalents per the design doc mapping table:
      - `bg-brand/10 text-brand` → `pill-info` (for badge spans) or `text-accent` (for standalone text)
      - `text-text` → `text-body` or `text-heading` (context-dependent)
      - `border-border` → `border-standard`
      - `rounded-xl` → `radius-xl`
      - `text-brand` → `text-accent`
      - `bg-brand` → `bg-accent`
      - `text-emerald-500` → `pill-success` (wrap in `.pill` span) or `text-accent` for icons
      - `text-amber-500` → `pill-alert` (wrap in `.pill` span)
      - `bg-surface` is already semantic — keep it
      - `bg-page` is already semantic — keep it
    - Raw layout utilities (`flex`, `items-*`, `gap-*`, `w-*`, `h-*`, `grid`, `grid-cols-*`, `max-w-*`, `mx-auto`, `px-*`, `py-*`, `mb-*`, `space-y-*`, `shrink-0`, `overflow-hidden`, `transition-all`, `duration-500`) are permitted — keep them
    - _Requirements: 3.9, 5.2, 5.4, 8.9_

  - [x] 5.3 Migrate `app/ui/components/system/Sidebar.tsx`
    - Replace broken utilities with semantic equivalents:
      - `bg-surface border-r border-border` → `bg-surface border-standard` (keep `border-r` as layout utility, replace `border-border` with `border-standard`)
      - `text-brand` → `text-accent`
      - `bg-brand/10` → use `bg-accent` with CSS opacity or `accent-light` variable inline style
      - `text-text` → `text-body`
      - `bg-elevated` → `bg-surface`
      - `bg-elevated/50` → `bg-surface` (opacity variant — use inline style if needed)
      - `bg-navy-fill/50` → `bg-surface`
      - `text-muted` is already semantic — keep it
    - Keep all raw layout utilities (`flex`, `flex-col`, `flex-1`, `items-*`, `gap-*`, `w-*`, `h-*`, `px-*`, `py-*`, `overflow-y-auto`, `fixed`, `left-0`, `top-0`, `z-*`, `shrink-0`, `truncate`, `ml-*`, `mt-*`, `space-y-*`)
    - _Requirements: 3.9, 5.2, 5.4_

  - [x] 5.4 Migrate `app/ui/components/system/ContentPage.tsx`
    - Replace broken utilities with semantic equivalents:
      - `bg-page` is already semantic — keep it
      - `text-text` → `text-body`
      - `text-brand` → `text-accent`
      - `bg-surface rounded-xl border border-border` → `surface-card` (the surface-card class already includes bg, border, and radius)
      - `text-muted` is already semantic — keep it
    - Keep all raw layout utilities (`min-h-screen`, `flex`, `items-center`, `justify-center`, `max-w-*`, `mx-auto`, `px-*`, `py-*`, `mb-*`, `inline-flex`, `gap-*`, `w-*`, `h-*`, `md:p-10`)
    - _Requirements: 3.9, 5.2, 5.4_

  - [x]* 5.5 Write property test for all used class names are defined (P4)
    - **Property 4: All Used Class Names Are Defined**
    - Parse all class name strings from component `.tsx` files in `app/ui/components/` and `app/admin/`; filter out permitted raw Tailwind layout utilities (flex, grid, items-*, justify-*, gap-*, p-*, m-*, w-*, h-*, min-*, max-*, overflow-*, relative, absolute, fixed, sticky, inset-*, z-*, col-span-*, row-span-*, hidden, block, inline, inline-flex, inline-block, cursor-*, select-*, pointer-events-*, shrink-*, grow-*, truncate, whitespace-*, transition-*, duration-*, animate-*, opacity-*, scale-*, translate-*, rotate-*, md:*, lg:*, sm:*, leading-*, font-*, text-xs, text-sm, text-base, text-lg, text-xl, text-2xl, text-3xl, text-4xl, text-center, text-left, text-right, uppercase, lowercase, capitalize, underline, line-through, sr-only, not-sr-only, space-*, border-r, border-b, border-t, border-l, border-0, border-2, border-4, rounded, rounded-full, aspect-*, object-*, list-*, appearance-*, resize-*, outline-*, ring-*, shadow-sm, shadow-md, shadow-lg, shadow-xl, shadow-none, fill-current, stroke-current, size-*)
    - For each remaining class name, assert it has a definition in `global.css`
    - Use `fc.constantFrom(...filteredClassNames)` to drive the property
    - Test file: `app/ui/__tests__/design-system.p4.test.ts`
    - **Validates: Requirements 3.10, 8.8**

  - [x]* 5.6 Write property test for no raw color utilities in component files (P5)
    - **Property 5: No Raw Color Utilities in Component Files**
    - Parse all class name strings from component `.tsx` files; for each class name, assert it does NOT match the raw color utility pattern: `/^(bg|text|border)-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d+/`
    - Use `fc.constantFrom(...allComponentClassNames)` to drive the property
    - Test file: `app/ui/__tests__/design-system.p5.test.ts`
    - **Validates: Requirements 5.2, 5.4**

- [x] 6. Rewrite `app/admin/page.tsx` as the living design gallery
  - [x] 6.1 Rewrite the gallery shell and header section
    - Remove the inline `<style jsx global>` block at the bottom — `flex-center` and `grid-standard` are now defined in `global.css`
    - Replace `surface-page` wrapper with `bg-page` + `page-container` or equivalent semantic classes
    - Replace `container-max` with `page-container`
    - Header: use `row-between` layout, `text-title` for the heading, `btn-secondary` for the theme toggle button
    - _Requirements: 7.1, 7.9, 7.12_

  - [x] 6.2 Rewrite the Typography section
    - Display all 8 classes: `text-hero`, `text-title`, `text-heading`, `text-subheading`, `text-body`, `text-caption`, `text-fine`, `text-label`
    - Each entry: a `.text-label` label showing the class name, then a live text example using that class
    - Replace `text-base` and `text-sm` (raw Tailwind) with `text-body` and `text-caption` respectively
    - _Requirements: 7.2_

  - [x] 6.3 Rewrite the Button System section
    - Display all 7 variants: `btn-primary`, `btn-secondary`, `btn-outline`, `btn-ghost`, `btn-tertiary`, `btn-tertiary-bordered`, `btn-premium`
    - Display all 4 sizes: `btn-sm`, `btn-md`, `btn-lg`, `btn-icon`
    - Each variant in its own `surface-card` with a `.text-label` label
    - Use `grid-standard` for the variant grid
    - Use `flex-center` for centering buttons within their preview wells
    - Use `bg-subtle` for the preview well background
    - _Requirements: 7.3, 7.4_

  - [x] 6.4 Rewrite the Background Styles section
    - Display all 7 bg classes: `bg-page`, `bg-surface`, `bg-accent`, `bg-subtle`, `bg-gradient`, `bg-glass`, `bg-mesh`
    - Each as a swatch `div` with `flex-center` and a `.text-label` label
    - Use `grid-auto` for the swatch grid
    - _Requirements: 7.5_

  - [x] 6.5 Rewrite the Borders & Radius section
    - Display all 6 radius steps: `radius-xs`, `radius-sm`, `radius-md`, `radius-lg`, `radius-xl`, `radius-pill`
    - Display all 5 border variants: `border-standard`, `border-subtle`, `border-strong`, `border-accent`, `border-top`
    - Wrap in `surface-card`
    - _Requirements: 7.6_

  - [x] 6.6 Rewrite the Status Tones section
    - Display all 5 pill variants: `pill-success`, `pill-danger`, `pill-alert`, `pill-info`, `pill-purple`
    - Each wrapped in `pill` base class + variant class, with an icon and label
    - Wrap section in `surface-card`
    - _Requirements: 7.7_

  - [x] 6.7 Rewrite the Hover Effects section
    - Display 3 interactive cards: `effect-glow`, `effect-enlarge`, `effect-shimmer`
    - Use `grid-thirds` for the card grid
    - Each card uses `surface-card surface-interactive` + the effect class
    - Replace `text-base` with `text-body`
    - _Requirements: 7.8_

  - [x] 6.8 Rewrite the Overlays & Messaging and Form Inputs sections
    - Overlays: `surface-card` wrapper, `btn-secondary` trigger buttons for toaster and popup
    - Form Inputs: `surface-card` wrapper, `input-primary` in default, focused (via `:focus` CSS), and placeholder states
    - Ensure toaster and popup use `.toaster`, `.toaster.active`, `.overlay`, `.overlay.active`, `.pop-up` classes
    - _Requirements: 7.10, 7.11_

- [x] 7. Checkpoint — verify build and visual correctness
  - Run `next build` and confirm: no "unknown utility class" warnings, no TypeScript errors, no missing module errors for `@tailwindcss/postcss`
  - Visually verify the admin gallery in both light and dark mode: all 9 sections render correctly, theme toggle updates all swatches without page reload
  - _Requirements: 1.5, 7.13, 8.8_

- [x] 8. Write remaining property-based tests
  - [x] 8.1 Write property test for cn() last-wins behavior (P8)
    - **Property 8: cn() Last-Wins for Conflicting Semantic Classes**
    - Define conflicting button variant pairs: `['btn-primary', 'btn-secondary']`, `['btn-secondary', 'btn-outline']`, `['btn-outline', 'btn-ghost']`, `['btn-ghost', 'btn-premium']`, `['btn-primary', 'btn-destructive']`
    - For each pair `[first, second]`, call `cn(first, second)` and assert: result includes `second` AND does NOT include `first`
    - Use `fc.constantFrom(...buttonVariantPairs)` to drive the property
    - Test file: `app/ui/__tests__/design-system.p8.test.ts`
    - **Validates: Requirements 10.4**

- [x] 9. Final checkpoint — all tests pass
  - Ensure all tests pass, ask the user if questions arise.

---

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Property tests use **fast-check** (`fc`) — install with `npm install --save-dev fast-check` if not already present
- Test files live in `app/ui/__tests__/` and parse CSS/TSX source files as strings using Node `fs.readFileSync`
- Checkpoints ensure incremental validation — do not skip task 7 before proceeding to task 8
- The `@layer components {}` wrapper in task 2.5 is critical: without it, Tailwind v4 may not recognize custom classes as overridable utilities
- Raw layout utilities listed in task 5.5 are the exhaustive permitted set — anything not on that list must have a definition in `global.css`

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2"] },
    { "id": 1, "tasks": ["2.1"] },
    { "id": 2, "tasks": ["2.2"] },
    { "id": 3, "tasks": ["2.3", "2.4"] },
    { "id": 4, "tasks": ["2.5"] },
    { "id": 5, "tasks": ["2.6", "2.7", "2.8", "2.9", "2.10", "3.1"] },
    { "id": 6, "tasks": ["3.2", "3.3", "4.1"] },
    { "id": 7, "tasks": ["5.1", "5.2", "5.3", "5.4"] },
    { "id": 8, "tasks": ["5.5", "5.6", "6.1"] },
    { "id": 9, "tasks": ["6.2", "6.3", "6.4", "6.5", "6.6", "6.7", "6.8"] },
    { "id": 10, "tasks": ["8.1"] }
  ]
}
```
