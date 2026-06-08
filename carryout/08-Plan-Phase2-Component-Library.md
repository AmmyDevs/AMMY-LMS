# Implementation Plan — Phase 2: Component Library Re-invention

## Objective

Replace the legacy shadcn/ui component system with a bespoke, premium component library built specifically for AMMY's Archives. The new system should be lightweight, fully themed, and easy to extend.

## Current State

### What Exists
- **50+ shadcn/ui components** in `app/ui/components/atomic/` — most unused, tightly coupled to Radix primitives
- **Design System v2.0** in `global.css` — comprehensive tokens, semantic classes, dark mode
- **Custom components** already built: `Button`, `Logo`, `ThemeToggle`, `TopBar`, `SideNav`
- **Component hierarchy:** atomic → molecule → system (conceptually correct, but atomic layer is bloated)

### Problems
1. **Bloat:** 50+ atomic components, ~35 are unused shadcn wrappers
2. **Tight coupling:** shadcn components import directly from `@radix-ui/*` primitives
3. **Inconsistency:** Some components use CVA variants, others use raw CSS classes
4. **Stale config:** `public/components.json` and `app/ui/components.json` reference old paths
5. **No barrel exports:** Components imported individually with deep paths
6. **No documentation:** No storybook or usage examples

## Target Architecture

### New Component Hierarchy
```
app/ui/components/
├── primitives/          # NEW — Minimal, theme-aware base components
│   ├── Button.tsx       # Core button with variants
│   ├── Input.tsx        # Text input with states
│   ├── Card.tsx         # Surface card with composition
│   ├── Badge.tsx        # Status badges/pills
│   ├── Avatar.tsx       # User avatar with initials
│   ├── Modal.tsx        # Dialog/overlay
│   ├── Tooltip.tsx      # Hover tooltip
│   ├── Dropdown.tsx     # Dropdown menu
│   ├── Tabs.tsx         # Tab navigation
│   ├── Accordion.tsx    # Collapsible sections
│   ├── Toast.tsx        # Notification toasts
│   ├── Skeleton.tsx     # Loading states
│   └── index.ts         # Barrel export
│
├── composed/            # Renamed from "molecule" — Feature-specific patterns
│   ├── NavBar.tsx
│   ├── Hero.tsx
│   ├── Footer.tsx
│   ├── ModuleCard.tsx
│   ├── LessonBoard.tsx
│   ├── Sidebar.tsx
│   ├── PageHeader.tsx
│   └── blocks/          # Content block renderers (unchanged)
│       └── ...
│
├── layout/              # Renamed from "system" — Layout orchestration
│   ├── AppShell.tsx     # Root layout with theme provider
│   ├── DashboardShell.tsx  # TopBar + SideNav shell
│   ├── PageContainer.tsx   # Max-width + padding wrapper
│   ├── BlockRenderer.tsx
│   ├── ErrorBoundary.tsx
│   └── LoadingSkeleton.tsx
│
└── utils/               # Shared component utilities
    ├── cn.ts            # clsx + tailwind-merge
    └── types.ts         # Shared component types
```

### Design Principles
1. **Token-first:** Every component uses design tokens from `global.css`, never hardcoded values
2. **Composition over configuration:** Prefer compound components (Card.Header + Card.Content) over prop-heavy APIs
3. **Accessible by default:** Focus management, ARIA attributes, keyboard navigation built-in
4. **Theme-aware:** All components work in both light and dark mode automatically
5. **Lightweight:** No Radix dependency for new components — use native HTML + CSS transitions

## Step-by-Step Plan

### Step 1: Audit & Inventory
- [ ] List all 50+ atomic components
- [ ] Mark each as: **Keep**, **Replace**, or **Delete**
- [ ] Identify which are actually imported anywhere in the codebase
- [ ] Document the dependency graph (which molecules use which atoms)

### Step 2: Define New Primitives API
- [ ] Design the API surface for each new primitive component
- [ ] Define variant system (using CVA or CSS custom properties)
- [ ] Establish naming conventions for props and variants
- [ ] Create TypeScript interfaces for all component props

### Step 3: Build Core Primitives
Priority order (most used first):
- [ ] **Button** — Variants: primary, secondary, outline, ghost, premium, destructive. Sizes: sm, md, lg, icon
- [ ] **Input** — Text input with label, placeholder, error state, helper text
- [ ] **Card** — Compound: Card.Header, Card.Content, Card.Footer. Surface variants
- [ ] **Badge** — Status pills: success, danger, alert, info, purple
- [ ] **Avatar** — Initials fallback, image support, size variants
- [ ] **Modal** — Dialog overlay with backdrop, close button, keyboard dismiss
- [ ] **Tooltip** — Hover/focus tooltip with positioning
- [ ] **Dropdown** — Menu with items, separators, icons
- [ ] **Tabs** — Tab list with content panels
- [ ] **Accordion** — Collapsible sections with smooth animation
- [ ] **Toast** — Notification system with auto-dismiss
- [ ] **Skeleton** — Loading placeholder with shimmer animation

### Step 4: Create Barrel Exports
- [ ] Create `primitives/index.ts` with named exports
- [ ] Update all imports across the codebase to use barrel exports
- [ ] Remove old shadcn component files

### Step 5: Update Molecule Components
- [ ] Refactor `NavBar.tsx` to use new primitives
- [ ] Refactor `Hero.tsx` (new design) to use new primitives
- [ ] Refactor `Footer.tsx` to use new primitives
- [ ] Refactor `ModuleCard.tsx` to use new primitives
- [ ] Refactor `LessonBoard.tsx` to use new primitives
- [ ] Refactor `TopBar.tsx` to use new primitives
- [ ] Refactor `SideNav.tsx` to use new primitives

### Step 6: Update System Components
- [ ] Rename `system/` to `layout/`
- [ ] Refactor `Layout.tsx` → `AppShell.tsx`
- [ ] Refactor `app/lms/layout.tsx` → use `DashboardShell`
- [ ] Update `BlockRenderer.tsx` imports
- [ ] Update `LoadingSkeleton.tsx` to use new primitives

### Step 7: Clean Up Legacy
- [ ] Delete all unused shadcn components from `atomic/`
- [ ] Remove `public/components.json` (stale shadcn config)
- [ ] Remove `app/ui/components.json` (stale)
- [ ] Remove `info.md` (stale Vite/React reference)
- [ ] Remove `app/lib/store.ts` (duplicate of `lib/store.ts`)
- [ ] Remove `app/lib/utils.ts` (duplicate of `lib/utils.ts`)
- [ ] Fix `tsconfig.json` path alias (`@/* → ./*` instead of `./src/*`)

### Step 8: Documentation
- [ ] Create `app/ui/README.md` — Component library overview
- [ ] Document each primitive with usage examples
- [ ] Document the variant system and how to extend
- [ ] Document the design token system and how to add new tokens

### Step 9: Testing
- [ ] Verify all components render correctly in light + dark mode
- [ ] Test keyboard navigation for interactive components
- [ ] Test responsive behavior at all breakpoints
- [ ] Run `bun run lint` and `bun run build`
- [ ] Visual regression check in browser

## Component Specifications

### Button
```tsx
<Button variant="primary" size="md" startIcon={<Icon />} endIcon={<Icon />}>
  Click me
</Button>

// Variants: primary | secondary | outline | ghost | premium | destructive | tertiary | tertiary-bordered
// Sizes: sm (40px) | md (48px) | lg (56px) | icon (40×40)
```

### Input
```tsx
<Input 
  label="Your Name"
  placeholder="e.g. Amara Osei"
  error="Name is required"
  helperText="No account needed"
/>
```

### Card
```tsx
<Card className="effect-glow">
  <Card.Header>
    <Card.Title>Module Name</Card.Title>
    <Card.Description>CS 6307</Card.Description>
  </Card.Header>
  <Card.Content>
    {/* body */}
  </Card.Content>
  <Card.Footer>
    {/* actions */}
  </Card.Footer>
</Card>
```

### Badge
```tsx
<Badge variant="success">Completed</Badge>
<Badge variant="info">In Progress</Badge>
<Badge variant="danger">Error</Badge>
```

### Modal
```tsx
<Modal open={isOpen} onOpenChange={setIsOpen}>
  <Modal.Trigger asChild>
    <Button>Open</Button>
  </Modal.Trigger>
  <Modal.Content>
    <Modal.Header>
      <Modal.Title>Confirm Action</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {/* content */}
    </Modal.Body>
    <Modal.Footer>
      <Button variant="ghost">Cancel</Button>
      <Button variant="primary">Confirm</Button>
    </Modal.Footer>
  </Modal.Content>
</Modal>
```

## Files to Create
- `app/ui/components/primitives/*.tsx` (12 components)
- `app/ui/components/primitives/index.ts` (barrel export)
- `app/ui/components/layout/AppShell.tsx`
- `app/ui/components/layout/DashboardShell.tsx`
- `app/ui/components/layout/PageContainer.tsx`
- `app/ui/README.md`

## Files to Modify
- All molecule components (update imports)
- All system/layout components (update imports + rename)
- `app/layout.tsx` (use AppShell)
- `app/lms/layout.tsx` (use DashboardShell)
- `tsconfig.json` (fix path alias)

## Files to Delete
- ~35 unused shadcn components in `atomic/`
- `public/components.json`
- `app/ui/components.json`
- `info.md`
- `app/lib/store.ts` (duplicate)
- `app/lib/utils.ts` (duplicate)
- `app/lib/api/.gitkeep`
- `app/lib/hooks/.gitkeep`
- `app/ui/hooks/.gitkeep`

## Estimated Effort
- Steps 1-2: Audit + API design (planning)
- Steps 3-4: Core primitives + barrel exports (foundational)
- Steps 5-6: Refactor existing components (migration)
- Steps 7-8: Cleanup + documentation (polish)
- Step 9: Testing + validation

## Success Criteria
- [ ] All components use design system tokens (zero hardcoded values)
- [ ] All components work in light + dark mode
- [ ] All components are accessible (keyboard, screen reader)
- [ ] No Radix UI dependency for new primitives
- [ ] Barrel exports for clean imports
- [ ] No TypeScript or ESLint errors
- [ ] All existing functionality preserved
- [ ] Component library documented with usage examples
