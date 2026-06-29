import {
  LayoutDashboard,
  Images,
  FolderHeart,
  Star,
  Share2,
  Settings,
} from 'lucide-react'

/** Single source of truth for app routes. */
export const ROUTES = {
  login: '/login',
  dashboard: '/',
  library: '/library',
  asset: '/assets', // detail = `${ROUTES.asset}/${id}`
  favorites: '/favorites',
  collections: '/collections',
  shared: '/shared',
  settings: '/settings',
}

/** Build the detail route for a given asset id. */
export const assetPath = (id) => `${ROUTES.asset}/${id}`

/** Sidebar navigation — Sidebar maps over this; order = display order. */
export const NAV_ITEMS = [
  { to: ROUTES.dashboard, label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: ROUTES.library, label: 'Library', icon: Images },
  { to: ROUTES.collections, label: 'Collections', icon: FolderHeart },
  { to: ROUTES.favorites, label: 'Favorites', icon: Star },
  { to: ROUTES.shared, label: 'Shared', icon: Share2 },
  { to: ROUTES.settings, label: 'Settings', icon: Settings },
]

export const APP_NAME = 'Aura'
