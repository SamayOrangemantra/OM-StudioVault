import { cn } from '@/lib/cn'
import { Eyebrow } from './Eyebrow'

/**
 * Standard page heading: an optional eyebrow category label, a geometric display
 * title, an optional subtitle, and a right-aligned actions slot. Keeps page
 * chrome consistent across the app. `eyebrow` is optional and additive.
 */
export function PageHeader({ eyebrow, title, subtitle, actions, className }) {
  return (
    <header
      className={cn(
        'flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between',
        className,
      )}
    >
      <div className="space-y-2">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1 className="font-display text-3xl font-semibold leading-[1.1] text-text sm:text-4xl">
          {title}
        </h1>
        {subtitle && (
          <p className="max-w-2xl text-sm leading-relaxed text-muted">{subtitle}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </header>
  )
}
