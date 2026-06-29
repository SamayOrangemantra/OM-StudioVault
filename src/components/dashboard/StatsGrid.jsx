import { Images, FolderHeart, Star, HardDrive } from 'lucide-react'
import { Card } from '@/components/ui'
import { getStats } from '@/data/selectors'
import { formatBytes, compactNumber } from '@/lib/format'

/**
 * Compact headline-metric strip — four KPIs in one card, divided rather than
 * boxed. Reads as supporting context (quiet) beneath the hero, not as four
 * competing hero cards.
 */
export function StatsGrid() {
  const stats = getStats()

  const items = [
    { icon: Images, label: 'Total assets', value: compactNumber(stats.assets) },
    { icon: FolderHeart, label: 'Collections', value: stats.collections },
    { icon: Star, label: 'Favorites', value: stats.favorites },
    { icon: HardDrive, label: 'Storage used', value: formatBytes(stats.storageBytes) },
  ]

  return (
    <Card className="grid grid-cols-2 gap-px bg-border overflow-hidden sm:grid-cols-4">
      {items.map(({ icon: Icon, label, value, hint }) => (
        <div key={label} className="flex flex-col justify-between p-4 min-w-0 bg-surface">
          <div className="flex items-start justify-between gap-2">
            <span className="text-xs font-medium text-muted leading-tight">
              {label}
            </span>
            {Icon && (
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent/12 text-accent">
                <Icon className="h-4 w-4" />
              </span>
            )}
          </div>
          <div className="mt-3">
            <p className="font-display text-xl font-semibold leading-none text-text">
              {value}
            </p>
            {hint && (
              <p className="mt-1 text-[10px] text-muted/80 leading-none truncate" title={hint}>
                {hint}
              </p>
            )}
          </div>
        </div>
      ))}
    </Card>
  )
}
