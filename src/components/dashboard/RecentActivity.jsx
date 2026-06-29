import { Upload, Star, FolderPlus, Share2, MessageSquare, Activity } from 'lucide-react'
import { SectionCard } from './SectionCard'
import { Avatar } from '@/components/ui'
import { getRecentActivity } from '@/data/selectors'
import { relativeTime } from '@/lib/format'

/** Per-activity presentation: icon + verb phrase shown after the user's name. */
const ACTIVITY = {
  upload: { icon: Upload, verb: 'uploaded' },
  favorite: { icon: Star, verb: 'favorited' },
  collection: { icon: FolderPlus, verb: 'created collection' },
  share: { icon: Share2, verb: 'shared' },
  comment: { icon: MessageSquare, verb: 'commented on' },
}

function ActivityRow({ entry }) {
  const meta = ACTIVITY[entry.type] ?? { icon: Activity, verb: 'updated' }
  const Icon = meta.icon

  return (
    <li className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
      <div className="relative shrink-0">
        <Avatar src={entry.user?.avatarUrl} name={entry.user?.name} size="sm" />
        <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-surface text-accent ring-2 ring-surface">
          <Icon className="h-2.5 w-2.5" />
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm leading-snug text-text">
          <span className="font-medium">{entry.user?.name ?? 'Someone'}</span>{' '}
          <span className="text-muted">{meta.verb}</span>{' '}
          <span className="font-medium">{entry.targetName}</span>
        </p>
        <p className="mt-0.5 text-xs text-muted">{relativeTime(entry.createdAt)}</p>
      </div>
    </li>
  )
}

/** Chronological feed of recent team actions. */
export function RecentActivity() {
  const entries = getRecentActivity(6)

  return (
    <SectionCard title="Recent activity">
      <ul className="divide-y divide-border">
        {entries.map((entry) => (
          <ActivityRow key={entry.id} entry={entry} />
        ))}
      </ul>
    </SectionCard>
  )
}
