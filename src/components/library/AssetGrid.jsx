import { motion } from 'framer-motion'
import { AssetCard } from './AssetCard'
import { AssetGridShell } from './AssetGridShell'
import { AssetGridSkeleton } from './AssetGridSkeleton'
import { EASE } from '@/lib/motion'

export function AssetGrid({ assets, loading }) {
  if (loading) return <AssetGridSkeleton />

  return (
    <AssetGridShell>
      {assets.map((asset, i) => (
        <motion.div
          key={asset.id}
          initial={{ opacity: 0, y: 14, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.3,
            ease: EASE,
            delay: Math.min(i * 0.03, 0.45),
          }}
        >
          <AssetCard asset={asset} />
        </motion.div>
      ))}
    </AssetGridShell>
  )
}
