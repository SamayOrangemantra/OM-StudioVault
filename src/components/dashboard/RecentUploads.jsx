import { SectionCard } from './SectionCard'
import { Avatar } from '@/components/ui'
import { AssetTypeIcon } from '@/components/library'
import { getRecentUploads, usersById } from '@/data/selectors'
import { formatBytes, relativeTime } from '@/lib/format'
import { ROUTES } from '@/lib/constants'

function UploadRow({ asset }) {
  const uploader = usersById[asset.uploadedBy]

  return (
    <li className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
      <div className="relative h-11 w-14 shrink-0 overflow-hidden rounded-lg bg-surface-2">
        <img
          src={asset.thumbnailUrl}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <span className="absolute bottom-0.5 right-0.5 flex h-5 w-5 items-center justify-center rounded-md bg-bg/80 text-text backdrop-blur">
          <AssetTypeIcon type={asset.type} className="h-3 w-3" />
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-text">{asset.name}</p>
        <p className="truncate text-xs text-muted">
          {formatBytes(asset.fileSize)} · {relativeTime(asset.uploadedAt)}
        </p>
      </div>

      <Avatar src={uploader?.avatarUrl} name={uploader?.name} size="sm" />
    </li>
  )
}

/** Newest uploads, with thumbnail, meta, and uploader. */
export function RecentUploads() {
  const uploads = getRecentUploads(5)

  return (
    <SectionCard title="Recent uploads" action={{ to: ROUTES.library }}>
      <ul className="divide-y divide-border">
        {uploads.map((asset) => (
          <UploadRow key={asset.id} asset={asset} />
        ))}
      </ul>
    </SectionCard>
  )
}
