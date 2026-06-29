import { forwardRef } from 'react'
import { cn } from '@/lib/cn'

const SIZES = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
}

/**
 * Square, icon-only button for toolbars and headers. Pass the Lucide icon
 * component as `icon`; always provide `aria-label` for accessibility.
 */
export const IconButton = forwardRef(function IconButton(
  { icon: Icon, size = 'md', className, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center rounded-xl text-muted',
        'transition-colors duration-150 hover:bg-surface-2 hover:text-text active:scale-95',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        'disabled:pointer-events-none disabled:opacity-50',
        SIZES[size],
        className,
      )}
      {...props}
    >
      {Icon && <Icon className="h-[18px] w-[18px]" />}
    </button>
  )
})
