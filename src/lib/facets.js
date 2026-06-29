/*
 * Facet configuration — the single source of truth for what's filterable.
 *
 * `type: 'single'`  → the asset stores a scalar at asset[key] (e.g. theme).
 * `type: 'array'`   → the asset stores an array at asset[key] (e.g. colors);
 *                      an asset matches if its values intersect the selection.
 *
 * The filter sidebar, chips, URL serialization, and filtering logic all derive
 * from this list, so adding a facet is a one-line change here.
 */
export const FACETS = [
  { key: 'eventType', label: 'Event Type', type: 'single' },
  { key: 'theme', label: 'Theme', type: 'single' },
  { key: 'client', label: 'Client', type: 'single' },
  { key: 'venue', label: 'Venue', type: 'single' },
  { key: 'year', label: 'Year', type: 'single' },
  { key: 'colors', label: 'Colors', type: 'array' },
  { key: 'designElements', label: 'Design Elements', type: 'array' },
]

export const FACET_KEYS = FACETS.map((f) => f.key)

/** Empty, fully-shaped filter state (every facet → empty array, plus query). */
export function emptyFilters() {
  return { query: '', ...Object.fromEntries(FACET_KEYS.map((k) => [k, []])) }
}
