import { cn } from '@/lib/cn'

/**
 * Eyebrow category label — a small gold dot + uppercase, tracked micro-heading.
 * The editorial "section signal" from the design system; pairs above a title.
 *
 *   <Eyebrow>Library</Eyebrow>
 */
export function Eyebrow({ children, className }) {
  return (
    <span className={cn('inline-flex items-center gap-2 text-muted', className)}>
      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      <span className="text-eyebrow">{children}</span>
    </span>
  )
}
