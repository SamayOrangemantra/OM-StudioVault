import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'
import { Tooltip } from '@/components/ui'

/**
 * A single sidebar link. Active state comes from NavLink; when the sidebar is
 * collapsed the label is hidden and surfaced as a tooltip instead. The active
 * pill is a shared-layout Framer Motion element so it slides between items.
 */
export function NavItem({ to, label, icon: Icon, end, collapsed }) {
  const content = (
    // When collapsed the text label is hidden, so expose it to assistive tech
    // via aria-label — otherwise the link has no accessible name.
    <NavLink to={to} end={end} aria-label={collapsed ? label : undefined}>
      {({ isActive }) => (
        <span
          className={cn(
            'group relative flex items-center gap-3 rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors',
            collapsed && 'justify-center px-0',
            isActive ? 'text-text' : 'text-muted hover:text-text',
          )}
        >
          {isActive && (
            <motion.span
              layoutId="nav-active"
              className="absolute inset-0 -z-10 rounded-full bg-surface-2"
              transition={{ type: 'spring', stiffness: 500, damping: 40 }}
            />
          )}
          <Icon
            className={cn(
              'h-[18px] w-[18px] shrink-0 transition-colors',
              isActive ? 'text-accent' : 'text-muted group-hover:text-text',
            )}
          />
          {!collapsed && <span className="truncate">{label}</span>}
        </span>
      )}
    </NavLink>
  )

  return collapsed ? (
    <Tooltip label={label} side="right">
      {content}
    </Tooltip>
  ) : (
    content
  )
}
