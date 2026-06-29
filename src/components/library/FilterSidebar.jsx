import { useMemo, useState } from 'react'
import { ChevronDown, SlidersHorizontal } from 'lucide-react'
import { cn } from '@/lib/cn'
import { FACETS } from '@/lib/facets'
import { buildFacetOptions, countActiveFilters } from '@/lib/filterAssets'
import { assets } from '@/data'

/** One collapsible facet group with checkboxes + per-option counts. */
function FilterGroup({ facet, options, selected, onToggle }) {
  const [open, setOpen] = useState(true)
  const [expanded, setExpanded] = useState(false)
  const LIMIT = 6
  const visible = expanded ? options : options.slice(0, LIMIT)

  return (
    <div className="border-b border-border py-3 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between rounded-md py-1 text-sm font-medium text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <span className="flex items-center gap-2">
          {facet.label}
          {selected.length > 0 && (
            <span className="rounded-full bg-accent/15 px-1.5 text-xs text-accent">
              {selected.length}
            </span>
          )}
        </span>
        <ChevronDown
          className={cn(
            'h-4 w-4 text-muted transition-transform',
            !open && '-rotate-90',
          )}
        />
      </button>

      {open && (
        <div className="mt-2 space-y-1">
          {visible.map(({ value, count }) => {
            // Filter values are serialized as strings in the URL, so compare as such.
            const checked = selected.includes(String(value))
            return (
              <label
                key={value}
                className="flex cursor-pointer items-center gap-2.5 rounded-lg px-1.5 py-1 text-sm text-muted transition-colors hover:bg-surface-2 hover:text-text"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggle(facet.key, String(value))}
                  className="h-4 w-4 shrink-0 rounded border-border text-accent accent-accent focus:ring-ring"
                />
                <span className="flex-1 truncate">{value}</span>
                <span className="text-xs text-muted/70">{count}</span>
              </label>
            )
          })}

          {options.length > LIMIT && (
            <button
              type="button"
              onClick={() => setExpanded((e) => !e)}
              className="rounded px-1.5 pt-1 text-xs font-medium text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {expanded ? 'Show less' : `Show all ${options.length}`}
            </button>
          )}
        </div>
      )}
    </div>
  )
}

/**
 * The full filter panel. Facet options + counts are computed once from the
 * static asset set and memoized. Rendered both in the desktop rail and inside
 * the mobile filter drawer, so it's purely driven by props.
 */
export function FilterSidebar({ filters, onToggle, onClearAll }) {
  const options = useMemo(() => buildFacetOptions(assets), [])
  const activeCount = countActiveFilters(filters)

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between pb-2">
        <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-text">
          <SlidersHorizontal className="h-4 w-4 text-muted" />
          Filters
        </h2>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={onClearAll}
            className="rounded px-1 text-xs font-medium text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="-mr-2 flex-1 overflow-y-auto pr-2">
        {FACETS.map((facet) => (
          <FilterGroup
            key={facet.key}
            facet={facet}
            options={options[facet.key]}
            selected={filters[facet.key] || []}
            onToggle={onToggle}
          />
        ))}
      </div>
    </div>
  )
}
