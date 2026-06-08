import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Label text displayed above the input */
  label?: string
  /** Error message displayed below the input */
  error?: string
  /** Helper text displayed below the input (hidden when error is present) */
  helperText?: string
}

/**
 * Core Input component for AMMY Archives.
 *
 * Uses design system tokens for all styling.
 * Supports label, error, and helper text states.
 *
 * @example
 * <Input label="Your Name" placeholder="e.g. Amara Osei" />
 * <Input label="Email" error="Email is required" />
 * <Input label="Search" helperText="Type to filter modules" />
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)

    return (
      <div className="col gap-2 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-body font-semibold color-heading"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn('input-primary', error && 'input-error', className)}
          aria-invalid={error ? true : undefined}
          aria-describedby={
            error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
          }
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-fine tone-danger-text" role="alert">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p id={`${inputId}-helper`} className="text-fine color-muted">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }
