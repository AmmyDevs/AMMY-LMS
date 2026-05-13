import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

/**
 * Extended tailwind-merge that understands semantic button variant classes
 * as a conflict group, so cn('btn-primary', 'btn-secondary') → 'btn-secondary'
 * (last-wins), consistent with Requirement 10.4.
 */
const twMerge = extendTailwindMerge<'btn-variant'>({
  extend: {
    classGroups: {
      "btn-variant": [
        "btn-primary",
        "btn-secondary",
        "btn-outline",
        "btn-ghost",
        "btn-tertiary",
        "btn-tertiary-bordered",
        "btn-premium",
        "btn-destructive",
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
