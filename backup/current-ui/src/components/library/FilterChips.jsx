import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { FACETS } from '@/lib/facets'
import { countActiveFilters } from '@/lib/filterAssets'

/**
 * Removable pills for every active filter value, plus a "clear all". Reads the
 * same filter state as the sidebar; removing a chip toggles that value off.
 * Chips animate in/out so adding and clearing filters feels tactile.
 */
export function FilterChips({ filters, onRemove, onClearAll }) {
  const active = countActiveFilters(filters)

  return (
    <AnimatePresence initial={false}>
      {active > 0 && (
        <motion.div
          className="flex flex-wrap items-center gap-2"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
        >
          <AnimatePresence initial={false}>
            {FACETS.flatMap((facet) =>
              (filters[facet.key] || []).map((value) => (
                <motion.button
                  key={`${facet.key}:${value}`}
                  layout
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.15 }}
                  type="button"
                  onClick={() => onRemove(facet.key, value)}
                  className="group inline-flex items-center gap-1.5 rounded-full border border-border bg-surface py-1 pl-3 pr-2 text-sm text-text transition-colors hover:border-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span className="text-xs text-muted">{facet.label}:</span>
                  {value}
                  <X className="h-3.5 w-3.5 text-muted transition-colors group-hover:text-text" />
                </motion.button>
              )),
            )}
          </AnimatePresence>

          {active > 1 && (
            <button
              type="button"
              onClick={onClearAll}
              className="rounded-md px-1 text-sm font-medium text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Clear all
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
