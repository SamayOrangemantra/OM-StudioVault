import { useState } from 'react'
import { Copy, Check, Link2 } from 'lucide-react'
import { Modal, Button, Avatar } from '@/components/ui'
import { users } from '@/data'

/**
 * Dummy share dialog — frontend only. The "link" is fabricated and the copy
 * button uses the clipboard API (or falls back silently). No real sharing.
 */
export function ShareModal({ open, onClose, asset }) {
  const [copied, setCopied] = useState(false)
  const shareUrl = `https://aura.studio/s/${asset?.id ?? ''}`

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
    } catch {
      /* clipboard unavailable — dummy flow, ignore */
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <Modal open={open} onClose={onClose} title="Share asset">
      <div className="space-y-5">
        <p className="text-sm text-muted">
          Anyone with the link can view{' '}
          <span className="font-medium text-text">{asset?.name}</span>.
        </p>

        <div className="flex items-center gap-2 rounded-xl border border-border bg-surface-2 px-3 py-2">
          <Link2 className="h-4 w-4 shrink-0 text-muted" />
          <span className="flex-1 truncate text-sm text-text">{shareUrl}</span>
          <Button
            size="sm"
            variant={copied ? 'subtle' : 'primary'}
            icon={copied ? Check : Copy}
            onClick={copy}
          >
            {copied ? 'Copied' : 'Copy'}
          </Button>
        </div>

        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted">
            Shared with
          </p>
          <div className="flex items-center gap-3">
            {users.map((u) => (
              <div key={u.id} className="flex items-center gap-2">
                <Avatar src={u.avatarUrl} name={u.name} size="sm" />
                <span className="text-sm text-text">{u.name.split(' ')[0]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  )
}
