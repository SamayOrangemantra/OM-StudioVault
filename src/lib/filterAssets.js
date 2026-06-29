import { FACETS } from './facets'

/*
 * Pure, allocation-light filtering over the asset list.
 *
 * Semantics:
 *   - within a facet  → OR  (theme = Luxury OR Royal Heritage)
 *   - across facets   → AND (theme matches AND year matches)
 *   - free-text query → substring match across the searchable fields
 *
 * Kept pure so callers can memoize on (assets, filters) and so collections can
 * reuse the exact same engine via a partial filter spec.
 */

const searchHaystack = (a) =>
  [
    a.name,
    a.client,
    a.venue,
    a.theme,
    a.eventType,
    a.year,
    ...(a.tags || []),
    ...(a.colors || []),
    ...(a.designElements || []),
  ]
    .join(' ')
    .toLowerCase()

export function filterAssets(assets, filters = {}) {
  const q = filters.query?.trim().toLowerCase()

  // Pre-resolve the active facets once so the inner loop stays tight.
  const active = FACETS.map((f) => ({ ...f, sel: filters[f.key] })).filter(
    (f) => f.sel && f.sel.length > 0,
  )

  if (!q && active.length === 0) return assets

  return assets.filter((a) => {
    if (q && !searchHaystack(a).includes(q)) return false

    for (const f of active) {
      if (f.type === 'array') {
        const vals = a[f.key] || []
        if (!f.sel.some((s) => vals.includes(s))) return false
      } else {
        if (!f.sel.map(String).includes(String(a[f.key]))) return false
      }
    }
    return true
  })
}

/**
 * Build the option list (value + count) for every facet from the full asset
 * set. Computed once and memoized by the caller — the data is static.
 */
export function buildFacetOptions(assets) {
  const counts = Object.fromEntries(FACETS.map((f) => [f.key, new Map()]))

  for (const a of assets) {
    for (const f of FACETS) {
      const raw = a[f.key]
      const values = f.type === 'array' ? raw || [] : raw == null ? [] : [raw]
      for (const v of values) {
        const m = counts[f.key]
        m.set(v, (m.get(v) || 0) + 1)
      }
    }
  }

  const result = {}
  for (const f of FACETS) {
    const entries = [...counts[f.key].entries()].map(([value, count]) => ({
      value,
      count,
    }))
    // Year descending; everything else alphabetical.
    entries.sort((x, y) =>
      f.key === 'year'
        ? Number(y.value) - Number(x.value)
        : String(x.value).localeCompare(String(y.value)),
    )
    result[f.key] = entries
  }
  return result
}

/** Total number of selected values across all facets (for chip/badge counts). */
export function countActiveFilters(filters) {
  return FACETS.reduce((n, f) => n + (filters[f.key]?.length || 0), 0)
}
