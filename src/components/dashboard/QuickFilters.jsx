import { Link } from 'react-router-dom'
import { Sparkles, Crown, Flower2, Building2, CalendarClock, Star } from 'lucide-react'
import { libraryUrl } from '@/lib/libraryUrl'
import { ROUTES } from '@/lib/constants'

/**
 * One-tap entry points into the Library, pre-filtered. Pure navigation — each
 * chip resolves to a Library URL via the shared filter encoder (no new logic).
 */
const FILTERS = [
  { label: 'Weddings', icon: Crown, to: libraryUrl({ eventType: ['Wedding'] }) },
  { label: 'Galas', icon: Sparkles, to: libraryUrl({ eventType: ['Gala'] }) },
  { label: 'Mandaps', icon: Flower2, to: libraryUrl({ designElements: ['Mandap'] }) },
  { label: 'Corporate', icon: Building2, to: libraryUrl({ eventType: ['Corporate', 'Conference'] }) },
  { label: 'This year', icon: CalendarClock, to: libraryUrl({ year: ['2026'] }) },
  { label: 'Favorites', icon: Star, to: ROUTES.favorites },
]

export function QuickFilters() {
  return (
    <div className="flex flex-wrap gap-2">
      {FILTERS.map(({ label, icon: Icon, to }) => (
        <Link
          key={label}
          to={to}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-2 text-[13px] font-medium text-text shadow-soft transition-all duration-200 hover:-translate-y-px hover:border-accent/40 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Icon className="h-4 w-4 text-muted transition-colors group-hover:text-accent" />
          {label}
        </Link>
      ))}
    </div>
  )
}
