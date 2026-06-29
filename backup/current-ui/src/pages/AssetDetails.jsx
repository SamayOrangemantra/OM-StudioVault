import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  Heart,
  Download,
  Share2,
  Tag as TagIcon,
  Sparkles,
  Check,
} from 'lucide-react'
import { cn } from '@/lib/cn'
import { Button, Badge, Card, EmptyState, Tag } from '@/components/ui'
import { AssetTypeIcon } from '@/components/library'
import {
  MetadataList,
  RelatedAssets,
  AITagModal,
  ShareModal,
  EditTagsModal,
} from '@/components/asset'
import { getAssetById, getRelatedAssets } from '@/data/selectors'
import { useFavorites } from '@/hooks/useFavorites'
import { useTags } from '@/hooks/useTags'
import { ROUTES } from '@/lib/constants'
import { libraryUrl } from '@/lib/libraryUrl'

export default function AssetDetails() {
  const { assetId } = useParams()
  const asset = useMemo(() => getAssetById(assetId), [assetId])

  const { isFavorite, toggleFavorite } = useFavorites()
  const { getTags } = useTags()

  const [aiOpen, setAiOpen] = useState(false)
  const [shareOpen, setShareOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [downloaded, setDownloaded] = useState(false)

  const related = useMemo(() => getRelatedAssets(asset), [asset])

  if (!asset) {
    return (
      <EmptyState
        icon={TagIcon}
        title="Asset not found"
        description="This asset doesn't exist or may have been removed."
        action={
          <Link to={ROUTES.library}>
            <Button>Back to Library</Button>
          </Link>
        }
      />
    )
  }

  const favorited = isFavorite(asset.id)
  const tags = getTags(asset)

  const handleDownload = () => {
    // Dummy download — no file is produced; just acknowledge the action.
    setDownloaded(true)
    setTimeout(() => setDownloaded(false), 1800)
  }

  return (
    <div className="space-y-8">
      <Link
        to={ROUTES.library}
        className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-text"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Library
      </Link>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        {/* Large preview */}
        <div className="lg:col-span-3">
          <Card className="overflow-hidden">
            <div className="relative aspect-[4/3] bg-surface-2">
              <img
                src={asset.thumbnailUrl}
                alt={asset.name}
                className="h-full w-full object-cover"
              />
              <Badge
                variant="neutral"
                className="absolute left-3 top-3 gap-1 bg-bg/80 capitalize backdrop-blur"
              >
                <AssetTypeIcon type={asset.type} className="h-3 w-3" />
                {asset.type}
              </Badge>
            </div>
          </Card>
        </div>

        {/* Detail rail */}
        <div className="space-y-6 lg:col-span-2">
          <div className="space-y-2">
            <h1 className="font-display text-2xl font-semibold leading-tight text-text">
              {asset.name}
            </h1>
            <p className="text-sm text-muted">
              {asset.client} · {asset.venue}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={favorited ? 'primary' : 'outline'}
              icon={Heart}
              onClick={() => toggleFavorite(asset.id)}
              className={cn(favorited && '[&_svg]:fill-current')}
            >
              {favorited ? 'Favorited' : 'Favorite'}
            </Button>
            <Button
              variant="outline"
              icon={downloaded ? Check : Download}
              onClick={handleDownload}
            >
              {downloaded ? 'Downloaded' : 'Download'}
            </Button>
            <Button variant="outline" icon={Share2} onClick={() => setShareOpen(true)}>
              Share
            </Button>
            <Button variant="outline" icon={TagIcon} onClick={() => setEditOpen(true)}>
              Edit Tags
            </Button>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h2 className="text-sm font-semibold text-text">Description</h2>
            <p className="text-sm leading-relaxed text-muted">{asset.description}</p>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-text">Tags</h2>
              <Button size="sm" variant="ghost" icon={Sparkles} onClick={() => setAiOpen(true)}>
                Generate AI Tags
              </Button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {tags.map((t) => (
                <Link key={t} to={libraryUrl({ query: t })}>
                  <Tag label={t} variant="outline" className="hover:border-accent/50" />
                </Link>
              ))}
            </div>
          </div>

          {/* Metadata */}
          <Card className="p-4">
            <MetadataList asset={asset} />
          </Card>
        </div>
      </div>

      <RelatedAssets assets={related} />

      {/* Modals */}
      <AITagModal open={aiOpen} onClose={() => setAiOpen(false)} asset={asset} />
      <ShareModal open={shareOpen} onClose={() => setShareOpen(false)} asset={asset} />
      <EditTagsModal open={editOpen} onClose={() => setEditOpen(false)} asset={asset} />
    </div>
  )
}
