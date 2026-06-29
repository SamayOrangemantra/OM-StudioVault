import { Hash } from 'lucide-react'
import { Badge } from './Badge'
import { titleCase } from '@/lib/format'

/**
 * A hashtag-style pill: "#" glyph + a humanized label. Wraps Badge so it shares
 * the same shape/variants, but standardizes the icon + title-casing that several
 * screens were repeating. Wrap in a <Link> to make it navigable.
 */
export function Tag({ label, variant = 'neutral', className }) {
  return (
    <Badge variant={variant} className={`gap-1 ${className ?? ''}`}>
      <Hash className="h-3 w-3" />
      {titleCase(label)}
    </Badge>
  )
}
