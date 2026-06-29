import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/cn'
import { Card } from '@/components/ui'

/**
 * Standard dashboard panel: a Card with a titled header, an optional "view all"
 * link, and a body slot. Every dashboard section composes this so spacing and
 * header treatment stay identical across panels.
 */
export function SectionCard({ title, action, className, bodyClassName, children }) {
  return (
    <Card className={cn('flex flex-col', className)}>
      <header className="flex items-center justify-between gap-3 px-5 py-4">
        <h2 className="font-display text-lg font-semibold text-text">{title}</h2>
        {action && (
          <Link
            to={action.to}
            className="inline-flex items-center gap-0.5 text-sm font-medium text-muted transition-colors hover:text-text"
          >
            {action.label ?? 'View all'}
            <ChevronRight className="h-4 w-4" />
          </Link>
        )}
      </header>
      <div className={cn('border-t border-border px-5 py-4', bodyClassName)}>
        {children}
      </div>
    </Card>
  )
}
