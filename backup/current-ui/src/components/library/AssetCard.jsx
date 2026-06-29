import { memo } from 'react'
import { Link } from 'react-router-dom'
import { Eye } from 'lucide-react'
import { Badge } from '@/components/ui'
import { FavoriteButton } from './FavoriteButton'
import { AssetTypeIcon } from './AssetTypeIcon'
import { assetPath } from '@/lib/constants'
import { titleCase } from '@/lib/format'

/**
 * A single asset tile. The whole card links to the detail page. On hover it
 * reveals a gradient overlay with quick context + a "view" cue (hover preview);
 * the favorite toggle and type chip stay visible at rest. Memoized because the
 * grid can render ~100 of these and filtering re-renders the list often.
 */
function AssetCardBase({ asset }) {
  return (
    <Link
      to={assetPath(asset.id)}
      className="group relative block overflow-hidden rounded-2xl border border-border bg-surface shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-panel focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
    >
      {/* Thumbnail */}
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-2">
        <img
          src={asset.thumbnailUrl}
          alt={asset.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Top row: type chip + favorite */}
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-2.5">
          <Badge
            variant="neutral"
            className="gap-1 bg-bg/80 capitalize backdrop-blur"
          >
            <AssetTypeIcon type={asset.type} className="h-3 w-3" />
            {asset.type}
          </Badge>
          <FavoriteButton assetId={asset.id} size="sm" />
        </div>

        {/* Hover preview overlay */}
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/75 via-black/20 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex items-center gap-1.5 text-xs font-medium text-white/90">
            <Eye className="h-3.5 w-3.5" />
            View details
          </div>
          <p className="mt-1 line-clamp-1 text-sm font-medium text-white">
            {asset.client}
          </p>
          <p className="line-clamp-1 text-xs text-white/70">{asset.venue}</p>
        </div>
      </div>

      {/* Meta */}
      <div className="space-y-1.5 p-3">
        <p className="truncate text-sm font-medium text-text" title={asset.name}>
          {asset.name}
        </p>
        <div className="flex items-center gap-2 text-xs text-muted">
          <span className="truncate">{asset.eventType}</span>
          <span className="text-border">·</span>
          <span>{asset.year}</span>
        </div>
        <div className="flex flex-wrap gap-1 pt-0.5">
          {asset.colors.slice(0, 3).map((c) => (
            <Badge key={c} variant="outline" className="text-[10px]">
              {titleCase(c)}
            </Badge>
          ))}
        </div>
      </div>
    </Link>
  )
}

export const AssetCard = memo(AssetCardBase)
