import { motion } from 'framer-motion'
import { Images, FolderHeart, Star, HardDrive } from 'lucide-react'
import { StatCard } from './StatCard'
import { getStats } from '@/data/selectors'
import { formatBytes, compactNumber } from '@/lib/format'
import { staggerContainer, gridItem } from '@/lib/motion'

/**
 * The dashboard's headline metrics row. Pulls derived totals from selectors and
 * maps them onto presentational StatCards.
 */
export function StatsGrid() {
  const stats = getStats()

  const cards = [
    { icon: Images, label: 'Total assets', value: compactNumber(stats.assets), hint: 'Across all collections' },
    { icon: FolderHeart, label: 'Collections', value: stats.collections, hint: 'Curated sets' },
    { icon: Star, label: 'Favorites', value: stats.favorites, hint: 'Starred by your team' },
    { icon: HardDrive, label: 'Storage used', value: formatBytes(stats.storageBytes), hint: 'of 100 GB plan' },
  ]

  return (
    <motion.div
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
      variants={staggerContainer(0.06)}
      initial="hidden"
      animate="show"
    >
      {cards.map((c) => (
        <motion.div key={c.label} variants={gridItem}>
          <StatCard {...c} />
        </motion.div>
      ))}
    </motion.div>
  )
}
