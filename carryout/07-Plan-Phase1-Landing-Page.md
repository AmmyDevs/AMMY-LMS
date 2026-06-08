# Implementation Plan — Phase 1: Landing Page Redesign

## Objective

Rebuild the AMMY's Archives landing page from scratch with a premium, modern design that communicates the platform's value proposition and converts visitors into users.

## Current State

- **`app/page.tsx`:** Simple page with NavBar + Hero + Footer
- **`app/ui/components/molecule/Hero.tsx`:** Two-column hero with login form, floating badges, stats row
- **`app/ui/components/molecule/NavBar.tsx`:** Sticky nav with brand, theme toggle, CTA
- **`app/ui/components/molecule/Footer.tsx`:** 4-column footer with brand, product links, company links

## Target Architecture

### New Sections (Top to Bottom)
```
1. NAVBAR        — Refined sticky nav with smooth scroll links
2. HERO          — Full redesign with compelling headline + illustration
3. FEATURES      — 3-column grid showcasing core capabilities
4. HOW IT WORKS  — Step-by-step visual walkthrough (1-2-3)
5. MODULE SHOWCASE — Live grid of available modules from module.json
6. CTA BANNER    — Final conversion push with gradient background
7. FOOTER        — Polished footer with proper links
```

## Step-by-Step Plan

### Step 1: Clean Up Existing Structure
- [ ] Remove duplicate layout logic (Layout.tsx handles landing page, no need for separate shell)
- [ ] Fix `app/page.tsx` — remove unnecessary `useRouter`, simplify to semantic HTML
- [ ] Ensure `page.tsx` is a Server Component (move client interactivity to child components)

### Step 2: Redesign NavBar
- [ ] Add smooth scroll navigation links (Features, Modules, Get Started)
- [ ] Add mobile hamburger menu using Sheet component
- [ ] Refine brand mark with proper hover states
- [ ] Add "Get Started" CTA that scrolls to hero form
- [ ] Implement scroll-aware background opacity (more opaque on scroll)

### Step 3: Redesign Hero Section
- [ ] Compelling headline: "Your Complete Learning Archive" or similar
- [ ] Subheadline: Clear value proposition for Computer Engineering students
- [ ] CTA form: Name input + "Enter Archives" button
- [ ] Right side: Premium illustration or abstract gradient with floating module badges
- [ ] Stats row: "7 Modules · 50+ Lessons · AI-Powered"
- [ ] Responsive: Stacks to single column on mobile, illustration below copy

### Step 4: Build Features Section
- [ ] 3-column grid with feature cards
- [ ] Features: Study Notes Library, AI Tutor, Interactive Quizzes
- [ ] Each card: Icon + Title + Description + subtle hover effect
- [ ] Use `.surface-card` + `.effect-glow` pattern
- [ ] Responsive: 3 cols → 2 cols → 1 col

### Step 5: Build "How It Works" Section
- [ ] 3-step horizontal flow with connecting lines/arrows
- [ ] Step 1: "Enter Your Name" — No signup needed
- [ ] Step 2: "Pick a Module" — Browse your course modules
- [ ] Step 3: "Start Learning" — Interactive notes, quizzes, AI help
- [ ] Use numbered circles + icons + descriptions
- [ ] Responsive: Horizontal → vertical stack on mobile

### Step 6: Build Module Showcase Section
- [ ] Dynamic grid pulling from `docs/module.json` (server component)
- [ ] Module cards showing: code, name, lecturer, schedule
- [ ] Click → navigates to `/lms/modules/{code}`
- [ ] Use existing `ModuleCard` component (refined)
- [ ] Section header: "Available Modules" with module count

### Step 7: Build CTA Banner Section
- [ ] Full-width gradient background (accent → accent-hover)
- [ ] Headline: "Start Your Learning Journey Today"
- [ ] Subtext: "No account needed. Just enter your name and begin."
- [ ] CTA button: "Get Started" → scrolls to hero form
- [ ] Subtle animated background pattern (mesh or gradient shift)

### Step 8: Polish Footer
- [ ] Update links to point to actual pages (Modules, Assistant, Assessment)
- [ ] Add social/contact links (placeholder for now)
- [ ] Refine copyright and "Built with ❤️" badge
- [ ] Ensure proper responsive layout (4 col → 2 col → 1 col)

### Step 9: Animations & Micro-interactions
- [ ] Staggered fade-in-up for sections as they enter viewport
- [ ] Intersection Observer for scroll-triggered animations
- [ ] Smooth hover transitions on all interactive elements
- [ ] Floating badge animation refinement
- [ ] Respect `prefers-reduced-motion`

### Step 10: Responsive Testing & Polish
- [ ] Test at 320px, 375px, 768px, 1024px, 1440px breakpoints
- [ ] Verify all text is readable, no horizontal overflow
- [ ] Test touch targets on mobile (minimum 44px)
- [ ] Verify theme toggle works on all sections (light + dark)
- [ ] Check accessibility: focus states, heading hierarchy, alt text

### Step 11: Validation
- [ ] Run `bun run lint` — fix any ESLint errors
- [ ] Run `bun run build` — ensure no build errors
- [ ] Visual check in browser (light + dark mode)
- [ ] Code review with code-reviewer-mimo

## Component Dependencies

### Existing (Reuse)
- `NavBar.tsx` — Refine, don't replace
- `Hero.tsx` — Full rewrite
- `Footer.tsx` — Polish
- `ModuleCard.tsx` — Already good, use in showcase
- `Logo.tsx` — No changes needed
- `ThemeToggle.tsx` — No changes needed
- `button.tsx` — No changes needed

### New Components to Create
- `Features.tsx` — Feature cards section (molecule)
- `HowItWorks.tsx` — Step-by-step section (molecule)
- `ModuleShowcase.tsx` — Dynamic module grid (molecule)
- `CTABanner.tsx` — Final CTA section (molecule)
- `ScrollReveal.tsx` — Intersection Observer wrapper (utility component)

### Files to Modify
- `app/page.tsx` — Restructure with new sections
- `app/ui/components/molecule/Hero.tsx` — Full redesign
- `app/ui/components/molecule/NavBar.tsx` — Add scroll links + mobile menu
- `app/ui/components/molecule/Footer.tsx` — Polish and update links
- `app/ui/global.css` — Add any new animation classes if needed

## Estimated Effort
- Steps 1-3: Core structure (NavBar + Hero)
- Steps 4-7: New sections (Features + HowItWorks + Modules + CTA)
- Steps 8-9: Polish (Footer + Animations)
- Steps 10-11: Testing + Validation

## Success Criteria
- [ ] Landing page loads in < 2s on 3G
- [ ] All sections responsive at all breakpoints
- [ ] Theme toggle works across all sections
- [ ] No ESLint or TypeScript errors
- [ ] Accessibility: keyboard navigation, screen reader friendly
- [ ] Visual consistency with design system tokens (no hardcoded values)
