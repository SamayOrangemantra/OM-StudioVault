import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Modal, Button, Input, Tag } from '@/components/ui'
import { useTags } from '@/hooks/useTags'

/**
 * Dummy "edit tags" dialog — frontend only. Existing tags are shown read-only;
 * new tags are appended via the tags store (so they persist locally). Real tag
 * editing / removal would land in a later, backed phase.
 */
export function EditTagsModal({ open, onClose, asset }) {
  const { addTags, getTags } = useTags()
  const [draft, setDraft] = useState('')

  const tags = asset ? getTags(asset) : []

  const add = () => {
    const clean = draft
      .split(',')
      .map((t) => t.trim().toLowerCase().replace(/\s+/g, '-'))
      .filter(Boolean)
    if (clean.length) addTags(asset.id, clean)
    setDraft('')
  }

  return (
    <Modal open={open} onClose={onClose} title="Edit tags">
      <div className="space-y-5">
        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <Tag key={t} label={t} />
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            add()
          }}
          className="flex items-center gap-2"
        >
          <Input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Add tags, comma-separated…"
            className="flex-1"
          />
          <Button type="submit" icon={Plus} disabled={!draft.trim()}>
            Add
          </Button>
        </form>

        <div className="flex justify-end">
          <Button variant="outline" onClick={onClose}>
            Done
          </Button>
        </div>
      </div>
    </Modal>
  )
}
