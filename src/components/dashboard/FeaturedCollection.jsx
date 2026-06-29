import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Button, Eyebrow } from '@/components/ui'
import { getCollectionsPreview } from '@/data/selectors'
import { libraryUrl } from '@/lib/libraryUrl'

/**
 * The dashboard's hero card — the largest, most editorial element. Surfaces the
 * lead collection with full-bleed imagery, an overlay, and a single CTA into the
 * pre-filtered Library. Establishes top-of-hierarchy on the page.
 */
export function FeaturedCollection() {
  const navigate = useNavigate()
  const collection = getCollectionsPreview(1)[0]
  if (!collection) return null

  const open = () => navigate(libraryUrl(collection.filter))

  return (
    <button
      onClick={open}
      className="group relative block h-full min-h-[300px] w-full overflow-hidden rounded-4xl border border-border bg-surface text-left shadow-panel focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
    >
      {collection.coverUrl && (
        <img
          src={collection.coverUrl}
          alt=""
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/5" />

      <div className="relative flex h-full flex-col justify-end gap-3 p-7">
        <Eyebrow className="text-white/80">Featured collection</Eyebrow>
        <h2 className="max-w-xl font-display text-3xl font-semibold leading-tight text-white sm:text-4xl">
          {collection.name}
        </h2>
        <p className="max-w-md text-sm leading-relaxed text-white/75">
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
