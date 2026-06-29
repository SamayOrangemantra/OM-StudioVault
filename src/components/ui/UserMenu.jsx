import { useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Settings, LogOut, HelpCircle, Keyboard, ChevronRight } from 'lucide-react'
import { Avatar } from './Avatar'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/context/ToastProvider'
import { cn } from '@/lib/cn'

function MenuItem({ icon: Icon, label, to, onClick, danger, hint }) {
  const cls = cn(
    'flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors',
    danger
      ? 'text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10'
      : 'text-text hover:bg-surface-2',
  )

  const inner = (
    <>
      <Icon className="h-4 w-4 shrink-0 opacity-70" />
      <span className="flex-1 text-left">{label}</span>
      {hint && <span className="text-[10px] text-muted">{hint}</span>}
      {to && <ChevronRight className="h-3.5 w-3.5 opacity-40" />}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={cls} onClick={onClick}>
        {inner}
      </Link>
    )
  }
  return (
    <button type="button" className={cls} onClick={onClick}>
      {inner}
    </button>
  )
}

export function UserMenu({ anchorRef, open, onClose }) {
  const { user, logout } = useAuth()
  const { show } = useToast()
  const menuRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target) &&
          anchorRef?.current && !anchorRef.current.contains(e.target)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open, onClose, anchorRef])

  useEffect(() => {
    if (!open) return
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  const handleLogout = () => {
    onClose()
    logout()
  }

  const menu = (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, scale: 0.92, y: -8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: -8 }}
          transition={{ type: 'spring', stiffness: 460, damping: 30 }}
          style={{ transformOrigin: 'top right', position: 'fixed', top: 64, right: 16, zIndex: 300 }}
          className="w-64 rounded-2xl border border-border bg-surface p-1.5 shadow-xl"
        >
          {/* User header */}
          <div className="flex items-center gap-3 rounded-xl bg-surface-2 px-3 py-3 mb-1">
            <Avatar src={user?.avatarUrl} name={user?.name} size="lg" />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-text">{user?.name}</p>
              <p className="truncate text-xs text-muted">{user?.email}</p>
              <span className="mt-0.5 inline-block rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-medium text-accent">
                {user?.role}
              </span>
            </div>
          </div>

          <div className="space-y-0.5">
            <MenuItem icon={User} label="Your Profile" to="/settings" onClick={onClose} />
            <MenuItem icon={Settings} label="Settings" to="/settings" onClick={onClose} />
            <MenuItem
              icon={Keyboard}
              label="Keyboard Shortcuts"
              hint="⌘K"
              onClick={() => { show('Keyboard shortcuts panel coming soon', { type: 'info' }); onClose() }}
            />
            <MenuItem
              icon={HelpCircle}
              label="Help & Support"
              onClick={() => { show('Support chat coming soon', { type: 'info' }); onClose() }}
            />
          </div>

          <div className="my-1.5 h-px bg-border" />

          <MenuItem icon={LogOut} label="Sign out" onClick={handleLogout} danger />
        </motion.div>
      )}
    </AnimatePresence>
  )

  return createPortal(menu, document.body)
}
