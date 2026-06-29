import { memo } from 'react'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui'
import { AssetTypeIcon } from './AssetTypeIcon'
import { assetPath } from '@/lib/constants'

/**
 * Compact asset thumbnail used in dense contexts (dashboard strips/grids).
 * Lighter than AssetCard: thumbnail + one-line name + a quiet meta line. The
 * whole tile links to the asset detail. Memoized for use in long rows.
 */
function AssetTileBase({ asset, className }) {
  return (
    <Link
      to={assetPath(asset.id)}
      className={`group block focus-visible:outline-none ${className ?? ''}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-surface-2 transition-shadow duration-300 group-hover:shadow-panel group-focus-visible:ring-2 group-focus-visible:ring-ring">
        <img
          src={asset.thumbnailUrl}
          alt={asset.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <span className="absolute left-2 top-2">
          <Badge variant="neutral" className="gap-1 bg-bg/80 capitalize backdrop-blur">
            <AssetTypeIcon type={asset.type} className="h-3 w-3" />
            {asset.type}
          </Badge>
        </span>
      </div>
      <p className="mt-2 truncate text-[13px] font-medium text-text" title={asset.name}>
        {asset.name}
      </p>
      <p className="truncate text-xs text-muted">
        {asset.client} · {asset.year}
      </p>
    </Link>
  )
}

export const AssetTile = memo(AssetTileBase)
