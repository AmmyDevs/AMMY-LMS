# Color Palette & Tokens

All values below are the live tokens defined in `app/ui/global.css`. No component should ever reference hex values directly — always use these semantic tokens.

## 1. Brand / Primary Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--accent` | `#2563eb` | Primary brand blue — buttons, links, active states |
| `--accent-hover` | `#1d4ed8` | Hover state for accent elements |
| `--accent-light` | `rgba(37, 99, 235, 0.1)` | Subtle accent backgrounds (secondary buttons, hover states) |
| `--accent-rgb` | `37, 99, 235` | RGB form for rgba() usage in overlays and glows |
| `--focus-ring` | `0 0 0 3px rgba(37, 99, 235, 0.2)` | Focus outline ring for accessibility |

### Usage Rules
- Primary CTA buttons: `--accent` background, white text
- Secondary buttons: `--accent-light` background, `--accent` text
- Hover states: darken to `--accent-hover` or add `--accent-light` background
- Focus rings: Always use `--focus-ring` for accessibility

## 2. Semantic Background Colors

| Token | Light Mode | Dark Mode | Usage |
|-------|-----------|-----------|-------|
| `--color-bg-page` | `#ffffff` | `#0A0F1E` | Main page background |
| `--color-bg-surface` | `#F8FAFC` | `#0F172A` | Elevated surfaces (cards, panels) |
| `--color-bg-card` | `#ffffff` | `#1A2640` | Card backgrounds |
| `--color-bg-hover` | `rgba(37,99,235,0.05)` | `rgba(37,99,235,0.12)` | Hover state backgrounds |

## 3. Semantic Text Colors

| Token | Light Mode | Dark Mode | Usage |
|-------|-----------|-----------|-------|
| `--color-text-heading` | `#0F172A` | `#F0F6FF` | Headings, titles, primary text |
| `--color-text-body` | `#475569` | `#D1D5DB` | Body copy, descriptions |
| `--color-text-muted` | `#94A3B8` | `#6B7280` | Secondary text, captions, timestamps |
| `--color-text-accent` | `#2563eb` | `#2563eb` | Links, accent text |
| `--color-text-white` | `#ffffff` | `#ffffff` | Text on dark/colored surfaces |

## 4. Border Colors

| Token | Light Mode | Dark Mode | Usage |
|-------|-----------|-----------|-------|
| `--color-border` | `#E2E8F0` | `rgba(255,255,255,0.08)` | Standard borders |
| `--color-border-subtle` | `#F1F5F9` | `rgba(255,255,255,0.05)` | Subtle dividers |
| `--color-border-strong` | `#1E293B` | `rgba(255,255,255,0.6)` | Emphasized borders |

## 5. Status / Tone Colors

| Tone | Background | Text | Usage |
|------|-----------|------|-------|
| Success | `#E6F9F1` / dark: `rgba(5,150,105,0.15)` | `#059669` / dark: `#34d399` | Completed, active |
| Danger | `#FEE2E2` / dark: `rgba(220,38,38,0.15)` | `#DC2626` / dark: `#f87171` | Errors, destructive |
| Alert | `#FFEDD5` / dark: `rgba(217,119,6,0.15)` | `#D97706` / dark: `#fbbf24` | Warnings, attention |
| Info | `#E0F2FE` / dark: `rgba(2,132,199,0.15)` | `#0284C7` / dark: `#38bdf8` | Informational, in-progress |
| Purple | `#F3E8FF` / dark: `rgba(124,58,237,0.15)` | `#7C3AED` / dark: `#a78bfa` | Featured, premium |

## 6. Neutrals / Grayscale

| Token | Value | Usage |
|-------|-------|-------|
| `--white` | `#ffffff` | Pure white |
| `--gray-50` | `#F8FAFC` | Lightest gray (surfaces) |
| `--gray-100` | `#F1F5F9` | Light borders, subtle backgrounds |
| `--gray-200` | `#E2E8F0` | Standard borders |
| `--gray-300` | `#CBD5E1` | Disabled borders |
| `--gray-400` | `#94A3B8` | Muted text |
| `--gray-500` | `#64748B` | Secondary text |
| `--gray-600` | `#475569` | Body text |
| `--gray-700` | `#334155` | Dark text |
| `--gray-800` | `#1E293B` | Strong borders, dark text |
| `--gray-900` | `#0F172A` | Headings, near-black |

## 7. Typography Tokens

| Token | Font | Weight | Usage |
|-------|------|--------|-------|
| `--font-display` | Noto Serif | 700 | Headings, titles (serif elegance) |
| `--font-body` | Jost | 300-700 | Body text, UI elements (geometric clean) |

### Type Scale

| Class | Size | CSS Variable | Usage |
|-------|------|-------------|-------|
| `.text-display-hero` | `clamp(3.5rem, 8vw, 5.5rem)` | — | Landing page hero only |
| `.text-hero` | `clamp(2.5rem, 5vw, 4rem)` | `--size-hero` | Marketing (not in-app) |
| `.text-title` | `clamp(1.75rem, 3vw, 2.25rem)` | `--size-title` | Page-level titles |
| `.text-heading` | `1.5rem` | `--size-heading` | Section headings |
| `.text-subheading` | `1.125rem` | `--size-subheading` | Card/panel titles |
| `.text-body` | `1rem` | `--size-body` | Standard body copy |
| `.text-caption` | `0.875rem` | `--size-caption` | Secondary copy |
| `.text-fine` | `0.75rem` | `--size-fine` | Timestamps, metadata |
| `.text-label` | `0.6875rem` | `--size-label` | Eyebrow/category (uppercase) |

## 8. Spacing Scale

| Token | Value | Pixels | Usage |
|-------|-------|--------|-------|
| `--space-1` | `0.25rem` | 4px | Tightest gaps |
| `--space-2` | `0.5rem` | 8px | Inline gaps |
| `--space-3` | `0.75rem` | 12px | Small padding |
| `--space-4` | `1rem` | 16px | Standard padding |
| `--space-5` | `1.25rem` | 20px | Medium padding |
| `--space-6` | `1.5rem` | 24px | Card padding, gaps |
| `--space-8` | `2rem` | 32px | Large gaps |
| `--space-10` | `2.5rem` | 40px | Section padding |
| `--space-12` | `3rem` | 48px | Page vertical rhythm |
| `--space-16` | `4rem` | 64px | Large section gaps |
| `--space-20` | `5rem` | 80px | Page section vertical |
| `--space-32` | `8rem` | 128px | Maximum vertical spacing |

## 9. Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Card default |
| `--shadow-md` | `0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)` | Elevated cards |
| `--shadow-lg` | `0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)` | Modals, overlays |
| `--shadow-accent` | `0 4px 14px 0 rgba(37,99,235,0.3)` | Primary buttons |
| `--shadow-premium` | `0 8px 32px -4px rgba(37,99,235,0.25)` | Hero cards, premium surfaces |

## 10. Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-xs` | `4px` | Tight corners |
| `--radius-sm` | `8px` | Buttons, inputs |
| `--radius-md` | `12px` | Cards, panels |
| `--radius-lg` | `16px` | Large cards, modals |
| `--radius-xl` | `24px` | Hero images, large surfaces |
| `--radius-pill` | `9999px` | Badges, avatars, pills |

## 11. Transitions

| Token | Value | Usage |
|-------|-------|-------|
| `--transition-fast` | `150ms cubic-bezier(0.4, 0, 0.2, 1)` | Hover states, micro-interactions |
| `--transition-normal` | `250ms cubic-bezier(0.4, 0, 0.2, 1)` | Theme changes, card transitions |
| `--transition-slow` | `400ms cubic-bezier(0.4, 0, 0.2, 1)` | Page transitions, animations |

## 12. Z-Index Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--z-base` | `1` | Default stacking |
| `--z-raised` | `10` | Elevated elements |
| `--z-dropdown` | `100` | Dropdowns, popovers |
| `--z-overlay` | `400` | Modals, overlays |
| `--z-toaster` | `500` | Toast notifications, skip-link |

## Implementation Rules

1. **Never hardcode hex values** in component CSS/Tailwind. Always reference semantic tokens.
2. **Always check contrast** — text on `--accent` must meet WCAG AA (4.5:1 ratio).
3. **Dark mode is automatic** — tokens swap via `.dark` class on `<html>`.
4. **Use semantic classes** (`.bg-accent`, `.text-heading`) not raw CSS variables in JSX.
5. **Status tones** maintain universal meaning regardless of color scheme.
