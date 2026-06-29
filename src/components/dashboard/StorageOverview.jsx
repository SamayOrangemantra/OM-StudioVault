import { SectionCard } from './SectionCard'
import { getStorage } from '@/data/selectors'
import { formatBytes } from '@/lib/format'

// Gold-toned shades so the stacked bar stays within the brand accent family.
const SEGMENT_SHADE = ['bg-accent', 'bg-accent/70', 'bg-accent/45', 'bg-accent/25']

/**
 * Storage usage vs plan, with a stacked bar broken down by asset type. Reads the
 * derived storage selector — purely presentational.
 */
export function StorageOverview() {
  const storage = getStorage()
  const totalBytes = storage.byType.reduce((s, t) => s + t.bytes, 0) || 1

  return (
    <SectionCard title="Storage">
      <div className="space-y-4">
        <div className="flex items-end justify-between">
          <p className="font-display text-2xl font-semibold text-text">
            {formatBytes(storage.usedBytes)}
          </p>
          <p className="text-sm text-muted">of {formatBytes(storage.quotaBytes)}</p>
        </div>

        {/* Stacked-by-type usage bar */}
        <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-surface-2">
          {storage.byType.map((t, i) => (
            <span
              key={t.type}
              className={SEGMENT_SHADE[i % SEGMENT_SHADE.length]}
              style={{ width: `${(t.bytes / totalBytes) * 100}%` }}
              title={`${t.label}: ${formatBytes(t.bytes)}`}
            />
          ))}
        </div>

        <ul className="grid grid-cols-2 gap-y-2">
          {storage.byType.map((t, i) => (
            <li key={t.type} className="flex items-center gap-2 text-xs">
              <span
                className={`h-2 w-2 rounded-full ${SEGMENT_SHADE[i % SEGMENT_SHADE.length]}`}
              />
              <span className="text-muted">{t.label}</span>
              <span className="ml-auto font-medium text-text">
                {formatBytes(t.bytes)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </SectionCard>
  )
}
