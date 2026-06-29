import { createContext, useContext, useState, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle, Info, AlertCircle, X } from 'lucide-react'
import { cn } from '@/lib/cn'

const ToastContext = createContext(null)

const ICONS = {
  success: CheckCircle,
  info: Info,
  error: AlertCircle,
}
const COLORS = {
  success: 'text-emerald-600',
  info: 'text-accent',
  error: 'text-red-500',
}

let uid = 0

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const timers = useRef({})

  const dismiss = useCallback((id) => {
    clearTimeout(timers.current[id])
    setToasts((t) => t.filter((x) => x.id !== id))
  }, [])

  const show = useCallback(
    (message, { type = 'success', duration = 2800 } = {}) => {
      const id = ++uid
      setToasts((t) => [...t.slice(-3), { id, message, type }])
      timers.current[id] = setTimeout(() => dismiss(id), duration)
      return id
    },
    [dismiss],
  )

  return (
    <ToastContext.Provider value={{ show, dismiss }}>
      {children}
      {createPortal(
        <div className="pointer-events-none fixed bottom-6 left-1/2 z-[300] flex -translate-x-1/2 flex-col items-center gap-2">
          <AnimatePresence mode="popLayout">
            {toasts.map((t) => {
              const Icon = ICONS[t.type] ?? Info
              return (
                <motion.div
                  key={t.id}
                  layout
                  initial={{ opacity: 0, y: 16, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.92 }}
                  transition={{ type: 'spring', stiffness: 420, damping: 28 }}
                  className="pointer-events-auto flex items-center gap-2.5 rounded-full border border-border bg-surface px-4 py-2.5 shadow-panel"
                >
                  <Icon className={cn('h-4 w-4 shrink-0', COLORS[t.type])} />
                  <span className="text-sm font-medium text-text">{t.message}</span>
                  <button
                    onClick={() => dismiss(t.id)}
                    className="ml-1 text-muted transition-colors hover:text-text"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>,
        document.body,
      )}
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used inside ToastProvider')
  return ctx
}
