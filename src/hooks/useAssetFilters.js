import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FACET_KEYS, emptyFilters } from '@/lib/facets'
import { filtersToParams } from '@/lib/libraryUrl'

/*
 * Filter state lives in the URL query string. Benefits:
 *   - filters are shareable / bookmarkable / back-button friendly
 *   - the dashboard quick-search and collection links can deep-link by simply
 *     navigating to /library?... — no shared store needed.
 *
 * Encoding: each facet is a comma-separated param (?theme=Luxury,Vintage),
 * free-text search is ?q=. This hook is the only place that knows the encoding.
 */
export function useAssetFilters() {
  const [params, setParams] = useSearchParams()

  const filters = useMemo(() => {
    const next = emptyFilters()
    next.query = params.get('q') || ''
    for (const key of FACET_KEYS) {
      const raw = params.get(key)
      next[key] = raw ? raw.split(',').filter(Boolean) : []
    }
    return next
  }, [params])

  // Write a fully-shaped filter object back to the URL, dropping empties.
  const commit = useCallback(
    (next) => setParams(filtersToParams(next), { replace: true }),
    [setParams],
  )

  const setQuery = useCallback(
    (query) => commit({ ...filters, query }),
    [commit, filters],
  )

  const toggleValue = useCallback(
    (key, value) => {
      const current = filters[key] || []
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value]
      commit({ ...filters, [key]: next })
    },
    [commit, filters],
  )

  const clearFacet = useCallback(
    (key) => commit({ ...filters, [key]: [] }),
    [commit, filters],
  )

  const clearAll = useCallback(() => setParams({}, { replace: true }), [setParams])

  return { filters, setQuery, toggleValue, clearFacet, clearAll, commit }
}
