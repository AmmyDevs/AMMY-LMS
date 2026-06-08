/**
 * AMMY Archives — Primitives
 *
 * Core, theme-aware UI components built on design system tokens.
 * These replace the legacy shadcn/ui atomic components.
 *
 * Usage:
 *   import { Button, Input, Card, Badge, Skeleton } from '@/app/ui/components/primitives'
 */

export { Button, buttonVariants, type ButtonProps } from './Button'
export { Input, type InputProps } from './Input'
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  type CardProps,
} from './Card'
export { Badge, badgeVariants, type BadgeProps } from './Badge'
export { Skeleton, type SkeletonProps } from './Skeleton'
export { default as ThemeToggle } from './ThemeToggle'
export { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription } from './Sheet'
export { Logo } from './Logo'
