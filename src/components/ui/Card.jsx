import { cn } from '@/lib/cn'

/**
 * Surface container for grouped content. `interactive` adds hover affordance
 * for clickable cards (used heavily once asset/collection cards arrive).
 */
export function Card({ interactive = false, className, children, ...props }) {
  return (
    <div
      className={cn(
        'rounded-3xl border border-border bg-surface',
        interactive &&
          'cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-panel',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
