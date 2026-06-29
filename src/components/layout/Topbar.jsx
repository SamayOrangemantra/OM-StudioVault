import { useRef, useState } from 'react'
import { Bell, Search } from 'lucide-react'
import { motion } from 'framer-motion'
import { IconButton, Avatar, ThemeToggle, UserMenu } from '@/components/ui'
import { useAuth } from '@/hooks/useAuth'

export function Topbar({ onOpenPalette }) {
  const { user } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const avatarRef = useRef(null)

  return (
    <header className="relative flex h-16 items-center gap-3 border-b border-border bg-surface/80 px-5 backdrop-blur">
      {/* Search trigger */}
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={onOpenPalette}
        className="hidden max-w-sm flex-1 items-center gap-2.5 rounded-full border border-border bg-surface-2 px-4 py-2 text-left text-sm text-muted transition-colors hover:border-accent/30 hover:bg-surface sm:flex"
      >
        <Search className="h-3.5 w-3.5 shrink-0" />
        <span className="flex-1">Search assets, collections, tags…</span>
        <kbd className="hidden rounded border border-border bg-surface px-1.5 py-0.5 text-[10px] font-medium lg:block">
          ⌘K
        </kbd>
      </motion.button>

      <div className="ml-auto flex items-center gap-1.5">
        <IconButton icon={Search} aria-label="Search" onClick={onOpenPalette} className="sm:hidden" />
        <IconButton icon={Bell} aria-label="Notifications" />
        <ThemeToggle />
        <span className="mx-1 h-6 w-px bg-border" />

        {/* Avatar — opens UserMenu */}
        <motion.button
          ref={avatarRef}
          type="button"
          aria-label="User menu"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => setMenuOpen((o) => !o)}
          className="relative rounded-full ring-2 ring-transparent transition-all focus-visible:outline-none focus-visible:ring-ring data-[open=true]:ring-accent/40"
          data-open={menuOpen}
        >
          <Avatar src={user?.avatarUrl} name={user?.name} size="md" />
          {/* online dot */}
          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-surface bg-emerald-400" />
        </motion.button>
      </div>

      <UserMenu anchorRef={avatarRef} open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  )
}
