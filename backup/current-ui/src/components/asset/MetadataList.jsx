import { Link } from 'react-router-dom'
import { formatBytes, relativeTime } from '@/lib/format'
import { usersById } from '@/data/selectors'
import { libraryUrl } from '@/lib/libraryUrl'

/** A linked facet value that drills into the library, pre-filtered by it. */
function FacetLink({ facet, value }) {
  return (
    <Link
      to={libraryUrl({ [facet]: [String(value)] })}
      className="text-text underline-offset-2 hover:text-accent hover:underline"
    >
      {value}
    </Link>
  )
}

/**
 * Key/value metadata for an asset. Facet rows link into the library pre-filtered
 * by that value, so the metadata doubles as navigation.
 */
export function MetadataList({ asset }) {
  const uploader = usersById[asset.uploadedBy]

  const rows = [
    { label: 'Client', node: <FacetLink facet="client" value={asset.client} /> },
    { label: 'Venue', node: <FacetLink facet="venue" value={asset.venue} /> },
    { label: 'Event type', node: <FacetLink facet="eventType" value={asset.eventType} /> },
    { label: 'Theme', node: <FacetLink facet="theme" value={asset.theme} /> },
    { label: 'Year', node: <FacetLink facet="year" value={asset.year} /> },
    {
      label: 'Dimensions',
      node: asset.dimensions
        ? `${asset.dimensions.width} × ${asset.dimensions.height}`
        : '—',
    },
    { label: 'File size', node: formatBytes(asset.fileSize) },
    { label: 'Type', node: <span className="capitalize">{asset.type}</span> },
    { label: 'Uploaded by', node: uploader?.name ?? '—' },
    { label: 'Uploaded', node: relativeTime(asset.uploadedAt) },
  ]

  return (
    <dl className="divide-y divide-border">
      {rows.map((row) => (
        <div key={row.label} className="flex items-center justify-between gap-4 py-2.5">
          <dt className="text-sm text-muted">{row.label}</dt>
          <dd className="text-right text-sm font-medium text-text">{row.node}</dd>
        </div>
      ))}
    </dl>
  )
}
