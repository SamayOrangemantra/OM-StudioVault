import { Link } from 'react-router-dom'
import { SectionCard } from './SectionCard'
import { Badge } from '@/components/ui'
import { getCollectionsPreview } from '@/data/selectors'
import { ROUTES } from '@/lib/constants'

function CollectionTile({ collection }) {
  return (
    <Link
      to={ROUTES.collections}
      className="group block overflow-hidden rounded-xl border border-border bg-surface transition-shadow hover:shadow-soft"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-surface-2">
        {collection.coverUrl && (
          <img
            src={collection.coverUrl}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
        <span className="absolute right-2 top-2">
          <Badge variant="neutral" className="bg-bg/80 backdrop-blur">
            {collection.assetCount} assets
          </Badge>
        </span>
      </div>
      <div className="p-4">
        <h3 className="truncate font-medium text-text">{collection.name}</h3>
        <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-muted">
          {collection.description}
        </p>
      </div>
    </Link>
  )
}

/** Preview row of the most recently updated collections. */
export function CollectionsPreview() {
  const collections = getCollectionsPreview(3)

  return (
    <SectionCard
      title="Collections"
      action={{ to: ROUTES.collections }}
      bodyClassName="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      {collections.map((c) => (
        <CollectionTile key={c.id} collection={c} />
      ))}
    </SectionCard>
  )
}
