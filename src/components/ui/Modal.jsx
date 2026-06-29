import { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/lib/cn'
import { IconButton } from './IconButton'

/**
 * Accessible modal dialog with Framer Motion enter/exit. Renders through a
 * portal; closes on Escape / backdrop click and locks body scroll while open.
 *
 * Accessibility: labelled by its title (aria-labelledby), moves keyboard focus
 * into the dialog on open, and restores focus to the previously-focused element
 * on close.
 */
export function Modal({ open, onClose, title, children, className }) {
  const dialogRef = useRef(null)
  const lastFocused = useRef(null)
  const titleId = useId()

  useEffect(() => {
    if (!open) return

    lastFocused.current = document.activeElement
    dialogRef.current?.focus()

    const onKey = (e) => e.key === 'Escape' && onClose?.()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      // Restore focus to whatever opened the modal.
      lastFocused.current?.focus?.()
    }
  }, [open, onClose])

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? titleId : undefined}
            tabIndex={-1}
            className={cn(
              'relative z-10 w-full max-w-lg rounded-3xl border border-border bg-surface shadow-float focus:outline-none',
              className,
            )}
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            {title && (
              <div className="flex items-center justify-between border-b border-border px-6 py-4">
                <h2 id={titleId} className="font-display text-xl font-semibold text-text">
                  {title}
                </h2>
                <IconButton icon={X} size="sm" aria-label="Close" onClick={onClose} />
              </div>
            )}
            <div className="px-6 py-5">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
