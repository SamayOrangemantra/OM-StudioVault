import { Heart } from 'lucide-react'
import { cn } from '@/lib/cn'
import { useFavorites } from '@/hooks/useFavorites'

/**
 * Heart toggle wired to the favorites store. Reused on asset cards (overlay) and
 * the asset details page. Stops click propagation so toggling inside a clickable
 * card doesn't also navigate.
 */
export function FavoriteButton({ assetId, size = 'md', className }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const active = isFavorite(assetId)

  const dims = size === 'sm' ? 'h-8 w-8' : 'h-10 w-10'
  const icon = size === 'sm' ? 'h-4 w-4' : 'h-[18px] w-[18px]'

  return (
    <button
      type="button"
      aria-label={active ? 'Remove from favorites' : 'Add to favorites'}
      aria-pressed={active}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggleFavorite(assetId)
      }}
      className={cn(
        'inline-flex items-center justify-center rounded-full border transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        active
          ? 'border-transparent bg-accent/15 text-accent'
          : 'border-border bg-surface/90 text-muted backdrop-blur hover:text-text',
        dims,
        className,
      )}
    >
      <Heart className={cn(icon, active && 'fill-current')} />
    </button>
  )
}
