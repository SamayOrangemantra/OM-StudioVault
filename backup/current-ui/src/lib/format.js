/*
 * Pure formatting helpers shared across feature screens. Kept dependency-free
 * and side-effect-free so they're trivial to test and reuse anywhere.
 */

/** Human-readable file size: 4821000 → "4.8 MB". */
export function formatBytes(bytes) {
  if (!bytes || bytes < 0) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1)
  const value = bytes / 1024 ** i
  return `${value >= 10 || i === 0 ? Math.round(value) : value.toFixed(1)} ${units[i]}`
}

/** Compact relative time from an ISO date: "2h ago", "3d ago", "just now". */
export function relativeTime(iso, now = new Date()) {
  const then = new Date(iso)
  const diff = Math.max(0, now.getTime() - then.getTime())
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  if (days < 7) return `${days}d ago`
  const weeks = Math.floor(days / 7)
  if (weeks < 5) return `${weeks}w ago`
  return then.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

/** "wedding" → "Wedding"; "golden-hour" → "Golden Hour". */
export function titleCase(str = '') {
  return str
    .split(/[-\s]+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

/** Compact number: 1240 → "1.2k". */
export function compactNumber(n) {
  if (n < 1000) return String(n)
  return `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k`
}
