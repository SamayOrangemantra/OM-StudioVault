import { cn } from '@/lib/cn'
import { APP_NAME } from '@/lib/constants'

const MARK_SIZES = {
  sm: 'h-8 w-8',
  md: 'h-9 w-9',
  lg: 'h-12 w-12',
}

const WORD_SIZES = {
  sm: 'text-base',
  md: 'text-xl',
  lg: 'text-3xl',
}

/**
 * The OM-StudioVault brand lockup — a gold ring mark plus the wordmark. Used by the
 * sidebar and the login screen so the identity stays defined in exactly one
 * place. Set `wordmark={false}` to render the mark alone (collapsed sidebar).
 */
export function Logo({ size = 'md', wordmark = true, className }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <span
        className={cn(
          'flex items-center justify-center rounded-xl border border-accent/40',
          MARK_SIZES[size],
        )}
      >
        <span className="h-1/3 w-1/3 rounded-full bg-accent" />
      </span>
      {wordmark && (
        <span
          className={cn(
            'whitespace-nowrap font-display font-semibold tracking-tight text-text',
            WORD_SIZES[size],
          )}
        >
          {APP_NAME}
        </span>
      )}
    </span>
  )
}
