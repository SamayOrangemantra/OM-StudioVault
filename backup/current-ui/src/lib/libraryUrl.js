import { FACET_KEYS } from './facets'
import { ROUTES } from './constants'

/*
 * Single source of truth for encoding filter state into the Library URL. Used by
 * the filter hook (writing state), collections (deep-linking a predicate), and
 * metadata / search links (drilling into one facet) — so the encoding lives in
 * exactly one place.
 *
 * Shape: { query?: string, [facetKey]: string[] }
 * Encoding: ?q=<text> and ?<facet>=<comma,separated,values>
 */
export function filtersToParams(filters = {}) {
  const sp = new URLSearchParams()
  if (filters.query?.trim()) sp.set('q', filters.query.trim())
  for (const key of FACET_KEYS) {
    if (filters[key]?.length) sp.set(key, filters[key].join(','))
  }
  return sp
}

/** Full Library href for a (possibly partial) filter spec. */
export function libraryUrl(filters = {}) {
  const qs = filtersToParams(filters).toString()
  return qs ? `${ROUTES.library}?${qs}` : ROUTES.library
}
