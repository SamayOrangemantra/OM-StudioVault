import { memo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, Heart, Sparkles, Share2, MoreHorizontal } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Badge } from '@/components/ui'
import { AssetTypeIcon } from './AssetTypeIcon'
import { assetPath } from '@/lib/constants'
import { titleCase } from '@/lib/format'
import { useFavorites } from '@/hooks/useFavorites'
import { useToast } from '@/context/ToastProvider'
import { cn } from '@/lib/cn'

function AssetCardBase({ asset }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const { show } = useToast()
  const [hovered, setHovered] = useState(false)
  const active = isFavorite(asset.id)

  const handleFavorite = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(asset.id)
    show(active ? 'Removed from favorites' : 'Added to favorites', {
      type: active ? 'info' : 'success',
    })
  }

  const handleShare = (e) => {
    e.preventDefault()
    e.stopPropagation()
    show('Share link copied to clipboard', { type: 'success' })
  }

  const handleAI = (e) => {
    e.preventDefault()
    e.stopPropagation()
    show('AI tagging coming soon', { type: 'info' })
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 340, damping: 22 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative"
    >
      <Link
        to={assetPath(asset.id)}
        className="block overflow-hidden rounded-3xl border border-border bg-surface shadow-soft transition-[border-color,box-shadow] duration-300 hover:border-accent/30 hover:shadow-panel focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
      >
        {/* Thumbnail */}
        <div className="relative aspect-[4/3] overflow-hidden bg-surface-2">
          <motion.img
            src={asset.thumbnailUrl}
            alt={asset.name}
            loading="lazy"
            animate={{ scale: hovered ? 1.06 : 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
            className="h-full w-full object-cover"
          />

          {/* Type badge — top left */}
          <div className="absolute left-2.5 top-2.5">
            <Badge variant="neutral" className="gap-1 bg-bg/80 capitalize backdrop-blur">
              <AssetTypeIcon type={asset.type} className="h-3 w-3" />
              {asset.type}
            </Badge>
          </div>

          {/* Hover overlay — gradient + view cue */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent"
              />
            )}
          </AnimatePresence>

          {/* View details — bottom of image, shows on hover */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                className="pointer-events-none absolute bottom-10 left-3 flex items-center gap-1.5"
              >
                <Eye className="h-3.5 w-3.5 text-white/80" />
                <span className="text-xs font-medium text-white/80">View details</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick-action bar — slides up from bottom on hover */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                className="absolute bottom-0 inset-x-0 flex items-center justify-between px-2.5 pb-2"
                onClick={(e) => e.preventDefault()}
              >
                <div className="flex items-center gap-1">
                  <QuickBtn
                    icon={Heart}
                    label={active ? 'Unfavorite' : 'Favorite'}
                    onClick={handleFavorite}
                    active={active}
                    activeClass="bg-accent/20 text-accent"
                  />
                  <QuickBtn icon={Share2} label="Share" onClick={handleShare} />
                  <QuickBtn icon={Sparkles} label="AI Tags" onClick={handleAI} />
                </div>
                <QuickBtn icon={MoreHorizontal} label="More" onClick={(e) => e.preventDefault()} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Meta strip */}
        <div className="space-y-1.5 p-3">
          <p className="truncate text-sm font-medium text-text" title={asset.name}>
            {asset.name}
          </p>
          <div className="flex items-center gap-2 text-xs text-muted">
            <span className="truncate">{asset.client}</span>
            <span className="text-border">·</span>
            <span>{asset.year}</span>
          </div>
          <div className="flex flex-wrap gap-1 pt-0.5">
            {asset.colors.slice(0, 3).map((c) => (
              <Badge key={c} variant="outline" className="text-[10px]">
                {titleCase(c)}
              </Badge>
            ))}
          </div>
        </div>
      </Link>

      {/* Favorite indicator dot — persistent when favorited */}
      <AnimatePresence>
        {active && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
            className="absolute right-3 top-3 h-2 w-2 rounded-full bg-accent shadow-[0_0_0_2px_rgb(var(--surface))]"
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function QuickBtn({ icon: Icon, label, onClick, active, activeClass }) {
  return (
    <motion.button
      type="button"
      aria-label={label}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className={cn(
        'flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white/80 backdrop-blur transition-colors hover:bg-black/50 hover:text-white',
        active && activeClass,
      )}
    >
      <Icon className={cn('h-3.5 w-3.5', active && 'fill-current')} />
    </motion.button>
  )
}

export const AssetCard = memo(AssetCardBase)
