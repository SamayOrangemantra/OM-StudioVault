import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'
import { EASE } from '@/lib/motion'

/**
 * Centered placeholder for empty screens (no assets, no favorites, no matches).
 * Gently fades/scales in so an empty result doesn't snap into view.
 */
export function EmptyState({ icon: Icon, title, description, action, className }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: EASE }}
      className={cn(
        'flex flex-col items-center justify-center rounded-2xl border border-dashed border-border',
        'px-6 py-16 text-center',
        className,
      )}
    >
      {Icon && (
        <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-2 text-accent">
          <Icon className="h-6 w-6" />
        </span>
      )}
      <h3 className="font-display text-xl font-semibold text-text">{title}</h3>
      {description && (
        <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-muted">
          {description}
        </p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </motion.div>
  )
}
