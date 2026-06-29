import { SectionCard } from './SectionCard'
import { AssetTile } from '@/components/library'

/**
 * A titled panel rendering a responsive grid of compact asset tiles. Reused for
 * "Jump back in" and "Recently uploaded" — same shell, different data, so the
 * two strips stay visually consistent.
 */
export function AssetSection({ title, action, assets, cols = 6 }) {
  const colClass = cols === 6 ? 'xl:grid-cols-6' : 'xl:grid-cols-4'

  return (
    <SectionCard title={title} action={action}>
      <div className={`grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 ${colClass}`}>
        {assets.map((asset) => (
          <AssetTile key={asset.id} asset={asset} />
        ))}
      </div>
    </SectionCard>
  )
}
