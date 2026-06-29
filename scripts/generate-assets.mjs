/*
 * One-shot mock data generator for the Asset Library.
 *
 * Run with:  node scripts/generate-assets.mjs
 * Writes:    src/data/assets.json  (~100 deterministic, realistic assets)
 *
 * Deterministic (seeded PRNG) so re-running produces identical data — the JSON
 * is the committed source of truth; this script just regenerates it.
 */
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT = join(__dirname, '..', 'src', 'data', 'assets.json')

// --- seeded PRNG (mulberry32) -------------------------------------------------
function mulberry32(seed) {
  return function () {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
const rand = mulberry32(20260629)
const pick = (arr) => arr[Math.floor(rand() * arr.length)]
const pickN = (arr, min, max) => {
  const n = min + Math.floor(rand() * (max - min + 1))
  const pool = [...arr]
  const out = []
  for (let i = 0; i < n && pool.length; i++) {
    out.push(pool.splice(Math.floor(rand() * pool.length), 1)[0])
  }
  return out
}
const chance = (p) => rand() < p

// --- vocabularies -------------------------------------------------------------
const CLIENTS = [
  'The Mehta Family', 'House of Kapoor', 'Verma & Co.', 'Aurora Hotels',
  'Sterling Group', 'Lumen Technologies', 'Saffron Weddings', 'Royal Orchid',
  'Banyan Estates', 'Nova Pharma', 'The Reddy Family', 'Crestline Capital',
]

const OUTDOOR_VENUES = [
  'Udaipur Lake Palace', 'Goa Beach Resort', 'Vineyard Estate',
  'Mountain Vista Resort', 'The Oberoi Gardens', 'Riverside Lawns',
]
const INDOOR_VENUES = [
  'Taj Falaknuma Palace', 'Jaipur City Palace', 'ITC Grand Central',
  'Leela Convention Centre', 'Marina Bay Hall', 'The Imperial Ballroom',
]
const VENUES = [...OUTDOOR_VENUES, ...INDOOR_VENUES]

const THEMES = [
  'Luxury', 'Royal Heritage', 'Modern Minimal', 'Bohemian', 'Rustic',
  'Art Deco', 'Tropical', 'Vintage', 'Fairytale', 'Contemporary',
]

const EVENT_TYPES = [
  'Wedding', 'Reception', 'Engagement', 'Corporate', 'Conference',
  'Product Launch', 'Gala', 'Birthday', 'Anniversary', 'Festival',
]

const COLORS = [
  'Gold', 'Ivory', 'Blush Pink', 'Emerald', 'Royal Blue', 'Burgundy',
  'Champagne', 'Coral', 'Lavender', 'Black', 'White', 'Teal',
]

const DESIGN_ELEMENTS = [
  'Mandap', 'Floral Arch', 'Chandelier', 'Stage Backdrop', 'Table Setting',
  'Lighting Design', 'Drapery', 'Centerpiece', 'Photo Booth', 'Aisle Decor',
  'Lounge Setup', 'Entrance Decor',
]

const TYPES = ['image', 'image', 'image', 'image', 'video', 'document', '3d']
const EXT = { image: 'jpg', video: 'mp4', document: 'pdf', '3d': 'glb' }
const USERS = ['usr_01', 'usr_02', 'usr_03']

// Map event types and design elements to photography keywords, so each asset's
// thumbnail visually matches its description (event/decor imagery — never random
// stock or animals). Used to build a deterministic keyword image URL per asset.
const EVENT_KEYWORDS = {
  Wedding: 'wedding',
  Reception: 'wedding,reception',
  Engagement: 'engagement,celebration',
  Corporate: 'corporate,event',
  Conference: 'conference,stage',
  'Product Launch': 'product,launch',
  Gala: 'gala,blacktie',
  Birthday: 'birthday,party',
  Anniversary: 'anniversary,celebration',
  Festival: 'festival,celebration',
}

const ELEMENT_KEYWORDS = {
  Mandap: 'mandap,wedding',
  'Floral Arch': 'floral,arch',
  Chandelier: 'chandelier,ballroom',
  'Stage Backdrop': 'stage,backdrop',
  'Table Setting': 'tablescape,dinner',
  'Lighting Design': 'event,lighting',
  Drapery: 'drapery,decor',
  Centerpiece: 'floral,centerpiece',
  'Photo Booth': 'party,decor',
  'Aisle Decor': 'wedding,aisle',
  'Lounge Setup': 'lounge,interior',
  'Entrance Decor': 'entrance,decor',
}

const kebab = (s) =>
  s.toLowerCase().replace(/&/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

const pad = (n) => String(n).padStart(2, '0')

// Deterministic unique photo per asset via picsum seed.
// Seed offsets by 200 to skip a handful of picsum images that are plain grey or
// near-solid colour at the low-numbered seeds.
const imageUrl = (_eventType, _element, seed) => {
  return `https://picsum.photos/seed/${seed + 200}/800/600`
}

// --- generate -----------------------------------------------------------------
const COUNT = 100
const assets = []

for (let i = 1; i <= COUNT; i++) {
  const type = pick(TYPES)
  const theme = pick(THEMES)
  const eventType = pick(EVENT_TYPES)
  const client = pick(CLIENTS)
  const venue = pick(VENUES)
  const year = 2021 + Math.floor(rand() * 6) // 2021–2026
  const colors = pickN(COLORS, 2, 3)
  const designElements = pickN(DESIGN_ELEMENTS, 1, 3)

  const headlineEl = designElements[0]
  const name = `${theme} ${eventType} — ${headlineEl}.${EXT[type]}`

  // Keep dates in the past relative to "today" (2026-06-29) so the newest-first
  // sort reads naturally and relative times don't all collapse to "just now".
  const month = year === 2026 ? 1 + Math.floor(rand() * 6) : 1 + Math.floor(rand() * 12)
  const day = 1 + Math.floor(rand() * 27)
  const hour = 8 + Math.floor(rand() * 11)
  const uploadedAt = `${year}-${pad(month)}-${pad(day)}T${pad(hour)}:${pad(
    Math.floor(rand() * 60),
  )}:00Z`

  const tags = [
    ...new Set([
      kebab(eventType),
      kebab(theme),
      ...colors.map(kebab),
      ...designElements.map(kebab),
    ]),
  ]

  const description =
    `A ${theme.toLowerCase()} ${eventType.toLowerCase()} for ${client} at ${venue}. ` +
    `Featuring ${designElements.map((d) => d.toLowerCase()).join(', ')} in a palette of ` +
    `${colors.map((c) => c.toLowerCase()).join(', ')}.`

  const sizeByType = {
    image: 2_000_000 + Math.floor(rand() * 6_000_000),
    video: 60_000_000 + Math.floor(rand() * 180_000_000),
    document: 800_000 + Math.floor(rand() * 3_000_000),
    '3d': 5_000_000 + Math.floor(rand() * 12_000_000),
  }
  const dims =
    type === 'image' || type === 'video'
      ? { width: pick([3840, 4928, 5472, 6000]), height: pick([2160, 3264, 3648, 4000]) }
      : null

  assets.push({
    id: `ast_${pad(i)}`,
    name,
    type,
    thumbnailUrl: imageUrl(eventType, headlineEl, i),
    fileSize: sizeByType[type],
    dimensions: dims,
    client,
    venue,
    theme,
    eventType,
    year,
    colors,
    designElements,
    tags,
    description,
    uploadedBy: pick(USERS),
    uploadedAt,
    favorite: chance(0.18),
  })
}

// newest first for nicer defaults
assets.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))

writeFileSync(OUT, JSON.stringify(assets, null, 2) + '\n')
console.log(`Wrote ${assets.length} assets → ${OUT}`)
