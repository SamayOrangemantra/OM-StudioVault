import { cn } from '@/lib/cn'

/**
 * Lightweight CSS-only tooltip — wraps any trigger and reveals a label on
 * hover/focus. Sufficient for a prototype without a positioning dependency.
 */
export function Tooltip({ label, side = 'bottom', className, children }) {
  const sideClasses = {
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  }

  return (
    <span className={cn('group/tt relative inline-flex', className)}>
      {children}
      <span
        role="tooltip"
        className={cn(
          'pointer-events-none absolute z-50 whitespace-nowrap rounded-lg bg-text px-2 py-1',
          'text-xs font-medium text-bg opacity-0 shadow-soft',
          'transition-opacity duration-150 group-hover/tt:opacity-100 group-focus-within/tt:opacity-100',
          sideClasses[side],
        )}
      >
        {label}
      </span>
    </span>
  )
}
