import { useEffect, useMemo, useState } from 'react'
import { SlidersHorizontal, SearchX } from 'lucide-react'
import { PageHeader, Button, Modal, EmptyState, Badge } from '@/components/ui'
import {
  SearchBar,
  FilterSidebar,
  FilterChips,
  AssetGrid,
} from '@/components/library'
import { useAssetFilters } from '@/hooks/useAssetFilters'
import { filterAssets, countActiveFilters } from '@/lib/filterAssets'
import { assets } from '@/data'

/**
 * Asset Library — the core module. Filter state lives in the URL (via
 * useAssetFilters); filtering itself is a pure, memoized pass over the static
 * mock data. Layout is a sticky filter rail beside a responsive grid; on small
 * screens the rail moves into a modal drawer.
 */
export default function Library() {
  const { filters, setQuery, toggleValue, clearAll } = useAssetFilters()
  const [drawerOpen, setDrawerOpen] = useState(false)

  // Brief skeleton on first load to demonstrate the loading state.
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(t)
  }, [])

  // Memoized so unrelated re-renders (e.g. favoriting) don't re-run the filter
  // pass; it only recomputes when the filter inputs actually change.
  const results = useMemo(() => filterAssets(assets, filters), [filters])
  const activeCount = countActiveFilters(filters)

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Library"
        title="Asset Library"
        subtitle={`${assets.length} assets across every event, beautifully organized.`}
      />

      <div className="flex gap-6 xl:gap-8">
        {/* Desktop filter rail */}
        <aside className="hidden w-56 shrink-0 lg:block xl:w-60">
          <div className="sticky top-6 max-h-[calc(100vh-7rem)]">
            <FilterSidebar
              filters={filters}
              onToggle={toggleValue}
              onClearAll={clearAll}
            />
          </div>
        </aside>

        {/* Main column */}
        <div className="min-w-0 flex-1 space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <SearchBar value={filters.query} onChange={setQuery} />
            </div>
            <Button
              variant="outline"
              icon={SlidersHorizontal}
              className="lg:hidden"
              onClick={() => setDrawerOpen(true)}
            >
              Filters
              {activeCount > 0 && (
                <Badge variant="accent" className="ml-0.5">
                  {activeCount}
                </Badge>
              )}
            </Button>
          </div>

          <FilterChips
            filters={filters}
            onRemove={toggleValue}
            onClearAll={clearAll}
          />

          <p className="text-sm text-muted">
            {loading
              ? 'Loading assets…'
              : `${results.length} ${results.length === 1 ? 'result' : 'results'}`}
          </p>

          {!loading && results.length === 0 ? (
            <EmptyState
              icon={SearchX}
              title="No assets match your filters"
              description="Try removing a filter or broadening your search."
              action={
                <Button variant="outline" onClick={clearAll}>
                  Clear all filters
                </Button>
              }
            />
          ) : (
            <AssetGrid assets={results} loading={loading} />
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      <Modal open={drawerOpen} onClose={() => setDrawerOpen(false)} title="Filters">
        <div className="max-h-[70vh] overflow-y-auto">
          <FilterSidebar
            filters={filters}
            onToggle={toggleValue}
            onClearAll={clearAll}
          />
        </div>
        <div className="mt-4 flex justify-end">
          <Button onClick={() => setDrawerOpen(false)}>
            Show {results.length} results
          </Button>
        </div>
      </Modal>
    </div>
  )
}
