import { forwardRef } from 'react'
import { cn } from '@/lib/cn'

/**
 * Text input with optional leading icon (e.g. search). Sizing/spacing matches
 * the Button scale so they align in toolbars.
 */
export const Input = forwardRef(function Input(
  { icon: Icon, className, wrapperClassName, ...props },
  ref,
) {
  return (
    <div className={cn('relative flex items-center', wrapperClassName)}>
      {Icon && (
        <Icon className="pointer-events-none absolute left-3 h-4 w-4 text-muted" />
      )}
      <input
        ref={ref}
        className={cn(
          'h-10 w-full rounded-xl border border-border bg-surface text-sm text-text',
          'placeholder:text-muted',
          'transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-ring/30',
          Icon ? 'pl-9 pr-3' : 'px-3',
          className,
        )}
        {...props}
      />
    </div>
  )
})
