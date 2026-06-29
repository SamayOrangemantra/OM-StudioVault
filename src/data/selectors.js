/*
 * Read-only selectors over the mock data. Feature components import derived,
 * view-ready shapes from here instead of reaching into raw JSON — so when the
 * data moves behind a real API, only this layer changes.
 *
 * The mock data is static, so anything that derives purely from it is computed
 * ONCE at module load and cached below; the exported functions just slice/read
 * those caches. This keeps render paths allocation-free (the dashboard renders
 * several of these per paint) without callers needing to memoize.
 */
import { assets, collections, users, activity } from './index'
import { filterAssets } from '@/lib/filterAssets'

const byNewest = (a, b) =>
  new Date(b.uploadedAt ?? b.updatedAt) - new Date(a.uploadedAt ?? a.updatedAt)

/** Map of userId → user for cheap lookups. */
export const usersById = Object.fromEntries(users.map((u) => [u.id, u]))

// --- precomputed, static derived data ----------------------------------------

const STATS = {
  assets: assets.length,
  collections: collections.length,
  favorites: assets.filter((a) => a.favorite).length,
  storageBytes: assets.reduce((sum, a) => sum + (a.fileSize || 0), 0),
}

const ASSETS_BY_NEWEST = [...assets].sort(byNewest)

const TRENDING_TAGS = (() => {
  const counts = new Map()
  for (const asset of assets) {
    for (const tag of asset.tags ?? []) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1)
    }
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
})()

const RECENT_ACTIVITY = [...activity]
  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  .map((entry) => ({ ...entry, user: usersById[entry.userId] }))

const TYPE_ORDER = ['image', 'video', 'document', '3d']
const TYPE_LABEL = { image: 'Images', video: 'Video', document: 'Docs', '3d': '3D' }

const TYPE_DISTRIBUTION = TYPE_ORDER.map((type) => {
  const matches = assets.filter((a) => a.type === type)
  return {
    type,
    label: TYPE_LABEL[type],
    count: matches.length,
    bytes: matches.reduce((s, a) => s + (a.fileSize || 0), 0),
    pct: assets.length ? Math.round((matches.length / assets.length) * 100) : 0,
  }
}).filter((t) => t.count > 0)

const QUOTA_BYTES = 50 * 1024 ** 3 // 50 GB plan

const TEAM = users.map((u) => ({
  ...u,
  assetCount: assets.filter((a) => a.uploadedBy === u.id).length,
}))

const COLLECTIONS = collections.map((c) => {
  const matches = filterAssets(assets, c.filter)
  return { ...c, assetCount: matches.length, coverUrl: matches[0]?.thumbnailUrl }
})

// --- public selectors --------------------------------------------------------

/** Headline metrics for the dashboard stat cards. */
export function getStats() {
  return STATS
}

/** Most recently uploaded assets, newest first. */
export function getRecentUploads(limit = 5) {
  return ASSETS_BY_NEWEST.slice(0, limit)
}

/**
 * "Jump back in" — a believable set of in-progress assets for the dashboard.
 * No view-tracking backend exists; this samples assets distinct from the newest
 * row so the two strips don't overlap.
 */
export function getContinueWorking(limit = 6) {
  return ASSETS_BY_NEWEST.slice(6, 6 + limit)
}

/** Asset count + storage split by file type (for the distribution panel). */
export function getAssetTypeDistribution() {
  return TYPE_DISTRIBUTION
}

/** Storage usage vs plan quota. */
export function getStorage() {
  const usedBytes = STATS.storageBytes
  return {
    usedBytes,
    quotaBytes: QUOTA_BYTES,
    pct: Math.min(100, Math.round((usedBytes / QUOTA_BYTES) * 100)),
    byType: TYPE_DISTRIBUTION,
  }
}

/** Team members with how many assets each has contributed. */
export function getTeam() {
  return TEAM
}

/** Tags ranked by frequency across all assets. */
export function getTrendingTags(limit = 8) {
  return TRENDING_TAGS.slice(0, limit)
}

/** Recent activity entries with their author resolved, newest first. */
export function getRecentActivity(limit = 6) {
  return RECENT_ACTIVITY.slice(0, limit)
}

/**
 * Resolve a predicate-based collection into its matching assets. Collections are
 * defined by a partial filter spec (see collections.json) and reuse the
 * Library's filtering engine — one source of truth for what "belongs" to one.
 */
export function getCollectionAssets(collection) {
  return filterAssets(assets, collection.filter)
}

export function getCollectionById(id) {
  return collections.find((c) => c.id === id) ?? null
}

/** All collections enriched with a live asset count + cover image. */
export function getCollections() {
  return COLLECTIONS
}

/** Collections for the dashboard preview row. */
export function getCollectionsPreview(limit = 4) {
  return COLLECTIONS.slice(0, limit)
}

export function getAssetById(id) {
  return assets.find((a) => a.id === id) ?? null
}

export function getAssetsByIds(ids) {
  const set = new Set(ids)
  return assets.filter((a) => set.has(a.id))
}

/**
 * Assets related to the given one, ranked by shared facets (theme, client,
 * event type, and overlapping design elements). Used by the details page.
 */
export function getRelatedAssets(asset, limit = 5) {
  if (!asset) return []
  const elements = new Set(asset.designElements || [])
  return assets
    .filter((a) => a.id !== asset.id)
    .map((a) => {
      let score = 0
      if (a.theme === asset.theme) score += 2
      if (a.client === asset.client) score += 2
      if (a.eventType === asset.eventType) score += 1
      score += (a.designElements || []).filter((d) => elements.has(d)).length
      return { a, score }
    })
    .filter((x) => x.score > 0)
    .sort((x, y) => y.score - x.score)
    .slice(0, limit)
    .map((x) => x.a)
}
