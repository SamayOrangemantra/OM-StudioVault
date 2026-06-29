import { useState } from 'react'
import { Sparkles, Check, RefreshCw } from 'lucide-react'
import { cn } from '@/lib/cn'
import { Modal, Button, Spinner } from '@/components/ui'
import { useTags } from '@/hooks/useTags'

/*
 * AI Tag PROTOTYPE — there is no AI here. "Generate" fakes a short processing
 * delay and then surfaces random suggestions from a curated vocabulary (minus
 * tags the asset already has). The user picks which to keep and accepts them;
 * accepted tags are persisted via the tags store and merged onto the asset.
 */
const VOCAB = [
  'elegant', 'candlelit', 'symmetrical', 'editorial', 'timeless', 'opulent',
  'soft-focus', 'dramatic-lighting', 'monochrome', 'pastel', 'high-contrast',
  'minimalist', 'maximalist', 'romantic', 'whimsical', 'grand', 'intimate',
  'textured', 'metallic-accents', 'natural-light', 'golden-hour', 'moody',
  'airy', 'lush-greenery', 'geometric', 'hand-crafted', 'bespoke', 'layered',
]

const sampleTags = (existing, n = 6) => {
  const pool = VOCAB.filter((t) => !existing.includes(t))
  const out = []
  while (out.length < n && pool.length) {
    out.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0])
  }
  return out
}

export function AITagModal({ open, onClose, asset }) {
  const { addTags, getTags } = useTags()
  const [status, setStatus] = useState('idle') // idle | generating | ready
  const [suggestions, setSuggestions] = useState([])
  const [selected, setSelected] = useState(new Set())

  const generate = () => {
    setStatus('generating')
    setSuggestions([])
    setSelected(new Set())
    // Fake the "thinking" latency of a model call.
    setTimeout(() => {
      const tags = sampleTags(getTags(asset))
      setSuggestions(tags)
      setSelected(new Set(tags)) // pre-select all; user can deselect
      setStatus('ready')
    }, 1100)
  }

  const toggle = (tag) =>
    setSelected((prev) => {
      const next = new Set(prev)
      next.has(tag) ? next.delete(tag) : next.add(tag)
      return next
    })

  const accept = () => {
    addTags(asset.id, [...selected])
    handleClose()
  }

  const handleClose = () => {
    setStatus('idle')
    setSuggestions([])
    setSelected(new Set())
    onClose()
  }

  return (
    <Modal open={open} onClose={handleClose} title="Generate AI tags">
      <div className="space-y-5">
        <p className="text-sm text-muted">
          Aura will suggest descriptive tags for{' '}
          <span className="font-medium text-text">{asset?.name}</span>. Review the
          suggestions and accept the ones you want.
        </p>

        {status === 'idle' && (
          <div className="flex flex-col items-center gap-4 rounded-xl border border-dashed border-border py-10">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/15 text-accent">
              <Sparkles className="h-6 w-6" />
            </span>
            <Button icon={Sparkles} onClick={generate}>
              Generate AI tags
            </Button>
          </div>
        )}

        {status === 'generating' && (
          <div className="flex flex-col items-center gap-3 py-12 text-sm text-muted">
            <Spinner className="h-6 w-6 text-accent" />
            Analyzing asset…
          </div>
        )}

        {status === 'ready' && (
          <>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((tag) => {
                const on = selected.has(tag)
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggle(tag)}
                    className={cn(
                      'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors',
                      on
                        ? 'border-transparent bg-accent/15 text-accent'
                        : 'border-border text-muted hover:text-text',
                    )}
                  >
                    {on && <Check className="h-3.5 w-3.5" />}#{tag}
                  </button>
                )
              })}
            </div>

            <div className="flex items-center justify-between gap-2 pt-1">
              <Button variant="ghost" icon={RefreshCw} onClick={generate}>
                Regenerate
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button icon={Check} onClick={accept} disabled={selected.size === 0}>
                  Accept {selected.size > 0 ? `(${selected.size})` : ''}
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </Modal>
  )
}
