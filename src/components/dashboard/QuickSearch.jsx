import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import { Card, Input, Button, Badge } from '@/components/ui'
import { getTrendingTags } from '@/data/selectors'
import { titleCase } from '@/lib/format'
import { libraryUrl } from '@/lib/libraryUrl'

/**
 * Hero quick-search for the dashboard. Submitting (or tapping a suggested tag)
 * routes to the Library — the actual search/filter logic is a later phase, so
 * this only hands the query off via the URL. No filtering is implemented here.
 */
export function QuickSearch() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const suggestions = getTrendingTags(4)

  const goToLibrary = (q) => navigate(libraryUrl({ query: q }))

  return (
    <Card className="p-5">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          goToLibrary(query)
        }}
        className="flex flex-col gap-3 sm:flex-row sm:items-center"
      >
        <Input
          icon={Search}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search assets, collections, and tags…"
          wrapperClassName="flex-1"
          className="h-11"
        />
        <Button type="submit" size="lg" className="sm:w-auto">
          Search
        </Button>
      </form>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="text-xs text-muted">Try:</span>
        {suggestions.map(({ tag }) => (
          <button
            key={tag}
            type="button"
            onClick={() => goToLibrary(tag)}
            className="rounded-full transition-transform hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Badge variant="outline" className="hover:border-accent/50">
              {titleCase(tag)}
            </Badge>
          </button>
        ))}
      </div>
    </Card>
  )
}
