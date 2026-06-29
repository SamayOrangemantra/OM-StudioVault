import { useNavigate } from 'react-router-dom'
import { Hash } from 'lucide-react'
import { SectionCard } from './SectionCard'
import { getTrendingTags } from '@/data/selectors'
import { titleCase } from '@/lib/format'
import { libraryUrl } from '@/lib/libraryUrl'

/**
 * Tag cloud ranked by usage. Tapping a tag routes to the Library with the tag as
 * a query (filtering itself lands in a later phase).
 */
export function TrendingTags() {
  const navigate = useNavigate()
  const tags = getTrendingTags(8)

  return (
    <SectionCard title="Trending tags">
      <div className="flex flex-wrap gap-2">
        {tags.map(({ tag, count }) => (
          <button
            key={tag}
            type="button"
            onClick={() => navigate(libraryUrl({ query: tag }))}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-2 px-3 py-1.5 text-sm text-text transition-colors hover:border-accent/50 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Hash className="h-3.5 w-3.5 text-muted" />
            {titleCase(tag)}
            <span className="text-xs text-muted">{count}</span>
          </button>
        ))}
      </div>
    </SectionCard>
  )
}
