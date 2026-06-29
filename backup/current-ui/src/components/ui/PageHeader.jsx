import { cn } from '@/lib/cn'

/**
 * Standard page heading used at the top of every screen: serif display title,
 * optional subtitle, and a right-aligned actions slot. Keeps page chrome
 * consistent across the app.
 */
export function PageHeader({ title, subtitle, actions, className }) {
  return (
    <header
      className={cn(
        'flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between',
        className,
      )}
    >
      <div className="space-y-1">
        <h1 className="font-display text-3xl font-semibold leading-tight text-text">
          {title}
        </h1>
        {subtitle && <p className="text-sm text-muted">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </header>
  )
}
