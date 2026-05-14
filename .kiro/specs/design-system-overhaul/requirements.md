# Requirements Document

## Introduction

AMMY LMS currently has a split-personality styling problem: `global.css` defines a custom CSS class system using plain CSS, while components reference Tailwind utility strings that resolve to nothing because Tailwind is not installed or configured. Several component-scoped class names (`dashboard-card`, `card-body`) exist nowhere in the stylesheet, and the button CVA setup double-applies variant and size classes. The theme store hardcodes `'dark'` as the default instead of reading the OS preference.

This overhaul replaces the entire styling architecture with Tailwind v4's CSS-first approach, making `global.css` the single source of truth for all design tokens and semantic utility classes. Every token is defined as a CSS custom property and simultaneously registered in Tailwind's `@theme {}` block so it becomes a usable utility class. The admin gallery at `app/admin/page.tsx` is elevated to a permanent, living design reference that renders every token, component class, and interactive state.

---

## Glossary

- **Design_System**: The complete set of design tokens, semantic class names, and component styling rules that govern the visual appearance of AMMY LMS.
- **CSS_File**: `app/ui/global.css` — the single source of truth for all design tokens and semantic utility classes.
- **Tailwind_v4**: Tailwind CSS version 4, which uses a CSS-first configuration model (`@import "tailwindcss"` and `@theme {}` blocks) with no separate `tailwind.config` file.
- **Theme_Block**: A `@theme {}` block inside `global.css` that registers CSS custom properties as Tailwind utility classes.
- **Design_Token**: A named CSS custom property (e.g. `--accent`, `--color-bg-card`) that encodes a single design decision.
- **Semantic_Class**: A utility class whose name describes intent rather than implementation (e.g. `bg-surface`, `text-muted`, `btn-primary`).
- **Component_Class**: A class whose name is scoped to a specific component (e.g. `dashboard-card`, `card-body`). These are forbidden by this design system.
- **Admin_Gallery**: The page at `app/admin/page.tsx` that serves as the visual source of truth for the design system.
- **Theme_Store**: The Zustand store in `app/lib/store.ts` that holds the active color scheme (`'light'` | `'dark'`).
- **Layout_Component**: `app/ui/components/system/Layout.tsx`, which applies the active theme class to `<html>`.
- **Button_Component**: `app/ui/components/atomic/button.tsx`, which uses CVA to compose button variant and size classes.
- **cn_Helper**: The `cn()` function in `app/lib/utils.ts` that merges class names using `clsx` and `tailwind-merge`.
- **SSR**: Server-Side Rendering as performed by Next.js 15 App Router.
- **Hydration_Mismatch**: A React error that occurs when the HTML rendered on the server differs from what React renders on the client.
- **prefers-color-scheme**: A CSS media query and browser API that reports the user's OS-level color scheme preference.

---

## Requirements

### Requirement 1: Install and Configure Tailwind v4

**User Story:** As a developer, I want Tailwind v4 installed and configured in CSS-first mode, so that Tailwind utility classes resolve correctly throughout the application.

#### Acceptance Criteria

1. THE Design_System SHALL include `tailwindcss` (v4.x) and `@tailwindcss/postcss` as dependencies in `package.json`.
2. THE Design_System SHALL include a `postcss.config.mjs` (or equivalent) that registers `@tailwindcss/postcss` as a PostCSS plugin.
3. THE CSS_File SHALL begin with `@import "tailwindcss"` as its first non-comment statement, replacing any prior Tailwind import or absence thereof.
4. THE Design_System SHALL NOT include a `tailwind.config.js` or `tailwind.config.ts` file; all configuration SHALL reside in the CSS_File.
5. WHEN the application is built with `next build`, THE Design_System SHALL produce no "unknown utility class" warnings for any class defined in the CSS_File's Theme_Block.

---

### Requirement 2: CSS_File as Single Source of Truth for Design Tokens

**User Story:** As a developer, I want all design tokens defined once in `global.css` using `@theme {}` blocks, so that every token is simultaneously a CSS custom property and a Tailwind utility class.

#### Acceptance Criteria

1. THE CSS_File SHALL define all brand, color, typography, spacing, shadow, transition, border-radius, and z-index tokens as CSS custom properties inside `:root {}`.
2. THE CSS_File SHALL register every token that needs to be usable as a Tailwind utility class inside a `@theme {}` block, mapping the token name to its CSS custom property reference.
3. THE CSS_File SHALL preserve all existing token names and values from the current `global.css` `:root {}` block without renaming or removing any token.
4. THE CSS_File SHALL define dark-mode overrides inside a `.dark {}` block that re-declares only the semantic color tokens that change between themes.
5. THE Design_System SHALL NOT define any design token value (color hex, pixel size, etc.) directly inside a component class rule; all component class rules SHALL reference CSS custom properties exclusively.
6. WHEN a new token is added to `:root {}`, THE CSS_File SHALL also register it in the corresponding `@theme {}` block before the token is used in any component class or application code.

---

### Requirement 3: Semantic Class Name System

**User Story:** As a developer, I want all styling classes to use semantic, intent-based names, so that classes are reusable across components and the codebase is free of component-scoped class names.

#### Acceptance Criteria

1. THE Design_System SHALL define semantic class names for all typography levels: `text-hero`, `text-title`, `text-heading`, `text-subheading`, `text-body`, `text-caption`, `text-fine`, `text-label`.
2. THE Design_System SHALL define semantic class names for all surface types: `surface-card`, `surface-card-sm`, `surface-sunken`, `surface-interactive`.
3. THE Design_System SHALL define semantic class names for all background intents: `bg-page`, `bg-surface`, `bg-accent`, `bg-subtle`, `bg-gradient`, `bg-glass`, `bg-mesh`.
4. THE Design_System SHALL define semantic class names for all border intents: `border-standard`, `border-subtle`, `border-strong`, `border-accent`, `border-top`.
5. THE Design_System SHALL define semantic class names for all border-radius steps: `radius-xs`, `radius-sm`, `radius-md`, `radius-lg`, `radius-xl`, `radius-pill`.
6. THE Design_System SHALL define semantic class names for all layout primitives: `row`, `row-between`, `row-end`, `row-wrap`, `col`, `centered`, `flex-center`, `stack-sm`, `stack-md`, `stack-lg`.
7. THE Design_System SHALL define semantic class names for all grid presets: `grid-auto`, `grid-halves`, `grid-thirds`, `grid-fourths`, `grid-standard`.
8. THE Design_System SHALL define semantic class names for all gap helpers: `gap-inline`, `gap-item`, `gap-row`, `gap-block`, `gap-section`.
9. THE Design_System SHALL NOT define any class whose name references a specific component (e.g. `dashboard-card`, `card-body`, `card-title`, `side-nav-item`).
10. WHEN a class name is used in any component file, THE Design_System SHALL contain a definition for that class name in the CSS_File.

---

### Requirement 4: Complete Button System

**User Story:** As a developer, I want a complete, consistent set of button classes covering all variants and sizes, so that every interactive element in the application can be styled without inventing new class names.

#### Acceptance Criteria

1. THE Design_System SHALL define `btn-primary`: filled accent background, white text, 48px default height, accent box-shadow, hover lift and shadow-premium.
2. THE Design_System SHALL define `btn-secondary`: accent-light background, accent text, 48px height, hover transitions to filled accent with white text.
3. THE Design_System SHALL define `btn-outline`: transparent background, `border-standard` border, heading-color text, 48px height, hover transitions border and text to accent.
4. THE Design_System SHALL define `btn-ghost`: no background, no border, body-color text, hover shows `bg-hover` background.
5. THE Design_System SHALL define `btn-tertiary` as an alias for `btn-ghost` with identical visual behavior.
6. THE Design_System SHALL define `btn-tertiary-bordered`: no background, `border-standard` border, body-color text, hover shows `bg-hover` background and accent border.
7. THE Design_System SHALL define `btn-premium`: card background, `border-standard` border, heading-color text, shadow-sm, hover transitions border and text to accent with shadow-md.
8. THE Design_System SHALL define size modifiers `btn-sm` (40px height), `btn-md` (48px height), `btn-lg` (56px height), and `btn-icon` (40×40px, no padding).
9. THE Button_Component CVA configuration SHALL map the `size` variant to `btn-sm`, `btn-md`, `btn-lg`, and `btn-icon` only — it SHALL NOT duplicate the variant class name in the size map.
10. THE Button_Component CVA configuration SHALL map the `variant` variant to `btn-primary`, `btn-secondary`, `btn-outline`, `btn-ghost`, `btn-premium`, and `btn-destructive` only.
11. WHEN a button is rendered with `variant="default"` and `size="default"`, THE Button_Component SHALL apply `btn-primary btn-md` and SHALL NOT apply `btn-primary` twice.

---

### Requirement 5: Raw Tailwind Usage Policy

**User Story:** As a developer, I want a clear rule about when raw Tailwind utilities are allowed, so that the codebase stays consistent and semantic tokens are used for all visual styling.

#### Acceptance Criteria

1. THE Design_System SHALL permit raw Tailwind utilities exclusively for layout and alignment properties: `flex`, `grid`, `items-*`, `justify-*`, `gap-*` (numeric scale), `p-*`, `m-*`, `w-*`, `h-*`, `min-*`, `max-*`, `overflow-*`, `relative`, `absolute`, `fixed`, `sticky`, `inset-*`, `z-*`, `col-span-*`, `row-span-*`.
2. THE Design_System SHALL NOT permit raw Tailwind utilities for color properties (`bg-*`, `text-*`, `border-*`) when a semantic token class exists for that intent.
3. THE Design_System SHALL NOT permit hardcoded arbitrary values (e.g. `bg-[#2563eb]`, `text-[#64748B]`) in any component file.
4. THE Design_System SHALL NOT permit raw Tailwind color utilities that reference palette names (e.g. `bg-blue-600`, `text-slate-500`) in any component file; semantic classes SHALL be used instead.
5. WHEN a developer needs a color, surface, or typographic style not covered by an existing semantic class, THE CSS_File SHALL be updated to add the new semantic class before it is used in a component.

---

### Requirement 6: System Theme Detection Without Hydration Mismatch

**User Story:** As a user, I want the application to respect my OS color scheme preference on first load, so that I do not see a flash of the wrong theme or a React hydration error.

#### Acceptance Criteria

1. THE Theme_Store SHALL initialize the `theme` field to `null` or `undefined` rather than `'dark'`, indicating that no explicit user preference has been stored.
2. WHEN the Theme_Store `theme` field is `null` and the application first renders on the client, THE Layout_Component SHALL read `window.matchMedia('(prefers-color-scheme: dark)').matches` and apply the matching theme class to `<html>`.
3. WHEN a user explicitly toggles the theme, THE Theme_Store SHALL persist the chosen value (`'light'` or `'dark'`) and THE Layout_Component SHALL use that persisted value on all subsequent loads.
4. THE Layout_Component SHALL apply the theme class to `<html>` via a `useEffect` that runs after hydration, ensuring the server-rendered HTML does not include a theme class that could mismatch the client.
5. IF the server renders `<html>` without a theme class and the client adds one in `useEffect`, THE Design_System SHALL ensure no visible flash of unstyled content by setting a default background color on `<html>` in the CSS_File that matches the light-mode page background.
6. THE Theme_Store SHALL expose a `setTheme(t: 'light' | 'dark')` action that components can call to override the system preference.
7. WHEN the Zustand `persist` middleware rehydrates the store from `localStorage`, THE Layout_Component SHALL apply the persisted theme immediately in the same `useEffect` pass to avoid a second render cycle.

---

### Requirement 7: Admin Gallery as Living Design Reference

**User Story:** As a developer or AI agent, I want the admin gallery to render every defined token, component class, and interactive state, so that I can visually verify the design system is working correctly without reading source code.

#### Acceptance Criteria

1. THE Admin_Gallery SHALL render a dedicated section for every top-level category in the Design_System: Typography, Button System, Background Styles, Borders & Radius, Status Tones (pills), Layout Primitives, Hover Effects, Overlays & Messaging, and Form Inputs.
2. THE Admin_Gallery SHALL display every typography class (`text-hero` through `text-label`) with a visible label showing the class name and a live text example.
3. THE Admin_Gallery SHALL display every button variant (`btn-primary`, `btn-secondary`, `btn-outline`, `btn-ghost`, `btn-tertiary`, `btn-tertiary-bordered`, `btn-premium`) in both default and hover states, with the class name labeled.
4. THE Admin_Gallery SHALL display every button size modifier (`btn-sm`, `btn-md`, `btn-lg`, `btn-icon`) applied to a representative button, with the class name labeled.
5. THE Admin_Gallery SHALL display every background class (`bg-page`, `bg-surface`, `bg-accent`, `bg-subtle`, `bg-gradient`, `bg-glass`, `bg-mesh`) as a visible swatch with the class name labeled.
6. THE Admin_Gallery SHALL display every border variant and every radius step as a visible swatch with the class name labeled.
7. THE Admin_Gallery SHALL display every status pill variant (`pill-success`, `pill-danger`, `pill-alert`, `pill-info`, `pill-purple`) with the class name labeled.
8. THE Admin_Gallery SHALL display every hover effect class (`effect-glow`, `effect-enlarge`, `effect-shimmer`) as an interactive card that demonstrates the effect on hover.
9. THE Admin_Gallery SHALL display a working theme toggle that switches between light and dark mode and immediately updates all visible tokens.
10. THE Admin_Gallery SHALL display a working toaster and a working pop-up overlay triggered by buttons.
11. THE Admin_Gallery SHALL display at least one `input-primary` form input in default, focused, and placeholder states.
12. THE Admin_Gallery SHALL use ONLY semantic class names from the Design_System for its own layout and styling; it SHALL NOT define inline `<style>` blocks or use raw Tailwind color utilities.
13. WHEN the active theme changes, THE Admin_Gallery SHALL re-render all token swatches and component examples using the updated CSS custom property values without a page reload.

---

### Requirement 8: Component Class Completeness and Correctness

**User Story:** As a developer, I want every class name referenced in any component file to be defined in the CSS_File, so that no class silently resolves to nothing.

#### Acceptance Criteria

1. THE Design_System SHALL define `bg-subtle` as a semantic background class equivalent to `var(--color-bg-surface)`.
2. THE Design_System SHALL define `flex-center` as a layout class equivalent to `display: flex; align-items: center; justify-content: center`.
3. THE Design_System SHALL define `grid-standard` as a responsive grid class using `auto-fit` columns with a minimum width of 280px and `gap-row` spacing.
4. THE Design_System SHALL define `text-accent` as a color-only modifier class that sets `color: var(--color-text-accent)`.
5. THE Design_System SHALL define `text-muted` as a color-only modifier class that sets `color: var(--color-text-muted)`.
6. THE Design_System SHALL define `text-white` as a color-only modifier class that sets `color: var(--white)`.
7. THE Design_System SHALL define `btn-destructive` as a button variant with danger-tone background and text.
8. WHEN the application is built, THE Design_System SHALL produce no browser console warnings about undefined CSS classes for any class defined in the CSS_File.
9. THE Design_System SHALL remove the class names `dashboard-card`, `card-body`, `card-title`, and `surface-page` from all component files, replacing each with the appropriate semantic class.

---

### Requirement 9: Dark Mode Completeness

**User Story:** As a user, I want every visible element to render correctly in both light and dark mode, so that no token or component class appears broken or unreadable when the theme changes.

#### Acceptance Criteria

1. THE CSS_File SHALL define dark-mode overrides for every semantic color token that changes between themes: `--color-bg-page`, `--color-bg-surface`, `--color-bg-card`, `--color-bg-hover`, `--color-text-heading`, `--color-text-body`, `--color-text-muted`, `--color-border`, `--color-border-subtle`, `--color-border-strong`, and all five `--tone-*` pairs.
2. THE Design_System SHALL NOT define dark-mode overrides for tokens that do not change between themes (brand colors, font stacks, spacing scale, radius scale, z-index scale).
3. WHEN the `.dark` class is present on `<html>`, THE Design_System SHALL ensure that `surface-card`, `surface-card-sm`, `surface-sunken`, `bg-glass`, `bg-mesh`, `effect-shimmer`, and all button variants render with visually correct contrast ratios.
4. THE Admin_Gallery SHALL be the verification surface for dark mode: toggling the theme in the gallery SHALL visually update every section without any element retaining light-mode colors.
5. WHEN a new semantic class is added to the CSS_File that uses a semantic color token, THE CSS_File SHALL NOT require a separate dark-mode override for that class because the token itself already handles the switch.

---

### Requirement 10: cn() Helper and tailwind-merge Compatibility

**User Story:** As a developer, I want the `cn()` helper to correctly merge semantic class names without stripping valid classes, so that component composition with CVA and conditional classes works reliably.

#### Acceptance Criteria

1. THE cn_Helper SHALL continue to use `clsx` for conditional class joining and `tailwind-merge` for deduplication.
2. WHEN `tailwind-merge` is upgraded or configured, THE Design_System SHALL ensure that semantic class names defined in the CSS_File's Theme_Block are recognized as Tailwind utilities and are not incorrectly stripped during merging.
3. THE Button_Component SHALL use `cn(buttonVariants({ variant, size }), className)` as its class composition pattern, ensuring consumer-provided `className` can override variant defaults.
4. WHEN two conflicting semantic classes are passed to `cn()` (e.g. `btn-primary` and `btn-secondary`), THE cn_Helper SHALL retain the last one provided, consistent with `tailwind-merge` behavior for conflicting utilities.

