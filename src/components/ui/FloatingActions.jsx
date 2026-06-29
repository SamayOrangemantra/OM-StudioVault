import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Upload, Sparkles, FolderPlus, X } from 'lucide-react'
import { cn } from '@/lib/cn'

const ACTIONS = [
  { icon: Upload, label: 'Upload assets', accent: true },
  { icon: Sparkles, label: 'AI tag assets', accent: false },
  { icon: FolderPlus, label: 'New collection', accent: false },
]

export function FloatingActions() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-7 right-7 z-50 flex flex-col-reverse items-end gap-3">
      {/* Sub-actions */}
      <AnimatePresence>
        {open &&
          ACTIONS.map((action, i) => (
            <motion.div
              key={action.label}
              initial={{ opacity: 0, y: 12, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.85 }}
              transition={{
                type: 'spring',
                stiffness: 420,
                damping: 26,
                delay: open ? i * 0.05 : (ACTIONS.length - 1 - i) * 0.03,
              }}
              className="flex items-center gap-3"
            >
              {/* Label tooltip */}
              <motion.span
                initial={{ opacity: 0, x: 6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 6 }}
                transition={{ delay: i * 0.05 + 0.06 }}
                className="whitespace-nowrap rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-medium text-text shadow-soft"
              >
                {action.label}
              </motion.span>

              {/* Action button */}
              <motion.button
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.93 }}
                className={cn(
                  'flex h-11 w-11 items-center justify-center rounded-full shadow-panel transition-shadow hover:shadow-float',
                  action.accent
                    ? 'bg-accent text-bg'
                    : 'border border-border bg-surface text-text',
                )}
              >
                <action.icon className="h-4 w-4" />
              </motion.button>
            </motion.div>
          ))}
      </AnimatePresence>

      {/* Main FAB */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-text shadow-float transition-shadow hover:shadow-[0_20px_60px_rgb(0_0_0/0.22)]"
        aria-label={open ? 'Close actions' : 'Quick actions'}
      >
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ type: 'spring', stiffness: 380, damping: 22 }}
        >
          <Plus className="h-6 w-6 text-bg" />
        </motion.div>
      </motion.button>

      {/* Backdrop tap-to-close */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 -z-10"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
