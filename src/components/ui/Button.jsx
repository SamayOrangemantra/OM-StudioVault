import { forwardRef } from 'react'
import { cn } from '@/lib/cn'

// Pill buttons. Primary is a warm-ink pill (cream text); secondary is an
// outlined pill. Gold is reserved as an accent elsewhere, not the primary fill.
const VARIANTS = {
  primary:
    'bg-text text-bg border-[1.5px] border-text shadow-soft hover:opacity-90 hover:shadow-panel',
  outline:
    'border-[1.5px] border-text/90 bg-surface text-text hover:bg-surface-2',
  ghost: 'text-text hover:bg-surface-2',
  subtle: 'bg-surface-2 text-text hover:bg-border/60',
}

const SIZES = {
  sm: 'h-8 px-4 text-sm gap-1.5',
  md: 'h-10 px-5 text-sm gap-2',
  lg: 'h-11 px-6 text-base gap-2',
}

/**
 * Primary action button. Composable via `variant` / `size`; renders an optional
 * leading icon. Class conflicts are resolved by cn(), so callers can override.
 */
export const Button = forwardRef(function Button(
  { variant = 'primary', size = 'md', icon: Icon, className, children, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex select-none items-center justify-center rounded-full font-medium',
        'transition-[color,background-color,border-color,box-shadow,transform,opacity] duration-150 active:scale-[0.98]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
        'disabled:pointer-events-none disabled:opacity-50',
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...props}
    >
      {Icon && <Icon className="h-4 w-4 shrink-0" />}
      {children}
    </button>
  )
})
