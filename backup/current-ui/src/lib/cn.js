import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Single classname helper used by every component: merges conditional classes
 * (clsx) and resolves Tailwind conflicts (tailwind-merge) so later props can
 * cleanly override base styles.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
