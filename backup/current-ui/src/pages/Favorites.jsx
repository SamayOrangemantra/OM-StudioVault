import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'
import { PageHeader, Button, EmptyState } from '@/components/ui'
import { AssetGrid } from '@/components/library'
import { getAssetsByIds } from '@/data/selectors'
import { useFavorites } from '@/hooks/useFavorites'
import { ROUTES } from '@/lib/constants'

/**
 * Favorites — every bookmarked asset. Reads ids straight from the favorites
 * store and reuses the standard AssetGrid, so favoriting elsewhere reflects here
 * instantly.
 */
export default function Favorites() {
  const { favoriteIds } = useFavorites()
  const assets = useMemo(() => getAssetsByIds(favoriteIds), [favoriteIds])

  return (
    <div className="space-y-6">
      <PageHeader
        title="Favorites"
        subtitle={`${assets.length} bookmarked ${assets.length === 1 ? 'asset' : 'assets'}.`}
      />

      {assets.length === 0 ? (
        <EmptyState
          icon={Star}
          title="No favorites yet"
          description="Tap the heart on any asset to bookmark it here."
          action={
            <Link to={ROUTES.library}>
              <Button>Browse Library</Button>
            </Link>
          }
        />
      ) : (
        <AssetGrid assets={assets} />
      )}
    </div>
  )
}
