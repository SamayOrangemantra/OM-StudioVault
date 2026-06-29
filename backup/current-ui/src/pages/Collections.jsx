import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PageHeader, Card, Badge } from '@/components/ui'
import { getCollections } from '@/data/selectors'
import { libraryUrl } from '@/lib/libraryUrl'

function CollectionCard({ collection, onOpen }) {
  return (
    <Card interactive onClick={onOpen} className="group overflow-hidden">
      <div className="relative aspect-[16/9] overflow-hidden bg-surface-2">
        {collection.coverUrl && (
          <img
            src={collection.coverUrl}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
          <h2 className="font-display text-xl font-semibold text-white">
            {collection.name}
          </h2>
          <Badge variant="neutral" className="bg-bg/80 backdrop-blur">
            {collection.assetCount} assets
          </Badge>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 p-4">
        <p className="line-clamp-2 text-sm text-muted">{collection.description}</p>
        <ArrowRight className="h-5 w-5 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent" />
      </div>
    </Card>
  )
}

/**
 * Collections — curated, predicate-defined sets. Opening one navigates to the
 * Library with that collection's filters applied (collections reuse the exact
 * same filtering engine), so "clicking a collection filters assets".
 */
export default function Collections() {
  const navigate = useNavigate()
  const collections = useMemo(() => getCollections(), [])

  const open = (collection) => navigate(libraryUrl(collection.filter))

  return (
    <div className="space-y-6">
      <PageHeader
        title="Collections"
        subtitle="Curated sets of assets for clients, events, and moodboards."
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {collections.map((c) => (
          <CollectionCard key={c.id} collection={c} onOpen={() => open(c)} />
        ))}
      </div>
    </div>
  )
}
