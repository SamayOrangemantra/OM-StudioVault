import { SectionCard } from './SectionCard'
import { AssetTypeIcon } from '@/components/library'
import { getAssetTypeDistribution } from '@/data/selectors'

/**
 * Breakdown of the library by file type — count + share, with a quiet progress
 * bar per row. Communicates the composition of the catalog at a glance.
 */
export function AssetTypeDistribution() {
  const types = getAssetTypeDistribution()

  return (
    <SectionCard title="Asset types">
      <ul className="space-y-3.5">
        {types.map((t) => (
          <li key={t.type} className="space-y-1.5">
            <div className="flex items-center gap-2 text-sm">
              <AssetTypeIcon type={t.type} className="h-4 w-4 text-muted" />
              <span className="font-medium text-text">{t.label}</span>
              <span className="ml-auto text-xs text-muted">
                {t.count} · {t.pct}%
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
              <span
                className="block h-full rounded-full bg-accent"
                style={{ width: `${t.pct}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </SectionCard>
  )
}
