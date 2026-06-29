import { Skeleton } from '@/components/ui'
import { AssetGridShell } from './AssetGridShell'

/** Loading placeholder that mirrors the AssetCard layout. */
export function AssetGridSkeleton({ count = 10 }) {
  return (
    <AssetGridShell>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-2xl border border-border bg-surface"
        >
          <Skeleton className="aspect-[4/3] rounded-none" />
          <div className="space-y-2 p-3">
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-3 w-2/5" />
            <div className="flex gap-1 pt-1">
              <Skeleton className="h-4 w-12 rounded-full" />
              <Skeleton className="h-4 w-12 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </AssetGridShell>
  )
}
