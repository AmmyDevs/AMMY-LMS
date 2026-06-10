import { forwardRef, type ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'white'
  size?: 'sm' | 'md' | 'lg'
  icon?: React.ReactNode
}

/**
 * Testing Button — single CTA button, no CVA, no class-variance-authority.
 * Pure CSS classes from testing.css.
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', icon, children, ...props }, ref) => {
    const classes = [
      't-btn',
      `t-btn--${variant}`,
      `t-btn--${size}`,
      className,
    ].filter(Boolean).join(' ')

    return (
      <button ref={ref} className={classes} {...props}>
        {icon}
        <span>{children}</span>
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
