import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full text-sm font-bold tracking-tight transition-all duration-300 active:scale-[0.96] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 shrink-0 [&_svg]:shrink-0 outline-none select-none",
  {
    variants: {
      variant: {
        default: 
          "bg-[var(--accent)] text-white shadow-lg shadow-[var(--accent)]/15 hover:shadow-xl hover:shadow-[var(--accent)]/25 hover:brightness-105",
        destructive:
          "bg-red-500 text-white hover:bg-red-600",
        outline:
          "border border-[var(--border)] bg-transparent text-[var(--text-heading)] hover:border-[var(--accent)] hover:text-[var(--accent)]",
        secondary:
          "bg-[var(--accent-light)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white",
        ghost:
          "text-[var(--text-muted)] hover:bg-[var(--accent-light)] hover:text-[var(--accent)]",
        premium:
          "bg-white border border-[var(--border)] text-[var(--text-heading)] shadow-sm hover:border-[var(--accent)] hover:text-[var(--accent)] hover:shadow-md",
      },
      size: {
        default: "h-10 px-6",
        sm: "h-8 px-4 text-[13px]",
        lg: "h-12 px-8 text-base",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  startIcon,
  endIcon,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {startIcon}
      <span className="leading-none">{children}</span>
      {endIcon}
    </Comp>
  )
}

export { Button, buttonVariants }
