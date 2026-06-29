import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Share2, Copy, Link, Globe, Lock, Plus, X, Eye, Clock } from 'lucide-react'
import { PageHeader, Button, Avatar, Badge } from '@/components/ui'
import { AssetGrid } from '@/components/library'
import { useToast } from '@/context/ToastProvider'
import { assets, users } from '@/data'
import { staggerContainer, fadeUp } from '@/lib/motion'
import { cn } from '@/lib/cn'

const SHARED_WITH_YOU = assets.slice(0, 8)
const SHARED_BY_YOU = assets.slice(8, 14)

const MOCK_LINKS = [
  { id: 'lnk_1', label: 'Q1 Wedding Portfolio', access: 'Viewer', views: 34, expires: 'Jul 15, 2026', public: true },
  { id: 'lnk_2', label: 'Mehta Family — Finals', access: 'Editor', views: 8, expires: 'Jul 1, 2026', public: false },
  { id: 'lnk_3', label: 'Brand Assets Pack', access: 'Viewer', views: 112, expires: 'Aug 30, 2026', public: true },
]

const TABS = ['Shared with you', 'Shared by you', 'Share links']

export default function Shared() {
  const [tab, setTab] = useState(0)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState('Viewer')
  const [showInvite, setShowInvite] = useState(false)
  const { show } = useToast()

  const handleInvite = () => {
    if (!inviteEmail.trim()) return show('Enter an email address', { type: 'error' })
    show(`Invite sent to ${inviteEmail}`, { type: 'success' })
    setInviteEmail('')
    setShowInvite(false)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Collaboration"
        title="Shared"
        subtitle="Assets and collections shared with you and your clients."
        actions={
          <motion.button
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={() => setShowInvite((v) => !v)}
            className="flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-white shadow transition-opacity hover:opacity-90"
          >
            <Plus className="h-4 w-4" /> Invite
          </motion.button>
        }
      />

      {/* Invite panel */}
      <AnimatePresence>
        {showInvite && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 420, damping: 28 }}
            className="rounded-3xl border border-accent/20 bg-surface p-5 shadow-xl"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-text">Invite to workspace</h3>
                <p className="text-xs text-muted">They'll get an email with access instructions.</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                onClick={() => setShowInvite(false)}
                className="rounded-lg p-1.5 text-muted hover:bg-surface-2"
              >
                <X className="h-4 w-4" />
              </motion.button>
            </div>
            <div className="flex gap-2">
              <input
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleInvite()}
                placeholder="colleague@studio.com"
                className="flex-1 rounded-xl border border-border bg-surface-2 px-3.5 py-2 text-sm text-text outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
              />
              <select
                value={inviteRole}
                onChange={(e) => setInviteRole(e.target.value)}
                className="rounded-xl border border-border bg-surface-2 px-3 py-2 text-sm text-text outline-none focus:border-accent/50"
              >
                <option>Viewer</option>
                <option>Editor</option>
                <option>Admin</option>
              </select>
              <motion.button
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={handleInvite}
                className="rounded-xl bg-accent px-4 py-2 text-sm font-medium text-white"
              >Send</motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tab bar */}
      <div className="flex gap-1 rounded-2xl border border-border bg-surface p-1.5 shadow-soft w-fit">
        {TABS.map((label, i) => (
          <motion.button
            key={label}
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            onClick={() => setTab(i)}
            className={cn(
              'relative rounded-xl px-4 py-2 text-sm font-medium transition-colors',
              tab === i ? 'text-text' : 'text-muted hover:text-text',
            )}
          >
            {tab === i && (
              <motion.span
                layoutId="shared-tab-pill"
                className="absolute inset-0 rounded-xl bg-surface-2 shadow-soft"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{label}</span>
          </motion.button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {tab === 0 && (
          <motion.div
            key="with-you"
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            <div className="mb-4 flex items-center gap-3">
              {users.slice(1).map((u) => (
                <div key={u.id} className="flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 shadow-soft">
                  <Avatar src={u.avatarUrl} name={u.name} size="sm" />
                  <span className="text-xs font-medium text-text">{u.name.split(' ')[0]}</span>
                  <span className="text-[10px] text-muted">shared 8 assets</span>
                </div>
              ))}
            </div>
            <AssetGrid assets={SHARED_WITH_YOU} />
          </motion.div>
        )}

        {tab === 1 && (
          <motion.div
            key="by-you"
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"
          >
            {SHARED_BY_YOU.map((asset, i) => (
              <motion.div
                key={asset.id}
                initial={{ opacity: 0, y: 12, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: i * 0.04 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-surface shadow-soft"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={asset.thumbnailUrl} alt={asset.name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                  <motion.button
                    initial={{ opacity: 0, y: 4 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="absolute bottom-2 left-1/2 -translate-x-1/2 hidden rounded-full border border-white/30 bg-black/50 px-3 py-1 text-[11px] font-medium text-white backdrop-blur group-hover:flex"
                    onClick={() => show('Access revoked', { type: 'info' })}
                  >Revoke access</motion.button>
                </div>
                <div className="p-2">
                  <p className="truncate text-xs font-medium text-text">{asset.name}</p>
                  <div className="mt-1 flex items-center gap-1 text-[10px] text-muted">
                    <Eye className="h-3 w-3" />
                    <span>{Math.floor(Math.random() * 40 + 5)} views</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {tab === 2 && (
          <motion.div
            key="links"
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="space-y-3"
          >
            <motion.button
              whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
              onClick={() => show('Share link created', { type: 'success' })}
              className="flex w-full items-center gap-3 rounded-2xl border border-dashed border-accent/40 bg-accent/5 p-4 text-sm font-medium text-accent transition-colors hover:bg-accent/10"
            >
              <Plus className="h-5 w-5" /> Create new share link
            </motion.button>

            {MOCK_LINKS.map((lnk, i) => (
              <motion.div
                key={lnk.id}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-4 shadow-soft transition-shadow hover:shadow-panel"
              >
                <div className={cn(
                  'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl',
                  lnk.public ? 'bg-accent/10 text-accent' : 'bg-surface-2 text-muted',
                )}>
                  {lnk.public ? <Globe className="h-5 w-5" /> : <Lock className="h-5 w-5" />}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-text">{lnk.label}</p>
                  <div className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-muted">
                    <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{lnk.views} views</span>
                    <span>·</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />Expires {lnk.expires}</span>
                  </div>
                </div>

                <Badge variant={lnk.public ? 'accent' : 'outline'} className="shrink-0 text-[10px]">
                  {lnk.access}
                </Badge>

                <motion.button
                  whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}
                  onClick={() => show('Link copied to clipboard', { type: 'success' })}
                  className="flex items-center gap-1.5 rounded-xl border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-text transition-colors hover:bg-surface"
                >
                  <Copy className="h-3.5 w-3.5" /> Copy
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}
                  onClick={() => show('Link revoked', { type: 'info' })}
                  className="rounded-xl p-2 text-muted transition-colors hover:bg-red-50 hover:text-red-500"
                >
                  <X className="h-4 w-4" />
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
