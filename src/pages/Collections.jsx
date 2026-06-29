import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { PageHeader, Card, Badge, Button, Eyebrow } from '@/components/ui'
import { getCollections } from '@/data/selectors'
import { libraryUrl } from '@/lib/libraryUrl'
import { staggerContainer, gridItem } from '@/lib/motion'

/** Full-width editorial hero for the lead collection. */
function CollectionHero({ collection, onOpen }) {
  return (
    <button
      onClick={onOpen}
      className="group relative block h-[340px] w-full overflow-hidden rounded-4xl border border-border text-left shadow-panel focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg sm:h-[400px]"
    >
      {collection.coverUrl && (
        <img
          src={collection.coverUrl}
          alt=""
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/5" />
      <div className="relative flex h-full flex-col justify-end gap-3 p-8 sm:p-10">
        <Eyebrow className="text-white/80">Featured collection</Eyebrow>
        <h2 className="max-w-2xl font-display text-4xl font-semibold leading-[1.05] text-white sm:text-5xl">
          {collection.name}
        </h2>
        <p className="max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">
          {collection.description}
        </p>
        <div className="mt-2 flex items-center gap-4">
          <Button
            variant="outline"
            className="border-white/70 bg-white/10 text-white backdrop-blur hover:bg-white/20"
          >
            Explore collection
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
          <span className="text-sm font-medium text-white/80">
            {collection.assetCount} assets
          </span>
        </div>
      </div>
    </button>
  )
}

/** Supporting collection card. */
function CollectionCard({ collection, onOpen }) {
  return (
    <Card interactive onClick={onOpen} className="group overflow-hidden rounded-4xl">
      <div className="relative aspect-[5/3] overflow-hidden bg-surface-2">
        {collection.coverUrl && (
          <img
            src={collection.coverUrl}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <Badge
          variant="neutral"
          className="absolute right-3 top-3 bg-bg/80 backdrop-blur"
        >
          {collection.assetCount} assets
        </Badge>
        <div className="absolute inset-x-0 bottom-0 space-y-1 p-5">
          <Eyebrow className="text-white/75">Collection</Eyebrow>
          <h3 className="font-display text-xl font-semibold text-white">
            {collection.name}
          </h3>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 p-5">
        <p className="line-clamp-2 text-sm text-muted">{collection.description}</p>
        <ArrowRight className="h-5 w-5 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent" />
      </div>
    </Card>
  )
}

/**
 * Collections — the visual centerpiece. A featured editorial hero leads, with
 * the remaining curated sets in a card grid. Opening one navigates to the
 * Library pre-filtered by that collection's predicate (same filtering engine).
 */
export default function Collections() {
  const navigate = useNavigate()
  const collections = useMemo(() => getCollections(), [])
  const [featured, ...rest] = collections

  const open = (collection) => navigate(libraryUrl(collection.filter))

  return (
    <div className="space-y-7">
      <PageHeader
        eyebrow="Curated"
        title="Collections"
        subtitle="Curated sets of assets for clients, events, and moodboards."
      />

      {featured && <CollectionHero collection={featured} onOpen={() => open(featured)} />}

      <motion.div
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"
        variants={staggerContainer(0.06)}
        initial="hidden"
        animate="show"
      >
        {rest.map((c) => (
          <motion.div key={c.id} variants={gridItem}>
            <CollectionCard collection={c} onOpen={() => open(c)} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
