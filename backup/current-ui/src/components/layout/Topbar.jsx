import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Bell, Plus } from 'lucide-react'
import { Button, IconButton, Input, Avatar, ThemeToggle } from '@/components/ui'
import { useAuth } from '@/hooks/useAuth'
import { libraryUrl } from '@/lib/libraryUrl'

/**
 * Global top bar: a search field (submits into the Library), quick actions, the
 * theme toggle, and the current user. Sits above the routed content.
 */
export function Topbar() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [query, setQuery] = useState('')

  return (
    <header className="flex h-16 items-center gap-3 border-b border-border bg-surface/80 px-5 backdrop-blur">
      <form
        className="hidden max-w-md flex-1 sm:block"
        onSubmit={(e) => {
          e.preventDefault()
          navigate(libraryUrl({ query }))
        }}
      >
        <Input
          icon={Search}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search assets, collections, tags…"
        />
      </form>

      <div className="ml-auto flex items-center gap-1.5">
        {/* <Button size="sm" icon={Plus} className="hidden sm:inline-flex">
          Upload
        </Button> */}
        <IconButton icon={Bell} aria-label="Notifications" />
        <ThemeToggle />
        <span className="mx-1 h-6 w-px bg-border" />
        <Avatar src={user?.avatarUrl} name={user?.name} size="md" />
      </div>
    </header>
  )
}
