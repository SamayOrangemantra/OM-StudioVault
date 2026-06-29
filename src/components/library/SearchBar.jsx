import { useEffect, useRef, useState } from 'react'
import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui'

/**
 * Search field for the library. Keeps a local, immediately-responsive value and
 * debounces propagation to the (URL-backed) filter state, so typing doesn't
 * thrash history or re-run filtering on every keystroke.
 */
export function SearchBar({ value, onChange, delay = 200 }) {
  const [local, setLocal] = useState(value)
  const timer = useRef()

  // Keep local in sync when the URL value changes externally (chips, clear all).
  useEffect(() => setLocal(value), [value])

  const push = (next) => {
    setLocal(next)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => onChange(next), delay)
  }

  useEffect(() => () => clearTimeout(timer.current), [])

  return (
    <div className="relative">
      <Input
        icon={Search}
        value={local}
        onChange={(e) => push(e.target.value)}
        placeholder="Search by name, client, venue, tag…"
        className="h-11"
      />
      {local && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => {
            clearTimeout(timer.current)
            setLocal('')
            onChange('')
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-muted transition-colors hover:text-text"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}
