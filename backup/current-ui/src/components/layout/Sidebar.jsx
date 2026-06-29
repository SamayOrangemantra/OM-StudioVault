import { memo } from 'react'
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { cn } from '@/lib/cn'
import { NAV_ITEMS } from '@/lib/constants'
import { IconButton } from '@/components/ui'
import { Logo } from '@/components/brand/Logo'
import { NavItem } from './NavItem'

/**
 * Primary navigation rail. Collapse state is owned by AppShell so the grid can
 * resize alongside it. Maps NAV_ITEMS → NavItem, keeping nav config in one place.
 *
 * Memoized: with a stable `onToggle`, the rail won't re-render on navigation
 * (active state is handled internally by each NavLink, not via props).
 */
function SidebarBase({ collapsed, onToggle }) {
  return (
    <aside
      className={cn(
        'flex h-full flex-col border-r border-border bg-surface',
        collapsed ? 'items-center px-2' : 'px-3',
      )}
    >
      {/* Brand */}
      <div
        className={cn(
          'flex h-16 items-center',
          collapsed ? 'justify-center' : 'justify-between px-1',
        )}
      >
        {!collapsed && <Logo size="sm" />}
        <IconButton
          icon={collapsed ? PanelLeftOpen : PanelLeftClose}
          size="sm"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          onClick={onToggle}
        />
      </div>

      {/* Nav */}
      <nav className="mt-2 flex flex-1 flex-col gap-1">
        {NAV_ITEMS.map((item) => (
          <NavItem key={item.to} {...item} collapsed={collapsed} />
        ))}
      </nav>

      {/* Footer hint */}
      {!collapsed && (
        <div className="px-1 py-4 text-xs text-muted">
          Prototype · mock data
        </div>
      )}
    </aside>
  )
}

export const Sidebar = memo(SidebarBase)
