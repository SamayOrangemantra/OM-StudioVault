import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Bell, Palette, Shield, Camera, Check, Plus, Trash2 } from 'lucide-react'
import { PageHeader, Avatar, Badge } from '@/components/ui'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/context/ToastProvider'
import { users } from '@/data'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { cn } from '@/lib/cn'

const TABS = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'workspace', label: 'Workspace', icon: Shield },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'appearance', label: 'Appearance', icon: Palette },
]

const ACCENT_COLORS = [
  { name: 'Gold', value: '#C9A96E' },
  { name: 'Rose', value: '#E07A8C' },
  { name: 'Sage', value: '#7BAE8A' },
  { name: 'Sky', value: '#6AADD5' },
  { name: 'Violet', value: '#9B84D1' },
  { name: 'Amber', value: '#D4924A' },
]

function Toggle({ checked, onChange, label }) {
  return (
    <div className="flex items-center justify-between py-3">
      <span className="text-sm text-text">{label}</span>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={cn(
          'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200',
          checked ? 'bg-accent' : 'bg-surface-2',
        )}
      >
        <motion.span
          animate={{ x: checked ? 20 : 2 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="mt-0.5 inline-block h-4 w-4 rounded-full bg-white shadow"
        />
      </button>
    </div>
  )
}

function SCard({ title, children }) {
  return (
    <motion.div
      variants={fadeUp}
      className="rounded-3xl border border-border bg-surface p-6 shadow-soft"
    >
      {title && <h3 className="mb-5 text-base font-semibold text-text">{title}</h3>}
      {children}
    </motion.div>
  )
}

function Field({ label, value, onChange, readOnly, type = 'text', placeholder }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-muted">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        readOnly={readOnly}
        placeholder={placeholder}
        className={cn(
          'w-full rounded-xl border border-border bg-surface-2 px-3.5 py-2.5 text-sm text-text outline-none transition-colors',
          readOnly ? 'cursor-not-allowed opacity-60' : 'focus:border-accent/50 focus:ring-2 focus:ring-accent/20',
        )}
      />
    </div>
  )
}

function SaveBtn({ onClick }) {
  return (
    <div className="flex justify-end pt-1">
      <motion.button
        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-white shadow transition-opacity hover:opacity-90"
      >Save changes</motion.button>
    </div>
  )
}

function ProfileTab() {
  const { user } = useAuth()
  const { show } = useToast()
  const [name, setName] = useState(user?.name ?? '')
  const [bio, setBio] = useState('Creative director specialising in luxury wedding and event photography.')

  return (
    <motion.div variants={staggerContainer(0.07)} initial="hidden" animate="show" className="space-y-5">
      <SCard title="Public profile">
        <div className="flex flex-col items-start gap-6 sm:flex-row">
          <div className="relative shrink-0">
            <span className="inline-flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-surface-2">
              {user?.avatarUrl
                ? <img src={user.avatarUrl} alt={user.name} className="h-full w-full object-cover" />
                : <span className="text-xl font-semibold text-muted">{(user?.name ?? '?')[0]}</span>}
            </span>
            <motion.button
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              onClick={() => show('Photo upload coming soon', { type: 'info' })}
              className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-surface bg-accent text-white shadow"
            >
              <Camera className="h-3.5 w-3.5" />
            </motion.button>
          </div>
          <div className="flex-1 space-y-3">
            <Field label="Display name" value={name} onChange={setName} />
            <Field label="Email" value={user?.email ?? ''} readOnly />
            <Field label="Role" value={user?.role ?? ''} readOnly />
          </div>
        </div>
        <div className="mt-4">
          <label className="mb-1.5 block text-xs font-medium text-muted">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            className="w-full resize-none rounded-xl border border-border bg-surface-2 px-3.5 py-2.5 text-sm text-text outline-none transition-colors focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
          />
        </div>
        <SaveBtn onClick={() => show('Profile saved', { type: 'success' })} />
      </SCard>

      <SCard title="Password">
        <div className="space-y-3">
          <Field label="Current password" type="password" placeholder="••••••••" />
          <Field label="New password" type="password" placeholder="••••••••" />
          <Field label="Confirm new password" type="password" placeholder="••••••••" />
        </div>
        <div className="mt-4">
          <SaveBtn onClick={() => show('Password updated', { type: 'success' })} />
        </div>
      </SCard>
    </motion.div>
  )
}

function WorkspaceTab() {
  const { show } = useToast()
  const { user } = useAuth()
  const [wsName, setWsName] = useState('Aura Lux Studio')
  const usedGB = 47.2
  const totalGB = 100

  return (
    <motion.div variants={staggerContainer(0.07)} initial="hidden" animate="show" className="space-y-5">
      <SCard title="Workspace details">
        <Field label="Workspace name" value={wsName} onChange={setWsName} />
        <div className="mt-4">
          <SaveBtn onClick={() => show('Workspace updated', { type: 'success' })} />
        </div>
      </SCard>

      <SCard title="Storage">
        <div className="flex items-end justify-between mb-2">
          <span className="text-sm text-muted">{usedGB} GB used</span>
          <span className="text-sm font-medium text-text">{totalGB} GB</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-surface-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(usedGB / totalGB) * 100}%` }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="h-full rounded-full bg-accent"
          />
        </div>
        <p className="mt-2 text-xs text-muted">{(totalGB - usedGB).toFixed(1)} GB remaining</p>
        <motion.button
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          onClick={() => show('Upgrade plans coming soon', { type: 'info' })}
          className="mt-4 rounded-full border border-accent/30 px-4 py-1.5 text-sm text-accent transition-colors hover:bg-accent/10"
        >Upgrade plan</motion.button>
      </SCard>

      <SCard title="Members">
        <div className="space-y-1">
          {users.map((u) => (
            <div key={u.id} className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-surface-2">
              <Avatar src={u.avatarUrl} name={u.name} size="md" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-text">{u.name}</p>
                <p className="text-xs text-muted">{u.email}</p>
              </div>
              <span className="shrink-0 rounded-full bg-surface-2 px-2.5 py-0.5 text-[11px] font-medium text-muted">
                {u.id === user?.id ? 'You · ' : ''}{u.role}
              </span>
              {u.id !== user?.id && (
                <motion.button
                  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                  onClick={() => show(`Removed ${u.name.split(' ')[0]}`, { type: 'info' })}
                  className="rounded-lg p-1.5 text-muted transition-colors hover:bg-red-50 hover:text-red-500"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </motion.button>
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          <input
            placeholder="Invite by email…"
            className="flex-1 rounded-xl border border-border bg-surface-2 px-3.5 py-2 text-sm text-text outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
          />
          <motion.button
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={() => show('Invite sent', { type: 'success' })}
            className="flex items-center gap-1.5 rounded-xl bg-accent px-4 py-2 text-sm font-medium text-white"
          >
            <Plus className="h-4 w-4" /> Invite
          </motion.button>
        </div>
      </SCard>
    </motion.div>
  )
}

function NotificationsTab() {
  const { show } = useToast()
  const [prefs, setPrefs] = useState({ upload: true, tagged: true, shared: false, digest: true, mentions: true })
  const items = [
    { key: 'upload', label: 'New asset uploaded' },
    { key: 'tagged', label: 'Asset tagged or updated' },
    { key: 'shared', label: 'Collection shared with you' },
    { key: 'digest', label: 'Weekly activity digest' },
    { key: 'mentions', label: 'Mentions & comments' },
  ]

  return (
    <motion.div variants={staggerContainer(0.07)} initial="hidden" animate="show" className="space-y-5">
      <SCard title="Email notifications">
        <div className="divide-y divide-border">
          {items.map(({ key, label }) => (
            <Toggle key={key} label={label} checked={prefs[key]} onChange={(v) => setPrefs((p) => ({ ...p, [key]: v }))} />
          ))}
        </div>
        <div className="mt-5 flex justify-end">
          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={() => show('Notification preferences saved', { type: 'success' })}
            className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-white shadow"
          >Save preferences</motion.button>
        </div>
      </SCard>
    </motion.div>
  )
}

function AppearanceTab() {
  const { show } = useToast()
  const [theme, setTheme] = useState('system')
  const [accent, setAccent] = useState('#C9A96E')

  const THEMES = [
    { id: 'light', label: 'Light', cls: 'bg-white border-gray-200' },
    { id: 'dark', label: 'Dark', cls: 'bg-gray-900 border-gray-700' },
    { id: 'system', label: 'System', cls: 'bg-gradient-to-br from-white to-gray-900 border-gray-400' },
  ]

  return (
    <motion.div variants={staggerContainer(0.07)} initial="hidden" animate="show" className="space-y-5">
      <SCard title="Theme">
        <div className="flex gap-3">
          {THEMES.map((t) => (
            <motion.button
              key={t.id}
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              onClick={() => { setTheme(t.id); show(`Theme: ${t.label}`, { type: 'success' }) }}
              className={cn(
                'relative flex flex-1 flex-col items-center gap-2 rounded-2xl border-2 p-4 transition-colors',
                theme === t.id ? 'border-accent' : 'border-border',
              )}
            >
              <div className={cn('h-12 w-full rounded-lg border', t.cls)} />
              <span className="text-xs font-medium text-text">{t.label}</span>
              {theme === t.id && (
                <motion.span
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-accent"
                >
                  <Check className="h-2.5 w-2.5 text-white" />
                </motion.span>
              )}
            </motion.button>
          ))}
        </div>
      </SCard>

      <SCard title="Accent colour">
        <div className="flex flex-wrap gap-3">
          {ACCENT_COLORS.map((c) => (
            <motion.button
              key={c.value}
              whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}
              onClick={() => { setAccent(c.value); show(`Accent: ${c.name}`, { type: 'success' }) }}
              title={c.name}
              className="relative h-9 w-9 rounded-full shadow-md"
              style={{ backgroundColor: c.value }}
            >
              {accent === c.value && (
                <motion.span
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Check className="h-4 w-4 text-white drop-shadow" />
                </motion.span>
              )}
            </motion.button>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted">Colour changes will apply in a future release.</p>
      </SCard>
    </motion.div>
  )
}

const PANELS = { profile: ProfileTab, workspace: WorkspaceTab, notifications: NotificationsTab, appearance: AppearanceTab }

export default function Settings() {
  const [tab, setTab] = useState('profile')
  const Panel = PANELS[tab]

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Account"
        title="Settings"
        subtitle="Manage your profile, workspace, and preferences."
      />

      <div className="flex flex-wrap gap-1 rounded-2xl border border-border bg-surface p-1.5 shadow-soft w-fit">
        {TABS.map(({ id, label, icon: Icon }) => (
          <motion.button
            key={id}
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            onClick={() => setTab(id)}
            className={cn(
              'relative flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-colors',
              tab === id ? 'text-text' : 'text-muted hover:text-text',
            )}
          >
            {tab === id && (
              <motion.span
                layoutId="settings-tab-pill"
                className="absolute inset-0 rounded-xl bg-surface-2 shadow-soft"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <Icon className="relative z-10 h-4 w-4" />
            <span className="relative z-10">{label}</span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18 }}
        >
          <Panel />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
