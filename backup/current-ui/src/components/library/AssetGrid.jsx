import { motion } from 'framer-motion'
import { AssetCard } from './AssetCard'
import { AssetGridShell } from './AssetGridShell'
import { AssetGridSkeleton } from './AssetGridSkeleton'
import { EASE } from '@/lib/motion'

/**
 * Renders the asset grid, swapping in a skeleton while loading. Cards fade up on
 * mount with a capped stagger (so newly-filtered results animate in without a
 * long tail on large result sets). Empty handling is left to the parent.
 */
export function AssetGrid({ assets, loading }) {
  if (loading) return <AssetGridSkeleton />

  return (
    <AssetGridShell>
      {assets.map((asset, i) => (
        <motion.div
          key={asset.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: EASE, delay: Math.min(i * 0.025, 0.4) }}
        >
          <AssetCard asset={asset} />
        </motion.div>
      ))}
    </AssetGridShell>
  )
}
