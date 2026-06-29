import { useState } from 'react'
import { cn } from '@/lib/cn'

const SIZES = {
  sm: 'h-7 w-7 text-xs',
  md: 'h-9 w-9 text-sm',
  lg: 'h-12 w-12 text-base',
}

const initials = (name = '') =>
  name
    .split(' ')
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()

/** User avatar that gracefully falls back to initials if the image is absent. */
export function Avatar({ src, name, size = 'md', className }) {
  const [errored, setErrored] = useState(false)
  const showImage = src && !errored

  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full',
        'bg-surface-2 font-medium text-muted',
        SIZES[size],
        className,
      )}
      title={name}
    >
      {showImage ? (
        <img
          src={src}
          alt={name}
          className="h-full w-full object-cover"
          onError={() => setErrored(true)}
        />
      ) : (
        initials(name)
      )}
    </span>
  )
}
