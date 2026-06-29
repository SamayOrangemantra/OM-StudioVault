import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, X, Image, Video, FileText, Box, ArrowRight,
  LayoutDashboard, Images, FolderHeart, Star, Share2, Settings,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/cn'
import { assets as ASSETS } from '@/data'
import { ROUTES, assetPath } from '@/lib/constants'

const TYPE_ICON = { image: Image, video: Video, document: FileText, '3d': Box }

const NAV = [
  { id: 'nav-dash', label: 'Dashboard', sub: 'Home overview', icon: LayoutDashboard, to: ROUTES.dashboard },
  { id: 'nav-lib', label: 'Library', sub: 'Browse all assets', icon: Images, to: ROUTES.library },
  { id: 'nav-col', label: 'Collections', sub: 'Curated sets', icon: FolderHeart, to: ROUTES.collections },
  { id: 'nav-fav', label: 'Favorites', sub: 'Starred assets', icon: Star, to: ROUTES.favorites },
  { id: 'nav-shared', label: 'Shared', sub: 'Shared with you', icon: Share2, to: ROUTES.shared },
  { id: 'nav-settings', label: 'Settings', sub: 'Preferences', icon: Settings, to: ROUTES.settings },
]

export function CommandPalette({ open, onClose }) {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef(null)
  const listRef = useRef(null)
  const navigate = useNavigate()

  const q = query.toLowerCase().trim()

  const assetHits = q.length > 1
    ? ASSETS.filter((a) =>
        a.name.toLowerCase().includes(q) ||
        a.client.toLowerCase().includes(q) ||
        a.eventType.toLowerCase().includes(q) ||
        a.tags.some((t) => t.includes(q)),
      ).slice(0, 5)
    : []

  const navHits = NAV.filter((n) => !q || n.label.toLowerCase().includes(q))

  const results = [
    ...assetHits.map((a) => ({
      id: a.id, label: a.name, sub: `${a.client} · ${a.eventType}`,
      to: assetPath(a.id), kind: 'asset', assetType: a.type, thumb: a.thumbnailUrl,
    })),
    ...navHits.map((n) => ({ ...n, kind: 'nav' })),
  ]

  useEffect(() => { setActive(0) }, [query])

  useEffect(() => {
    if (open) {
      setQuery('')
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  const go = useCallback(
    (item) => { if (item) { navigate(item.to); onClose() } },
    [navigate, onClose],
  )

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((i) => Math.min(i + 1, results.length - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((i) => Math.max(i - 1, 0)) }
    else if (e.key === 'Enter') go(results[active])
    else if (e.key === 'Escape') onClose()
  }

  // Scroll active item into view
  useEffect(() => {
    const el = listRef.current?.querySelector('[data-active="true"]')
    el?.scrollIntoView({ block: 'nearest' })
  }, [active])

  const assetSection = results.filter((r) => r.kind === 'asset')
  const navSection = results.filter((r) => r.kind === 'nav')

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.12 }}
          className="fixed inset-0 z-[200] flex items-start justify-center px-4 pt-[14vh]"
          onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -12 }}
            transition={{ type: 'spring', stiffness: 520, damping: 34 }}
            className="relative w-full max-w-[560px] overflow-hidden rounded-3xl border border-border bg-surface shadow-float"
          >
            {/* Input */}
            <div className="flex items-center gap-3 border-b border-border px-5 py-4">
              <Search className="h-4.5 w-4.5 h-[18px] w-[18px] shrink-0 text-muted" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Search assets, navigate pages…"
                className="flex-1 bg-transparent text-sm text-text placeholder:text-muted/70 focus:outline-none"
              />
              <div className="flex items-center gap-1.5">
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    className="flex h-5 w-5 items-center justify-center rounded-full text-muted hover:text-text"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
                <kbd className="rounded-md border border-border bg-surface-2 px-1.5 py-0.5 text-[10px] font-medium text-muted">
                  Esc
                </kbd>
              </div>
            </div>

            {/* Results */}
            <div ref={listRef} className="max-h-[360px] overflow-y-auto overscroll-contain p-2">
              {results.length === 0 && (
                <div className="py-12 text-center">
                  <p className="text-sm text-muted">No results for &ldquo;{query}&rdquo;</p>
                </div>
              )}

              {assetSection.length > 0 && (
                <>
                  <SectionLabel>Assets</SectionLabel>
                  {assetSection.map((item, i) => {
                    const Icon = TYPE_ICON[item.assetType] ?? Image
                    const globalIdx = i
                    return (
                      <ResultRow
                        key={item.id}
                        item={item}
                        isActive={active === globalIdx}
                        onHover={() => setActive(globalIdx)}
                        onSelect={() => go(item)}
                      >
                        <span className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-lg">
                          <img src={item.thumb} alt="" className="h-full w-full object-cover" />
                          <span className="absolute bottom-0 right-0 flex h-3.5 w-3.5 items-center justify-center rounded-tl bg-bg/80">
                            <Icon className="h-2.5 w-2.5 text-muted" />
                          </span>
                        </span>
                      </ResultRow>
                    )
                  })}
                </>
              )}

              {navSection.length > 0 && (
                <>
                  <SectionLabel>Navigate</SectionLabel>
                  {navSection.map((item) => {
                    const Icon = item.icon
                    const globalIdx = results.indexOf(item)
                    return (
                      <ResultRow
                        key={item.id}
                        item={item}
                        isActive={active === globalIdx}
                        onHover={() => setActive(globalIdx)}
                        onSelect={() => go(item)}
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                          <Icon className="h-4 w-4" />
                        </span>
                      </ResultRow>
                    )
                  })}
                </>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center gap-4 border-t border-border bg-surface-2/60 px-5 py-2.5 text-[11px] text-muted">
              <span><kbd className="font-mono">↑↓</kbd> navigate</span>
              <span><kbd className="font-mono">↵</kbd> open</span>
              <span><kbd className="font-mono">Esc</kbd> close</span>
              <span className="ml-auto opacity-60">
                <kbd className="font-mono">⌘K</kbd> to open
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

function SectionLabel({ children }) {
  return (
    <p className="px-3 pb-1 pt-2.5 text-[10px] font-semibold uppercase tracking-widest text-muted/60">
      {children}
    </p>
  )
}

function ResultRow({ item, isActive, onHover, onSelect, children }) {
  return (
    <motion.button
      data-active={isActive}
      whileTap={{ scale: 0.99 }}
      onClick={onSelect}
      onMouseEnter={onHover}
      className={cn(
        'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors',
        isActive ? 'bg-accent/8 bg-accent/[0.08]' : 'hover:bg-surface-2',
      )}
    >
      {children}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-text">{item.label}</p>
        {item.sub && <p className="truncate text-xs text-muted">{item.sub}</p>}
      </div>
      <AnimatePresence>
        {isActive && (
          <motion.span
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -4 }}
            transition={{ duration: 0.1 }}
          >
            <ArrowRight className="h-3.5 w-3.5 text-muted" />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
