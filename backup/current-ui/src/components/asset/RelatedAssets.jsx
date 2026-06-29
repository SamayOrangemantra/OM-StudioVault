import { AssetGridShell, AssetCard } from '@/components/library'

/** Horizontal-feeling related row reusing the standard AssetCard + grid shell. */
export function RelatedAssets({ assets }) {
  if (!assets.length) return null

  return (
    <section className="space-y-4">
      <h2 className="font-display text-xl font-semibold text-text">
        Related assets
      </h2>
      <AssetGridShell>
        {assets.map((a) => (
          <AssetCard key={a.id} asset={a} />
        ))}
      </AssetGridShell>
    </section>
  )
}
