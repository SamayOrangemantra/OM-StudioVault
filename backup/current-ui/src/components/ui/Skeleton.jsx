import { cn } from '@/lib/cn'

/**
 * Shimmering placeholder block. Compose several to build loading skeletons that
 * mirror the shape of the real content. A gradient sweep (not just a pulse)
 * reads as a more polished, "loading" affordance.
 */
export function Skeleton({ className }) {
  return (
    <div
      className={cn('relative overflow-hidden rounded-md bg-surface-2', className)}
      aria-hidden
    >
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-black/[0.06] to-transparent dark:via-white/[0.06]" />
    </div>
  )
}
