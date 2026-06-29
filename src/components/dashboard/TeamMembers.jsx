import { SectionCard } from './SectionCard'
import { Avatar, Badge } from '@/components/ui'
import { getTeam } from '@/data/selectors'

/**
 * Workspace members with their contribution counts. Read-only roster from the
 * mock users — gives the dashboard a collaborative, team-aware feel.
 */
export function TeamMembers() {
  const team = getTeam()

  return (
    <SectionCard title="Team" action={{ to: '/settings', label: 'Manage' }}>
      <ul className="space-y-3">
        {team.map((member) => (
          <li key={member.id} className="flex items-center gap-3">
            <Avatar src={member.avatarUrl} name={member.name} size="md" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-text">{member.name}</p>
              <p className="truncate text-xs text-muted">{member.role}</p>
            </div>
            <Badge variant="neutral">{member.assetCount} assets</Badge>
          </li>
        ))}
      </ul>
    </SectionCard>
  )
}
